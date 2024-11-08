// Import necessary modules from Minecraft server API
import { world } from '@minecraft/server';

// Define a function to handle sapling growth
function handleSaplingGrowth(eventData, saplingType, treeStructures, growthChance, growthRate, offset) {
    // Register a custom component for the sapling
    eventData.blockComponentRegistry.registerCustomComponent(`korbon:${saplingType}_sapling`, {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the block's current location
            const { x, y, z } = block.location;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if the selected item is 'minecraft:bone_meal'
            if (selectedItem && (selectedItem.typeId === 'minecraft:bone_meal')) {
                // Define the location for the particle and structure
                const location = { x: x + 0.5, y: y + 0.5, z: z + 0.5 };

                // Spawn 'minecraft:crop_growth_emitter' particle at the location
                block.dimension.spawnParticle('minecraft:crop_growth_emitter', location);

                // Play bonemeal sound at the sapling's location
                player.runCommand(`/playsound item.bone_meal.use @a[r=5] ${x} ${y} ${z}`);

                // Choose a random tree
                const structure = treeStructures[Math.floor(Math.random() * treeStructures.length)];

                // Generate a random number between 0 and 1
                const randomChance = Math.random();

                // Spawn a tree if the random number is less than the growth chance
                if (randomChance < growthChance) {
                    // Execute the /structure command to load the chosen tree at the sapling's location plus the offset
                    block.dimension.runCommand(`/structure load ${structure} ${x+offset.x} ${y+offset.y} ${z+offset.z}`);
                }

                // Reduce bone meal from player's inventory if not in creative mode
                if (player.getGameMode() !== "creative") {
                    if (selectedItem.amount > 1) {
                        selectedItem.amount -= 1;
                        equipment.setEquipment('Mainhand', selectedItem);
                    } else {
                        // Clear the slot if only 1 item left
                        equipment.setEquipment('Mainhand', undefined);
                    }
                }
            }
        },
        // Allows the sapling to grow naturally
        onTick(e) {
            // Destructure event data for easier access
            const { block } = e;

            // Generate a random number between 0 and 1
            const randomChance = Math.random();

            // Get the block's current location
            const { x, y, z } = block.location;

            // Grow a tree if the random number is less than the growth rate
            if (randomChance < growthRate) {
                // Choose a random tree
                const structure = treeStructures[Math.floor(Math.random() * treeStructures.length)];

                // Execute the /structure command to load the chosen tree at the sapling's location plus the offset
                block.dimension.runCommand(`/structure load ${structure} ${x+offset.x} ${y+offset.y} ${z+offset.z}`);
            }
        }
    });
}

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Define the tree structures for each type of sapling
    const aspenStructures = ['aspen_tree1', 'aspen_tree2', 'aspen_tree3'];
    const baobabStructures = ['baobab_tree_1', 'baobab_tree_2', 'baobab_tree_3', 'baobab_tree_4', 'baobab_tree_5', 'baobab_tree_6'];
    const redwoodStructures = ['redwood_tree_1', 'redwood_tree_2', 'redwood_tree_3'];
    const jacarandaStructures = ['jacaranda_tree_1', 'jacaranda_tree_2', 'jacaranda_tree_3'];
    const autumnStructures = ['autumn_oak1', 'autumn_oak2', 'autumn_oak3', 'autumn_oak2_1', 'autumn_oak2_2', 'autumn_oak2_3'];
    const mapleStructures = ['maple_tree_1', 'maple_tree_2', 'maple_tree_3', 'maple_tree_with_syrup'];

    // Define the offsets for each type of sapling
    const aspenOffset = { x: -2, y: 0, z: -2 };
    const baobabOffset = { x: -4, y: 0, z: -3 };
    const redwoodOffset = { x: -3, y: -1, z: -3 };
    const jacarandaOffset = { x: -2, y: 0, z: -2 };
    const autumnOffset = { x: -2, y: 0, z: -2 };
    const mapleOffset = { x: -2, y: 0, z: -2 };

    // Handle growth for each type of sapling with growth chances using bonemeal(first value), natural growth rates(second value), and offsets
    handleSaplingGrowth(eventData, 'aspen', aspenStructures, 0.35, 0.10, aspenOffset);
    handleSaplingGrowth(eventData, 'baobab', baobabStructures, 0.20, 0.10, baobabOffset);
    handleSaplingGrowth(eventData, 'redwood', redwoodStructures, 0.10, 0.10, redwoodOffset);
    handleSaplingGrowth(eventData, 'jacaranda', jacarandaStructures, 0.35, 0.10, jacarandaOffset);
    handleSaplingGrowth(eventData, 'autumn', autumnStructures, 0.35, 0.10, autumnOffset);
    handleSaplingGrowth(eventData, 'maple', mapleStructures, 0.35, 0.10, mapleOffset);
});
