import { world } from "@minecraft/server";

// Define the block and the entity to spawn
const targetBlock = "wypnt_bab:glass_jar_firefly";
const entityToSpawn = "wypnt_bab:firefly";

// Subscribe to the playerBreakBlock event
world.afterEvents.playerBreakBlock.subscribe(({ brokenBlockPermutation, block }) => {
    const blockTypeId = brokenBlockPermutation.type.id;

    // Check if the broken block is the target block
    if (blockTypeId === targetBlock) {
        const blockLocation = block.location;

        // Execute the command to spawn the entity at the block's location
        world.getDimension("overworld").runCommand(`summon ${entityToSpawn} ${blockLocation.x} ${blockLocation.y} ${blockLocation.z}`);
    }
});
