import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';

export class MrFenceGate {
	onPlayerInteract(e) {
		const { block, dimension } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const open = block.permutation.getState("mr:open");
		const right = block.permutation.getState("mr:right");
		const side = block.permutation.getState("mr:side");
		const updateBlockState = (targetBlock) => {
			if (targetBlock.hasTag("mr:fence_gate")) {
				targetBlock.setPermutation(
					targetBlock.permutation.withState("mr:open", !open)
				);
			}
		};
		const checkBlocksVertical = (baseBlock, maxHeight = 10) => {
			for (let dir of [1, -1]) {
				let currentBlock = baseBlock;
				for (let i = 0; i < maxHeight; i++) {
					const next = currentBlock.offset({ x: 0, y: dir, z: 0 });
					if (!next.hasTag("mr:fence_gate")) break;
					const sameRight = next.permutation.getState("mr:right") === currentBlock.permutation.getState("mr:right");
					const sameSide = next.permutation.getState("mr:side") === currentBlock.permutation.getState("mr:side");
					if (sameRight && sameSide) {
						updateBlockState(next);
						currentBlock = next;
					} else break;
				}
			}
		};
		dimension.playSound(open ? "close.fence_gate" : "open.fence_gate", block.center());
		updateBlockState(block);
		checkBlocksVertical(block);
		if (side) {
			const neighborBlock = block.offset( right ? rightBlockLocation[direction] : leftBlockLocation[direction] );
			if (neighborBlock.hasTag("mr:fence_gate")) {
				updateBlockState(neighborBlock);
				checkBlocksVertical(neighborBlock);
			}
		}
	}
	beforeOnPlayerPlace(e) {
		const direction = e.permutationToPlace.getState("minecraft:cardinal_direction");
		const leftBlock = e.block.offset(rightBlockLocation[direction]);
		e.permutationToPlace = e.permutationToPlace.withState("mr:right", leftBlock.hasTag("mr:fence_gate_left"));
	}
	onPlace(e) {
		const direction = e.block.permutation.getState("minecraft:cardinal_direction");
		updateGate(e.block, direction);
		updateNearestGate(e.block, direction);
	}
	onPlayerDestroy(e) {
		const direction = e.destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		updateNearestGate(e.block, direction);
	}
}
function updateGate(block, direction) {
	const rightBlock = block.offset(leftBlockLocation[direction]);
	const leftBlock = block.offset(rightBlockLocation[direction]);
	const rightState = block.permutation.getState("mr:right");
	const sideState = block.permutation.getState("mr:side");
	block.setPermutation(block.permutation
		.withState("mr:side", (!rightState && rightBlock.hasTag("mr:fence_gate_right")) || (rightState && leftBlock.hasTag("mr:fence_gate_left")))
	);
}
function updateNearestGate(block, direction) {
	const rightBlock = block.offset(leftBlockLocation[direction]);
	const leftBlock = block.offset(rightBlockLocation[direction]);
	if (rightBlock.hasTag("mr:fence_gate")) updateGate(rightBlock, rightBlock.permutation.getState("minecraft:cardinal_direction"));
	if (leftBlock.hasTag("mr:fence_gate")) updateGate(leftBlock, leftBlock.permutation.getState("minecraft:cardinal_direction"));
}