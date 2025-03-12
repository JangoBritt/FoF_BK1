import { world, system, BlockPermutation, Dimension, GameMode } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  const nbeCustomSlab = [
    "fables:hay_slab",
    "fables:straw_slab"
  ]
  initEvent.blockComponentRegistry.registerCustomComponent("fables:double_slab", {
    onPlayerInteract: eventData => {
      const player = eventData.player;
      const block = eventData.block;
      const blockFacing = eventData.face;
      const blockLocation = block.location;
      const playerEquippable = player.getComponent("equippable");
      const itemUsed = playerEquippable.getEquipment("Mainhand");
      function decreaseItem() {
        system.run(() => {
          if (!player.matches({ gameMode: GameMode.creative })) {
            const decrementItem = itemUsed.amount == 1 ? undefined : (itemUsed.amount--, itemUsed);
            playerEquippable.setEquipment("Mainhand", decrementItem)
          }
        });
      }
      if (itemUsed === undefined || blockFacing === "South" || blockFacing === "East" || blockFacing === "North" || blockFacing === "West") return;

      if (nbeCustomSlab.includes(itemUsed.typeId) && nbeCustomSlab.includes(block.typeId)) {

        if (itemUsed.typeId === "fables:hay_slab") {
          if (block.permutation.matches("fables:hay_slab", { "minecraft:vertical_half": "bottom" }) && blockFacing === "Up" || block.permutation.matches("fables:hay_slab", { "minecraft:vertical_half": "top" }) && blockFacing === "Down") {
            decreaseItem();
            block.dimension.playSound("use.stone", blockLocation, { pitch: 0.8, volume: 1.0 });
            block.setPermutation(BlockPermutation.resolve("minecraft:hay_block")); //fables:hay_double_slab
            return;
          }
        }

        if (itemUsed.typeId === "fables:straw_slab") {
          if (block.permutation.matches("fables:straw_slab", { "minecraft:vertical_half": "bottom" }) && blockFacing === "Up" || block.permutation.matches("fables:straw_slab", { "minecraft:vertical_half": "top" }) && blockFacing === "Down") {
            decreaseItem();
            block.dimension.playSound("use.stone", blockLocation, { pitch: 0.8, volume: 1.0 });
            block.setPermutation(BlockPermutation.resolve("farmersdelight:straw_bale")); //fables:straw_double_slab
            return;
          }
        }
      }
      else return;
    }
  });
});

