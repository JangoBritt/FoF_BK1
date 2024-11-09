import {
    world,
    system
} from "@minecraft/server";

world.afterEvents.entityHurt.subscribe((event) => {
  const hurtEntity = event.hurtEntity;
  const damageSource = event.damageSource.damagingEntity;
  const cause = event.damageSource.cause
  const damage = event.damage
  if (!damageSource) {
    return;
  }
  if (!damageSource.hasTag('debug')) {
    return;
  }
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  damageSource.sendMessage(`Mob Type : ${hurtEntity.typeId}`)
  damageSource.sendMessage(`Cause : ${cause}`)
  damageSource.sendMessage(`Damage : ${damage}`)

});

world.afterEvents.playerPlaceBlock.subscribe((event) => {
  const block = event.block;
  const player = event.player;

  if (!block || !player) {
    return;
  }
  if (!player.hasTag('debug')) {
    return;
  }

  player.sendMessage(`Block is ${block.typeId}`)
})




