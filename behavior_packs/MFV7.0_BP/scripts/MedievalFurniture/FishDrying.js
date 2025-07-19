import { ItemStack } from '@minecraft/server';
import { getArea, SelectionBoxes } from './SelectionBox';
import { addItemOrSpawn, decrementItemInHand } from '../util/utils';
import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';

export class MfFishDrying {
	constructor () {
		this.directionState = "minecraft:cardinal_direction";
		this.boxes = {
			x: new SelectionBoxes(
				{ origin: [-8, 0, -8], size: [8, 16, 16], name: "medieval:fish_left" },
				{ origin: [0, 0, -8], size: [8, 16, 16], name: "medieval:fish_right" }
			),
			z: new SelectionBoxes(
				{ origin: [-8, 0, -8], size: [16, 16, 8], name: "medieval:fish_left" },
				{ origin: [-8, 0, 0], size: [16, 16, 8], name: "medieval:fish_right" }
			)
		}
		this.allowedItems = ['minecraft:salmon', 'minecraft:cod'];
		this.onPlace = this.onPlace.bind(this);
		this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
		this.onPlayerInteract = this.onPlayerInteract.bind(this);
	}
	onPlayerInteract(e) {
		const { player, block, faceLocation, dimension } = e;

		const relativeFaceLocation = {
			x: faceLocation.x - block.x,
			y: faceLocation.y - block.y,
			z: faceLocation.z - block.z,
		};
		const area = getArea(block, relativeFaceLocation, this.boxes);
		if (!area) return;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const value = this.allowedItems.indexOf(item?.typeId);
		const areaState = block.permutation.getState(area);
		if (value >= 0 && areaState === 0) {
			block.setPermutation(block.permutation.withState(area, value + 1));
			decrementItemInHand(player);
			dimension.playSound("block.itemframe.add_item", block.center());
		} else if (areaState > 0) {
			block.setPermutation(block.permutation.withState(area, 0));
			addItemOrSpawn(player, new ItemStack(this.allowedItems[areaState - 1], 1));
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
	}
	updateBlock(block, direction, blockType) {
		if (!block) return;
		const rightBlock = block.offset(leftBlockLocation[direction]);
		const leftBlock = block.offset(rightBlockLocation[direction]);
		const rightMatch = rightBlock.matches(blockType, { "minecraft:cardinal_direction": direction });
		const leftMatch = leftBlock.matches(blockType, { "minecraft:cardinal_direction": direction });
		block.setPermutation(block.permutation.withState("medieval:side", (rightMatch ? leftMatch ? 4 : 3 : leftMatch ? 2 : 1)));
	}
	updateNearestBlocks(block, direction, blockType) {
		const rightBlock = block.offset(leftBlockLocation[direction]);
		const leftBlock = block.offset(rightBlockLocation[direction]);
		if (rightBlock.matches(blockType, { "minecraft:cardinal_direction": direction })) this.updateBlock(rightBlock, rightBlock.permutation.getState(this.directionState), blockType);
		if (leftBlock.matches(blockType, { "minecraft:cardinal_direction": direction })) this.updateBlock(leftBlock, leftBlock.permutation.getState(this.directionState), blockType);
	}
	onPlace(e) {
		const direction = e.block.permutation.getState(this.directionState);
		this.updateBlock(e.block, direction, e.block.typeId);
		this.updateNearestBlocks(e.block, direction, e.block.typeId);
	}
	onPlayerDestroy(e) {
		const { destroyedBlockPermutation, dimension, block } = e;
		const direction = destroyedBlockPermutation.getState(this.directionState);
		this.updateNearestBlocks(block, direction, destroyedBlockPermutation.type.id);
		const left = destroyedBlockPermutation.getState("medieval:fish_left");
		const right = destroyedBlockPermutation.getState("medieval:fish_right");
		if (left > 0) dimension.spawnItem(new ItemStack(this.allowedItems[left - 1]), block.center());
		if (right > 0) dimension.spawnItem(new ItemStack(this.allowedItems[right - 1]), block.center())
	}
}