world.beforeEvents.itemUseOn.subscribe(eventData => {
  const player = eventData.source;
  const itemUsed = eventData.itemStack;
  const block = eventData.block;
  const blockFacing = eventData.blockFace;
  const blockLocation = block.location;
  const playerEquippable = player.getComponent("equippable");
  const customSlab = [
    "fables:hay_slab",
    "fables:straw_slab"
  ]
  const interactableBlocks = [
    "minecraft:acacia_button",
    "minecraft:acacia_door",
    "minecraft:acacia_fence_gate",
    "minecraft:acacia_hanging_sign",
    "minecraft:acacia_standing_sign",
    "minecraft:acacia_trapdoor",
    "minecraft:acacia_wall_sign",
    "minecraft:anvil",
    "minecraft:armor_stand",
    "minecraft:bamboo_button",
    "minecraft:bamboo_door",
    "minecraft:bamboo_fence_gate",
    "minecraft:bamboo_hanging_sign",
    "minecraft:bamboo_standing_sign",
    "minecraft:bamboo_trapdoor",
    "minecraft:bamboo_wall_sign",
    "minecraft:barrel",
    "minecraft:beacon",
    "minecraft:bed",
    "minecraft:bell",
    "minecraft:birch_button",
    "minecraft:birch_door",
    "minecraft:birch_fence_gate",
    "minecraft:birch_hanging_sign",
    "minecraft:birch_standing_sign",
    "minecraft:birch_trapdoor",
    "minecraft:birch_wall_sign",
    "minecraft:black_candle_cake",
    "minecraft:black_shulker_box",
    "minecraft:blast_furnace",
    "minecraft:blue_candle_cake",
    "minecraft:blue_shulker_box",
    "minecraft:brewing_stand",
    "minecraft:brown_candle_cake",
    "minecraft:brown_shulker_box",
    "minecraft:cake",
    "minecraft:candle_cake",
    "minecraft:cartography_table",
    "minecraft:cherry_button",
    "minecraft:cherry_door",
    "minecraft:cherry_fence_gate",
    "minecraft:cherry_hanging_sign",
    "minecraft:cherry_standing_sign",
    "minecraft:cherry_trapdoor",
    "minecraft:cherry_wall_sign",
    "minecraft:chest",
    "minecraft:chiseled_bookshelf",
    "minecraft:copper_door",
    "minecraft:copper_trapdoor",
    "minecraft:crafting_table",
    "minecraft:crimson_button",
    "minecraft:crimson_door",
    "minecraft:crimson_fence_gate",
    "minecraft:crimson_hanging_sign",
    "minecraft:crimson_standing_sign",
    "minecraft:crimson_trapdoor",
    "minecraft:crimson_wall_sign",
    "minecraft:cyan_candle_cake",
    "minecraft:cyan_shulker_box",
    "minecraft:dark_oak_button",
    "minecraft:dark_oak_door",
    "minecraft:dark_oak_fence_gate",
    "minecraft:dark_oak_hanging_sign",
    "minecraft:dark_oak_trapdoor",
    "minecraft:darkoak_standing_sign",
    "minecraft:darkoak_wall_sign",
    "minecraft:decorated_pot",
    "minecraft:dispenser",
    "minecraft:dropper",
    "minecraft:enchanting_table",
    "minecraft:ender_chest",
    "minecraft:exposed_copper_door",
    "minecraft:exposed_copper_trapdoor",
    "minecraft:fence_gate",
    "minecraft:furnace",
    "minecraft:glow_frame",
    "minecraft:gray_candle_cake",
    "minecraft:gray_shulker_box",
    "minecraft:green_candle_cake",
    "minecraft:green_shulker_box",
    "minecraft:grindstone",
    "minecraft:hopper",
    "minecraft:iron_door",
    "minecraft:iron_trapdoor",
    "minecraft:item_frame",
    "minecraft:jungle_button",
    "minecraft:jungle_door",
    "minecraft:jungle_fence_gate",
    "minecraft:jungle_hanging_sign",
    "minecraft:jungle_standing_sign",
    "minecraft:jungle_trapdoor",
    "minecraft:jungle_wall_sign",
    "minecraft:lever",
    "minecraft:light_blue_candle_cake",
    "minecraft:light_blue_shulker_box",
    "minecraft:light_gray_candle_cake",
    "minecraft:light_gray_shulker_box",
    "minecraft:lime_candle_cake",
    "minecraft:lime_shulker_box",
    "minecraft:lit_blast_furnace",
    "minecraft:lit_furnace",
    "minecraft:lit_smoker",
    "minecraft:loom",
    "minecraft:magenta_candle_cake",
    "minecraft:magenta_shulker_box",
    "minecraft:mangrove_button",
    "minecraft:mangrove_door",
    "minecraft:mangrove_fence_gate",
    "minecraft:mangrove_hanging_sign",
    "minecraft:mangrove_standing_sign",
    "minecraft:mangrove_trapdoor",
    "minecraft:mangrove_wall_sign",
    "minecraft:oak_hanging_sign",
    "minecraft:orange_candle_cake",
    "minecraft:orange_shulker_box",
    "minecraft:oxidized_copper_door",
    "minecraft:oxidized_copper_trapdoor",
    "minecraft:pale_oak_button",
    "minecraft:pale_oak_door",
    "minecraft:pale_oak_fence_gate",
    "minecraft:pale_oak_hanging_sign",
    "minecraft:pale_oak_standing_sign",
    "minecraft:pale_oak_trapdoor",
    "minecraft:pale_oak_wall_sign",
    "minecraft:pink_candle_cake",
    "minecraft:pink_shulker_box",
    "minecraft:polished_blackstone_button",
    "minecraft:purple_candle_cake",
    "minecraft:purple_shulker_box",
    "minecraft:red_candle_cake",
    "minecraft:red_shulker_box",
    "minecraft:repeater",
    "minecraft:smithing_table",
    "minecraft:smoker",
    "minecraft:spruce_button",
    "minecraft:spruce_door",
    "minecraft:spruce_fence_gate",
    "minecraft:spruce_hanging_sign",
    "minecraft:spruce_standing_sign",
    "minecraft:spruce_trapdoor",
    "minecraft:spruce_wall_sign",
    "minecraft:standing_sign",
    "minecraft:stone_button",
    "minecraft:stonecutter_block",
    "minecraft:trapdoor",
    "minecraft:trapped_chest",
    "minecraft:undyed_shulker_box",
    "minecraft:wall_sign",
    "minecraft:warped_button",
    "minecraft:warped_door",
    "minecraft:warped_fence_gate",
    "minecraft:warped_hanging_sign",
    "minecraft:warped_standing_sign",
    "minecraft:warped_trapdoor",
    "minecraft:warped_wall_sign",
    "minecraft:waxed_copper_door",
    "minecraft:waxed_copper_trapdoor",
    "minecraft:waxed_exposed_copper_door",
    "minecraft:waxed_exposed_copper_trapdoor",
    "minecraft:waxed_oxidized_copper_door",
    "minecraft:waxed_oxidized_copper_trapdoor",
    "minecraft:waxed_weathered_copper_door",
    "minecraft:waxed_weathered_copper_trapdoor",
    "minecraft:weathered_copper_door",
    "minecraft:weathered_copper_trapdoor",
    "minecraft:white_candle_cake",
    "minecraft:white_shulker_box",
    "minecraft:wooden_button",
    "minecraft:wooden_door",
    "minecraft:yellow_candle_cake",
    "minecraft:yellow_shulker_box"
  ]
  function decreaseItem() {
    if (!player.matches({ gameMode: GameMode.creative })) {
      const decrementItem = itemUsed.amount == 1 ? undefined : (itemUsed.amount--, itemUsed);
      playerEquippable.setEquipment("Mainhand", decrementItem)
    }
  }
  if (itemUsed === undefined || !playerEquippable) return;
  if (interactableBlocks.includes(block.typeId) && !player.isSneaking || block.hasTag("interactable_block") && !player.isSneaking) return;
  if (customSlab.includes(itemUsed.typeId)) {
    const blockAbove = block.above(1);
    const blockBelow = block.below(1);
    const blockSouth = block.south(1);
    const blockEast = block.east(1);
    const blockNorth = block.north(1);
    const blockWest = block.west(1);

    if (blockFacing === "Up" && customSlab.includes(blockAbove.typeId)) {
      if (blockAbove.typeId === "fables:hay_slab") {
        if (itemUsed.typeId === "fables:hay_slab") {
          if (block.typeId === "fables:hay_slab") return;
          system.run(() => {
            blockAbove.setPermutation(BlockPermutation.resolve("minecraft:hay_block"));
            blockAbove.dimension.playSound("use.hay", blockAbove.location, { pitch: 0.8, volume: 1.0 });
            decreaseItem();
            return;
          });
        }
        else return;
      }
    }

    if (blockFacing === "Up" && customSlab.includes(blockAbove.typeId)) {
      if (blockAbove.typeId === "fables:straw_slab") {
        if (itemUsed.typeId === "fables:straw_slab") {
          if (block.typeId === "fables:straw_slab") return;
          system.run(() => {
            blockAbove.setPermutation(BlockPermutation.resolve("farmersdelight:straw_bale"));
            blockAbove.dimension.playSound("use.hay", blockAbove.location, { pitch: 0.8, volume: 1.0 });
            decreaseItem();
            return;
          });
        }
        else return;
      }
    }
  }
  else return;
});