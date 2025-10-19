import { system } from "@minecraft/server";

// Subscribe to the 'worldInitialize' event to register custom components
system.beforeEvents.startup.subscribe(eventData => {
    // Register a custom component named wypnt_bab:
    eventData.blockComponentRegistry.registerCustomComponent( 'wypnt_bab:crocodile_egg', {
        onTick(e) {
            // Destructure event data for easier access
            const { block } = e;

            const cracked0 = (block.permutation.getState('wypnt_bab:cracked_state') == 'no_cracks');

            const cracked1 = (block.permutation.getState('wypnt_bab:cracked_state') == 'cracked');

            const cracked2 = (block.permutation.getState('wypnt_bab:cracked_state') == 'max_cracked');

            // Get the block's current location
            const { x, y, z } = block.location; 

            // Calculate the entity position
            const entityX = x + 0.5;
            const entityY = y;
            const entityZ = z + 0.5;

             // Calculate the particle position
            const particleX = x + 0.5;
            const particleY = y;
            const particleZ = z + 0.5;

            // Check for the block permutation 'wypnt_bab:egg'
            if (cracked0) {
                
            block.dimension.playSound("block.turtle_egg.crack", block.location);
            block.setPermutation(block.permutation.withState("wypnt_bab:cracked_state", 'cracked'));

            } else if (cracked1) {

            block.dimension.playSound("block.turtle_egg.crack", block.location);
            block.setPermutation(block.permutation.withState("wypnt_bab:cracked_state", 'max_cracked'));

            } else if (cracked2) {

                block.dimension.playSound("block.turtle_egg.break", block.location);
                block.dimension.spawnParticle("minecraft:egg_destroy_emitter", { x: particleX, y: particleY, z: particleZ });
                block.setType("minecraft:air");
                block.dimension.spawnEntity("wypnt_bab:crocodile", { x: entityX, y: entityY, z: entityZ }, {
                    spawnEvent: "minecraft:entity_born"
                });
            }
        }
    });
});
