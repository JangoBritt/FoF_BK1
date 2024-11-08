import { world } from "@minecraft/server";

// This is a Set containing a collection of valid effect types.
const validEffectTypes = new Set([
  "absorption", "bad_omen", "blindness", "clear", "conduit_power", "darkness",
  "fatal_poison", "fire_resistance", "haste", "health_boost", "hunger", 
  "instant_damage", "instant_health", "invisibility", "jump_boost", 
  "levitation", "mining_fatigue", "nausea", "night_vision", "poison", 
  "regeneration", "resistance", "saturation", "slow_falling", "slowness", 
  "speed", "strength", "village_hero", "water_breathing", "weakness", "wither"
]);

/**
 * Object array defining the tools, along with the effect(s) and modifiers assigned to them.
 * 
 * toolTypeId: string; - The typeId of the tool.
 * effects: {
 *      effectType: string; - The type of effect applied by the tool.
 *      duration: number; - The duration of the effect applied by the tool in seconds.
 *      amplifier: number; - The amplifier of the effect applied by the tool.
 *      showParticles: boolean; - Indicates whether particles are shown for the effect.
 * }[];
 * 
 */
const toolEffects  = [
  {
    toolTypeId: "korbon:stinger_knife",
    effects: [
      { effectType: "fatal_poison", duration: 4, amplifier: 2, showParticles: false }
    ]
  }
];

world.afterEvents.entityHitEntity.subscribe(evd => {
  const { damagingEntity, hitEntity } = evd;

  // This returns if the damagingEntity is not a player.
  if (damagingEntity.typeId !== 'minecraft:player') return;

  // This retrieves the damaging entity's equippable component.
  const playerEquippableComp = damagingEntity.getComponent("equippable");

  // This returns if playerEquippableComp is undefined.
  if (!playerEquippableComp) return;

  // This retrieves the item held by the damaging entity.
  const heldItem = playerEquippableComp.getEquipment("Mainhand");

  // This returns if heldItem is undefined.
  if (!heldItem) return;

  // This searches for a tool in the toolEffects array matching the held item.
  const foundTool = toolEffects.find(tool => tool.toolTypeId === heldItem.typeId);
  // If the tool is within the toolEffects array, then it will apply the effect(s) and modifiers assigned to the heldItem to the entity that was hit.
  if (foundTool) {
    foundTool.effects.forEach(effectInfo => {
      const { effectType, duration, amplifier, showParticles } = effectInfo;


      // This returns if effectType is invalid.
      if (!validEffectTypes.has(effectType)) return console.error(`§cError:§r §7Invalid effect type '§r${effectType}§7' detected.`);

      // This converts duration from seconds into ticks.
      const durationInTicks = 20 * duration;
      // This returns if durationValue is not within a valid range (1 to 20,000,000 ticks).
      // The error message is based on the duration in seconds.
      if (durationInTicks < 1 || durationInTicks > 20000000) return console.error(`§cError:§r §7Duration value '§r${duration}§7' is not within the valid range (0 to 1,000,000 seconds).`);

      // This returns if amplifierValue is not within a valid range (0 to 255).
      if (amplifier < 0 || amplifier > 255) return console.error(`§cError:§r §7Amplifier value '§r${amplifier}§7' is not within the valid range (0 to 255).`);

      // This returns if the showParticles value is not a boolean.
      if (typeof showParticles !== 'boolean') return console.error(`§cError:§r §7Invalid value '§r${showParticles}§7' for showParticles. It must be a boolean type (true or false).`);


      hitEntity.addEffect(effectType, durationInTicks, { amplifier, showParticles });
    });
  }
});