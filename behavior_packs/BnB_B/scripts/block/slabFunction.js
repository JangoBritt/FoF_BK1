import { world, system, ItemStack, EquipmentSlot } from '@minecraft/server';

const slabTag = 'wypnt_bab:slab'
const ABslabs = {
    "Up": (block) => block.above(),
    "Down": (block) => block.below(),
    "target": {
        "Up": (block) => block.below(),
        "Down": (block) => block.above()
    }
};
const conditions = {
    "Up": (VerticalHalf) => VerticalHalf == "bottom",
    "Down": (VerticalHalf) => VerticalHalf == "top"
};
const DWorUP = new Set(["Up", "Down"]);

const TRANSFORMSLAB = (block, player, item) => system.run(() => {
block?.setPermutation(block?.permutation.withState("wypnt_bab:double", true));
let sound = "use.stone"; // padrão
if (block.hasTag("wypnt_bab:wooden_slab")) sound = "use.wood";
if (block.hasTag("wypnt_bab:stone_slab")) sound = "use.stone";
if (block.hasTag("wypnt_bab:strata_slab")) sound = "block.packed_mud.step";

block.dimension.playSound(sound, block.location, { volume: 1.0, pitch: 0.8 });
    if (block.isWaterLogged) block.setWaterLogged(false);
    if (player.getGameMode() === "Creative") return;
    if (item.amount <=  1) item = undefined; else item.amount -= 1;
    player.getComponent('minecraft:inventory').container?.setItem(player.selectedSlotIndex, item);
});
world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { block, blockFace: face, player, itemStack: item } = e;
    if (!item || !item?.hasTag(slabTag)) return;
    if (block.hasTag(slabTag) && item.typeId == block.typeId && DWorUP.has(face)) {
        if (block.dimension.getEntities({
            location: {
                x: block.x + 0.5,
                y: block.y,
                z: block.z + 0.5
            },
            maxDistance: 0.80
        }).length > 0) return;
        const isDouble = block.permutation.getState("wypnt_bab:double");
        const verticalHalf = block?.permutation.getState("minecraft:vertical_half");
        if (!isDouble && conditions[face]?.(verticalHalf)) {
        	e.cancel = true;
            TRANSFORMSLAB(block, player, item);
            return;
        };
    };

    const slab = block[face.toLowerCase()]?.() ?? ABslabs[face]?.(block);
    if (block.dimension.getEntities({
        location: slab.center(),
        maxDistance: 0.9
    }).length > 0) return;
    if (!slab?.hasTag(slabTag) || item.typeId !== slab?.typeId) return;
    const isDouble = slab.permutation.getState("wypnt_bab:double");
    if (!isDouble) {
        TRANSFORMSLAB(slab, player, item);
        return;
    };
});