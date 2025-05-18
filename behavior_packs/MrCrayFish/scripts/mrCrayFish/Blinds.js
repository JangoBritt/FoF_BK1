import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';
export class MrBlinds {
	onPlace(e) {
		const direction = e.block.permutation.getState("minecraft:cardinal_direction");
		updatePlacedBlind(e.block, direction);
		updateNearestBlinds(e.block, direction, e.block.permutation);
	}
	onPlayerDestroy(e) {
		const direction = e.destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		updateNearestBlinds(e.block, direction, e.destroyedBlockPermutation);
	}
	onPlayerInteract(e) {
		const { block, dimension } = e;
		updateBlinds(block, block.location.x, block.location.y, block.location.z);
		dimension.playSound(block.permutation.getState("mr:close") ? "mr.blinds_open" : "mr.blinds_close", block.center());
	}
}
function updatePlacedBlind(block, direction) {
	if (!block) return;
    block.setPermutation(block.permutation.withState("mr:top", block.above().hasTag(`${block.typeId}_${direction}`)));
}
function updateNearestBlinds(block, direction, permutation) {
    const above = block.above();
    const below = block.below();
    const tag = `${permutation.type.id}_${direction}`;
    if (above.hasTag(tag)) updatePlacedBlind(above, direction);
    if (below.hasTag(tag)) updatePlacedBlind(below, direction);
}
function updateBlinds(block, originX, originY, originZ) {
	const blockType = block.typeId;
	const { x, y, z } = block.location;
	if (Math.abs(x - originX) > 8 || Math.abs(y - originY) > 8 || Math.abs(z - originZ) > 8) {
		return;
	}
	const stack = [];
	const visitedBlocks = new Set();
	stack.push(block);

	while (stack.length > 0) {
		const currentBlock = stack.pop();
		const currentDirection = currentBlock.permutation.getState("minecraft:cardinal_direction");
		const currentClose = currentBlock.permutation.getState("mr:close");
		const { x: currentX, y: currentY, z: currentZ } = currentBlock.location;
		const blockKey = `${currentX},${currentY},${currentZ}`;
		if (visitedBlocks.has(blockKey)) {
			continue;
		}
		visitedBlocks.add(blockKey);
		currentBlock.setPermutation(currentBlock.permutation.withState("mr:close", !currentClose));
		const rightBlock = currentBlock.offset(leftBlockLocation[currentDirection]);
		const leftBlock = currentBlock.offset(rightBlockLocation[currentDirection]);
		const topBlock = currentBlock.above();
		const bottomBlock = currentBlock.below();
		const adjacentBlocks = [rightBlock, leftBlock, topBlock, bottomBlock];
		adjacentBlocks.forEach(adjacentBlock => {
			try {
				if (adjacentBlock && adjacentBlock.hasTag(`${blockType}_${currentDirection}`)) {
					const adjacentClose = adjacentBlock.permutation.getState("mr:close");
					if (adjacentClose === currentClose) {
						const { x: adjX, y: adjY, z: adjZ } = adjacentBlock.location;
						if (Math.abs(adjX - originX) <= 10 && Math.abs(adjY - originY) <= 10 && Math.abs(adjZ - originZ) <= 10) {
							stack.push(adjacentBlock);
						}
					}
				}
			} catch (error) {}
		});
	}
}