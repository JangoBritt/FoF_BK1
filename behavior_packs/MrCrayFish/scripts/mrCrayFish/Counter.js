import { frontBlockLocation, backBlockLocation, leftBlockLocation, rightBlockLocation } from '../util/globalVariables';

export class MrCounter {
	onPlace(e) {
		const direction = e.block.permutation.getState("minecraft:cardinal_direction");
		updateCounter(e.block, direction);
		updateNearestCounter(e.block, direction);
	}
	onPlayerDestroy(e) {
		const direction = e.destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		updateNearestCounter(e.block, direction);
	}
}
function updateCounter(block, direction) {
	const frontBlock = block.offset(backBlockLocation[direction]);
	block.setPermutation(block.permutation.withState("mr:f", frontBlock.hasTag("mr:is_counter")));
}
function updateNearestCounter(block, direction) {
	const backBlock = block.offset(frontBlockLocation[direction]);
	const rightBlock = block.offset(leftBlockLocation[direction]);
	const leftBlock = block.offset(rightBlockLocation[direction]);
	if (backBlock.hasTag("mr:is_counter")) updateCounter(backBlock, backBlock.permutation.getState("minecraft:cardinal_direction"));
	if (rightBlock.hasTag("mr:is_counter")) updateCounter(rightBlock, rightBlock.permutation.getState("minecraft:cardinal_direction"));
	if (leftBlock.hasTag("mr:is_counter")) updateCounter(leftBlock, leftBlock.permutation.getState("minecraft:cardinal_direction"));
}