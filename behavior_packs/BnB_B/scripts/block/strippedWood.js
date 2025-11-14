import { world, system, EquipmentSlot, ItemStack } from "@minecraft/server";

// The logs and their corresponding stripped types (including wood variants)
const LOG_TO_STRIPPED = {
    "wypnt_bab:fir_log": "wypnt_bab:stripped_fir_log",
    "wypnt_bab:baobab_log": "wypnt_bab:stripped_baobab_log",
    "wypnt_bab:forsaken_oak_log": "wypnt_bab:stripped_forsaken_oak_log",
    "wypnt_bab:jacaranda_log": "wypnt_bab:stripped_jacaranda_log",
    "wypnt_bab:redwood_log": "wypnt_bab:stripped_redwood_log",
    "wypnt_bab:chorus_log": "wypnt_bab:stripped_chorus_log",
    "wypnt_bab:maple_log": "wypnt_bab:stripped_maple_log",
    // Wood variants (stripped wood)
    "wypnt_bab:fir_wood": "wypnt_bab:stripped_fir_wood",
    "wypnt_bab:baobab_wood": "wypnt_bab:stripped_baobab_wood",
    "wypnt_bab:forsaken_oak_wood": "wypnt_bab:stripped_forsaken_oak_wood",
    "wypnt_bab:jacaranda_wood": "wypnt_bab:stripped_jacaranda_wood",
    "wypnt_bab:redwood_wood": "wypnt_bab:stripped_redwood_wood",
    "wypnt_bab:chorus_wood": "wypnt_bab:stripped_chorus_wood",
    "wypnt_bab:maple_wood": "wypnt_bab:stripped_maple_wood"
    // Add more logs and wood variants and their stripped types here as needed
};

world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
    // Ensure the block and item stack are defined
    if (!data.block || !data.itemStack) return;

    // Check if the block is one of the logs or wood types that we want to strip
    const logType = data.block.typeId;
    const strippedType = LOG_TO_STRIPPED[logType];

    // Exit early if the block type is not in the LOG_TO_STRIPPED mapping
    if (!strippedType) return;

    // Only proceed if the item is an axe
    if (data.itemStack.hasTag("minecraft:is_axe")) {
        system.run(() => {
            try {
                // Get the direction of the block face (orientation)
                const Direction = data.block.permutation.getState("minecraft:block_face");

                // Set the block type to the stripped version
                data.block.setType(strippedType);
                // Preserve the block's orientation (block_face state)
                data.block.setPermutation(data.block.permutation.withState("minecraft:block_face", Direction));

                // Play the log stripping sound (Bedrock specific sound for stripping logs)
                const player = data.player;
                if (player) {
                    data.block.dimension.playSound("use.wood", data.block.location); // Correct sound for log stripping in Bedrock
                }
            } catch (error) {
                console.error("Error processing log stripping:", error);
            }
        });
    }
});
