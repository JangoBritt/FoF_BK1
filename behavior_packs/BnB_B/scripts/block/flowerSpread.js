import { world, system, EquipmentSlot, EntityEquippableComponent, GameMode } from '@minecraft/server';

// List of flower types with _top and _bottom blocks
const flowerTypes = {
    "wypnt_bab:daisy_petals": { name: "daisy_petals", spread: true, double: false },
    "wypnt_bab:bluebell": { name: "bluebell", spread: true, double: false },
    "wypnt_bab:violet_flower": { name: "violet_flower", spread: true, double: false },
    "wypnt_bab:bunchflower": { name: "bunchflower", spread: true, double: false },
    "wypnt_bab:lavender_flower": { name: "lavender_flower", spread: true, double: false },
    "wypnt_bab:coralroot": { name: "coralroot", spread: true, double: false },
    "wypnt_bab:lazarus": { name: "lazarus", spread: true, double: false },
    "wypnt_bab:lazarus_white": { name: "lazarus_white", spread: true, double: false },    
    "wypnt_bab:reeds": { name: "reeds", spread: true, double: false },
    "wypnt_bab:void_blossom": { name: "void_blossom", spread: false, double: false },
    "wypnt_bab:puffshroom": { name: "puffshroom", spread: false, double: false },
    "wypnt_bab:mullein": { name: "mullein", spread: false, double: true },
    "wypnt_bab:cattail": { name: "cattail", spread: false, double: true },
    "wypnt_bab:jungfern": { name: "jungfern", spread: false, double: true },
    "wypnt_bab:void_blossom_bush": { name: "void_blossom_bush", spread: false, double: true },
};
system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent("wypnt_bab:flowerSpread", {
        onPlayerInteract: ({ dimension, block, player }) => {
            const eq = player.getComponent("minecraft:equippable");
            const item = eq.getEquipment("Mainhand");
            if (!item || item?.typeId !== "minecraft:bone_meal") return;
            const path = flowerTypes[block.typeId];
            system.run(() => {
                if (!path?.spread && path.double) {
                    const lootTable = `"coreblockstudios/biomesandbeyond/blocks/${path.name}"`;
                    dimension.runCommand(`loot spawn ${block.x} ${block.y} ${block.z} loot ${lootTable}`);
                    dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
                }
                else if (path.spread) {
                    try { dimension.placeFeature(`wypnt_bab:scatter_${path.name}_feature`, block.center(), true); } catch(err) { return; };
                    dimension.spawnParticle("minecraft:crop_growth_area_emitter", block.center());
                };
                
                dimension.playSound("item.bone_meal.use", block.center());
                if (player.getGameMode() === "Creative") return;
                item.amount <= 1 ? item = undefined : item.amount--;
                eq.setEquipment("Mainhand", item)
            });
        }
    });
});