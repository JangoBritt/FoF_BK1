import { world, system, BlockPermutation, ItemStack, GameMode } from "@minecraft/server";

export function damageItemDurability(entity, item, amount, slot) {
  if (!item) return;
  if (entity.typeId === "minecraft:player" && entity.matches({ gameMode: GameMode.creative })) return;
  const entityEquippable = entity.getComponent("equippable");
  if (!entityEquippable) return;
  const itemDurability = item.getComponent("durability");
  const itemEnchantable = item.getComponent("enchantable");
  if (!itemDurability) return;
  if (itemEnchantable) {
    const unbreaking = itemEnchantable.getEnchantment("unbreaking");
    if (unbreaking) {
      const level = unbreaking.level ?? 0;
      const breakChance = 100 / (level + 1);
      if (Math.random() * 100 > breakChance) return;
    }
  }
  // Durabality Calculation:
  const itemMaxDurability = itemDurability.maxDurability;
  const itemDurabilityDamage = itemDurability.damage;
  const remainingDurability = itemMaxDurability - itemDurabilityDamage;
  const calculatedDurability = remainingDurability - amount;
  // Break item if exceeded durability:
  if (calculatedDurability <= 0) {
    entity.playSound("random.break", { pitch: 0.9, location: entity.location, volume: 1.0 });
    entityEquippable.setEquipment(slot, null);
  }
  else {
    itemDurability.damage += amount;
    entityEquippable.setEquipment(slot, item);
  }
}

export function damageItemDurabilityFixer(entity, item, amount, slot) {
  if (!item) return;
  if (entity.typeId === "minecraft:player" && entity.matches({ gameMode: GameMode.creative })) return;
  const entityEquippable = entity.getComponent("equippable");
  if (!entityEquippable) return;
  const itemDurability = item.getComponent("durability");
  const itemEnchantable = item.getComponent("enchantable");
  if (!itemDurability) return;
  if (itemEnchantable) {
    const unbreaking = itemEnchantable.getEnchantment("unbreaking");
    if (unbreaking) {
      const level = unbreaking.level ?? 0;
      const breakChance = 100 / (level + 1);
      if (Math.random() * 100 > breakChance) return;
    }
  }
  // Durabality Calculation:
  const itemMaxDurability = itemDurability.maxDurability;
  const itemDurabilityDamage = itemDurability.damage;
  const remainingDurability = itemMaxDurability - itemDurabilityDamage;
  const calculatedDurability = remainingDurability + amount;
  // Break item if exceeded durability:
  if (calculatedDurability <= 0) {
    entity.playSound("random.break", { pitch: 0.9, location: entity.location, volume: 1.0 });
    entityEquippable.setEquipment(slot, null);
  }
  else {
    itemDurability.damage -= amount;
    entityEquippable.setEquipment(slot, item);
  }
}

export function decreaseItemStack(entity, item, decreaseAmount, slot) {
  if (!item) return;
  const entityEquippable = entity.getComponent("equippable");
  if (!entityEquippable) return;
  if (entity.typeId === "minecraft:player" && entity.matches({ gameMode: GameMode.creative })) return;

  if (item.amount <= decreaseAmount) {
    entityEquippable.setEquipment(slot, undefined);
  }
  else {
    const newItem = item.clone();
    newItem.amount -= decreaseAmount;
    entityEquippable.setEquipment(slot, newItem);
  }
}

export function changeItem(entity, item, newItemType, stackAmount, slot) {
  if (!item) return;
  const entityEquippable = entity.getComponent("equippable");
  if (!entityEquippable) return;
  const isCreative = entity.typeId === "minecraft:player" && entity.matches({ gameMode: GameMode.creative });
  const newItem = new ItemStack(newItemType, stackAmount);
  if (isCreative) {
    entity.dimension.spawnItem(newItem, entity.location);
    return;
  }
  entityEquippable.setEquipment(slot, newItem);
}

export function spawnItem(source, newItemType, amount) {
  const newItem = new ItemStack (newItemType, amount);
  source.dimension.spawnItem(newItem, { x: source.location.x + 0.5, y: source.location.y + 1.0, z: source.location.z + 0.5 });
}

export function dropsOnDestroy(entity, block, item, dropItemType, amount, dropXP) {
  if (!item || entity.matches({ gameMode: GameMode.creative }) || amount <= 0) return;
  const itemEnchantable = item.getComponent("enchantable");
  const dropLocation = {
    x: block.location.x + 0.5,
    y: block.location.y + 0.5,
    z: block.location.z + 0.5,
  };
  let finalAmount = amount;
  if (itemEnchantable) {
    const silkTouch = itemEnchantable.getEnchantment("silk_touch");
    if (silkTouch) return;
    const fortune = itemEnchantable.getEnchantment("fortune");
    if (fortune) {
      switch (fortune.level) {
        case 1:
          finalAmount = Math.floor(Math.random() * 2 + amount);
          break;
        case 2:
          finalAmount = Math.floor(Math.random() * 3 + amount);
          break;
        case 3:
          finalAmount = Math.floor(Math.random() * 4 + amount);
          break;
        default:
          finalAmount = amount;
      }
    }
  }
  else {
    finalAmount = amount;
  }
  const droppedItem = new ItemStack(dropItemType, finalAmount);
  block.dimension.spawnItem(droppedItem, dropLocation);
  if (dropXP) {
    block.dimension.spawnEntity("minecraft:xp_orb", dropLocation);
  }
}

export function shootProjectile(projectileName, entity, sound, pitchRange) {
  let projectileEntity = entity.dimension.spawnEntity(projectileName, { x: entity.location.x + (entity.getViewDirection().x), y: entity.location.y + 1.5 + (entity.getViewDirection().y), z: entity.location.z + (entity.getViewDirection().z)});
  let projectileComponent = projectileEntity.getComponent("minecraft:projectile");
  let velocity = { x: entity.getViewDirection().x, y: entity.getViewDirection().y, z: entity.getViewDirection().z };
  projectileComponent.owner = entity;
  projectileComponent.shoot(velocity);
  entity.dimension.playSound(sound, entity.location, { pitch: pitchRange, volume: 1.5 });
  entity.playAnimation("animation.player.first_person.attack_rotation_item");
}

export function detectNearbyEntities(origin, dimension, radius) {
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dz = -radius; dz <= radius; dz++) {
        const areaLocation = {
          x: origin.location.x + dx,
          y: origin.location.y + dy,
          z: origin.location.z + dz
        };
        const nearEntities = world.getDimension(dimension).getEntities(areaLocation);
        if (nearEntities !== undefined && nearEntities.length > 0) {
          return true;
        }
      }
    }
  }
  return false;
}
      
      