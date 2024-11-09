import {
    world,
    system
} from "@minecraft/server";

world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const mob = event.entity;
  const eventId = event.eventId;
  if (eventId !== 'admire_item_started_event') {
    return;
  }
  if (mob.typeId !== 'minecraft:piglin') {
    return;
  }
  const baby = mob.getComponent('minecraft:is_baby');
  if (baby) {
    return;
  }
  const nearbyPlayer = mob.dimension.getPlayers({
    location: mob.location,
    maxDistance: 8,
    minDistance: 0,
    closest: 1,
    excludeTags: ['OhShiny'],
  })[0];
  if (!nearbyPlayer) return;
  nearbyPlayer.runCommandAsync('function adv/oh_shiny/grant')
  return;
})