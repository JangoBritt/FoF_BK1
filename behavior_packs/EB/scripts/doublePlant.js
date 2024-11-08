import { world, BlockPermutation } from "@minecraft/server"

// Array defining pairs of bottom and top blocks for double plants
const tallBottomFlowers = [
    { // You can add more objects to the array for each tall flower you have
        id: "korbon:deadfern_bottom", // ID of the bottom block of the double plant
        topBit: {
            id: "korbon:deadfern_top" // ID of the top block of the double plant
        }
    },
    {
        id: "korbon:cattail_bottom",
        topBit: {
            id: "korbon:cattail_top"
        }
    },
    {
        id: "korbon:jungfern_bottom",
        topBit: {
            id: "korbon:jungfern_top"
        }
    },
    {
        id: "korbon:standing_torch_bottom",
        topBit: {
            id: "korbon:standing_torch_top"
        }
    }
]

world.afterEvents.playerPlaceBlock.subscribe(ev => {
    const above = ev.block.above();

    // Find a matching bottom flower based on the placed block's permutation
    const matchingBottomFlower = tallBottomFlowers.find((flower) => ev.block.permutation.matches(flower.id));

    // Check if the above block is air to place the corresponding top flower
    if (matchingBottomFlower != undefined && above.isAir) {
        // Access the corresponding top flower ID directly from the structure
        const matchingTopFlowerId = matchingBottomFlower.topBit.id;

        // Place the corresponding top flower
        above.setPermutation(BlockPermutation.resolve(matchingTopFlowerId));
    } else if (matchingBottomFlower != undefined && !above.isAir) {
        // If the above block is not air, break the placed bottom block
        const { x, y, z } = ev.block.location;
        ev.dimension.runCommand(`setblock ${x} ${y} ${z} air[] destroy`);
    }
})

world.afterEvents.playerBreakBlock.subscribe(ev => {
    // Find a matching top flower based on the broken block's permutation
    const matchingTopFlower = tallBottomFlowers.find((flower) => ev.brokenBlockPermutation.matches(flower.topBit.id));

    // Break the corresponding bottom block if a matching top flower is found
    if (matchingTopFlower) {
        const { x, y, z } = ev.block.location;
        ev.dimension.runCommand(`setblock ${x} ${y - 1} ${z} air[] destroy`);
    }
})
