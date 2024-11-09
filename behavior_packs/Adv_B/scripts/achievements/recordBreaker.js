import {
  world,
  system
} from "@minecraft/server";

world.afterEvents.itemUseOn.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;
  const block = event.block

  if (!item || !player || !block) {
    return;
  }

  if (item.typeId === 'minecraft:music_disc_11' && block.typeId === 'minecraft:jukebox' && !player.hasTag('RecordBreaker')) player.runCommandAsync('function adv/record_breaker/grant')
})

