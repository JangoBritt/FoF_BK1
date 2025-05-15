import { world, system, BlockPermutation, GameMode } from "@minecraft/server";
import { magicalTypeFamily, spiritTypeFamily, instantDiggableBlocks } from "../../ntk_listing.js";
import { damageItemDurability, shootProjectile } from "../../ntk_functions.js";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:curserer_staff_on_hit_entity", {
    onHitEntity: eventData => {
      const damager = eventData.attackingEntity;
      const target = eventData.hitEntity;
      const itemUsed = eventData.itemStack;
      if (target === undefined || itemUsed === undefined) return;
      const { x, y, z } = target.location;
      const damagerEquippable = damager.getComponent("equippable");
      const offhandItem = damagerEquippable.getEquipment("Offhand");
      
      if (itemUsed.typeId === "nicothekid:curserer_staff") {
        // Spirit Piercer:
        //  Magical Scourge:
        if (!target.matches({ excludeFamilies: magicalTypeFamily })) {
          const targetHealth = target.getComponent("minecraft:health");
          const currentHealth = targetHealth.currentValue;
          let damageEffect = 0;
          if (offhandItem === undefined || offhandItem.typeId !== "nicothekid:book_of_curses") {
            damageEffect = 2; // Level I
          }
          else if (offhandItem.typeId === "nicothekid:book_of_curses") {
            damageEffect = 4; // Level II
          }
          let expectedHealth = currentHealth - damageEffect;
          targetHealth.setCurrentValue(expectedHealth);
        }
        // Durabilty Damage:
        let damageAmount = 0;
        if (offhandItem === undefined || offhandItem.typeId !== "nicothekid:book_of_curses") {
          damageAmount = 2;
        }
        else if (offhandItem.typeId === "nicothekid:book_of_curses") {
          damageAmount = 1;
        }
        damageItemDurability(damager, itemUsed, damageAmount, "Mainhand");
      }
      else return;
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:curserer_staff_on_mine_block", {
    onMineBlock: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      const block = eventData.block;
      const blockPermutation = eventData.minedBlockPermutation;
      const playerEquippable = player.getComponent("equippable");
      
      if (itemUsed.typeId === "nicothekid:curserer_staff") {
        const offhandItem = playerEquippable.getEquipment("Offhand");
        let damageAmount = 0;
        if (offhandItem === undefined || offhandItem.typeId !== "nicothekid:book_of_curses") {
          damageAmount = 2;
        }
        else if (offhandItem.typeId === "nicothekid:book_of_curses") {
          damageAmount = 1;
        }
        
        if (!instantDiggableBlocks.includes(blockPermutation.type.id) && !blockPermutation.hasTag("nicothekid:instant_diggable")) {
          damageItemDurability(player, itemUsed, damageAmount, "Mainhand");
        }
        else return;
      }
      else return;
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:curserer_staff_on_use", {
    onUse: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      const playerEquippable = player.getComponent("equippable");
      
      if (itemUsed.typeId === "nicothekid:curserer_staff") {
        const cooldown = itemUsed.getComponent("cooldown").getCooldownTicksRemaining(player);
        const offhandItem = playerEquippable.getEquipment("Offhand");
        if (!player.isSneaking) {
          if (offhandItem === undefined || offhandItem.typeId !== "nicothekid:book_of_curses") {
            if (cooldown == 29) {
              shootProjectile("nicothekid:projectile_curse_magic_missile", player, "ominous_item_spawner.spawn_item_begin", 1.0);
              damageItemDurability(player, itemUsed, 1, "Mainhand");
            }
          }
          else if (offhandItem.typeId === "nicothekid:book_of_curses") {
            if (cooldown == 29) {
              shootProjectile("nicothekid:projectile_curse_magic_missile", player, "ominous_item_spawner.spawn_item_begin", 1.0);
              damageItemDurability(player, itemUsed, 1, "Mainhand");
            }
          }
        }
        else {
          if (cooldown == 29) {
            system.runTimeout(() => {
              player.startItemCooldown("curserer_staff", 0 );
              return;
            }, 10);
          }
        }
      }
      else return;
    }
  });
});