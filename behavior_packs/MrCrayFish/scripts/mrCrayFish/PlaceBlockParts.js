import { BlockPermutation, GameMode, ItemStack } from '@minecraft/server';
import { airBlocks, backBlockLocation } from '../util/globalVariables';
import { getDirectionByPlayer, setBlockParts } from '../util/utils';

const blockPartGetters = new Map([
	["1x1x2", (direction, block) => [
		{ target: block.offset(backBlockLocation[direction]), part: 1 }
	]],
	["1x2x1", (direction, block) => [
		{ target: block.above(), part: 1 }
	]]
]);

export class MrPlaceBase {
	constructor() {
		this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
		this.onPlace = this.onPlace.bind(this);
	}
	get sizeKey() {
		throw new Error("sizeKey has not been implemented!");
	}
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace, player } = e;
		const direction = getDirectionByPlayer(player);
		const getParts = blockPartGetters.get(this.sizeKey);
		if (!getParts) {
			e.cancel = true;
			return;
		}
		const parts = getParts(direction, block);
		if (!parts.every(part => airBlocks.includes(part.target.typeId))) {
			e.cancel = true;
			return;
		}
		const id = `${permutationToPlace.type.id}_visual`;
		e.permutationToPlace = BlockPermutation.resolve(id, {
			"minecraft:cardinal_direction": direction,
			"mc:block_parts": 0
		});
	}
	onPlace(e) {
		const getParts = blockPartGetters.get(this.sizeKey);
		const parts = getParts("north", e.block);
		setBlockParts(parts, `${e.block.typeId}_visual`, "north");
		e.block.setPermutation(BlockPermutation.resolve(`${e.block.typeId}_visual`, {
			"minecraft:cardinal_direction": "north",
			"mc:block_parts": 0
		}));
	}
}
export class MrOnPlaceBase {
	constructor() {
		this.onPlace = this.onPlace.bind(this);
	}
	get sizeKey() {
		throw new Error("sizeKey has not been implemented!");
	}
	onPlace(e) {
		const { block } = e;
		const initialPart = block.permutation.getState("mc:block_parts");
		if (initialPart !== 0) return;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const getParts = blockPartGetters.get(this.sizeKey);
		const parts = getParts(direction, block);
		setBlockParts(parts, block.typeId, direction);
	}
}
export class MrBreakLargeBlock {
	onPlayerDestroy(e) {
		if (e.player.matches({ gameMode: GameMode.creative })) return;
		e.dimension.spawnItem(new ItemStack(e.destroyedBlockPermutation.type.id.replace("_visual", ""), 1), e.block.location);
	}
}