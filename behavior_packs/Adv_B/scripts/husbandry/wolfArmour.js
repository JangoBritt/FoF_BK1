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
  if (entity.typeId !== 'minecraft:wolf' || item.typeId !== 'minecraft:wolf_armor' || player.isSneaking) {return;}

  if (entity.hasTag('wolf_armour')) return;

  entity.addTag('wolf_armour');

})



world.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const entity = event.target;
  const player = event.player;
  const item = event.beforeItemStack;

  if (!entity || !player || !item) {
    return;
  }
  if (entity.typeId !== 'minecraft:wolf' || item.typeId !== 'minecraft:shears' || player.isSneaking) {return;}

  if (!entity.hasTag('wolf_armour')) return;

  entity.removeTag('wolf_armour');

  if (!player.hasTag('ShearBrilliance')) player.runCommandAsync('function adv/shear_brilliance/grant')
})


world.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const entity = event.target;
  const player = event.player;
  const item = event.beforeItemStack;;

  if (!entity || !player || !item) {
    return;
  }
  if (entity.typeId !== 'minecraft:wolf' || item.typeId !== 'minecraft:armadillo_scute' || player.isSneaking) {return;}

  if (!entity.hasTag('wolf_armour')) return;

 

  if (!player.hasTag('GoodNew')) player.runCommandAsync('function adv/good_as_new/grant')
})

