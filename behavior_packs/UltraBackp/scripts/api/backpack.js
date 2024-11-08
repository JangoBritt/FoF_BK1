import * as mc from "@minecraft/server";
import * as tools from "../toolsUtils.js";

// Variables
const BackpackTimeouts = {};

// Functions
function backpackSave(entity = mc.Entity.prototype) {
    entity.setProperty("sophisticated_backpack:in_block", false);
    mc.system.runTimeout(() => {
        BackpackTimeouts[entity.id] = false;
        const success = entity.runCommand(`structure save "sophisticated_backpack:${entity.getDynamicProperty("sophisticated_backpack:id")}" ~~~ ~~~ true disk false`);
        entity.remove();
    }, 1);
}

function backpackLoad(player = mc.Player.prototype, id, location, withEntity = false) {
    const success = player.runCommand(`structure load "sophisticated_backpack:${id}" ${location.x} ${location.y} ${location.z}`);
    if (withEntity) {
        const entity = player.dimension.getEntitiesAtBlockLocation(location).find((ent) => {
            if (ent.typeId === "sophisticated_backpack:backpack") {
                ent.setProperty("sophisticated_backpack:in_block", true);
                ent.teleport(location);
                return ent.typeId === "sophisticated_backpack:backpack";
            }
        });
        return entity;
    }
    return (success.successCount === 1);
}

function playerBackpackOpen(player = mc.Player.prototype, equipment = mc.ContainerSlot.prototype) {
    const item = equipment.getItem();
    const BackpackID = item.getLore()[0] ? item.getLore()[0].replace("§7Backpack ID: ", "") : "";

    if (player.getDynamicProperty("sophisticated_backpack:backpack_active") === undefined && !player.isSneaking) {
        if (BackpackID === "") {
            item.lockMode = mc.ItemLockMode.slot;
            const viewDirection = new tools.Vector3(player.getViewDirection()).mul(1.1, 1.1, 1.1);
            const locationStart = new tools.Vector3(0, -0.1, 0).add(player.getHeadLocation()).add(new tools.Vector3(0.1, 0, 0.1).mul(viewDirection));
            const backpack = player.dimension.spawnEntity("sophisticated_backpack:backpack", locationStart);
            backpack.nameTag = "sophisticated_backpack:backpack_default";
            backpack.setDynamicProperty("sophisticated_backpack:id", backpack.id);
            backpack.setDynamicProperty("sophisticated_backpack:owner", player.id);
            backpack.setDynamicProperty("sophisticated_backpack:type", item.typeId);
            item.setLore([`§7Backpack ID: ${backpack.id}`]);
            equipment.setItem(item);
            player.setDynamicProperty("sophisticated_backpack:backpack_active", backpack.id);
        } else {
            item.lockMode = mc.ItemLockMode.slot;
            const viewDirection = new tools.Vector3(player.getViewDirection()).mul(1.1, 1.1, 1.1);
            const locationStart = new tools.Vector3(0, -0.1, 0).add(player.getHeadLocation()).add(new tools.Vector3(0.1, 0, 0.1).mul(viewDirection));
            const success = backpackLoad(player, BackpackID, locationStart);
            if (success) {
                equipment.setItem(item);
                player.setDynamicProperty("sophisticated_backpack:backpack_active", BackpackID);
            } else {
                item.setLore([]);
                equipment.setItem(item);
            }
        }
    } else if (player.getDynamicProperty("sophisticated_backpack:backpack_active")) {
        const backpacks = player.dimension.getEntities({ type: "sophisticated_backpack:backpack" });
        backpacks.forEach((backpack) => {
            if (backpack.getDynamicProperty("sophisticated_backpack:id") === player.getDynamicProperty("sophisticated_backpack:backpack_active")) {
                if (!player.isSneaking) {
                    const viewDirection = new tools.Vector3(player.getViewDirection()).mul(1.1, 1.1, 1.1);
                    const locationStart = new tools.Vector3(0, -0.1, 0).add(player.getHeadLocation()).add(new tools.Vector3(0.1, 0, 0.1).mul(viewDirection));
                    backpack?.teleport(locationStart);
                    backpack.setDynamicProperty("sophisticated_backpack:type", item.typeId);
                } else {
                    item.lockMode = mc.ItemLockMode.none;
                    equipment.setItem(item);
                    player.setDynamicProperty("sophisticated_backpack:backpack_active", undefined);
                }
            }
        });
    }
}

