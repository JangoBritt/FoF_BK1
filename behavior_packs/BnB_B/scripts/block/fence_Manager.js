import { Block } from "@minecraft/server";

const fenceTag = 'wypnt_bab:fence'
const exception = new Set([
"minecraft:warped_nylium",
"minecraft:pale_moss_block",
"minecraft:moss_block",
"minecraft:grass_block"]);
const nonSolidBlocks = new Set([
      "minecraft:air", "minecraft:minecart", "minecraft:lever",
      "minecraft:lectern", "minecraft:cauldron", "minecraft:enchanting_table", 
      "minecraft:end_portal_frame", "minecraft:daylight_detector", "minecraft:hopper", 
      "minecraft:comparator", "minecraft:repeater", "minecraft:frame", 
      "minecraft:glow_frame", "minecraft:painting", "minecraft:end_rod",
      "minecraft:grass", "minecraft:tallgrass", "minecraft:fern", "minecraft:deadbush", 
      "minecraft:seagrass", "minecraft:tall_seagrass", "minecraft:bamboo", 
      "minecraft:cactus", "minecraft:sugar_cane", "minecraft:vine", 
      "minecraft:flower", "minecraft:mushroom", "minecraft:coral", "minecraft:coral_fan", 
      "minecraft:kelp", "minecraft:torch", "minecraft:redstone_torch", "minecraft:soul_torch", "minecraft:lantern", 
      "minecraft:soul_lantern", "minecraft:campfire", "minecraft:soul_campfire", "minecraft:candle",
      "minecraft:scaffolding", "minecraft:sculk_vein", "minecraft:sculk_shrieker", "minecraft:sculk_sensor",
      "minecraft:calibrated_sculk_sensor", "minecraft:brain_coral", "minecraft:bubble_coral", "minecraft:fire_coral", 
      "minecraft:horn_coral", "minecraft:tube_coral", "minecraft:short_grass", "minecraft:tall_grass", "minecraft:tall_dry_grass",
      "minecraft:brain_coral_fan", "minecraft:bubble_coral_fan", "minecraft:fire_coral_fan", 
      "minecraft:horn_coral_fan", "minecraft:tube_coral_fan", "minecraft:short_dry_grass",
      "minecraft:dead_brain_coral", "minecraft:dead_bubble_coral", "minecraft:dead_fire_coral", 
      "minecraft:dead_horn_coral", "minecraft:dead_tube_coral", "minecraft:glow_lichen",
      "minecraft:dead_brain_coral_fan", "minecraft:dead_bubble_coral_fan", "minecraft:dead_fire_coral_fan", 
      "minecraft:dead_horn_coral_fan", "minecraft:dead_tube_coral_fan", "minecraft:leaf_litter", "minecraft:crimson_roots", 
      "minecraft:hanging_roots", "minecraft:warped_roots"
]);
function NOSOLIDBLOCK(block) {
    let blockId = block.type.id; // if the block is a permutation, right
    const tags = new Set(block.getTags());
    const doubleState = block.permutation.getState("wypnt_bab:double");
    return nonSolidBlocks.has(blockId)
    || tags.has('crop')
    || tags.has('plant')
    || tags.has('leaves')
    || tags.has('minecraft:crop')
    || tags.has('rail')
    || tags.has('trapdoors')
    || (tags.has("fertilize_area") && !exception.has(blockId))    
    || tags.has('wypnt_bab:flowers')
    || (!blockId.startsWith('minecraft:') && blockId.includes('slab') && !doubleState)
    || (blockId.startsWith('minecraft:') && !blockId.includes('double') && blockId.includes('slab'))
    || blockId.includes('cluster')
    || blockId.includes('rail')
    || blockId.includes('door')
    || blockId.includes('stairs')
    || blockId.includes('vine')
    || blockId.includes('sign')
    || blockId.includes('wall')
    || blockId.includes('banner')
    || blockId.includes('pane')
    || blockId.includes('carpet')
    || blockId.includes('clump')
    || blockId.includes('sapling')
    || blockId.includes('fungus')
    || blockId.includes('mushroom')
    || blockId.includes('button')
    || blockId.includes('layer')
    || blockId.includes('frame')
    || blockId.includes('leaves')
    || blockId.includes('leaf_pile')
    || blockId.includes('petals')
    || blockId.includes('bush')
    || blockId.includes('bed')
    || blockId.includes('rose')
    || blockId.includes('grass')
    || blockId.includes('plant')
    || blockId.includes('berry')
};

export class fence_Manager {
    static update_Fence_States(Fence) {
        let north = undefined;
        try {
            north = Fence.north(1);
        } catch { }
        let south = undefined;
        try {
            south = Fence.south(1);
        } catch { }
        let east = undefined;
        try {
            east = Fence.east(1);
        } catch { }
        let west = undefined;
        try {
            west = Fence.west(1);
        } catch { }
        const blocks = [
            { block: north, side: "north" },
            { block: south, side: "south" },
            { block: east, side: "east" },
            { block: west, side: "west" },
        ];
        for (const blockData of blocks) {
            if (blockData.block != undefined) {
                if (!(blockData.block.isLiquid || blockData.block.isAir || NOSOLIDBLOCK(blockData.block))) {
                    Fence.setPermutation(Fence.permutation.withState("wypnt_bab:" + blockData.side, true));
                } else {
                    Fence.setPermutation(Fence.permutation.withState("wypnt_bab:" + blockData.side, false));
                }
            } else {
                Fence.setPermutation(Fence.permutation.withState("wypnt_bab:" + blockData.side, false));
            }
        }
    }
    static updateFencesAround(Block) {
        let north = undefined;
        try {
            north = Block.north(1);
        } catch { }
        let south = undefined;
        try {
            south = Block.south(1);
        } catch { }
        let east = undefined;
        try {
            east = Block.east(1);
        } catch { }
        let west = undefined;
        try {
            west = Block.west(1);
        } catch { }
        const blocks = [Block, north, south, east, west];
        for (const block of blocks) {
            if (block != undefined) {
                if (block.hasTag(fenceTag)) this.update_Fence_States(block);
            }
        }
    }
}

