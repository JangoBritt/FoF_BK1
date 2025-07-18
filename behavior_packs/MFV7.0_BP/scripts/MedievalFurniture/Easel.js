import { spawnEntityRotatedByBlock } from '../util/utils';

export class MfEasel {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		let paint = dimension.getEntitiesAtBlockLocation(block.location).find((e)=> e.typeId === "medieval:painting");
		if (item?.typeId === "minecraft:painting") {
			if (!paint) spawnEntityRotatedByBlock("medieval:painting", block, block.permutation.getState("minecraft:cardinal_direction"));
			else paint.triggerEvent("mf:add_paint");
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		if (item?.typeId === "minecraft:shears" && paint) {
			dimension.playSound("mob.sheep.shear", block.center());
			paint.remove();
		}
	}
}