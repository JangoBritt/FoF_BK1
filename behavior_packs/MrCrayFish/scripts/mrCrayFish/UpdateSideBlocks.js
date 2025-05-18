import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';

export class MrUpdateDesk {
	onPlace(e) {
		const direction = e.block.permutation.getState("minecraft:cardinal_direction");
		updateBlock(e.block, direction, "mr:desk");
		updateNearestBlock(e.block, direction, "mr:desk");
	}
	onPlayerDestroy(e) {
		const direction = e.destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		updateNearestBlock(e.block, direction, "mr:desk");
	}
}
export class MrParkBench {
	onPlace(e) {
		const direction = e.block.permutation.getState("minecraft:cardinal_direction");
		updateBlock(e.block, direction, "mr:park_bench");
		updateNearestBlock(e.block, direction, "mr:park_bench");
	}
	onPlayerDestroy(e) {
		const direction = e.destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		updateNearestBlock(e.block, direction, "mr:park_bench");
	}
}
function updateBlock(block, direction, blockType) {
	if (!block) return;
	block.setPermutation(
		block.permutation
		.withState("mr:right", block.offset(leftBlockLocation[direction]).hasTag(`${blockType}_${direction}`))
		.withState("mr:left", block.offset(rightBlockLocation[direction]).hasTag(`${blockType}_${direction}`))
	);
}
function updateNearestBlock(block, direction, blockType) {
	const rightBlock = block.offset(rightBlockLocation[direction]);
	const leftBlock = block.offset(leftBlockLocation[direction]);
	if (rightBlock.hasTag(`${blockType}_${direction}`))
		updateBlock(rightBlock, rightBlock.permutation.getState("minecraft:cardinal_direction"), blockType);
	if (leftBlock.hasTag(`${blockType}_${direction}`))
		updateBlock(leftBlock, leftBlock.permutation.getState("minecraft:cardinal_direction"), blockType);
}