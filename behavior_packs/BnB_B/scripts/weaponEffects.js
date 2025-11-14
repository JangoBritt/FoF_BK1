import { world, EquipmentSlot } from "@minecraft/server";

const validEffectTypes = new Set([
  "absorption", "bad_omen", "blindness", "clear", "conduit_power", "darkness",
  "fatal_poison", "fire_resistance", "haste", "health_boost", "hunger", 
  "instant_damage", "instant_health", "invisibility", "jump_boost", 
  "levitation", "mining_fatigue", "nausea", "night_vision", "poison", 
  "regeneration", "resistance", "saturation", "slow_falling", "slowness", 
  "speed", "strength", "village_hero", "water_breathing", "weakness", "wither"
]);

const toolEffects = [
  {
    toolTypeId: "wypnt_bab:gold_khopesh",
    effects: [
      { 
        effectType: "instant_damage", 
        duration: 1, 
        amplifier: 0, 
        showParticles: true, 
        target: "attacked", 
        chance: 50,
        targetType: "mob",
        excludeMonsters: ["minecraft:zombie", "minecraft:skeleton"],
        familyTags: ["monster"]
      },
    ]
  }
];

world.afterEvents.entityHitEntity.subscribe(evd => {
  const { damagingEntity, hitEntity } = evd;
  if (damagingEntity.typeId !== 'minecraft:player') return;

  const playerEquippableComp = damagingEntity.getComponent("equippable");
  if (!playerEquippableComp) return;

  const heldItem = playerEquippableComp.getEquipment(EquipmentSlot.Mainhand);
  if (!heldItem) return;

  const foundTool = toolEffects.find(tool => tool.toolTypeId === heldItem.typeId);
  if (!foundTool) return;

  for (const effectInfo of foundTool.effects) {
    const { effectType, duration, amplifier, showParticles, target, chance, targetType, excludeMonsters, familyTags } = effectInfo;
    if (!validEffectTypes.has(effectType)) continue;
    const durationInTicks = 20 * duration;
    if (durationInTicks < 1 || durationInTicks > 20000000) continue;
    if (amplifier < 0 || amplifier > 255) continue;
    if (typeof showParticles !== 'boolean') continue;

    if (Math.random() * 100 < chance) {
      let targetEntity = null;
      if (
        (!excludeMonsters.includes(hitEntity.typeId)) &&
        !(familyTags && familyTags.some(tag => typeof tag === "string" && hitEntity.hasTag(tag)))
      ) {
        if (targetType === "player" && hitEntity.typeId === 'minecraft:player') {
          targetEntity = hitEntity;
        } else if (targetType === "mob" && hitEntity.typeId !== 'minecraft:player') {
          targetEntity = hitEntity;
        } else if (targetType === "all") {
          targetEntity = hitEntity;
        }
        if (targetEntity) {
          const targetToApply = target === "attacker" ? damagingEntity : targetEntity;
          targetToApply.addEffect(effectType, durationInTicks, { amplifier, showParticles });
        }
      }
    }
  }
});
