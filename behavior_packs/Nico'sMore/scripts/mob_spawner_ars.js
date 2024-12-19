import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_blaze_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:blaze", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_blaze_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:blaze", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_hoglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:hoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_hoglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:hoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_pig_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:pig", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_pig_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:pig", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_brute_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin_brute", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_brute_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin_brute", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_skeleton_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_skeleton_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_wither_skeleton_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:wither_skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_wither_skeleton_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:wither_skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zoglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zoglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombified_piglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_pigman", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombified_piglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_pigman", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
});