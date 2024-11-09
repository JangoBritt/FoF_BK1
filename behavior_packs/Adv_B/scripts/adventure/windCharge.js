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

  if (item.typeId === 'minecraft:wind_charge' && !player.hasTag('NeedsRockets')) player.runCommandAsync('function adv/who_needs_rockets/grant')
})

