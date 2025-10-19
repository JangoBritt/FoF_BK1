import { world, system, BlockPermutation, ItemStack, GameMode } from "@minecraft/server";

world.beforeEvents.itemUseOn.subscribe(eventData => {
  const player = eventData.source;
  const itemUsed = eventData.itemStack;
  const block = eventData.block;
  const blockLocation = block.location;
  const playerEquippable = player.getComponent("equippable");
  const stateAll = block.permutation.getAllStates();
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
  if (itemUsed === undefined) return;
  if (itemUsed.hasTag("minecraft:is_axe") || itemUsed.hasTag("minecraft:is_hoe") || itemUsed.hasTag("minecraft:is_shovel")) {
    if (itemUsed.hasTag("minecraft:is_axe")) {
      const customCopper = [
        "nicothekid:exposed_copper_lantern",
        "nicothekid:oxidized_copper_lantern",
        "nicothekid:weathered_copper_lantern"
      ]
      const customWaxedCopper = [
        "nicothekid:waxed_copper_lantern",
        "nicothekid:waxed_exposed_copper_lantern",
        "nicothekid:waxed_oxidized_copper_lantern",
        "nicothekid:waxed_weathered_copper_lantern"
      ]
      if (customCopper.includes(block.typeId)) {
        system.run(() => {
          const pitchRange = Math.random() * (1.2 - 0.8) + 0.8;
          damageDurability ();
          block.dimension.playSound("scrape", blockLocation, { pitch: pitchRange, volume: 1.0 });
          block.dimension.spawnParticle("nicothekid:copper_scrape_particle", blockLocation);
          
          if (block.permutation.matches("nicothekid:exposed_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern", stateAll ));
          }
          if (block.permutation.matches("nicothekid:weathered_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:exposed_copper_lantern", stateAll ));
          }
          if (block.permutation.matches("nicothekid:oxidized_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:weathered_copper_lantern", stateAll ));
          }
        });
      }
      if (customWaxedCopper.includes(block.typeId)) {
        system.run(() => {
          const pitchRange = Math.random() * (1.2 - 0.8) + 0.8;
          damageDurability ();
          block.dimension.playSound("copper.wax.off", blockLocation, { pitch: pitchRange, volume: 1.0 });
          block.dimension.spawnParticle("nicothekid:copper_wax_off_particle", blockLocation);

          if (block.permutation.matches("nicothekid:waxed_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern", stateAll ));
          }
          if (block.permutation.matches("nicothekid:waxed_exposed_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:exposed_copper_lantern", stateAll ));
          }
          if (block.permutation.matches("nicothekid:waxed_weathered_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:weathered_copper_lantern", stateAll ));
          }
          if (block.permutation.matches("nicothekid:waxed_oxidized_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:oxidized_copper_lantern", stateAll ));
          }
        });
      }
    }
  }
  else return;
});
