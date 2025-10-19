import { world, system } from "@minecraft/server";
import { fence_Manager } from './fence_Manager'

// Register the custom component during world initialization
system.beforeEvents.startup.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('wypnt_bab:fence_place', {
        onPlace: e => {
            const block = e.block;
            block.setPermutation(block.permutation.withState('wypnt_bab:on_placed', true));
        },
    });
});

world.afterEvents.playerBreakBlock.subscribe((data) => {
    fence_Manager.updateFencesAround(data.block)
});
world.afterEvents.playerPlaceBlock.subscribe((data) => {
    fence_Manager.updateFencesAround(data.block)
});