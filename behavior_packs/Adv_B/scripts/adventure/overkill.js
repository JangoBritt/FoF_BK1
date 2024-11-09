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
  if (damageSource.hasTag('OverOverkill')) {
    return;
  }
  if (damageSource.typeId !== "minecraft:player") {
    return;
  }
  if (hurtEntity == damageSource) {
    return;
  }
  if (cause != "entityAttack") {
    return;
  }
  if (!damageSource.getComponent("minecraft:equippable")) { return; }

  const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
  if (!heldItem) { return; }
  if (heldItem.typeId !== 'minecraft:mace') {
    return;
  }

  if (damage >= 100) damageSource.runCommandAsync('function adv/over_overkill/grant')

});