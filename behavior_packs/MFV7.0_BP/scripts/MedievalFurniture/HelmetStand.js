import { ModalFormData } from '@minecraft/server-ui'
import { spawnEntityRotatedByBlock } from '../util/utils'

export class MfHelmetStand {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const stand = dimension.getEntitiesAtBlockLocation(block.location).find((e) => e.matches({ families: [ "medieval_helmet_stand" ] }));
		if (!stand) return;
		if (!player.isSneaking) {
			const playerInv = player.getComponent("inventory").container;
			const item = playerInv.getItem(player.selectedSlotIndex);
			stand.runCommand(`replaceitem entity @s slot.armor.head 0 ${item ? item.typeId : "air"}`);
			dimension.playSound("armor.equip_generic", block.center());
			playerInv.swapItems(player.selectedSlotIndex, 0, stand.getComponent("inventory").container);
		} else if (!stand.getProperty("mf:lock_properties")) {
			new ModalFormData()
			.title({ translate: "mf.ui.settings.title" })
			.slider({ translate: "mf.ui.options.rotation", with: ["\n"] }, 0, 360, 1, stand.getProperty("mf:rotation"))
			.toggle({ translate: "mf.ui.options.auto_rotate", with: ["\n"] }, stand.getProperty("mf:def_anim"))
			.toggle({ translate: "mf.ui.options.lock_animations", with: [ "\n" ] }, stand.getProperty("mf:lock_properties"))
			.show(player).then((r) => {
				if (r.canceled) return;
				const [ rot, rotateAnim, lock ] = r.formValues;
				stand.setProperty("mf:rotation", rot);
				stand.setProperty("mf:def_anim", rotateAnim);
				stand.setProperty("mf:lock_properties", lock);
			})
		}
	}
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		spawnEntityRotatedByBlock("medieval:helmet_stand_entity", block, direction).triggerEvent(block.typeId);
	}
}