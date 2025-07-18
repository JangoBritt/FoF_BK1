import { BlockPermutation } from '@minecraft/server';
import { getWoodType, WoodTypeSounds } from './Sounds';
import { airBlocks, rightBlockLocation, leftBlockLocation } from '../util/globalVariables'

export class McPlaceDoor {
	beforeOnPlayerPlace(e) {
		const { block } = e;
		const blockAbove = block.above();
		if (!airBlocks.includes(blockAbove.typeId)) e.cancel = true;
	}
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const blockAbove = block.above();
		const id = block.typeId + "_visual";
		const isRightState = block.offset(leftBlockLocation[direction]).hasTag("mc:side_door");
		block.setPermutation(BlockPermutation.resolve(id, { "minecraft:cardinal_direction": direction, "mc:block_parts": 0, "mc:side": isRightState }));
		blockAbove.setPermutation(BlockPermutation.resolve(id, { "minecraft:cardinal_direction": direction, "mc:block_parts": 1, "mc:side": isRightState }));
	}
}
export class McOpenDoor {
	onPlayerInteract(e) {
		const { block, dimension } = e;
		const { permutation } = block;
		const direction = permutation.getState("minecraft:cardinal_direction");
		const currentOpenState = permutation.getState("mc:open");
		const newOpenState = !currentOpenState;
		const updateDoorPair = (doorBlock) => { 
			const partBlock = doorBlock.permutation.getState("mc:block_parts") === 0 ? doorBlock.above() : doorBlock.below();
			[doorBlock, partBlock].forEach(b => b.setPermutation(b.permutation.withState("mc:open", newOpenState)))
		};
		updateDoorPair(block);
		const woodType = getWoodType(block.typeId);
		const soundKey = currentOpenState ? "close" : "open";
		dimension.playSound(WoodTypeSounds.door[woodType][soundKey], block.center());
		const sideBlockLoc = permutation.getState("mc:side") ? leftBlockLocation : rightBlockLocation;
		const sideBlock = block.offset(sideBlockLoc[direction]);
		if (sideBlock.hasTag("mc:door")) updateDoorPair(sideBlock);
	}
}