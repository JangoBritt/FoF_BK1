import { system, world } from "@minecraft/server";
const tags = new Set([
    'minecraft:is_pickaxe_item_destructible', 'minecraft:is_shovel_item_destructible', 'minecraft:is_axe_item_destructible',
    'minecraft:is_hoe_item_destructible', 'minecraft:is_shears_item_destructible', 'minecraft:is_sword_item_destructible'
]);
system.beforeEvents.startup.subscribe(s => {
    s.blockComponentRegistry.registerCustomComponent("wypnt_bab:hanging_placement", {
        beforeOnPlayerPlace: e => {
            if (e.face === "Up" || (e.block.below()?.getTags().some(a => tags.has(a)) && e.face !== "Down")) {
                e.permutationToPlace = e.permutationToPlace.withState("wypnt_bab:hanging", "false");
                return;
            };
            if (e.face === "Down" || e.block.above()?.getTags().some(a => tags.has(a))) {
                e.permutationToPlace = e.permutationToPlace.withState("wypnt_bab:hanging", "true");
                return;
            };
            e.cancel = true;
        }
    });
});