import {
    world,
    system
} from "@minecraft/server";

world.afterEvents.effectAdd.subscribe((event) => {
  const player = event.entity;
  const effect = event.effect;
  if (player.typeId !== "minecraft:player") {return;}
  player.sendMessage(`added effect ${effect.typeId}`)
  if (effect.typeId === 'wither') {
    player.addEffect('regeneration', effect.duration, { amplifier: effect.amplifier });
    player.removeEffect('wither');
  }
  

});