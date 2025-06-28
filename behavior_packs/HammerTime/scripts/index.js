import { world, EquipmentSlot, EntityEquippableComponent, ItemStack, system } from '@minecraft/server';
import { break3x3Area, breakEntireTree, convertToPath, convertToFarmland } from './common/blockBreaker';
import { HAMMER_BLOCK_TYPES } from './tools/hammerTypes';
import { SHOVEL_BLOCK_TYPES } from './tools/shovelTypes';
import { AXE_BLOCK_TYPES } from './tools/axeTypes';
import { HOE_BLOCK_TYPES } from './tools/hoeTypes';

world.beforeEvents.playerBreakBlock.subscribe(({ block, player }) => {
   try{
      const component = player.getComponent(EntityEquippableComponent.componentId);
      const tool = component.getEquipment(EquipmentSlot.Mainhand);

      if (tool && !player.isSneaking) {
         const enchantments = tool.getComponent('enchantable');
         const fortuneLevel = enchantments.hasEnchantment('fortune') ? enchantments.getEnchantment('fortune').level : 0;
         const hasSilkTouch = enchantments.hasEnchantment('silk_touch');

         const shovelBreakableBlocks = SHOVEL_BLOCK_TYPES[tool.typeId];
         const hammerBreakableBlocks = HAMMER_BLOCK_TYPES[tool.typeId];
         const axeBreakableBlocks = AXE_BLOCK_TYPES[tool.typeId];
         const hoeBreakableBlocks = HOE_BLOCK_TYPES[tool.typeId];

         Durability(tool, player)

         if (hammerBreakableBlocks && hammerBreakableBlocks.includes(block.typeId)) {
            break3x3Area(block, player, hammerBreakableBlocks, fortuneLevel, hasSilkTouch);
         } else if (shovelBreakableBlocks && shovelBreakableBlocks.includes(block.typeId)) {
            break3x3Area(block, player, shovelBreakableBlocks, fortuneLevel, hasSilkTouch);
         } else if (axeBreakableBlocks && axeBreakableBlocks.includes(block.typeId)) {
            breakEntireTree(block, player, axeBreakableBlocks, fortuneLevel, hasSilkTouch);
         } else if (hoeBreakableBlocks && hoeBreakableBlocks.includes(block.typeId)) {
            break3x3Area(block, player, hoeBreakableBlocks, fortuneLevel, hasSilkTouch);
         }
      }
   }catch(e){

   }
});

export function Durability(tool, source) {
   system.run(()=>{
      const component = source.getComponent(EntityEquippableComponent.componentId);

      if(tool.typeId.includes("_hammer") || tool.typeId.includes("_great_") || tool.typeId.includes("_sickle")){
         const durability = tool.getComponent("durability");
         if (durability !== undefined) {
            if(durability.damage < durability.maxDurability){
               durability.damage = durability.damage+1;
               component.setEquipment(EquipmentSlot.Mainhand, tool)
            }
            else if(durability.damage >= durability.maxDurability){
               let air = new ItemStack("minecraft:air")
               component.setEquipment(EquipmentSlot.Mainhand, air)
               source.playSound("random.break")
            }
         }
      }
   })
}

// world.afterEvents.entityHitEntity.subscribe(event =>{
//    try{
//       let p = event.damagingEntity;
//       let e = event.hitEntity;
//       if(p.typeId == "minecraft:player"){
//          const component = p.getComponent(EntityEquippableComponent.componentId);
//          const tool = component.getEquipment(EquipmentSlot.Mainhand);
//          let view = p.getViewDirection()
//          if(tool.typeId.includes("_great_sword")){
//             if(tool.typeId.includes("wood") || tool.typeId.includes("gold")){
//                e.applyKnockback(view.x*1, view.z*1, 1, 0.4)
//             }
//             if(tool.typeId.includes("copper") || tool.typeId.includes("stone") || tool.typeId.includes("lapis")){
//                e.applyKnockback(view.x*1, view.z*1, 2, 0.4)
//             }
//             if(tool.typeId.includes("iron") || tool.typeId.includes("redstone") || tool.typeId.includes("amethyst")){
//                e.applyKnockback(view.x*1, view.z*1, 3, 0.4)
//             }
//             if(tool.typeId.includes("emerald") || tool.typeId.includes("diamond")){
//                e.applyKnockback(view.x*1, view.z*1, 4, 0.4)
//             }
//             if(tool.typeId.includes("netherite") || tool.typeId.includes("obsidian")){
//                e.applyKnockback(view.x*1, view.z*1, 5, 0.4)
//             }
//          }
//       }
//    }catch(e){

//    }
// })

// world.beforeEvents.itemUseOn.subscribe(({ block, itemStack, source }) => {
//    try{
//       const shovelTypes = SHOVEL_BLOCK_TYPES[itemStack.typeId];
//       const hoeTypes = HOE_BLOCK_TYPES[itemStack.typeId];
//       const axeTypes = AXE_BLOCK_TYPES[itemStack.typeId];

//       if (shovelTypes && Array.isArray(shovelTypes)) {
//          if (shovelTypes.includes(block.typeId)) {
//             if(block.typeId.includes('grass_') || block.typeId.includes('dirt') || block.typeId.includes('mycelium')){
//                Durability(itemStack, source)
//                convertToPath(block);
//             }
//          }
//       } else if (hoeTypes && Array.isArray(hoeTypes)) {
//          if(block.typeId.includes('grass_') || block.typeId.includes('dirt') || block.typeId.includes('mycelium')){
//             Durability(itemStack, source)
//             convertToFarmland(block);
//          }
//       } 
//       else if (axeTypes && Array.isArray(axeTypes)) {
//          if (axeTypes.includes(block.typeId)) {
//             const dimension = block.dimension;
//             const blockLocation = block.location;
//             dimension.runCommandAsync(`setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} stripped_${block.typeId.replace("minecraft:", "")}`);
//             Durability(itemStack, source)
//          }
//       }
//    }catch(e){

//    }
// });
