import {
  world,
  system
} from "@minecraft/server";

world.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const entity = event.target;
  const player = event.player;
  const item = event.beforeItemStack;;

  if (!entity || !player || !item) {
    return;
  }
  if (entity.typeId !== 'minecraft:armadillo' || item.typeId !== 'minecraft:brush') {return;}

  if (!player.hasTag('ItScute')) player.runCommandAsync('function adv/isnt_it_scute/grant')
})

