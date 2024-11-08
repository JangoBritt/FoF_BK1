// Import necessary modules from Minecraft server API
import { world } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component for the sapling
    eventData.blockComponentRegistry.registerCustomComponent('korbon:maplelog', {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;
  
            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');
  
            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');
  
            // Check if the selected item is 'minecraft:glass_bottle'
            if (selectedItem && (selectedItem.typeId === 'minecraft:glass_bottle')) {
                // Get the syrup block state
                const syrupState = block.permutation.getState('korbon:syrup');
            
                // Checks the value of the "korbon:syrup" state
                if (syrupState === true) {
                    if (player.getGameMode() !== "creative") {
                        // Add a syrup bottle to the player's inventory
                        block.dimension.runCommand(`give @a[name="${player.name}"] korbon:syrup_bottle 1`);
            
                        if (selectedItem.amount > 1) {
                            // Decrease the amount of the selected item by 1
                            selectedItem.amount -= 1;
                            // Set the updated item stack back to the player's main hand
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            // Clear the slot if only 1 item left
                            equipment.setEquipment('Mainhand', undefined);
                        }
            
                        // Sets the block's state to false
                        block.setPermutation(block.permutation.withState("korbon:syrup", false));
                        player.runCommand(`/playsound use.honey_block @a[r=6] ~~~`);
                    }
                } else {
                    // Syrup state set to false
                }
            }
            
        },
        onTick(e) {
            // Destructure event data for easier access
            const { block } = e;
            const syrupState = block.permutation.getState('korbon:syrup');

            // Checks the value of the "korbon:syrup" state 
            if (syrupState === false) {
                block.setPermutation(block.permutation.withState("korbon:syrup", true));
            }
        }
    });
});
