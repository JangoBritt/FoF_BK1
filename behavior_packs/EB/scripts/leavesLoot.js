import { world } from "@minecraft/server";

// Function to run a command with the required permissions
function runCommand(command, player) {
    try {
        player.runCommandAsync(command);
    } catch (error) {
        console.error(`Error executing command: ${error}`);
    }
}

// Define a mapping of blocks to their corresponding loot tables
const leavesLootTables = {
    "korbon:aspen_leaves": {
        sheared: "blocks/aspen_leaves_sheared",
        drops: "blocks/aspen_leaves_drops"
    },
    "korbon:maple_leaves": {
        sheared: "blocks/maple_leaves_sheared",
        drops: "blocks/maple_leaves_drops"
    },
    "korbon:autumn_oak_leaves": {
        sheared: "blocks/autumn_oak_leaves_sheared",
        drops: "blocks/autumn_oak_leaves_drops"
    },
    "korbon:autumn_oak_leaves2": {
        sheared: "blocks/autumn_oak_leaves2_sheared",
        drops: "blocks/autumn_oak_leaves_drops"
    },
    "korbon:jacaranda_leaves": {
        sheared: "blocks/jacaranda_leaves_sheared",
        drops: "blocks/jacaranda_leaves_drops"
    },
    "korbon:redwood_leaves": {
        sheared: "blocks/redwood_leaves_sheared",
        drops: "blocks/redwood_leaves_drops"
    },
    "korbon:baobab_leaves": {
        sheared: "blocks/baobab_leaves",
        drops: "blocks/baobab_leaves_drops"
    },
    "korbon:cherry_blossom_leaves": {
        sheared: "blocks/cherry_blossom_leaves",
        drops: "blocks/cherry_blossom_leaves_drops"
    },
    // Add more leaves blocks and their loot tables as needed
};

world.beforeEvents.playerBreakBlock.subscribe((data) => {
    // Destructure event data for easier access
    const { block, player } = data;
  
    // Get the equipment component for the player
    const equipment = player.getComponent('equippable');

    // Get the selected item from the player's mainhand
    const selectedItem = equipment.getEquipment('Mainhand');

    // Check if the block type is in the leavesLootTables mapping
    if (leavesLootTables.hasOwnProperty(block.typeId)) {
        const lootTable = leavesLootTables[block.typeId];
        let command;
        // Check if the block has permutations and if the "pog:playerPlaced" permutation is false
        const playerPlacedPermutation = block.permutations ? block.permutations.find(permutation => permutation.name === "pog:playerPlaced") : null;
        const playerPlaced = playerPlacedPermutation ? playerPlacedPermutation.value : false;

        if (!playerPlaced) {
            // Check if the selected item is 'minecraft:shears'
            if (selectedItem && selectedItem.typeId === 'minecraft:shears') {
                // Execute the loot command to drop the sheared loot table
                command = `loot spawn ${block.location.x} ${block.location.y} ${block.location.z} loot "${lootTable.sheared}"`;
            } else {
                // Execute the loot command to drop the non-sheared loot table
                command = `loot spawn ${block.location.x} ${block.location.y} ${block.location.z} loot "${lootTable.drops}"`;
            }
            runCommand(command, player);
        }
    }
});
