import { world, system, BlockPermutation, GameMode } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_fire_staff_on_hit_entity", {
    onHitEntity: eventData => {
      const damager = eventData.attackingEntity;
      const target = eventData.hitEntity;
      const itemUsed = eventData.itemStack;
      const { x, y, z } = target.location;
      const damagerEquippable = damager.getComponent("equippable");
      if (itemUsed.typeId === "nicothekid:piglin_fire_staff") {
        if (!target.matches({ excludeFamilies:[ "blaze", "magmacube", "strider", "fire_bird", "soul_fire_bird", "magma_golem", "nether_wisp", "nether_soul_wisp" ] })) {
          const pitchRange = Math.random() * (2.2 - 1.8) + 1.8;
          damager.dimension.playSound("mob.ghast.fireball", damager.location, { pitch: pitchRange, volume: 0.5 });
          if (target.typeId === "minecraft:blaze") {
            target.applyDamage( 2, { cause: "override", damagingEntity: damager });
            target.applyKnockback( x, z, 0.0, 0.0 );
            target.addEffect("instant_health", 2, {amplifier: 0, showParticles: false });
          }
          else {
            target.applyDamage( 3, { cause: "override", damagingEntity: damager });
            target.applyKnockback( x, z, 0.0, 0.0 );
            target.addEffect("instant_health", 2, {amplifier: 0, showParticles: false });
          }
        }
        else {
          target.setOnFire( 2, true );
        }
        const itemEnchantable = itemUsed.getComponent("enchantable");
        const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
        const breakChance = 100 / (unbreakingLevel + 1);
        const randomizeChance = Math.random() * 100;
        if (breakChance < randomizeChance) return;
        const itemDurability = itemUsed.getComponent("durability");
        if (!itemDurability) return;
        const itemMaxDurability = itemDurability.maxDurability
        const itemDurabilityDamage = itemDurability.damage
        const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
        let damageAmount = 0;
        if (damager.typeId === "minecraft:player") {
          if (!damager.matches({ gameMode: GameMode.creative })) {
            damageAmount = 2;
          }
          else return;
        }
        else {
          damageAmount = 1;
        };
        const currentDurability = durabilityCalculation - damageAmount;
        if (currentDurability <= 0) {
          damager.dimension.playSound("random.break", damager.location, { pitch: 0.9, volume: 1.0 });
          if (damager.typeId === "minecraft:player") {
            damagerEquippable.setEquipment("Mainhand", null);
          }
        }
        else {
          itemDurability.damage += damageAmount;
          if (damager.typeId === "minecraft:player") {
            damagerEquippable.setEquipment("Mainhand", itemUsed)
          }
        }
      }
      else return;
    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:piglin_fire_staff_on_use", {
    onUse: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      const playerEquippable = player.getComponent("equippable");
      function damageDurability () {
        if (!player.matches({ gameMode: GameMode.creative })) {
          const itemEnchantable = itemUsed.getComponent("minecraft:enchantable");
          const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
          const breakChance = 100 / (unbreakingLevel + 1);
          const randomizeChance = Math.random() * 100;
          if (breakChance < randomizeChance) return;
          const itemDurability = itemUsed.getComponent("durability");
          if (!itemDurability) return;
          const itemMaxDurability = itemDurability.maxDurability;
          const itemDurabilityDamage = itemDurability.damage;
          const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
          let damageAmount = 1;
          const currentDurability = durabilityCalculation - damageAmount;
          if (currentDurability <= 0) {
            player.playSound("random.break", { pitch: 0.9, location: player.location, volume: 1 });
            playerEquippable.setEquipment("Mainhand", null);
          }
          else {
            itemDurability.damage += damageAmount;
            playerEquippable.setEquipment("Mainhand", itemUsed)
          }
        }
      }
      if (itemUsed.typeId === "nicothekid:piglin_fire_staff") {
        const cooldown = itemUsed.getComponent("cooldown").getCooldownTicksRemaining(player);
        if (cooldown == 43) {
          let projectileEntity = player.dimension.spawnEntity("nicothekid:projectile_fire_spike_magic_missile", {
            x: player.location.x + (player.getViewDirection().x),
            y: player.location.y + 1.5 + (player.getViewDirection().y),
            z: player.location.z + (player.getViewDirection().z)
          });
          let projectileComponent = projectileEntity.getComponent("minecraft:projectile");
          let velocity = { x: player.getViewDirection().x, y: player.getViewDirection().y, z: player.getViewDirection().z };
          projectileComponent.owner = player;
          projectileComponent.shoot( velocity );
          player.playSound("mob.ghast.fireball", { pitch: 1.5, location: player.location, volume: 1.0 });
          player.playAnimation("attack");
          damageDurability ();
        }
      }
      else return;
    }
  });
});