import { Direction } from "@minecraft/server";
import { handleNormalBreak, handleSilkTouch } from "./enchantmentTypes";

/**
 * FUNCION PARA ROMPER 3x3 SEGUN LA DIRECCION
 * DEL JUGADOR Y APLICAR LOS ENCANTAMIENTOS
 * 
 * DE MOMENTO SOLO FUNCIONA CON LOS PRINCIPALES
 * LOS CUALES SON @TOQUE_DE_SEDA Y @FORTUNA
 * 
 *  ¡NO TOCAR DE NO SER NECESARIO!
 */

export function break3x3Area(centerBlock, player, breakableBlocks, fortuneLevel, hasSilkTouch) {
   const dimension = centerBlock.dimension;
   const centerLocation = centerBlock.location;
   const blockFace = player.getBlockFromViewDirection().face;

   const offsets = getOffsets(blockFace);

   for (const offset of offsets) {
      const currentLocation = {
         x: centerLocation.x + offset.x,
         y: centerLocation.y + offset.y,
         z: centerLocation.z + offset.z
      };

      const currentBlock = dimension.getBlock(currentLocation);
      if (currentBlock && breakableBlocks.includes(currentBlock.typeId)) {
         if (hasSilkTouch) {
            handleSilkTouch(dimension, currentLocation, currentBlock, currentLocation.x === centerLocation.x && currentLocation.y === centerLocation.y && currentLocation.z === centerLocation.z);
         } else {
            handleNormalBreak(dimension, currentLocation, currentBlock, fortuneLevel);
         }
      }
   }
}

function getOffsets(blockFace) {
   switch (blockFace) {
      case Direction.North:
      case Direction.South:
         return [
            { x: -1, y: 1, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 0 },
            { x: -1, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 },
            { x: -1, y: -1, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }
         ];
      case Direction.East:
      case Direction.West:
         return [
            { x: 0, y: 1, z: -1 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 1, z: 1 },
            { x: 0, y: 0, z: -1 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 },
            { x: 0, y: -1, z: -1 }, { x: 0, y: -1, z: 0 }, { x: 0, y: -1, z: 1 }
         ];
      case Direction.Up:
      case Direction.Down:
         return [
            { x: -1, y: 0, z: -1 }, { x: 0, y: 0, z: -1 }, { x: 1, y: 0, z: -1 },
            { x: -1, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 },
            { x: -1, y: 0, z: 1 }, { x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 1 }
         ];
   }
}

export function breakEntireTree(centerBlock, player, breakableBlocks, fortuneLevel, hasSilkTouch) {
   const dimension = centerBlock.dimension;
   const blocksToBreak = findConnectedWoodBlocks(centerBlock, breakableBlocks);

   for (const blockLocation of blocksToBreak) {
      const currentBlock = dimension.getBlock(blockLocation);
      if (currentBlock && breakableBlocks.includes(currentBlock.typeId)) {
         if (hasSilkTouch) {
            handleSilkTouch(dimension, blockLocation, currentBlock, false);
         } else {
            handleNormalBreak(dimension, blockLocation, currentBlock, fortuneLevel);
         }
      }
   }
}

function findConnectedWoodBlocks(startBlock, breakableBlocks, maxDistance = 20) {
   const blocksToCheck = [startBlock.location];
   const checkedBlocks = new Set();
   const connectedBlocks = [];

   while (blocksToCheck.length > 0) {
      const currentLocation = blocksToCheck.pop();
      const locationString = `${currentLocation.x},${currentLocation.y},${currentLocation.z}`;

      if (checkedBlocks.has(locationString)) continue;
      checkedBlocks.add(locationString);

      const currentBlock = startBlock.dimension.getBlock(currentLocation);
      if (currentBlock && breakableBlocks.includes(currentBlock.typeId)) {
         connectedBlocks.push(currentLocation);

         for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
               for (let dz = -1; dz <= 1; dz++) {
                  if (dx === 0 && dy === 0 && dz === 0) continue;

                  const newLocation = {
                     x: currentLocation.x + dx,
                     y: currentLocation.y + dy,
                     z: currentLocation.z + dz
                  };

                  if (Math.abs(newLocation.x - startBlock.location.x) <= maxDistance &&
                     Math.abs(newLocation.y - startBlock.location.y) <= maxDistance &&
                     Math.abs(newLocation.z - startBlock.location.z) <= maxDistance) {
                     blocksToCheck.push(newLocation);
                  }
               }
            }
         }
      }
   }

   return connectedBlocks;
}

export function convertToPath(block) {
   const dimension = block.dimension;
   const blockLocation = block.location;

   for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
         const currentLocation = {
            x: Math.floor(blockLocation.x + dx),
            y: Math.floor(blockLocation.y),
            z: Math.floor(blockLocation.z + dz)
         };

         const currentBlock = dimension.getBlock(currentLocation);
         if (currentBlock && (currentBlock.typeId.includes('grass_') || currentBlock.typeId.includes('dirt') || currentBlock.typeId.includes('mycelium'))) {
            dimension.runCommandAsync(`setblock ${currentLocation.x} ${currentLocation.y} ${currentLocation.z} grass_path`);
         }
      }
   }
}

export function convertToFarmland(block) {
   const dimension = block.dimension;
   const blockLocation = block.location;

   for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
         const currentLocation = {
            x: Math.floor(blockLocation.x + dx),
            y: Math.floor(blockLocation.y),
            z: Math.floor(blockLocation.z + dz)
         };

         const currentBlock = dimension.getBlock(currentLocation);
         if (currentBlock && (currentBlock.typeId.includes('grass_') || currentBlock.typeId.includes('dirt') || currentBlock.typeId.includes('mycelium'))) {
            dimension.runCommandAsync(`setblock ${currentLocation.x} ${currentLocation.y} ${currentLocation.z} farmland`);
            
         }
      }
   }
}