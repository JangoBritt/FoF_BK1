import { world, system, BlockPermutation, GameMode } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_sledge_hammer_on_hit_entity", {
    onHitEntity: eventData => {
      const damager = eventData.attackingEntity;
      const target = eventData.hitEntity;
      const itemUsed = eventData.itemStack;
      const { x, y, z } = target.location;
      if (itemUsed.typeId === "nicothekid:piglin_sledge_hammer") {
        if (!target.matches({ excludeFamilies:[ "golem", "elder_golem", "irongolem", "snowgolem" ] })) {
          target.applyDamage( 5, { cause: "override", damagingEntity: damager });
          target.applyKnockback( x, z, 0.0, 0.0 );
          damager.addEffect("slowness", 80, {amplifier: 2, showParticles: false });
          damager.addEffect("weakness", 80, {amplifier: 4, showParticles: false });
          damager.dimension.playSound("item.nicothekid_piglin_sledge_hammer.use", damager.location, { pitch: 0.3, volume: 0.8 });
        }
        else {
          damager.addEffect("slowness", 80, {amplifier: 2, showParticles: false });
          damager.addEffect("weakness", 80, {amplifier: 4, showParticles: false });
          damager.dimension.playSound("item.nicothekid_piglin_sledge_hammer.use", damager.location, { pitch: 0.5, volume: 0.8 });
        }
      }
      else return;
    }
  });
});