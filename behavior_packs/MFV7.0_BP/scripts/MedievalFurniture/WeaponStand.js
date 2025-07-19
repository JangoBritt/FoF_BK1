import { BlockPermutation } from '@minecraft/server';
import { getArea, SelectionBoxes } from './SelectionBox';
import { spawnEntityRotatedByBlock } from '../util/utils';
import { rightBlockLocation, airBlocks } from '../util/globalVariables';

const normalAreas = {
	x: new SelectionBoxes(
		{ origin: [-2.5, 0, -8], size: [10.5, 16, 13], name: "9" },
		{ origin: [-8, 0, -8], size: [5.5, 16, 13], name: "10" }
	),
	z: new SelectionBoxes(
		{ origin: [-8, 0, -2.5], size: [13, 16, 10.5], name: "9" },
		{ origin: [-8, 0, -8], size: [13, 16, 5.5], name: "10" }
	)
}
const sideAreas = {
	x: new SelectionBoxes(
		{ origin: [2.5, 0, -8], size: [5.5, 16, 13], name: "10" },
		{ origin: [-8, 0, -8], size: [10.5, 16, 13], name: "11" }
	),
	z: new SelectionBoxes(
		{ origin: [-8, 0, 2.5], size: [13, 16, 5.5], name: "10" },
		{ origin: [-8, 0, -8], size: [13, 16, 10.5], name: "11" }
	)
}
const weaponStandItems = [
	"minecraft:trident",
	"minecraft:shield",
	"minecraft:bow",
	"minecraft:crossbow",
	"minecraft:fishing_rod",
	"minecraft:carrot_on_a_stick",
	"minecraft:warped_fungus_on_a_stick"
]
export class MfWeaponStandInteract {
	onPlayerInteract(e) {
		const { player, block, faceLocation, dimension } = e;
		const relativeFaceLocation = {
			x: faceLocation.x - block.x,
			y: faceLocation.y - block.y,
			z: faceLocation.z - block.z,
		};
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const area = getArea(block, relativeFaceLocation, block.hasTag("mf:weapon_stand_side") ? sideAreas : normalAreas);
		if (!area) return;
		const stand = dimension.getEntitiesAtBlockLocation(block.location).find((e) => e.typeId === "medieval:weapon_stand_ev2");
		if (!stand) return;
		const playerInv = player.getComponent("inventory").container;
		const item = playerInv.getItem(player.selectedSlotIndex);
		if (item && !(item.hasTag("minecraft:is_tool") || weaponStandItems.includes(item.typeId))) return;
		let weapon2 = dimension.getEntitiesAtBlockLocation(block.location).find((e) => e.typeId === "medieval:weapon_right");
		if (item) dimension.playSound("block.itemframe.add_item", block.center());
		if (area === "11") {
			if (item) {
				if (!weapon2) weapon2 = spawnEntityRotatedByBlock("medieval:weapon_right", block, direction, { x: 0.5 });
				weapon2.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${item.typeId}`);
			} else if (weapon2) {
				weapon2.remove();
			}
		} else stand.runCommand(`replaceitem entity @s slot.weapon.${area === "9" ? "mainhand" : "offhand"} 0 ${item ? item.typeId : "air"}`);
		playerInv.swapItems(player.selectedSlotIndex, Number(area), stand.getComponent("inventory").container);
	}
}
export class MfWeaponStand {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		if (airBlocks.includes(rightBlock.typeId)) {
			rightBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_side`, { "minecraft:cardinal_direction": direction }));
			const stand = spawnEntityRotatedByBlock("medieval:weapon_stand_ev2", block, direction, { x: -0.5 });
			stand.addEffect("invisibility", 10, { showParticles: false });
			stand.nameTag = "med_fur.ui.weapon_stand"
			e.permutationToPlace = permutationToPlace.withState("mf:placed", true);
		} else e.cancel = true;
	}
}