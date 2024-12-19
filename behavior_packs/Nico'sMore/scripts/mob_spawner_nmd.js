import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_brute_zombie_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:brute_zombie", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_brute_zombie_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:brute_zombie", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_cobbled_deepslate_golem_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.runCommandAsync(`summon nicothekid:cobbled_deepslate_golem ${eventData.block.location.x + 0.5} ${eventData.block.location.y} ${eventData.block.location.z + 0.5} ~ ~ event:spawn_from_structure`);
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_cobbled_deepslate_golem_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.runCommandAsync(`summon nicothekid:cobbled_deepslate_golem ${eventData.block.location.x + 0.5} ${eventData.block.location.y} ${eventData.block.location.z + 0.5} ~ ~ event:spawn_from_structure`);
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_cursed_rat_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:cursed_rat", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_cursed_rat_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:cursed_rat", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_elder_golem_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:elder_golem", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_elder_golem_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:elder_golem", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_chief_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:piglin_chief", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_chief_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("nicothekid:piglin_chief", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_rat_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("kuma:gray_comun_rat", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_rat_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("kuma:gray_comun_rat", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_rat_curserer_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("nicothekid:spawner_rat_curserer"));
      eventData.block.dimension.spawnEntity("nicothekid:rat_curserer", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_rat_curserer_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("nicothekid:spawner_rat_curserer"));
      eventData.block.dimension.spawnEntity("nicothekid:rat_curserer", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
});