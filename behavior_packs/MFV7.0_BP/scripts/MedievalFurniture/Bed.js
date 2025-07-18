import { ItemStack, BlockPermutation } from '@minecraft/server';
import { rightBlockLocation, leftBlockLocation, frontBlockLocation, backBlockLocation } from '../util/globalVariables';

export class MfUpdateBed {
	onPlayerInteract(e) {
		const { player, block, dimension, face, faceLocation } = e;
		if (dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === "medieval:hidden_mount_sleeping_anim")) return;
		let center = block.center();
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const blockPart = block.permutation.getState("mc:block_parts");
		switch (direction) {
			case "north": center.z += blockPart === 0 ? 0.5 : -0.5; break;
			case "south": center.z += blockPart === 0 ? -0.5 : 0.5; break;
			case "west":  center.x += blockPart === 0 ? 0.5 : -0.5; break;
			case "east":  center.x += blockPart === 0 ? -0.5 : 0.5; break;
		}
		const playerSpawnpoint = player.getSpawnPoint();
		const newSpawnpoint = { dimension: dimension, x: center.x, y: center.y + 0.5, z: center.z };
		const areSpawnPointsEqual = playerSpawnpoint?.dimension.id === newSpawnpoint.dimension.id && playerSpawnpoint?.x === newSpawnpoint.x && playerSpawnpoint?.y === newSpawnpoint.y && playerSpawnpoint?.z === newSpawnpoint.z;
		if (!areSpawnPointsEqual) {
			player.setSpawnPoint(newSpawnpoint);
			player.sendMessage({ rawtext: [{ text: '§i' }, { translate: 'tile.bed.respawnSet' }] });
		}
		const hiddenMount = dimension.spawnEntity("medieval:hidden_mount_sleeping_anim", center);
		hiddenMount.setRotation({ x: 0, y: { north: 180, south: 0, west: 90, east: -90 }[direction] });
		hiddenMount.getComponent("rideable").addRider(player);
	}
	onPlace(e) {
		updateBed(e.block);
		updateSidedBed(e.block, e.block.permutation);
	}
	onPlayerDestroy(e) {
		updateSidedBed(e.block, e.destroyedBlockPermutation);
	}
}
function updateBed(block) {
	const permutation = block.permutation;
	const direction = permutation.getState("minecraft:cardinal_direction");
	const part = permutation.getState("mc:block_parts");
	const isValid = b => b.hasTag(`mf:bed_0_part_${part}`) && b.permutation.getState("minecraft:cardinal_direction") === direction;
	const rightValid = isValid(block.offset(rightBlockLocation[direction]));
	const leftValid = isValid(block.offset(leftBlockLocation[direction]));
	const sideState = rightValid ? (leftValid ? 3 : 2) : (leftValid ? 1 : 0);
	block.setPermutation(permutation.withState("medieval:side", sideState));
}
function updateSidedBed(block, permutation) {
	const direction = permutation.getState("minecraft:cardinal_direction");
	const part = permutation.getState("mc:block_parts");
	const updateWithOffset = (baseBlock) => {
		updateBed(baseBlock);
		updateBed(baseBlock.offset(part === 0 ? backBlockLocation[direction] : frontBlockLocation[direction]));
	};
	const rightBlock = block.offset(rightBlockLocation[direction]);
	if (rightBlock.hasTag(`mf:bed_0_part_${part}`) && (direction === rightBlock.permutation.getState("minecraft:cardinal_direction"))) updateWithOffset(rightBlock);
	const leftBlock = block.offset(leftBlockLocation[direction]);
	if (leftBlock.hasTag(`mf:bed_0_part_${part}`) && (direction == leftBlock.permutation.getState("minecraft:cardinal_direction"))) updateWithOffset(leftBlock);
}