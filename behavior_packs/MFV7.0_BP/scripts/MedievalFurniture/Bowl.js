import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand } from '../util/utils';

const foodItems = [
	"minecraft:cooked_beef",
	"minecraft:cooked_mutton",
	"minecraft:cooked_porkchop",
	"minecraft:cooked_cod",
	"minecraft:cooked_salmon",
	"minecraft:apple",
	"minecraft:golden_apple",
	"minecraft:bread",
	"minecraft:cookie",
	"minecraft:carrot",
	"minecraft:golden_carrot",
	"minecraft:melon_slice",
	"minecraft:glistering_melon_slice",
	"minecraft:cooked_chicken",
	"minecraft:cooked_rabbit",
	"minecraft:rabbit_stew",
	"minecraft:beetroot_soup",
	"minecraft:baked_potato",
	"minecraft:pumpkin_pie",
	"minecraft:beetroot",
	"minecraft:mushroom_stew"
];

const restrictOneItem = new Set([
	'minecraft:rabbit_stew',
	'minecraft:beetroot_soup',
	'minecraft:mushroom_stew'
]);

export class MfBowl {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const permutation = block.permutation;
		const quantity = permutation.getState("medieval:quantity");
		const foodStatus = permutation.getState("medieval:status");
		const foodType = permutation.getState("medieval:type");
		const itemType = item?.typeId;
		const isValidItem = itemType ? foodItems.includes(itemType) : false;
		if (isValidItem) {
			const itemIndex = foodItems.indexOf(itemType);
			const newType = itemIndex >= 15 ? 1 : 0;
			const newStatus = itemIndex >= 15 ? itemIndex - 14 : itemIndex + 1;
			if (foodStatus === 0) {
				block.setPermutation(permutation.withState("medieval:status", newStatus).withState("medieval:type", newType));
				dimension.playSound("block.itemframe.add_item", block.center());
				decrementItemInHand(player);
				return;
			}
			const currentIndex = foodType === 1 ? foodStatus + 14 : foodStatus - 1;
			if (currentIndex === itemIndex && quantity < 4 && !restrictOneItem.has(itemType)) {
				block.setPermutation(permutation.withState("medieval:quantity", quantity + 1));
				dimension.playSound("block.itemframe.add_item", block.center());
				decrementItemInHand(player);
				return;
			}
		}
		if (foodStatus > 0) {
			const currentIndex = foodType === 1 ? foodStatus + 14 : foodStatus - 1;
			const currentItem = foodItems[currentIndex];
			const newQuantity = quantity - 1;
			if (newQuantity >= 1) block.setPermutation(permutation.withState("medieval:quantity", newQuantity));
			else block.setPermutation(permutation.withState("medieval:status", 0).withState("medieval:type", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
			addItemOrSpawn(player, new ItemStack(currentItem, 1));
		}
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const quantity = destroyedBlockPermutation.getState("medieval:quantity");
		const foodStatus = destroyedBlockPermutation.getState("medieval:status");
		const foodType = destroyedBlockPermutation.getState("medieval:type");
		if (foodStatus > 0) {
			const itemIndex = foodType === 1 ? (foodStatus - 1) + 15 : foodStatus - 1;
			if (itemIndex >= 0 && itemIndex < foodItems.length) {
				const itemType = foodItems[itemIndex];
				block.dimension.spawnItem(new ItemStack(itemType, quantity), block.center());
			}
		}
	}
}