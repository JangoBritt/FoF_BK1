import { world, BlockPermutation, Dimension } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:structure_ancient_castle_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.runCommandAsync(`structure load "ancient_castle_01" ${eventData.block.location.x - 22} ${eventData.block.location.y - 1} ${eventData.block.location.z - 22}`);
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:structure_ancient_castle_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.runCommandAsync(`structure load "ancient_castle_01" ${eventData.block.location.x - 22} ${eventData.block.location.y - 1} ${eventData.block.location.z - 22}`);
    }
  });
});