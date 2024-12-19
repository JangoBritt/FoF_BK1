import { world, system, BlockPermutation, GameMode } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:curserer_staff_on_hit_entity", {
    onHitEntity: eventData => {
      const damager = eventData.attackingEntity;
      const target = eventData.hitEntity;
      const itemUsed = eventData.itemStack;
      const { x, y, z } = target.location;
      const damagerEquippable = damager.getComponent("equippable");
      if (itemUsed.typeId === "nicothekid:curserer_staff") {
        const itemEnchantable = itemUsed.getComponent("enchantable");
        const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
        const breakChance = 100 / (unbreakingLevel + 1);
        const randomizeChance = Math.random() * 100;
        if (breakChance < randomizeChance) return;
        const itemDurability = itemUsed.getComponent("durability");
        if (!itemDurability) return;
        const itemMaxDurability = itemDurability.maxDurability;
        const itemDurabilityDamage = itemDurability.damage;
        const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
        let damageAmount = 0;
        if (damager.typeId === "minecraft:player") {
          if (!damager.matches({ gameMode: GameMode.creative })) {
            const offhandItem = damagerEquippable.getEquipment("Offhand");
            if (offhandItem === undefined || offhandItem.typeId !== "nicothekid:book_of_curses") {
              damageAmount = 2;
            }
            else if (offhandItem.typeId === "nicothekid:book_of_curses") {
              damageAmount = 1;
            }
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
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:curserer_staff_on_use", {
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
      if (itemUsed.typeId === "nicothekid:curserer_staff") {
        const cooldown = itemUsed.getComponent("cooldown").getCooldownTicksRemaining(player);
        const offhandItem = playerEquippable.getEquipment("Offhand");
        if (offhandItem === undefined || offhandItem.typeId !== "nicothekid:book_of_curses") {
          if (cooldown == 43) {
            let projectileEntity = player.dimension.spawnEntity("nicothekid:projectile_curse_magic_missile",{
              x: player.location.x + (player.getViewDirection().x),
              y: player.location.y + 1.5 + (player.getViewDirection().y),
              z: player.location.z + (player.getViewDirection().z)
            });
            let projectileComponent = projectileEntity.getComponent("minecraft:projectile");
            let velocity = { x: player.getViewDirection().x, y: player.getViewDirection().y, z: player.getViewDirection().z };
            projectileComponent.owner = player;
            projectileComponent.shoot( velocity );
            player.playSound("mob.shulker.shoot", { pitch: 1.5, location: player.location, volume: 1.0 });
            player.playAnimation("attack");
            damageDurability ();
          }
        }
        else if (offhandItem.typeId === "nicothekid:book_of_curses") {
          if (cooldown == 43) {
            let projectileEntity = player.dimension.spawnEntity("nicothekid:projectile_curse_magic_missile_2",{
              x: player.location.x + (player.getViewDirection().x),
              y: player.location.y + 1.5 + (player.getViewDirection().y),
              z: player.location.z + (player.getViewDirection().z)
            });
            let projectileComponent = projectileEntity.getComponent("minecraft:projectile");
            let velocity = { x: player.getViewDirection().x, y: player.getViewDirection().y, z: player.getViewDirection().z };
            projectileComponent.owner = player;
            projectileComponent.shoot( velocity );
            player.playSound("mob.shulker.shoot", { pitch: 2.0, location: player.location, volume: 1.0 });
            player.playAnimation("attack");
            damageDurability ();
          }
        }
      }
      else return;
    }
  });
});