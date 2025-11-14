import { EquipmentSlot, GameMode, world, system } from "@minecraft/server";

/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Updated to match the block's max growth stage
const maxGrowth = 5;

/** @type {import("@minecraft/server").BlockCustomComponent} */
const BlockCustomCropGrowthComponent = {
    onRandomTick({ block }) {
        const growthChance = 1 / 3;
        if (Math.random() > growthChance) return;

        const growth = block.permutation.getState("wypnt_bab:growth");
        if (growth < maxGrowth) {
            const newGrowth = Math.min(growth + 1, maxGrowth);
            block.setPermutation(block.permutation.withState("wypnt_bab:growth", newGrowth));
        }
    },
    onPlayerInteract({ block, dimension, player }) {
        if (!player) return;

        const equippable = player.getComponent("minecraft:equippable");
        if (!equippable) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal") return;

        if (player.getGameMode() === GameMode.Creative) {
            // Grow crop fully
            block.setPermutation(block.permutation.withState("wypnt_bab:growth", maxGrowth));
        } else {
            let growth = block.permutation.getState("wypnt_bab:growth");

            // Add random amount of growth, but don't exceed maxGrowth
            const growthToAdd = randomInt(1, Math.max(1, maxGrowth - growth));
            growth = Math.min(growth + growthToAdd, maxGrowth);
            block.setPermutation(block.permutation.withState("wypnt_bab:growth", growth));

            // Decrement stack
            if (mainhand.amount > 1) mainhand.amount--;
            else mainhand.setItem(undefined);
        }

        // Play effects
        const effectLocation = block.center();
        dimension.playSound("item.bone_meal.use", effectLocation);
        dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "wypnt_bab:barley_crop_growth",
        BlockCustomCropGrowthComponent
    );
});