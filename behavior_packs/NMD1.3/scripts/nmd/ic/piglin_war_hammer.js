import { world, system, BlockPermutation, GameMode } from "@minecraft/server";
import { earthElementalTypeFamily, instantDiggableBlocks } from "../../ntk_listing.js";
import { damageItemDurability, damageItemDurabilityFixer } from "../../ntk_functions.js";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_war_hammer_on_hit_entity", {
    onHitEntity: eventData => {
      const damager = eventData.attackingEntity;
      const target = eventData.hitEntity;
      const itemUsed = eventData.itemStack;
      if (target === undefined || itemUsed === undefined) return;
      const { x, y, z } = target.location;
      const damagerEquippable = damager.getComponent("equippable");
      
      if (itemUsed.typeId === "nicothekid:piglin_war_hammer") {
        if (target.matches({ excludeFamilies: [ "spirit" ] })) {
          // Usaged Effect:
          if (!damager.getEffect("weakness")) {
            damager.dimension.playSound("trial_spawner.charge_activate", damager.location, { pitch: 1.1, volume: 1.0 });
          }
          damager.addEffect("slowness", 80, { amplifier: 2, showParticles: false });
          damager.addEffect("weakness", 80, { amplifier: 5, showParticles: false });
          // Earth Bane:
          if (!target.matches({ excludeFamilies: earthElementalTypeFamily })) {
            const targetHealth = target.getComponent("minecraft:health");
            const currentHealth = targetHealth.currentValue;
            let damageEffect = 6; // Level III
            let expectedHealth = currentHealth - damageEffect;
            targetHealth.setCurrentValue(expectedHealth);
          }
          // Durabilty Damage:
          damageItemDurabilityFixer(damager, itemUsed, 1, "Mainhand");
        };
      }
      else return;
    }
  });
  // initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_war_hammer_on_mine_block", {
  //   onMineBlock: eventData => {
  //     const player = eventData.source;
  //     const itemUsed = eventData.itemStack;
  //     const block = eventData.block;
  //     const blockPermutation = eventData.minedBlockPermutation;
  //     const playerEquippable = player.getComponent("equippable");
      
  //     if (itemUsed.typeId === "nicothekid:piglin_war_hammer") {
  //       if (!instantDiggableBlocks.includes(blockPermutation.type.id) && !blockPermutation.hasTag("nicothekid:instant_diggable")) {
  //         damageItemDurability(player, itemUsed, 1, "Mainhand");
  //       }
  //       else return;
  //     }
  //     else return;
  //   }
  // });
});