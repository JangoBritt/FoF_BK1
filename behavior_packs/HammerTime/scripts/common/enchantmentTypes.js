import { system, ItemStack } from "@minecraft/server";
import { BLOCK_DROPS } from "./blockDrops";

/**
 * FUNCIONES PARA APLICAR LOS ENCANTAMIENTOS DE @FORTUNA Y @TOQUE_DE_SEDA
 * CONTIENE CALCULO DE DROPS SEGUN EL NIVEL DEL ENCANTAMIENTO
 */

export function handleSilkTouch(dimension, location, block, isFirstBlock) {
   const blockType = block.typeId;
   dimension.runCommandAsync(`setblock ${location.x} ${location.y} ${location.z} air replace`);

   if (!isFirstBlock) {
      system.run(() => {
         const newBlock = new ItemStack(blockType);
         dimension.spawnItem(newBlock, location);
      });
   }
}

export function handleNormalBreak(dimension, location, block, fortuneLevel) {
   dimension.runCommandAsync(`setblock ${location.x} ${location.y} ${location.z} air destroy`);

   if (BLOCK_DROPS[block.typeId] && fortuneLevel > 0) {
      handleFortuneDrops(dimension, location, block, fortuneLevel);
   }
}

function handleFortuneDrops(dimension, location, block, fortuneLevel) {
   const dropType = BLOCK_DROPS[block.typeId];

   if (dropType) {
      const dropCount = calculateFortuneDrops(fortuneLevel);

      for (let i = 0; i < dropCount; i++) {
         system.run(() => {
            const newItem = new ItemStack(dropType);
            dimension.spawnItem(newItem, location);
         });
      }
   }
}

function calculateFortuneDrops(fortuneLevel) {
   if (fortuneLevel === 0) return 1;

   const baseChance = 0.33;
   const random = Math.random();

   for (let i = 0; i < fortuneLevel; i++) {
      if (random < baseChance * (i + 1)) {
         return i + 2;
      }
   }
   return 1;
}