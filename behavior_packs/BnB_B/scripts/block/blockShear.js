import { world, EquipmentSlot, EntityEquippableComponent } from "@minecraft/server";

// Define block loot table mapping for sheared drops
const blockLootTables = {
    "wypnt_bab:aspen_leaves": '"coreblockstudios/biomesandbeyond/blocks/aspen_leaves_sheared"',
    "wypnt_bab:redwood_leaves": '"coreblockstudios/biomesandbeyond/blocks/redwood_leaves_sheared"',
    "wypnt_bab:autumn_leaves": '"coreblockstudios/biomesandbeyond/blocks/autumn_leaves_sheared"',
    "wypnt_bab:jacaramda_leaves": '"coreblockstudios/biomesandbeyond/blocks/jacaramda_leaves_sheared"',
    "wypnt_bab:maple_leaves": '"coreblockstudios/biomesandbeyond/blocks/maple_leaves_sheared"',
    "wypnt_bab:maple_yellow_leaves": '"coreblockstudios/biomesandbeyond/blocks/yellow_maple_leaves_sheared"',
    "wypnt_bab:baobab_leaves": '"coreblockstudios/biomesandbeyond/blocks/baobab_leaves_sheared"',
    "wypnt_bab:fir_leaves": '"coreblockstudios/biomesandbeyond/blocks/fir_leaves_sheared"',
    "wypnt_bab:forsaken_oak_leaves": '"coreblockstudios/biomesandbeyond/blocks/forsaken_oak_leaves_sheared"',
    "wypnt_bab:chorus_leaves": '"coreblockstudios/biomesandbeyond/blocks/chorus_leaves_sheared"',
    "wypnt_bab:popped_chorus_leaves": '"coreblockstudios/biomesandbeyond/blocks/chorus_leaves_popped_sheared"'
};

// Special blocks like barley with different loot for normal and sheared
const specialShearBlocks = {
    "wypnt_bab:barley": {
        normal: '"coreblockstudios/biomesandbeyond/blocks/barley"',
        sheared: '"coreblockstudios/biomesandbeyond/blocks/barley_sheared"'
    }
    // Add more special blocks here
};

// Subscribe to the playerBreakBlock event
world.afterEvents.playerBreakBlock.subscribe(({ brokenBlockPermutation, player, block }) => {
    const blockTypeId = brokenBlockPermutation.type.id;
    const mainhand = player.getComponent(EntityEquippableComponent.componentId)?.getEquipmentSlot(EquipmentSlot.Mainhand);
    const heldItem = mainhand?.getItem();
    const blockLocation = block.location;

    // Handle special blocks like barley
    if (specialShearBlocks[blockTypeId]) {
        if (player.getGameMode() !== "Creative") {
            if (heldItem && heldItem.typeId === "minecraft:shears") {
                // Drop sheared loot table
                player.runCommand(`loot spawn ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} loot ${specialShearBlocks[blockTypeId].sheared}`);
            } else {
                // Drop normal loot table (barley bundle)
                player.runCommand(`loot spawn ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} loot ${specialShearBlocks[blockTypeId].normal}`);
            }
        }
        return;
    }

    // Handle regular sheared blocks
    if (heldItem && heldItem.typeId === "minecraft:shears" && player.getGameMode() !== "Creative") {
        const lootTable = blockLootTables[blockTypeId];
        if (lootTable) {
            player.runCommand(`loot spawn ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} loot ${lootTable}`);
        }
    }
});
