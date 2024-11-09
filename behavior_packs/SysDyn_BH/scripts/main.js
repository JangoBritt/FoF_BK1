import {world, system, EquipmentSlot, ItemStack, EntityEquippableComponent} from "@minecraft/server";

system.runInterval( () =>{
  for(let p of world.getPlayers()){
    let equip = p.getComponent(EntityEquippableComponent.componentId);
    let hand = equip.getEquipment(EquipmentSlot.Mainhand);
    let offhand = equip.getEquipment(EquipmentSlot.Offhand);
    let light15 = ["lit_pumpkin", "lava_bucket", "glowstone", "shroomlight", "beacon", "lantern", "sea_lantern", "campfire", "froglight", "end_rod"]
    let light13 = ["torch_offhand", "minecraft:torch", "soul_lantern", "soul_campfire", "candle"]
    let light11 = ["crying_obsidian", "soul_torch", "soul_torch_offhand"]
    let light9 = ["fire_charge", "redstone_torch", "redstone_torch_offhand", "ender_chest", "enchanting_table", "catalyst", "totem_of_undying", "nether_star"]
    let light6 = ["enchanted_book", "dragon_breath", "ender_eye", "magma", "blaze_rod", "blaze_powder", "glow_ink_sac", "glow_berries", "glowstone_dust", "experience_bottle"]
    let light_offhand = ["new:soul_torch_offhand", "new:redstone_torch_offhand", "new:torch_offhand", , "totem_of_undying"]

    let light_all = ["lit_pumpkin", "lava_bucket", "glowstone", "shroomlight", "beacon", "lantern", "sea_lantern", "campfire", "froglight","torch_offhand", "minecraft:torch", "soul_lantern", "soul_campfire", "candle","crying_obsidian", "soul_torch", "soul_torch_offhand", "catalyst", "redstone_torch", "redstone_torch_offhand", "ender_chest", "enchanting_table", "magma", "blaze_rod", "blaze_powder", "glow_ink_sac", "glow_berries", "glowstone_dust"]
    let inv = p.getComponent("inventory").container;

    for(let slot = 0; slot < inv.size; slot++){
      let item = inv.getItem(slot);
      if(item){
        let lore = item.getLore()[0];
        for(let types of light15){
          if(item.typeId.includes(`${types}`)){
            if(item.typeId != "minecraft:glowstone_dust"){
              if(!lore){
                item.setLore([`§6Lightning: §715 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
                inv.setItem(slot, item)
              }
            }
          }
        }
        for(let types of light13){
          if(item.typeId.includes(`${types}`)){
            if(!lore){
              if(!item.typeId.includes("sea_pickle")){
                item.setLore([`§6Lightning: §713 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
                inv.setItem(slot, item)
              }
              if(item.typeId.includes("sea_pickle")){
                item.setLore([`§6Lightning: §713 Blocks`, "You can use it underwater", `\n§r§d[System Dynamic Lights]§r`])
                inv.setItem(slot, item)
              }
            }
          }
        }
        for(let types of light9){
          if(item.typeId.includes(`${types}`)){
            if(!lore){
              item.setLore([`§6Lightning: §79 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
              inv.setItem(slot, item)
            }
          }
        }
        for(let types of light11){
          if(item.typeId.includes(`${types}`)){
            if(!lore){
              item.setLore([`§6Lightning: §711 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
              inv.setItem(slot, item)
            }
          }
        }
        for(let types of light6){
          if(item.typeId.includes(`${types}`)){
            if(!lore){
              item.setLore([`§6Lightning: §76 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
              inv.setItem(slot, item)
            }
          }
        }
      }
    }

    for(let offlight of light_offhand){
      if(p.hasTag("offhand") && !p.hasTag("mainhand")){
        p.removeTag("offhand")
        p.runCommandAsync(`execute as @s[hasitem={item=${offlight},location=slot.weapon.offhand,quantity=0}] run function no_light`);
      }
    }
    for(let light of light_all){
      if(p.hasTag("mainhand") && !p.hasTag("offhand")){
        p.removeTag("mainhand")
        p.runCommandAsync(`execute as @s[hasitem={item=${light},location=slot.weapon.mainhand,quantity=0}] run function no_light`);
      }
    }
    if(offhand){
      if(offhand.typeId.includes("new:torch_offhand")){
        p.addTag("offhand")
        p.runCommandAsync(`execute as @s positioned ~~1~ run function light13`);
      }
      if(offhand.typeId.includes("soul_torch_offhand")){
        p.addTag("offhand")
        p.runCommandAsync(`execute as @s positioned ~~1~ run function light11`);
      }
      if(offhand.typeId.includes("redstone_torch_offhand")){
        p.addTag("offhand")
        p.runCommandAsync(`execute as @s positioned ~~1~ run function light9`);
      }
      if(offhand.typeId.includes("totem_of_undying")){
        p.addTag("offhand")
        p.runCommandAsync(`execute as @s positioned ~~1~ run function light9`);
      }
    }

    if(hand && !p.hasTag("offhand")){
      for(let l13 of light13){
        if(hand.typeId.includes(l13)){
          p.addTag("mainhand")
          if(!hand.typeId.includes("sea_pickle")){
            p.runCommandAsync(`execute as @s positioned ~~1~ run function light13`);
          }
        }
      }
      for(let l11 of light11){
        if(hand.typeId.includes(l11)){
          p.addTag("mainhand")
          p.runCommandAsync(`execute as @s positioned ~~1~ run function light11`);
        }
      }
      for(let l9 of light9){
        if(hand.typeId.includes(l9)){
          p.addTag("mainhand")
          p.runCommandAsync(`execute as @s positioned ~~1~ run function light9`);
        }
      }
      for(let l15 of light15){
        if(hand.typeId.includes(l15)){
          if(hand.typeId != "minecraft:glowstone_dust"){
            p.addTag("mainhand")
            p.runCommandAsync(`execute as @s positioned ~~1~ run function light15`);
          }
        }
      }
      for(let l6 of light6){
        if(hand.typeId.includes(l6)){
          p.addTag("mainhand")
          p.runCommandAsync(`execute as @s positioned ~~1~ run function light6`);
        }
      }
    }
  } 
})