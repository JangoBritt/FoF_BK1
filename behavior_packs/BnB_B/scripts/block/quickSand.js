import { world, system } from "@minecraft/server";

const quicksandBlockId = "wypnt_bab:quicksand";
const sinkSpeed = 0.0195;
const suffocationDamage = 1;
const damageInterval = 10;
const checkInterval = 1;
const damageDelay = 100;

const lastDamageTimes = new Map();
const entityEnteredTimes = new Map();

// Minecraft world Y boundaries (0–319 for modern versions)
const MIN_Y = 0;
const MAX_Y = 319;

function isInCreativeMode(player) {
  try {
    const gameMode = player.getComponent("minecraft:game_mode").value;
    return gameMode === "Creative";
  } catch (error) {
    return false;
  }
}

function isInFamily(entity, family) {
  try {
    const families = entity.getComponent("minecraft:is_family").value;
    return families.includes(family);
  } catch (error) {
    return false;
  }
}

function clampY(y) {
  return Math.max(MIN_Y, Math.min(MAX_Y, y));
}

function processEntity(entity, currentTime) {
  const entityLocation = entity.location;

  // Clamp Y for blockWithin
  const yWithin = clampY(Math.floor(entityLocation.y));
  const blockWithinLocation = {
    x: Math.floor(entityLocation.x),
    y: yWithin,
    z: Math.floor(entityLocation.z)
  };

  const blockWithin = world.getDimension("overworld").getBlock(blockWithinLocation);

  if (blockWithin && blockWithin.typeId === quicksandBlockId && !isInFamily(entity, "lightweight")) {
    const enteredTime = entityEnteredTimes.get(entity.id) || 0;

    if (!entityEnteredTimes.has(entity.id)) {
      entityEnteredTimes.set(entity.id, currentTime);
    } else if (currentTime - enteredTime >= damageDelay) {
      const lastDamageTime = lastDamageTimes.get(entity.id) || 0;

      if (currentTime - lastDamageTime >= damageInterval) {
        entity.runCommand(`damage @s ${suffocationDamage} override`);
        entity.runCommand(`effect @s blindness 3`);
        entity.runCommand(`effect @s slowness 2 5`);
        entity.runCommand(`particle wypnt_bab:quicksand ~~1~`);
        lastDamageTimes.set(entity.id, currentTime);
      }
    }
  } else {
    lastDamageTimes.delete(entity.id);
    entityEnteredTimes.delete(entity.id);
  }

  // Simulating sinking
  const yBelow = clampY(yWithin - 1);
  const blockBelowLocation = {
    x: Math.floor(entityLocation.x),
    y: yBelow,
    z: Math.floor(entityLocation.z)
  };
  const blockBelow = world.getDimension("overworld").getBlock(blockBelowLocation);
  if (blockBelow && blockBelow.typeId === quicksandBlockId && !isInFamily(entity, "lightweight")) {
    entity.teleport({
      x: entityLocation.x,
      y: entityLocation.y - sinkSpeed,
      z: entityLocation.z
    });
  }
}

system.runInterval(() => {
  const currentTime = system.currentTick;
  const players = world.getPlayers();
    // Only get entities that can interact with quicksand
    const entities = world.getDimension("overworld").getEntities({ excludeTypes: ["minecraft:item", "minecraft:arrow"] });

    for (const entity of [...players, ...entities]) {
    if (entity.typeId === "minecraft:player" && !isInCreativeMode(entity)) {
      processEntity(entity, currentTime);
    } else if (entity.typeId !== "minecraft:item" && entity.typeId !== "minecraft:arrow") {
      processEntity(entity, currentTime);
    }
  }
}, checkInterval);