import {
  world,
  system
} from "@minecraft/server";

world.afterEvents.itemStartUse.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;

  if (!item || !player) {
    return;
  }

  if (item.typeId === 'minecraft:spyglass' && !player.hasTag('ItBird')) {

   
const target = player.getEntitiesFromViewDirection()[0].entity
if(!target) return;
if (target && target.typeId === "minecraft:parrot") player.runCommandAsync('function adv/is_it_a_bird/grant')

  }
})

world.afterEvents.itemStartUse.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;

  if (!item || !player) {
    return;
  }

  if (item.typeId === 'minecraft:spyglass' && !player.hasTag('ItBalloon')) {

   
const target = player.getEntitiesFromViewDirection()[0].entity
if(!target) return;
if (target && target.typeId === "minecraft:ghast") player.runCommandAsync('function adv/is_it_a_balloon/grant')

  }
})

world.afterEvents.itemStartUse.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;

  if (!item || !player) {
    return;
  }

  if (item.typeId === 'minecraft:spyglass' && !player.hasTag('ItPlane')) {

   
const target = player.getEntitiesFromViewDirection()[0].entity
if(!target) return;
if (target && target.typeId === "minecraft:ender_dragon") player.runCommandAsync('function adv/is_it_a_plane/grant')

  }
})

world.afterEvents.itemStartUse.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;

  if (!item || !player) {
    return;
  }

  if (item.typeId === 'minecraft:spyglass' && !player.hasTag('ItTree')) {

   
const target = player.getEntitiesFromViewDirection()[0].entity
if(!target) return;
if (target && target.typeId === "minecraft:creaking") player.runCommandAsync('function adv/is_it_a_tree/grant')

  }
})