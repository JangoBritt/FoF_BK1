import { system } from "@minecraft/server";

// Subscribe to the 'worldInitialize' event to register custom components
system.beforeEvents.startup.subscribe(eventData => {
    // Register a custom component named wypnt_bab:banana_block
    eventData.blockComponentRegistry.registerCustomComponent('wypnt_bab:banana_block', {
        onRandomTick(e) {
            const { block } = e;
            const currentGrowth = block.permutation.getState('wypnt_bab:growth_fruit');
            
            // Only increment growth state if it's less than 7
            if (currentGrowth < 7) {
                block.setPermutation(
                    block.permutation.withState("wypnt_bab:growth_fruit", currentGrowth + 1)
                );
            }
        },
        onPlayerInteract({ block, dimension, player }) {
            if (!player) return;

            const { x, y, z } = block.location;
            const currentGrowth = block.permutation.getState('wypnt_bab:growth_fruit');

            if (currentGrowth === 7) {
                dimension.playSound("hit.vines", block.location );
                block.setPermutation(
                    block.permutation.withState("wypnt_bab:growth_fruit", 0)
                );
                player.runCommand(`loot spawn ${x} ${y} ${z} loot "coreblockstudios/biomesandbeyond/blocks/banana_block"`);
            }
        }
    });
});



