import { world, system } from "@minecraft/server";

// Vine configuration
const vineBlocks = {
    top: ["wypnt_bab:velvium_vine", "wypnt_bab:velvium_vine_bulb"], // Both are top blocks
    defaultTop: "wypnt_bab:velvium_vine", // Always convert bottom vines into this
    bottom: "wypnt_bab:velvium_vine"
};

// Store last destroyed block **per player** to avoid multiplayer conflicts
const lastDestroyedBlock = new Map();

// Helper function: Get a block at a specific location
function getBlock(dimension, location) {
    try {
        return dimension.getBlock(location);
    } catch {
        return null;
    }
}

// Event: Handle growing vines when a player interacts with a top vine block
world.afterEvents.playerInteractWithBlock.subscribe(ev => {
    const { block, dimension } = ev;

    if (vineBlocks.top.includes(block.typeId)) {
        const aboveLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
        const aboveBlock = getBlock(dimension, aboveLocation);

        // **Check if the vine already exists to prevent duplication**
        if (aboveBlock && aboveBlock.typeId === "minecraft:air") {
            system.runTimeout(() => {
                const checkAbove = getBlock(dimension, aboveLocation);
                if (checkAbove?.typeId === "minecraft:air") {
                    try {
                        dimension.setBlock(aboveLocation, block.typeId);
                        console.log(`New top vine grown at ${aboveLocation.x}, ${aboveLocation.y}, ${aboveLocation.z}`);
                    } catch (error) {
                        console.error("Error growing vine:", error);
                    }
                }
            }, 5);
        }
    }
});

// Track the last destroyed block **per player**
world.beforeEvents.playerBreakBlock.subscribe(ev => {
    lastDestroyedBlock.set(ev.player.id, ev.block.typeId);
});

// Event: Handle top-to-bottom conversion when placing a block
world.afterEvents.playerPlaceBlock.subscribe(ev => {
    const { block, dimension } = ev;
    const belowLocation = { x: block.location.x, y: block.location.y - 1, z: block.location.z };
    const below = getBlock(dimension, belowLocation);

    if (below && vineBlocks.top.includes(below.typeId)) {
        try {
            below.setType(vineBlocks.bottom);
            below.setPermutation(below.permutation.withState("wypnt_bab:bottom", true))
        } catch (error) {
            console.error("Error converting top to bottom:", error);
        }
    }
});

// Event: Handle bottom-to-top conversion when breaking a block
world.afterEvents.playerBreakBlock.subscribe(ev => {
    const { block, dimension, player } = ev;
    const playerID = player.id; // Get player ID for per-player tracking

    const belowLocation = { x: block.location.x, y: block.location.y - 1, z: block.location.z };
    const below = getBlock(dimension, belowLocation);

    // Get the last destroyed block for this player
    const destroyedType = lastDestroyedBlock.get(playerID);

    // If a top vine was broken, convert the bottom vine below it into a top vine
    if (vineBlocks.top.includes(destroyedType) && below?.typeId === vineBlocks.bottom) {
        try {
            below.setType(vineBlocks.defaultTop); // Always convert to default top vine
        } catch (error) {
            console.error("Error converting bottom to top:", error);
        }
    }

    // **If a bottom vine was broken, convert the next bottom vine below into a top vine (default top)**
    if (destroyedType === vineBlocks.bottom && below?.typeId === vineBlocks.bottom) {
        try {
            below.setType(vineBlocks.defaultTop); // Always use default top vine
        } catch (error) {
            console.error("Error converting lower bottom vine to top:", error);
        }
    }
});
