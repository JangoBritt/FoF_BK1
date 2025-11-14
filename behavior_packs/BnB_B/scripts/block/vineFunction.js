import { world, BlockPermutation } from "@minecraft/server";

// Array defining pairs of body and head blocks for double plants
const tallBlocks = [
    { 
        id: "wypnt_bab:wisteria", // ID of the body block
        topBits: ["wypnt_bab:wisteria"] // IDs of possible head blocks
    },
    { 
        id: "wypnt_bab:depraved_vine", // ID of the body block
        topBits: ["wypnt_bab:depraved_vine", "wypnt_bab:depraved_vine_flower"] // IDs of possible head blocks
    }
];

world.afterEvents.playerPlaceBlock.subscribe(ev => {
    // Find a matching body block for the placed head block
    const matchingTopBlock = tallBlocks.find(block => 
        block.topBits.includes(ev.block.permutation.type.id)
    );

    // Check if the block above is a valid head block and replace it with a body block
    if (matchingTopBlock) {
        const above = ev.block.above();
        if (matchingTopBlock.topBits.includes(above.permutation.type.id)) {
            const { x, y, z } = above.location;
            ev.dimension.runCommand(`setblock ${x} ${y} ${z} ${matchingTopBlock.id} ["wypnt_bab:body"=true]`);
        }
    }
});

world.afterEvents.playerBreakBlock.subscribe(ev => {
    // Find a matching body block based on the broken block's permutation
    const matchingTopBlock = tallBlocks.find(block => 
        block.topBits.includes(ev.brokenBlockPermutation.type.id)
    );

    if (matchingTopBlock) {
        const above = ev.block.above();
        if (above.permutation.type.id === matchingTopBlock.id) {
            const { x, y, z } = above.location;
            ev.dimension.runCommand(`setblock ${x} ${y} ${z} ${matchingTopBlock.topBits[0]}`); // Default to first head
        }
    }
});

// Change a body block into a head block if the block below it is destroyed
world.afterEvents.playerBreakBlock.subscribe(ev => {
    const matchingBodyBlock = tallBlocks.find(block => 
        ev.brokenBlockPermutation.matches(block.id)
    );

    if (matchingBodyBlock) {
        const above = ev.block.above();
        if (above.permutation.type.id === matchingBodyBlock.id) {
            const { x, y, z } = above.location;
            ev.dimension.runCommand(`setblock ${x} ${y} ${z} ${matchingBodyBlock.topBits[0]}`); // Default to first head
        }
    }
});
