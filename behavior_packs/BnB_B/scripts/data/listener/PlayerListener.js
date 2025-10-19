import { EntityEquippableComponent, EntityInventoryComponent, EquipmentSlot, Player, system, world } from "@minecraft/server";
import { Toast } from "../../util/toast/Toast";
const grizzlyToast = new Toast("grizzly-toast")
    .setText({ translate: "toast.biomes_beyond.grizzly_bear.name"
})
    .setIcon("bear00");
world.afterEvents.entityDie.subscribe((event) => {
    const { deadEntity: entity, damageSource: { damagingEntity: damager } } = event;
    if (entity.typeId != "wypnt_bab:grizzly_bear" || !(damager instanceof Player) || !grizzlyToast.isEnabled(damager)) {
        return;
    }
    grizzlyToast.send(damager);
    grizzlyToast.disable(damager);
});


const lurkerToast = new Toast("lurker-toast")
    .setText({ translate: "toast.biomes_beyond.lurker.name"})
    .setIcon("lurker");

world.afterEvents.entityDie.subscribe((event) => {
    const { deadEntity: entity, damageSource: { damagingEntity: damager } } = event;
    if (entity.typeId != "wypnt_bab:lurker" || !(damager instanceof Player) || !lurkerToast.isEnabled(damager)) {
        return;
    }
    lurkerToast.send(damager);
    lurkerToast.disable(damager);
});





const crocmeatToast = new Toast("crocmeat-toast")
    .setText({ translate: "toast.biomes_beyond.croc.name"})
    .setIcon("croc00");
world.afterEvents.itemCompleteUse.subscribe((event) => {
    const { itemStack, source } = event;
    const food = itemStack.getTags()?.includes("minecraft:is_food");
    if (!food || !(source instanceof Player)) {
        return;
    }
    if (itemStack.typeId != "wypnt_bab:crocodile_meat_cooked" || !crocmeatToast.isEnabled(source)) {
        return;
    }
    crocmeatToast.send(source);
    crocmeatToast.disable(source);
});



const leatherArmorToast = new Toast("leather-armor")
    .setText({ translate: "toast.biomes_beyond.leather.name"})
    .setIcon("helmet");
system.runInterval(() => {
    system.runJob(scanArmor());
    system.runJob(scanInventory());
}, 10);
const ArmorSlots = [
    EquipmentSlot.Head,
    EquipmentSlot.Chest,
    EquipmentSlot.Legs,
    EquipmentSlot.Feet
];
const LeatherArmor = [
    "wypnt_bab:placeholder_helmet",
    "wypnt_bab:placeholder_chestplate",
    "wypnt_bab:placeholder_leggings",
    "wypnt_bab:placeholder_boots",
];
function* scanArmor() {
    for (const player of world.getAllPlayers()) {
        if (!leatherArmorToast.isEnabled(player)) {
            continue;
        }
        const equippable = player.getComponent(EntityEquippableComponent.componentId);
        let pieces = 0;
        for (let slot of ArmorSlots) {
            const itemStack = equippable.getEquipment(slot);
            if (LeatherArmor.includes(itemStack?.typeId)) {
                pieces++;
            }
            yield;
        }
        if (pieces >= 4) {
            leatherArmorToast.send(player);
            leatherArmorToast.disable(player);
        }
        yield;
    }
}




const trackedItems = new Map(); // Stores players' previous inventory state

function* scanInventory() {
    const itemToToastMap = {
        "wypnt_bab:glass_jar_firefly_item": new Toast("jar-collected")
            .setText({ translate: "toast.biomes_beyond.jar.name"})
            .setIcon("firfly"),
        "wypnt_bab:tungsten_ingot": new Toast("tungsten-collected")
            .setText({ translate: "toast.biomes_beyond.tungsten.name"})
            .setIcon("tungst")
        // Add more items here...
    };

    for (const player of world.getAllPlayers()) {
        const inventory = player.getComponent(EntityInventoryComponent.componentId);
        const container = inventory.container;
        const playerId = player.id; // Use player ID to track inventory

        let previousItems = trackedItems.get(playerId) || new Set();
        let currentItems = new Set();

        // Scan current inventory and store found items
        for (let i = 0; i < 36; i++) {
            const itemStack = container.getItem(i);
            if (itemStack?.typeId) {
                currentItems.add(itemStack.typeId);
            }
            yield;
        }

        // Check if the player picked up a tracked item
        for (const itemId of currentItems) {
            if (!previousItems.has(itemId) && itemToToastMap[itemId]) {
                const toast = itemToToastMap[itemId];
                if (toast.isEnabled(player)) {
                    toast.send(player);
                    toast.disable(player);
                }
            }
        }

        // Update tracked inventory state
        trackedItems.set(playerId, currentItems);
        yield;
    }
}




const throwableBolaToast = new Toast("throwable-bola")
    .setText({ translate: "toast.biomes_beyond.bola.name"})
    .setIcon("wind00");
world.afterEvents.itemUse.subscribe((event) => {
    const { itemStack, source } = event;
    if (itemStack?.typeId != "wypnt_bab:bolas" || !throwableBolaToast.isEnabled(source)) {
        return;
    }
    throwableBolaToast.send(source);
    throwableBolaToast.disable(source);
});
//# sourceMappingURL=PlayerListener.js.map
