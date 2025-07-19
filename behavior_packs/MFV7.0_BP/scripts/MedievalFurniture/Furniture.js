import { BlockPermutation } from '@minecraft/server';
import { decrementItemInHand, extractColor, sitOn, toggleBlockState } from '../util/utils';

const allowedDyes = ["minecraft:black_dye","minecraft:blue_dye","minecraft:brown_dye","minecraft:cyan_dye","minecraft:gray_dye","minecraft:green_dye","minecraft:light_blue_dye","minecraft:light_gray_dye","minecraft:lime_dye","minecraft:magenta_dye","minecraft:orange_dye","minecraft:pink_dye","minecraft:purple_dye","minecraft:red_dye","minecraft:white_dye","minecraft:yellow_dye"];

export class MfToggleFurnitureBlock {
	onPlayerInteract(e) {
		toggleBlockState(e, "medieval:close", "block.barrel.close", "block.barrel.open");
	}
}
export class MfBasicContainer {
	onPlace(e) {
		const { block, dimension } = e;
		dimension.spawnEntity("medieval:drawer_container", block.center());
	}
}
export class MfDefaultSitOnChair {
	onPlayerInteract(e) {
		sitOn(e.block, e.player, "medieval:sit_bench", { y: -0.1 });
	}
}
export class MfSitOnChair {
	onPlayerInteract(e) {
		const { block, player, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		if (!item || !allowedDyes.includes(item.typeId)) {
			sitOn(block, player, "medieval:sit_bench", { y: -0.1 });
			return;
		}
		const blockColor = extractColor(block.typeId)
		const itemColor = extractColor(item.typeId);
		if (blockColor !== itemColor) {
			const dir = block.permutation.getState("minecraft:cardinal_direction");
			block.setPermutation(BlockPermutation.resolve(block.typeId.replace(blockColor, itemColor), { "minecraft:cardinal_direction": dir }));
			dimension.playSound("copper.wax.on", block.center());
			decrementItemInHand(player);
		}
	}
}
const parts = [ "chair0", "chair1", "chair2", "bench" ];
export class MfWoodenChair {
	onPlayerInteract(e) {
		const { block, player, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		if (item?.typeId === "medieval:handsaw") {
			const blockId = block.typeId;
			const currentPart = parts.find(part => blockId.includes(part));
			const currentIndex = parts.indexOf(currentPart);
			const nextIndex = (currentIndex + 1) % parts.length;
			const nextPart = parts[nextIndex];
			dimension.playSound("block.itemframe.add_item", block.center());
			block.setPermutation(BlockPermutation.resolve(blockId.replace(currentPart, nextPart), block.permutation.getAllStates() ));
		} else sitOn(block, player, "medieval:sit_bench", { y: -0.1 });
	}
}