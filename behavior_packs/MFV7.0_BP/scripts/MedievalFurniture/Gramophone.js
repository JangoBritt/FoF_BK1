import { decrementItemInHand, spawnEntityRotatedByBlock } from '../util/utils';

export class MfGramophone {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const allowedItems = ["minecraft:music_disc_11", "minecraft:music_disc_13", "minecraft:music_disc_blocks", "minecraft:music_disc_cat", "minecraft:music_disc_chirp", "minecraft:music_disc_far", "minecraft:music_disc_mall", "minecraft:music_disc_mellohi", "minecraft:music_disc_otherside", "minecraft:music_disc_pigstep", "minecraft:music_disc_stal", "minecraft:music_disc_strad", "minecraft:music_disc_wait", "minecraft:music_disc_ward", "minecraft:music_disc_5", "minecraft:music_disc_relic", "minecraft:music_disc_creator", "minecraft:music_disc_creator_music_box", "minecraft:music_disc_precipice", "minecraft:music_disc_tears", "minecraft:music_disc_lava_chicken"];
		const discTest = dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "medieval:disc_music");
		if (!discTest && allowedItems.includes(item?.typeId)) {
			const disc = spawnEntityRotatedByBlock("medieval:disc_music", block, direction);
			disc.triggerEvent(item.typeId);
			decrementItemInHand(player, true);
		} else if (discTest) {
			discTest.triggerEvent("mf:despawn");
		}
	}
}