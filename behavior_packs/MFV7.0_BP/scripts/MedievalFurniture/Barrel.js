import { world } from "@minecraft/server";

export function playerPlaceBarrel() {
	world.afterEvents.playerPlaceBlock.subscribe((e) => {
		const { player, block, dimension } = e;
		const container = dimension.spawnEntity("medieval:barrel_cont", { x: block.x + 0.5, y: block.y, z: block.z + 0.5 } );
		const { x, z } = player.getViewDirection();
		let yRotation;
		container.nameTag = "ui.title.barrel";
		container.addEffect("invisibility", 10, { showParticles: false });
		if (Math.abs(x) > Math.abs(z)) yRotation = x > 0 ? -90 : 90; 
		else yRotation = z > 0 ? 0 : 180;
		container.setRotation({x: 0, y: yRotation});
	}, {
		blockTypes: [ "medieval:acacia_barrel", "medieval:birch_barrel", "medieval:cherry_barrel", "medieval:crimson_barrel", "medieval:darkoak_barrel", "medieval:jungle_barrel", "medieval:mangrove_barrel", "medieval:oak_barrel", "medieval:pale_oak_barrel", "medieval:spruce_barrel", "medieval:warped_barrel" ]
	});
}
const allowedItems = [
	'minecraft:apple','minecraft:beetroot','minecraft:carrot','minecraft:potato',
	'minecraft:wheat','minecraft:bamboo','minecraft:cod','minecraft:salmon',
	'minecraft:golden_apple','minecraft:golden_carrot','minecraft:water_bucket','minecraft:arrow',
	'minecraft:diamond','minecraft:emerald','minecraft:iron_ingot','minecraft:gold_ingot',
	'minecraft:copper_ingot'
];
export class MfBarrel {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const container = dimension.getEntitiesAtBlockLocation(block.location).find((e) => e.typeId === "medieval:barrel_cont");
		if (!container) return;
		if (item && allowedItems.includes(item.typeId)) {
			const i = allowedItems.indexOf(item.typeId) + 1;
			if (container.getProperty("mf:item") === i) return;
			container.setProperty("mf:item", i);
			dimension.playSound("block.itemframe.add_item", block.center());
		} else if (container.getProperty("mf:item") > 0 && player.isSneaking) {
			container.triggerEvent("mf:remove_item");
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
	}
}