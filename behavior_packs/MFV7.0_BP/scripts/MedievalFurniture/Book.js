import { ItemStack } from "@minecraft/server";
import { addItemOrSpawn, decrementItemInHand } from "../util/utils";

export class MfBook {
	beforeOnPlayerPlace(e) {
		if (e.face === "Up" || e.face === "Down") return;
        e.permutationToPlace = e.permutationToPlace.withState("medieval:side", true);
	}
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const amount = block.permutation.getState("medieval:amount");
		if (item?.typeId === block.typeId && amount < 4) {
			block.setPermutation(block.permutation.withState("medieval:amount", amount + 1));
			decrementItemInHand(player);
			dimension.playSound("block.itemframe.add_item", block.center());
		} else if (amount > 0) {
			block.setPermutation(block.permutation.withState("medieval:amount",  amount - 1));
			addItemOrSpawn(player, new ItemStack(block.typeId, 1));
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
	}
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const amount = destroyedBlockPermutation.getState("medieval:amount");
		if (amount === 0) return;
		dimension.spawnItem(new ItemStack(destroyedBlockPermutation.type.id, amount), block.center());
	}
}