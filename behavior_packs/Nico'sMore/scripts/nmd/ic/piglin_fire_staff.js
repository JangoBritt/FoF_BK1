import { world, system, BlockPermutation, GameMode } from "@minecraft/server";
import { fireElementalTypeFamily, instantDiggableBlocks } from "../../ntk_listing.js";
import { damageItemDurability, shootProjectile } from "../../ntk_functions.js";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_fire_staff_on_hit_entity", {
    onHitEntity: eventData => {
      const damager = eventData.attackingEntity;
      const target = eventData.hitEntity;
      const itemUsed = eventData.itemStack;
      if (target === undefined) return;
      const { x, y, z } = target.location;
      const damagerEquippable = damager.getComponent("equippable");
      
      if (itemUsed.typeId === "nicothekid:piglin_fire_staff") {
        if (target.matches({ excludeFamilies: [ "spirit" ] })) {
          // Fire Aspect:
          if (!target.matches({ excludeFamilies: fireElementalTypeFamily })) {
            const targetHealth = target.getComponent("minecraft:health");
            const currentHealth = targetHealth.currentValue;
            let restoreEffect = 0;
            let expectedHealth = currentHealth + restoreEffect;
            targetHealth.setCurrentValue(expectedHealth);
          }
          else {
            target.setOnFire( 4, true ); // Level I
          }
          // Durabilty Damage:
          damageItemDurability(damager, itemUsed, 1, "Mainhand");
        };
      }
      else return;
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_fire_staff_on_mine_block", {
    onMineBlock: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      const block = eventData.block;
      const blockPermutation = eventData.minedBlockPermutation;
      const playerEquippable = player.getComponent("equippable");
      
      if (itemUsed.typeId === "nicothekid:piglin_fire_staff") {
        if (!instantDiggableBlocks.includes(blockPermutation.type.id) && !blockPermutation.hasTag("nicothekid:instant_diggable")) {
          damageItemDurability(player, itemUsed, 2, "Mainhand");
        }
        else return;
      }
      else return;
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_fire_staff_on_use", {
    onUse: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      const playerEquippable = player.getComponent("equippable");
      
      if (itemUsed.typeId === "nicothekid:piglin_fire_staff") {
        const cooldown = itemUsed.getComponent("cooldown").getCooldownTicksRemaining(player);
        if (!player.isSneaking) {
          if (cooldown == 23) {
            shootProjectile("nicothekid:projectile_fire_spike_magic_missile", player, "mob.ghast.fireball", 2.0);
            damageItemDurability(player, itemUsed, 1, "Mainhand");
          }
        }
        else {
          if (cooldown == 23) {
            system.runTimeout(() => {
              player.startItemCooldown("piglin_fire_staff", 0 );
              return;
            }, 10);
          }
        }
      }
      else return;
    }
  });
});