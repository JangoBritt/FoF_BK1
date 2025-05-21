import { ItemStack, world } from '@minecraft/server';
import { ModalFormData } from "@minecraft/server-ui";
import { toggleBlockState } from '../util/utils';

const blockDataMap = new Map([
	["mr:is_bedside_cabinet", { nameTag: "MrCrayFish.bedside_cabinet", inventoryEvent: "mr:inventory_27", openSound: "mr.bedside_cabinet_open", closeSound: "mr.bedside_cabinet_close" }],
	["mr:is_cabinet", { nameTag: "MrCrayFish.cabinet", inventoryEvent: "mr:inventory_27", openSound: "mr.cabinet_open", closeSound: "mr.cabinet_close" }],
	["mr:is_crate", { nameTag: "MrCrayFish.crate", inventoryEvent: "mr:inventory_27", openSound: "mr.cabinet_open", closeSound: "mr.cabinet_close" }],
	["mr:is_drawer", { nameTag: "MrCrayFish.drawer", inventoryEvent: "mr:inventory_27", openSound: "mr.bedside_cabinet_open", closeSound: "mr.bedside_cabinet_close" }],
	["mr:is_cooler", { nameTag: "MrCrayFish.cooler", inventoryEvent: "mr:inventory_27", openSound: "mr.cabinet_open", closeSound: "mr.cabinet_close", adjustY: -0.2 }],
	["mr:is_desk_cabinet", { nameTag: "MrCrayFish.desk_cabinet", inventoryEvent: "mr:inventory_27", openSound: "mr.bedside_cabinet_open", closeSound: "mr.bedside_cabinet_close" }]
]);
export class MrPlaceContainer {
	onPlayerInteract(e) {
		const { block } = e;
		for (const [tag, data] of blockDataMap) {
			if (block.hasTag(tag)) {
				toggleBlockState(e, "mr:close", data.closeSound, data.openSound);
				break;
			}
		}
	}
	onPlace(e) {
		const { block, dimension } = e;
		const container = dimension.spawnEntity("mr:container_mr", block.center());
		for (const [tag, data] of blockDataMap) {
			if (block.hasTag(tag)) {
				if (data.adjustY) container.teleport({ x: block.center().x, y: block.center().y + data.adjustY, z: block.center().z });
				container.nameTag = data.nameTag;
				container.triggerEvent(data.inventoryEvent);
				break;
			}
		}
	}
}
export class MrPostBox {
	onPlace(e) {
		const { block, dimension } = e;
		const postBox = dimension.spawnEntity("mr:post_box", block.center());
		postBox.nameTag = "MrCrayFish.post_box";
	}
	onPlayerInteract(e) {
		const { player, dimension, block } = e;
		const postBox = dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "mr:post_box");
		if (!postBox) return;
		const postBoxInventory = postBox.getComponent("inventory").container;
		if (postBoxInventory.emptySlotsCount === postBoxInventory.size) {
			return player.sendMessage({ translate: "mcf.postbox.error.no_items_to_send" });
		}
		const globalMailboxes = dimension.getEntities({ type: "mr:mailbox", propertyOptions: [{ propertyId: "mr:is_global", value: true }] });
		if (!globalMailboxes.length) {
			return player.sendMessage({ translate: "mcf.postbox.error.no_registered_mailboxes" });
		}
		new ModalFormData()
		.title({ translate: "mcf.postbox.ui.send_items_title" })
		.dropdown({ translate: "mcf.postbox.ui.select_mailbox_label" }, globalMailboxes.map(mailbox => mailbox.nameTag.slice(20)), 0)
		.show(player).then(r => {
			if (r.canceled) return;
			const targetMailbox = globalMailboxes[r.formValues[0]];
			const targetInventory = targetMailbox.getComponent("inventory").container;
			if (!targetInventory.emptySlotsCount) {
				return player.sendMessage({ translate: "mcf.postbox.error.target_mailbox_full" });
			}
			const transferred = [...Array(postBoxInventory.size).keys()].filter(i => postBoxInventory.getItem(i)).some(i => postBoxInventory.transferItem(i, targetInventory));
			player.sendMessage(transferred ? { translate: "mcf.postbox.warning.partial_transfer" } : { translate: "mcf.postbox.success.items_transferred" });
		});
	}	
}
export function playerPlaceMailbox() {
	world.afterEvents.playerPlaceBlock.subscribe((e) => {
		const { player, block, dimension } = e;
		const container = dimension.spawnEntity("mr:mailbox", block.center());
		container.nameTag = `MrCrayFish.mail_box.${player.name}`;
		container.triggerEvent("mr:default_container");
		container.setDynamicProperty("mr:mailbox_data", JSON.stringify({ owner: "", isGlobal: true, ownerOnly: false, locked: false }));
		player.onScreenDisplay.setActionBar({ translate: "mcf.mailbox.ui.alert_interact_to_register" });
	}, {
		blockTypes: [ "mr:stripped_acacia_mail_mr", "mr:wood_acacia_mail_mr", "mr:stripped_birch_mail_mr", "mr:wood_birch_mail_mr", "mr:stripped_cherry_mail_mr", "mr:wood_cherry_mail_mr", "mr:stripped_crimson_mail_mr", "mr:wood_crimson_mail_mr", "mr:stripped_darkoak_mail_mr", "mr:wood_darkoak_mail_mr", "mr:stripped_jungle_mail_mr", "mr:wood_jungle_mail_mr", "mr:stripped_mangrove_mail_mr", "mr:wood_mangrove_mail_mr", "mr:stripped_oak_mail_mr", "mr:wood_oak_mail_mr", "mr:stripped_pale_oak_mail_mr", "mr:wood_pale_oak_mail_mr", "mr:stripped_spruce_mail_mr", "mr:wood_spruce_mail_mr", "mr:stripped_warped_mail_mr", "mr:wood_warped_mail_mr" ]
	});
}
export class MrMailBox {
	onPlayerInteract(e) {
		const { player, dimension, block } = e;
		const mailbox = dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "mr:mailbox");
		if (!mailbox) return;
		const mailboxProperties = mailbox.getDynamicProperty("mr:mailbox_data");
		if (!mailboxProperties) return;
		const mailboxObj = JSON.parse(mailboxProperties);
		if (mailboxObj.locked) {
			return dimension.playSound("block.sign.waxed_interact_fail", block.center());
		}
		if (mailboxObj.ownerOnly && mailboxObj.owner !== player.name) return;
		new ModalFormData()
		.title({ translate: "mcf.mailbox.ui.register_form_title" })
		.textField({ translate: "mcf.mailbox.ui.name_field_label" }, { translate: "mcf.mailbox.ui.name_field_placeholder" }, mailbox.nameTag.slice(20))
		.toggle({ translate: "mcf.mailbox.ui.global_toggle_label", with: [ '\n' ] }, mailboxObj.isGlobal)
		.toggle({ translate: "mcf.mailbox.ui.owner_only_toggle_label", with: [ '\n' ] }, mailboxObj.ownerOnly)
		.toggle({ translate: "mcf.mailbox.ui.lock_toggle_label", with: [ '\n' ] }, mailboxObj.locked)
		.show(player).then(r => {
			if (r.canceled) return;
			const [mailboxName, isGlobal, ownerOnly, locked] = r.formValues;
			const finalName = (mailboxName.replace(/[<>"'`]/g, '').slice(0, 25) || player.name) + (mailboxName.length > 25 ? '...' : '');
			if (isGlobal && dimension.getEntities({ 
				type: "mr:mailbox", 
				minDistance: 1, 
				location: block.location,
				propertyOptions: [{ propertyId: "mr:is_global", value: true }] 
			}).some(m => m.nameTag === `MrCrayFish.mail_box.${finalName}`)) {
				return player.sendMessage({ translate: "mcf.mailbox.error.already_registered" });
			}
			mailbox.setDynamicProperty("mr:mailbox_data", JSON.stringify({ owner: player.name, isGlobal, ownerOnly, locked }));
			mailbox.nameTag = `MrCrayFish.mail_box.${finalName}`;
			if (ownerOnly) {
				mailbox.getComponent("tameable").tame(player);
				mailbox.triggerEvent("minecraft:on_tame");
			} else mailbox.triggerEvent("mr:default_container");
			mailbox.triggerEvent(isGlobal ? "mr:register_mailbox" : "mr:unregister_mailbox");
			player.sendMessage({ translate: "mcf.mailbox.success.registration_complete", with: [ finalName ] });
		})
	}
}
export class MrFridge {
	onPlace(e) {
		const { block, dimension } = e;
		const parts = block.permutation.getState("mc:block_parts");
		if (parts === 0) {
			const container = dimension.spawnEntity("mr:container_mr", {x: block.x + 0.5, y: block.y + 0.9, z: block.z + 0.5}); //Fables
			//const container = dimension.spawnEntity("mr:container_mr", block.center());
			container.nameTag = "MrCrayFish.fridge";

			//container.triggerEvent("mr:inventory_27"); //MrCrayFish
			container.triggerEvent("mr:inventory_54"); //Fables
		}
		if (parts === 1) {
			
			const freezer = dimension.spawnEntity("mr:freezer", block.center());
			freezer.nameTag = "MrCrayFish.freezer";
			freezer.triggerEvent("mr:freezer");
			const freezerInventory = freezer.getComponent("inventory").container;
			freezerInventory.setItem(3, new ItemStack("mr:freeze_0", 1));
			freezerInventory.setItem(4, new ItemStack("mr:arrow_0", 1));
		}
	}
	onPlayerInteract(e) {
		toggleBlockState(e, "mr:close", "mr.fridge_close", "mr.fridge_open");
	}
}