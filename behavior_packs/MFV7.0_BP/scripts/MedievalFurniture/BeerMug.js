import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, spawnEntityRotatedByBlock } from '../util/utils';

export class MfBeerMug {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const quantity = block.permutation.getState("medieval:quantity");
		const sneaking = player.isSneaking;
		if (sneaking && quantity > 0) {
			addItemOrSpawn(player, new ItemStack(block.typeId, 1));
			block.setPermutation(block.permutation.withState("medieval:quantity", quantity - 1));
			dimension.playSound("block.itemframe.remove_item", block.center());
			return;
		}
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const maxAmount = block.typeId === "medieval:wine_bottle" ? 2 : 3
		if (item?.typeId !== block.typeId || quantity >= maxAmount) return;
		block.setPermutation(block.permutation.withState("medieval:quantity", quantity + 1));
		decrementItemInHand(player);
		dimension.playSound("block.itemframe.add_item", block.center());
	}
}
function checkEntitiesInBlock(block, id) {
	return block.dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === id);
}
export class MfFillMug {
	onUseOn(e) {
		const { block, blockFace, source, usedOnBlockPermutation } = e;
		if (block.hasTag("mf:beer_barrel") && blockFace !== "Up") {
			if (checkEntitiesInBlock(block, "medieval:beer_mug")) return;
			const direction = usedOnBlockPermutation.getState("minecraft:cardinal_direction");
			block.dimension.playSound("block.itemframe.add_item", block.center());
			spawnEntityRotatedByBlock("medieval:beer_mug", block, direction);
			decrementItemInHand(source);
		}
	}
}