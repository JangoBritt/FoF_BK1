import { HAMMER_COMMON_BREAKABLE_BLOCKS } from "../common/vanillaBlocks";
import { THIRD_PARTY_BREAKABLE_BLOCKS } from "../common/customBlocks";
import { COPPER_BLOCKS } from "../common/copperBlocks";
/**
 * SECCION PARA DEFINIR LOS MARTILLO Y LOS TIPOS
 * DE MINERALES QUE PUEDE MINAR SEGUN EL MATERIAL
 * DEL QUE ESTEN HECHOS, LAS OTRAS LISTAS DE BLOQUES
 * SE AGREGAN POR SEPARADO PARA EVITAR MUCHAS LINEAS
 * 
 */

export const HAMMER_BLOCK_TYPES = {

   'nicothekid:piglin_war_hammer': [
      ...HAMMER_COMMON_BREAKABLE_BLOCKS,
      ...THIRD_PARTY_BREAKABLE_BLOCKS,
      ...COPPER_BLOCKS,
      'minecraft:coal_ore',
      'minecraft:copper_ore',
      'minecraft:iron_ore',
      'minecraft:gold_ore',
      'minecraft:lapis_ore',
      'minecraft:redstone_ore',
      'minecraft:lit_redstone_ore',
      'minecraft:emerald_ore',
      'minecraft:diamond_ore',
      'minecraft:deepslate_coal_ore',
      'minecraft:deepslate_copper_ore',
      'minecraft:deepslate_iron_ore',
      'minecraft:deepslate_gold_ore',
      'minecraft:deepslate_lapis_ore',
      'minecraft:deepslate_redstone_ore',
      'minecraft:lit_deepslate_redstone_ore',
      'minecraft:deepslate_emerald_ore',
      'minecraft:deepslate_diamond_ore',
      'minecraft:ancient_debris',
      'minecraft:nether_gold_ore',
      'minecraft:quartz_ore',
      'minecraft:obsidian',
      'minecraft:crying_obsidian',
   ]
};