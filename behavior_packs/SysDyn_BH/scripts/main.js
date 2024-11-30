import {world, system, EquipmentSlot, ItemStack, EntityEquippableComponent} from "@minecraft/server";

system.runInterval( () =>{
  for(let p of world.getPlayers()){
    let equip = p.getComponent(EntityEquippableComponent.componentId);
    let hand = equip.getEquipment(EquipmentSlot.Mainhand);
    let offhand = equip.getEquipment(EquipmentSlot.Offhand);
    let headslot = equip.getEquipment(EquipmentSlot.Head);

    let light15 = [
      
      "lit_pumpkin",
      "lava_bucket",
      "glowstone", 
      "shroomlight", 
      "beacon", 
      "minecraft:lantern", 
      "sea_lantern", 
      "minecraft:campfire", 
      "froglight", 
      "end_rod",
      "nicothekid:amethyst_lamp",
      "nicothekid:andesite_lantern",
      "nicothekid:basalt_lantern",
      "nicothekid:blackstone_lantern",
      "nicothekid:bricks_lantern",
      "nicothekid:calcite_lantern",
      "nicothekid:cobbled_deepslate_lantern",
      "nicothekid:cobblestone_lantern",
      "nicothekid:cracked_deepslate_bricks_lantern",
      "nicothekid:cracked_polished_blackstone_bricks_lantern",
      "nicothekid:cracked_stone_bricks_lantern",
      "nicothekid:deepslate_bricks_lantern",
      "nicothekid:deepslate_lantern",
      "nicothekid:diorite_lantern",
      "nicothekid:dripstone_lantern",
      "nicothekid:granite_lantern",
      "nicothekid:mossy_cobblestone_lantern",
      "nicothekid:mossy_stone_bricks_lantern",
      "nicothekid:mud_bricks_lantern",
      "nicothekid:nether_bricks_lantern",
      "nicothekid:packed_mud_lantern",
      "nicothekid:polished_blackstone_bricks_lantern",
      "nicothekid:quartz_lamp",
      "nicothekid:red_nether_bricks_lantern",
      "nicothekid:red_sandstone_lantern",
      "nicothekid:sandstone_lantern",
      "nicothekid:smooth_basalt_lantern",
      "nicothekid:smooth_red_sandstone_lantern",
      "nicothekid:smooth_sandstone_lantern",
      "nicothekid:stone_bricks_lantern",
      "nicothekid:stone_lantern",
      "nicothekid:tuff_lantern",
      "nicothekid:wooden_lamp_acacia",
      "nicothekid:wooden_lamp_bamboo",
      "nicothekid:wooden_lamp_birch",
      "nicothekid:wooden_lamp_cherry",
      "nicothekid:wooden_lamp_crimson",
      "nicothekid:wooden_lamp_dark_oak",
      "nicothekid:wooden_lamp_jungle",
      "nicothekid:wooden_lamp_mangrove",
      "nicothekid:wooden_lamp_oak",
      "nicothekid:wooden_lamp_spruce",
      "nicothekid:wooden_lamp_warped",
      "nicothekid:wooden_lantern_acacia",
      "nicothekid:wooden_lantern_bamboo",
      "nicothekid:wooden_lantern_birch",
      "nicothekid:wooden_lantern_cherry",
      "nicothekid:wooden_lantern_crimson",
      "nicothekid:wooden_lantern_dark_oak",
      "nicothekid:wooden_lantern_jungle",
      "nicothekid:wooden_lantern_mangrove",
      "nicothekid:wooden_lantern_oak",
      "nicothekid:wooden_lantern_spruce",
      "nicothekid:wooden_lantern_warped",
      "medieval:andesite_brazier",
      "medieval:blackstone_brazier",
      "medieval:cobbled_deepslate_brazier",
      "medieval:cobblestone_brazier",
      "medieval:diorite_brazier",
      "medieval:granite_brazier",
      "medieval:mossy_cobblestone_brazier",
      "medieval:polished_andesite_brazier",
      "medieval:polished_blackstone_brazier",
      "medieval:cobbled_deepslate_brazier",
      "medieval:polished_deepslate_brazier",
      "medieval:polished_diorite_brazier",
      "medieval:polished_granite_brazier",
      "medieval:stone_brazier",
      "medieval:copper_chandelier",
      "medieval:diamond_chandelier",
      "medieval:emerald_chandelier",
      "medieval:gold_chandelier",
      "medieval:iron_chandelier",
      "medieval:netherite_chandelier",
      "medieval:copper_candleholder",
      "medieval:diamond_candleholder",
      "medieval:emerald_candleholder",
      "medieval:gold_candleholder",
      "medieval:iron_candleholder",
      "medieval:netherite_candleholder"

    ]
    let light13 = [
      "torch_offhand",
      "minecraft:torch"
    ]
    let light11 = [
      "crying_obsidian",
      "soul_torch",
      "soul_torch_offhand",
      "soul_lantern",
      "soul_campfire",
      "korbon:standing_torch_item",
      "nicothekid:tuff_soul_lantern",
      "medieval:andesite_soul_brazier",
      "medieval:blackstone_soul_brazier",
      "medieval:cobbled_deepslate_soul_brazier",
      "medieval:cobblestone_soul_brazier",
      "medieval:diorite_soul_brazier",
      "medieval:granite_soul_brazier",
      "medieval:mossy_cobblestone_soul_brazier",
      "medieval:polished_andesite_soul_brazier",
      "medieval:polished_blackstone_soul_brazier",
      "medieval:cobbled_deepslate_soul_brazier",
      "medieval:polished_deepslate_soul_brazier",
      "medieval:polished_diorite_soul_brazier",
      "medieval:polished_granite_soul_brazier",
      "medieval:stone_soul_brazier",
      "nicothekid:andesite_soul_lantern",
      "nicothekid:basalt_soul_lantern",
      "nicothekid:blackstone_soul_lantern",
      "nicothekid:bricks_soul_lantern",
      "nicothekid:calcite_soul_lantern",
      "nicothekid:cobbled_deepslate_soul_lantern",
      "nicothekid:cobblestone_soul_lantern",
      "nicothekid:cracked_deepslate_bricks_soul_lantern",
      "nicothekid:cracked_polished_blackstone_bricks_soul_lantern",
      "nicothekid:cracked_stone_bricks_soul_lantern",
      "nicothekid:deepslate_bricks_soul_lantern",
      "nicothekid:deepslate_soul_lantern",
      "nicothekid:diorite_soul_lantern",
      "nicothekid:dripstone_soul_lantern",
      "nicothekid:granite_soul_lantern",
      "nicothekid:jack_o_soul_lantern",
      "nicothekid:mossy_cobblestone_soul_lantern",
      "nicothekid:mossy_stone_bricks_soul_lantern",
      "nicothekid:mud_bricks_soul_lantern",
      "nicothekid:nether_bricks_soul_lantern",
      "nicothekid:packed_mud_soul_lantern",
      "nicothekid:polished_blackstone_bricks_soul_lantern",
      "nicothekid:red_nether_bricks_soul_lantern",
      "nicothekid:red_sandstone_soul_lantern",
      "nicothekid:sandstone_soul_lantern",
      "nicothekid:smooth_basalt_soul_lantern",
      "nicothekid:smooth_red_sandstone_soul_lantern",
      "nicothekid:smooth_sandstone_soul_lantern",
      "nicothekid:stone_bricks_soul_lantern",
      "nicothekid:stone_soul_lantern",
    ]
    let light9 = [
      "candle", 
      "fire_charge",
      "redstone_torch",
      "redstone_torch_offhand", 
      "ender_chest", 
      "enchanting_table", 
      "catalyst", 
      "totem_of_undying", 
      "nether_star"
    ]


    let light6 = [
      "enchanted_book",
      "dragon_breath",
      "ender_eye",
      "magma",
      "blaze_rod",
      "blaze_powder",
      "glow_ink_sac",
      "glow_berries",
      "glowstone_dust",
      "experience_bottle",
      "farmersdelight:glowberry_crate",
      "korbon:glass_jar_firefly",
      "korbon:brittlebright",
      "korbon:glowshroom",
      "farmersdelight:glow_berry_custard",
      "fmh:glow_squid_item",
      "fmh:glow_squid_mask"
    ]

    let light_offhand = [
      "new:soul_torch_offhand",
      "new:redstone_torch_offhand",
      "new:torch_offhand",
      "totem_of_undying"
    ]

    let light_head = [
      "fmh:glow_squid_mask"
    ]

    let light_all = [
      "lit_pumpkin",
      "lava_bucket",
      "glowstone",
      "shroomlight",
      "beacon",
      "minecraft:lantern",
      "sea_lantern",
      "campfire",
      "froglight",
      "torch_offhand",
      "minecraft:torch",
      "soul_lantern",
      "soul_campfire",
      "candle",
      "crying_obsidian",
      "soul_torch",
      "soul_torch_offhand",
      "catalyst",
      "redstone_torch",
      "redstone_torch_offhand",
      "ender_chest",
      "enchanting_table",
      "magma",
      "blaze_rod",
      "blaze_powder",
      "glow_ink_sac",
      "glow_berries",
      "glowstone_dust",
      "minecraft:soul_lantern",
      "minecraft:soul_campfire",
      "korbon:standing_torch_item",
      "nicothekid:tuff_soul_lantern",
      "medieval:andesite_soul_brazier",
      "medieval:blackstone_soul_brazier",
      "medieval:cobbled_deepslate_soul_brazier",
      "medieval:cobblestone_soul_brazier",
      "medieval:diorite_soul_brazier",
      "medieval:granite_soul_brazier",
      "medieval:mossy_cobblestone_soul_brazier",
      "medieval:polished_andesite_soul_brazier",
      "medieval:polished_blackstone_soul_brazier",
      "medieval:cobbled_deepslate_soul_brazier",
      "medieval:polished_deepslate_soul_brazier",
      "medieval:polished_diorite_soul_brazier",
      "medieval:polished_granite_soul_brazier",
      "medieval:stone_soul_brazier",
      "nicothekid:andesite_soul_lantern",
      "nicothekid:basalt_soul_lantern",
      "nicothekid:blackstone_soul_lantern",
      "nicothekid:bricks_soul_lantern",
      "nicothekid:calcite_soul_lantern",
      "nicothekid:cobbled_deepslate_soul_lantern",
      "nicothekid:cobblestone_soul_lantern",
      "nicothekid:cracked_deepslate_bricks_soul_lantern",
      "nicothekid:cracked_polished_blackstone_bricks_soul_lantern",
      "nicothekid:cracked_stone_bricks_soul_lantern",
      "nicothekid:deepslate_bricks_soul_lantern",
      "nicothekid:deepslate_soul_lantern",
      "nicothekid:diorite_soul_lantern",
      "nicothekid:dripstone_soul_lantern",
      "nicothekid:granite_soul_lantern",
      "nicothekid:jack_o_soul_lantern",
      "nicothekid:mossy_cobblestone_soul_lantern",
      "nicothekid:mossy_stone_bricks_soul_lantern",
      "nicothekid:mud_bricks_soul_lantern",
      "nicothekid:nether_bricks_soul_lantern",
      "nicothekid:packed_mud_soul_lantern",
      "nicothekid:polished_blackstone_bricks_soul_lantern",
      "nicothekid:red_nether_bricks_soul_lantern",
      "nicothekid:red_sandstone_soul_lantern",
      "nicothekid:sandstone_soul_lantern",
      "nicothekid:smooth_basalt_soul_lantern",
      "nicothekid:smooth_red_sandstone_soul_lantern",
      "nicothekid:smooth_sandstone_soul_lantern",
      "nicothekid:stone_bricks_soul_lantern",
      "nicothekid:stone_soul_lantern"
    ]
    let inv = p.getComponent("inventory").container;


    // for(let slot = 0; slot < inv.size; slot++){
    //   let item = inv.getItem(slot);
    //   if(item){
    //     let lore = item.getLore()[0];
    //     for(let types of light15){
    //       if(item.typeId.includes(`${types}`)){
    //         if(item.typeId != "minecraft:glowstone_dust"){
    //           if(!lore){
    //             item.setLore([`§6Illumination: §715 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
    //             inv.setItem(slot, item)
    //           }
    //         }
    //       }
    //     }
    //     for(let types of light13){
    //       if(item.typeId.includes(`${types}`)){
    //         if(!lore){
    //           if(!item.typeId.includes("sea_pickle")){
    //             item.setLore([`§6Illumination: §713 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
    //             inv.setItem(slot, item)
    //           }
    //           if(item.typeId.includes("sea_pickle")){
    //             item.setLore([`§6Illumination: §713 Blocks`, "You can use it underwater", `\n§r§d[System Dynamic Lights]§r`])
    //             inv.setItem(slot, item)
    //           }
    //         }
    //       }
    //     }
    //     for(let types of light9){
    //       if(item.typeId.includes(`${types}`)){
    //         if(!lore){
    //           item.setLore([`§6Illumination: §79 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
    //           inv.setItem(slot, item)
    //         }
    //       }
    //     }
    //     for(let types of light_head){
    //       if(item.typeId.includes(`${types}`)){
    //         if(!lore){
    //           item.setLore([`§6Illumination: §79 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
    //           inv.setItem(slot, item)
    //         }
    //       }
    //     }
    //     for(let types of light11){
    //       if(item.typeId.includes(`${types}`)){
    //         if(!lore){
    //           item.setLore([`§6Illumination: §711 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
    //           inv.setItem(slot, item)
    //         }
    //       }
    //     }
    //     for(let types of light6){
    //       if(item.typeId.includes(`${types}`)){
    //         if(!lore){
    //           item.setLore([`§6Illumination: §76 Blocks`, `\n§r§d[System Dynamic Lights]§r`])
    //           inv.setItem(slot, item)
    //         }
    //       }
    //     }
    //   }
    // }

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

    if(headslot) {
      if(headslot.typeId.includes("fmh:glow_squid_mask")){
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
          if(!hand.typeId.includes("sea_pickle")){
            p.runCommandAsync(`execute as @s positioned ~~1~ run function sea_pickle`);
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