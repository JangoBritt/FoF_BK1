import { ItemStack, BlockPermutation, GameMode } from '@minecraft/server';
import { rightBlockLocation, airBlocks, backBlockLocation } from '../util/globalVariables';
import { setBlockParts } from '../util/utils';

const blockPartGetters = new Map([
	["2x1x1", (direction, block) => [
		{ target: block.offset(rightBlockLocation[direction]), part: 1 }
	]],
	["1x1x2", (direction, block) => [
		{ target: block.offset(backBlockLocation[direction]), part: 1 }
	]],
	["1x2x1", (direction, block) => [
		{ target: block.above(), part: 1 }
	]],
	["2x2x2", (direction, block) => [
		{ target: block.offset(rightBlockLocation[direction]), part: 1 },
		{ target: block.offset(rightBlockLocation[direction]).offset(backBlockLocation[direction]), part: 2 },
		{ target: block.offset(backBlockLocation[direction]), part: 3 },
		{ target: block.above(), part: 4 },
		{ target: block.above().offset(rightBlockLocation[direction]), part: 5 },
		{ target: block.above().offset(rightBlockLocation[direction]).offset(backBlockLocation[direction]), part: 6 },
		{ target: block.above().offset(backBlockLocation[direction]), part: 7 }
	]]
]);

export class MfPlaceBase {
	constructor() {
		this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
		this.onPlace = this.onPlace.bind(this);
	}
	get sizeKey() {
		throw new Error("sizeKey has not been implemented!");
	}
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const parts = blockPartGetters.get(this.sizeKey)?.(direction, block);
		if (!parts || !parts.every(({ target }) => airBlocks.includes(target.typeId))) e.cancel = true;
	}
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const parts = blockPartGetters.get(this.sizeKey)(direction, block);
		const isPlaceableBlock = block.permutation.getState("mc:placed");
		if (isPlaceableBlock === false) {
			setBlockParts(parts, block.typeId, direction, true);
			block.setPermutation(block.permutation.withState("mc:placed", true));
		} else if (isPlaceableBlock === undefined) {
			setBlockParts(parts, `${block.typeId}_visual`, direction, false);
			block.setPermutation(BlockPermutation.resolve(`${block.typeId}_visual`, { "minecraft:cardinal_direction": direction,"mc:block_parts": 0 }));
		}
	}
}
export class MfBreakLargeBlock {
	onPlayerDestroy(e) {
		if (e.player.matches({ gameMode: GameMode.creative })) return;
		e.dimension.spawnItem(new ItemStack(e.destroyedBlockPermutation.type.id.replace("_visual", ""), 1), e.block.center());
	}
}