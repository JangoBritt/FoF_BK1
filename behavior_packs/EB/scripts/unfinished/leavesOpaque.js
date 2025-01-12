import { system, world, BlockPermutation } from "@minecraft/server";

// Function to update the state of a single block based on its surroundings
function updateBlockState(dimension, x, y, z) {
    const block = dimension.getBlock({ x, y, z });

    if (block && block.typeId === "korbon:aspen_leaves") {
        const surroundingBlocks = [
            dimension.getBlock({ x: x + 1, y, z }), // East
            dimension.getBlock({ x: x - 1, y, z }), // West
            dimension.getBlock({ x, y, z: z + 1 }), // North
            dimension.getBlock({ x, y, z: z - 1 }), // South
            dimension.getBlock({ x, y: y - 1, z }), // Below
            dimension.getBlock({ x, y: y + 1, z })  // Above
        ];

        // Check if any surrounding block is air
        const hasAir = surroundingBlocks.some(b => b && b.typeId === "minecraft:air");

        // Update the block's permutation state
        const newState = hasAir ? false : true;

        try {
            const permutation = BlockPermutation.resolve("korbon:aspen_leaves", { "korbon:opaque": newState });
            block.setPermutation(permutation);
        } catch (error) {
            console.error(`Failed to update block at (${x}, ${y}, ${z}):`, error);
        }
    }
}

// Function to periodically scan and update block states
function scanAndUpdateBlocks() {
    const dimension = world.getDimension("overworld");
    const scanHorizontalRange = 16; // Horizontal scan range
    const scanVerticalRange = 15; // Vertical scan range to cover taller trees

    for (const player of world.getPlayers()) {
        const { x: px, y: py, z: pz } = player.location;

        for (let x = px - scanHorizontalRange; x <= px + scanHorizontalRange; x++) {
            for (let y = py - scanVerticalRange; y <= py + scanVerticalRange; y++) {
                for (let z = pz - scanHorizontalRange; z <= pz + scanHorizontalRange; z++) {
                    updateBlockState(dimension, x, y, z);
                }
            }
        }
    }
}

// Schedule the function to run every 100 ticks (5 seconds)
system.runInterval(scanAndUpdateBlocks, 100);
