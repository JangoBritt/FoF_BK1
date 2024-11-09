import {
  world,
  system
} from "@minecraft/server";

world.afterEvents.itemUse.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;

  if (!item || !player) {
    return;
  }

  if (item.typeId === 'minecraft:fishing_rod' && !player.hasTag('FishyBusiness')) player.runCommandAsync('function adv/fishy_business/grant')
})

