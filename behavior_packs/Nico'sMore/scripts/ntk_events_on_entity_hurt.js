import { world, system, GameMode, ItemTypes } from "@minecraft/server";
import { magicalTypeFamily, spiritTypeFamily } from "./ntk_listing.js";

world.afterEvents.entityHurt.subscribe(eventData => {
  const target = eventData.hurtEntity;
  if (!target) return;
  const source = eventData.damageSource;
  const damageAmount = eventData.damagingProjectile;
  const damageType = source.cause;
  const damager = source.damagingEntity;
  if (!damager) return;
  const damagerProjectile = source.damagingProjectile;
  const targetTypeFamily = target.getComponent("minecraft:type_family");
  const targetHealth = target.getComponent("minecraft:health");
  const damagerHealth = damager.getComponent("minecraft:health");
  const damagerEquippable = damager.getComponent("equippable");
  if (!targetTypeFamily || !targetHealth) return;

  if (damagerProjectile) {
    const projectileFamily = damagerProjectile.getComponent("minecraft:type_family");
    if (!projectileFamily) return;
    const targetFamilies = targetTypeFamily.getTypeFamilies();
    // Projectile with Magical Scourge weapon effect:
    if (projectileFamily.hasTypeFamily("magical_scourge_1") && magicalTypeFamily.some(validFamily => targetFamilies.includes(validFamily)) ) {
      const currentHealth = targetHealth.currentValue;
      let effectDamage = 2;
      let expectedHealth = currentHealth - effectDamage;
      targetHealth.setCurrentValue(expectedHealth);
    }
    if (projectileFamily.hasTypeFamily("magical_scourge_2") && magicalTypeFamily.some(validFamily => targetFamilies.includes(validFamily)) ) {
      const currentHealth = targetHealth.currentValue;
      let effectDamage = 4;
      let expectedHealth = currentHealth - effectDamage;
      targetHealth.setCurrentValue(expectedHealth);
    }
  }
  if (damageType === "entityAttack") {
    // Hitting fire-elemental-type mobs with bare hands causes damage to the attacker:
    const fireElemental = [
      "minecraft:blaze",
      "nicothekid:fire_bird",
      "nicothekid:magma_golem",
      "nicothekid:nether_wisp",
      "nicothekid:nether_soul_wisp",
      "nicothekid:soul_fire_bird"
    ];
    if (fireElemental.includes(target.typeId)) {
      if (!damagerHealth || damager.getEffect("fire_resistance")) return;
      if (damager.typeId === "minecraft:player") {
        const itemUsed = damagerEquippable.getEquipment("Mainhand");
        if (itemUsed === undefined && !damager.matches({ gameMode: GameMode.creative })) {
          damager.applyDamage( 1, { cause: "fire", damagingEntity: target });
          const pitchRange = Math.random() * (2.4 - 0.8) + 0.8;
          damager.dimension.playSound("random.fizz", damager.location, { pitch: pitchRange, volume: 1.0 });
        }
      }
      else {
        const allItemIds = ItemTypes.getAll().map(item => item.id);
        /*try { 
          damager.runCommand(`testfor @s[hasitem={item=!${allItemIds}, location=slot.weapon.mainhand}]`);
        }
        catch {
          damager.applyDamage( 1, { cause: "fire", damagingEntity: target });
          const pitchRange = Math.random() * (2.4 - 0.8) + 0.8;
          damager.dimension.playSound("random.fizz", damager.location, { pitch: pitchRange, volume: 1.0 });
        }*/
      }
    }
    // world.sendMessage(`It's an entityAttack`);
  }
});