// Events
mc.system.runInterval(() => {
    const players = mc.world.getAllPlayers();
    players.forEach(player => {
        const hand = player.getComponent("equippable").getEquipmentSlot("Mainhand");
        const backpacks = player.dimension.getEntities({ type: "sophisticated_backpack:backpack" });
        const isBackpack = (hand.hasItem() && hand.hasTag("sophisticated_backpack:is_backpack"));
        backpacks.forEach((backpack) => {
            if (backpack.getDynamicProperty("sophisticated_backpack:id") !== player.getDynamicProperty("sophisticated_backpack:backpack_active")) {
                if (!BackpackTimeouts[backpack.id]) {
                    BackpackTimeouts[backpack.id] = true;
                    mc.system.runTimeout(() => {
                        if (backpack.isValid() && backpack.getProperty("sophisticated_backpack:in_block") === false) {
                            backpackSave(backpack);
                        }
                    }, 1);
                }
            }
        });
        if (isBackpack) {
            playerBackpackOpen(player, hand);
        }
        if (!isBackpack || (isBackpack && player?.getDynamicProperty("sophisticated_backpack:backpack_active") !== hand?.getLore()[0]?.replace("§7Backpack ID: ", ""))) {
            const slots = Array(9).fill("slot");
            slots.forEach((_, index) => {
                const inventory = player?.getComponent("inventory").container;
                const slot = inventory?.getSlot(index);
                const item = slot?.getItem();
                if (slot?.hasItem() && item?.hasTag("sophisticated_backpack:is_backpack")) {
                    item.lockMode = "none";
                    slot.setItem(item);
                }
            });
            player?.setDynamicProperty("sophisticated_backpack:backpack_active", undefined);
        }
    });
}, 2);

mc.world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.hitEntity;
    const player = data.damagingEntity;
    if (entity.typeId === "sophisticated_backpack:backpack" && entity.getProperty("sophisticated_backpack:in_block")) {
        const itemBlock = new mc.ItemStack(entity.getDynamicProperty("sophisticated_backpack:type"));
        const location = entity.location;
        const dimension = entity.dimension;
        itemBlock.setLore([`§7Backpack ID: ${entity.getDynamicProperty("sophisticated_backpack:id")}`]);
        entity.runCommand(`setblock ~~~ air [] destroy`);
        mc.system.runTimeout(() => {
            dimension.spawnItem(itemBlock, location);
        }, 3);
    }
}, { "entityTypes": ["minecraft:player"] });

mc.world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {
    const event = data.eventId;
    const entity = data.entity;
    if (entity) {
        const inventory = entity.getComponent("inventory")?.container;
        if (event === "sophisticated_backpack:backpack_destroy") {
            backpackSave(entity);
        }
    }
}, { "entityTypes": ["sophisticated_backpack:backpack"] });

mc.world.afterEvents.entityDie.subscribe(data => {
    mc.world.getEntity(data.deadEntity.getDynamicProperty("sophisticated_backpack:owner")).setDynamicProperty("sophisticated_backpack:backpack_active", undefined);
    data.deadEntity.runCommand(`structure delete "sophisticated_backpack:${data.deadEntity.getDynamicProperty("sophisticated_backpack:id")}"`);
}, { "entityTypes": ["sophisticated_backpack:backpack"] });

mc.world.beforeEvents.itemUseOn.subscribe(data => {
    const item = data.itemStack;
    const player = data.source;
    if (item.hasTag("sophisticated_backpack:is_backpack") && item.getLore().length > 0 && !player.isSneaking) {
        data.cancel = true;
    } else if (item.hasTag("sophisticated_backpack:is_backpack") && item.getLore().length > 0 && player.isSneaking) {
        mc.system.run(() => {
            player.getComponent("equippable").setEquipment("Mainhand", item);
        });
    }
});

mc.world.afterEvents.playerPlaceBlock.subscribe(data => {
    const player = data.player;
    const item = player.getComponent("equippable").getEquipmentSlot("Mainhand");
    const block = data.block;
    if (item.hasItem() && item.hasTag("sophisticated_backpack:is_backpack")) {
        const BackpackID = item.getLore()[0] ? item.getLore()[0].replace("§7Backpack ID: ", "") : "";
        if (BackpackID) {
            const backpackEntity = backpackLoad(player, BackpackID, block.bottomCenter(), true);
            if (backpackEntity) {
                item.setItem();
            }
        }
    }
});
