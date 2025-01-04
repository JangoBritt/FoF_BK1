/* © 2019-2024, @JeanLucasMCPE - All Rights Reserved. */

import { system, world, DimensionTypes } from '@minecraft/server';

const Dimensions = {};

const dimensionTypes = DimensionTypes.getAll();
for (let i = 0, len = dimensionTypes.length; i < len; i++) {
  const id = dimensionTypes[i].typeId;
  Dimensions[id] = world.getDimension(id);
}

class Compostables {
  static registerCompostables = [
    { "item": "farmersdelight:cabbage_seeds", "chance": 0.35 },
    { "item": "farmersdelight:tomato_seeds", "chance": 0.35 },
    { "item": "farmersdelight:onion", "chance": 0.35 },
    { "item": "farmersdelight:rice", "chance": 0.35 },
    { "item": "farmersdelight:tomato", "chance": 0.65 },
    { "item": "farmersdelight:cabbage", "chance": 0.65 },
    { "item": "farmersdelight:cabbage_leaf", "chance": 0.30 },
    { "item": "farmersdelight:rice_panicle", "chance": 0.65 },
    { "item": "farmersdelight:sandy_shrub", "chance": 0.35 },
    { "item": "farmersdelight:pumpkin_slice", "chance": 0.50 },
    { "item": "farmersdelight:rotten_tomato", "chance": 0.65 },
    { "item": "farmersdelight:wild_beetroots", "chance": 0.65 },
    { "item": "farmersdelight:wild_cabbages", "chance": 0.65 },
    { "item": "farmersdelight:wild_carrots", "chance": 0.65 },
    { "item": "farmersdelight:wild_onions", "chance": 0.65 },
    { "item": "farmersdelight:wild_potatoes", "chance": 0.65 },
    { "item": "farmersdelight:wild_rice", "chance": 0.65 },
    { "item": "farmersdelight:wild_tomatoes", "chance": 0.65 },
    { "item": "farmersdelight:straw", "chance": 0.65 },
    { "item": "farmersdelight:straw_bale", "chance": 0.85 },
    { "item": "farmersdelight:rice_bale", "chance": 0.85 },
    { "item": "farmersdelight:straw_bale", "chance": 0.85 },
    { "item": "farmersdelight:straw_bale", "chance": 0.85 },
    { "item": "farmersdelight:honey_cookie", "chance": 0.85 },
    { "item": "farmersdelight:sweet_berry_cookie", "chance": 0.85 },
    { "item": "farmersdelight:cabbage_rolls", "chance": 0.85 },
    { "item": "farmersdelight:dumplings", "chance": 0.85 },
    { "item": "farmersdelight:pie_crust", "chance": 0.85 },
    { "item": "farmersdelight:wheat_dough", "chance": 0.85 },
    { "item": "farmersdelight:kelp_roll_slice", "chance": 0.30 },
    { "item": "farmersdelight:kelp_roll", "chance": 0.85 },
    { "item": "farmersdelight:horse_feed", "chance": 0.85 },
    { "item": "farmersdelight:stuffed_pumpkin_block", "chance": 1.00 },
    
    { "item": "korbon:aloe_vera", "chance": 0.50 },
    { "item": "korbon:aloe", "chance": 0.50 },
    { "item": "korbon:aspen_sapling_item", "chance": 0.30 },
    { "item": "korbon:autumn_sapling_item", "chance": 0.30 },
    { "item": "korbon:baobab_sapling_item", "chance": 0.30 },
    { "item": "korbon:redwood_sapling_item", "chance": 0.30 },
    { "item": "korbon:maple_sapling_item", "chance": 0.30 },
    { "item": "korbon:jacaranda_sapling_item", "chance": 0.30 },
    { "item": "korbon:aspen_leaves", "chance": 0.30 },
    { "item": "korbon:autumn_oak_leaves", "chance": 0.30 },
    { "item": "korbon:autumn_oak_leaves2", "chance": 0.30 },
    { "item": "korbon:baobab_leaves", "chance": 0.30 },
    { "item": "korbon:cherry_blossom_leaves", "chance": 0.30 },
    { "item": "korbon:jacaranda_leaves", "chance": 0.30 },
    { "item": "korbon:maple_leaves", "chance": 0.30 },
    { "item": "korbon:redwood_leaves", "chance": 0.30 },
    { "item": "korbon:aspen_leaf_pile", "chance": 0.15 },
    { "item": "korbon:autumn_birch_leaf_pile", "chance": 0.15 },
    { "item": "korbon:autumn_oak_leaf_pile", "chance": 0.15 },

    { "item": "korbon:bluebell_item", "chance": 0.65 },
    { "item": "korbon:brittlebright_item", "chance": 0.65 },
    { "item": "korbon:brittlebrush_item", "chance": 0.65 },
    { "item": "korbon:buttercup_item", "chance": 0.65 },
    { "item": "korbon:cattail_item", "chance": 0.65 },
    { "item": "korbon:cherry", "chance": 0.30 },
    { "item": "korbon:daisy_petals_item", "chance": 0.30 },
    { "item": "korbon:deadfern_item", "chance": 0.65 },
    { "item": "korbon:didymoch_item", "chance": 0.65 },
    { "item": "korbon:dune_grass_item", "chance": 0.30 },
    { "item": "korbon:glowshroom_item", "chance": 0.65 },
    { "item": "korbon:glowshroom_block", "chance": 0.85 },
    { "item": "korbon:jungfern_item", "chance": 0.65 },
    { "item": "korbon:lavender_flower_item", "chance": 0.65 },
    { "item": "korbon:redwood_leaf_sprout_item", "chance": 0.65 },
    { "item": "korbon:small_cactus_item", "chance": 0.50 },
    { "item": "korbon:snowdrop_item", "chance": 0.65 },
    { "item": "korbon:tinder_mushrooms", "chance": 0.65 },
    { "item": "korbon:violet_flower_item", "chance": 0.65 },
    { "item": "korbon:wild_wheat_item", "chance": 0.65 },
    { "item": "korbon:moss_carpet_vertical", "chance": 0.30 },
    { "item": "korbon:wild_wheat_item", "chance": 0.65 },

    { "item": "mr:acacia_hedge_mr", "chance": 0.30 },
    { "item": "mr:azalea_flowers_hedge_mr", "chance": 0.30 },
    { "item": "mr:azalea_hedge_mr", "chance": 0.30 },
    { "item": "mr:birch_hedge_mr", "chance": 0.30 },
    { "item": "mr:cherry_hedge_mr", "chance": 0.30 },
    { "item": "mr:darkoak_hedge_mr", "chance": 0.30 },
    { "item": "mr:jungle_hedge_mr", "chance": 0.30 },
    { "item": "mr:mangrove_hedge_mr", "chance": 0.30 },
    { "item": "mr:oak_hedge_mr", "chance": 0.30 },
    { "item": "mr:spruce_hedge_mr", "chance": 0.30 }
  ]
  static vanillaCompostables = [
    { "item": "minecraft:beetroot_seeds", "chance": 0.3 },
    { "item": "minecraft:dried_kelp", "chance": 0.3 },
    { "item": "minecraft:glow_berries", "chance": 0.3 },
    { "item": "minecraft:short_grass", "chance": 0.3 },
    { "item": "minecraft:grass", "chance": 0.3 },
    { "item": "minecraft:hanging_roots", "chance": 0.3 },
    { "item": "minecraft:mangrove_roots", "chance": 0.3 },
    { "item": "minecraft:kelp", "chance": 0.3 },
    { "item": "minecraft:leaves", "chance": 0.3 },
    { "item": "minecraft:leaves2", "chance": 0.3 },
    { "item": "minecraft:mangrove_leaves", "chance": 0.3 },
    { "item": "minecraft:cherry_leaves", "chance": 0.3 },
    { "item": "minecraft:azalea_leaves", "chance": 0.3 },
    { "item": "minecraft:melon_seeds", "chance": 0.3 },
    { "item": "minecraft:moss_carpet", "chance": 0.3 },
    { "item": "minecraft:pink_petals", "chance": 0.3 },
    { "item": "minecraft:pitcher_pod", "chance": 0.3 },
    { "item": "minecraft:pumpkin_seeds", "chance": 0.3 },
    { "item": "minecraft:sapling", "chance": 0.3 },
    { "item": "minecraft:cherry_sapling", "chance": 0.3 },
    { "item": "minecraft:seagrass", "chance": 0.3 },
    { "item": "minecraft:small_dripleaf_block", "chance": 0.3 },
    { "item": "minecraft:sweet_berries", "chance": 0.3 },
    { "item": "minecraft:torchflower_seeds", "chance": 0.3 },
    { "item": "minecraft:wheat_seeds", "chance": 0.3 },
    { "item": "minecraft:cactus", "chance": 0.5 },
    { "item": "minecraft:dried_kelp_block", "chance": 0.5 },
    { "item": "minecraft:azalea_leaves_flowered", "chance": 0.5 },
    { "item": "minecraft:glow_lichen", "chance": 0.5 },
    { "item": "minecraft:melon_slice", "chance": 0.5 },
    { "item": "minecraft:nether_sprouts", "chance": 0.5 },
    { "item": "minecraft:sugar_cane", "chance": 0.5 },
    { "item": "minecraft:tall_grass", "chance": 0.5 },
    { "item": "minecraft:twisting_vines", "chance": 0.5 },
    { "item": "minecraft:vine", "chance": 0.5 },
    { "item": "minecraft:weeping_vines", "chance": 0.5 },
    { "item": "minecraft:apple", "chance": 0.65 },
    { "item": "minecraft:azalea", "chance": 0.65 },
    { "item": "minecraft:beetroot", "chance": 0.65 },
    { "item": "minecraft:big_dripleaf", "chance": 0.65 },
    { "item": "minecraft:carrot", "chance": 0.65 },
    { "item": "minecraft:cocoa_beans", "chance": 0.65 },
    { "item": "minecraft:yellow_flower", "chance": 0.65 },
    { "item": "minecraft:red_flower", "chance": 0.65 },
    { "item": "minecraft:sunflower", "chance": 0.65 },
    { "item": "minecraft:lilac", "chance": 0.65 },
    { "item": "minecraft:rose_bush", "chance": 0.65 },
    { "item": "minecraft:peony", "chance": 0.65 },
    { "item": "minecraft:large_fern", "chance": 0.65 },
    { "item": "minecraft:fern", "chance": 0.65 },
    { "item": "minecraft:crimson_fungus", "chance": 0.65 },
    { "item": "minecraft:warped_fungus", "chance": 0.65 },
    { "item": "minecraft:waterlily", "chance": 0.65 },
    { "item": "minecraft:melon_block", "chance": 0.65 },
    { "item": "minecraft:moss_block", "chance": 0.65 },
    { "item": "minecraft:brown_mushroom", "chance": 0.65 },
    { "item": "minecraft:red_mushroom", "chance": 0.65 },
    { "item": "minecraft:mushroom_stem", "chance": 0.65 },
    { "item": "minecraft:nether_wart", "chance": 0.65 },
    { "item": "minecraft:potato", "chance": 0.65 },
    { "item": "minecraft:pumpkin", "chance": 0.65 },
    { "item": "minecraft:carved_pumpkin", "chance": 0.65 },
    { "item": "minecraft:crimson_roots", "chance": 0.65 },
    { "item": "minecraft:warped_roots", "chance": 0.65 },
    { "item": "minecraft:sea_pickle", "chance": 0.65 },
    { "item": "minecraft:shroomlight", "chance": 0.65 },
    { "item": "minecraft:spore_blossom", "chance": 0.65 },
    { "item": "minecraft:wheat", "chance": 0.65 },
    { "item": "minecraft:baked_potato", "chance": 0.85 },
    { "item": "minecraft:bread", "chance": 0.85 },
    { "item": "minecraft:cookie", "chance": 0.85 },
    { "item": "minecraft:flowering_azalea", "chance": 0.85 },
    { "item": "minecraft:hay_block", "chance": 0.85 },
    { "item": "minecraft:brown_mushroom_block", "chance": 0.85 },
    { "item": "minecraft:red_mushroom_block", "chance": 0.85 },
    { "item": "minecraft:nether_wart_block", "chance": 0.85 },
    { "item": "minecraft:pitcher_plant", "chance": 0.85 },
    { "item": "minecraft:torchflower", "chance": 0.85 },
    { "item": "minecraft:warped_wart_block", "chance": 0.85 },
    { "item": "minecraft:cake", "chance": 1.0 },
    { "item": "minecraft:pumpkin_pie", "chance": 1.0 }
  ]
  static getCompostable(item) {
    const compostables = this.registerCompostables;
    return compostables[compostables.findIndex(compostable => item === compostable.item)];
  }
  static getVanillaCompostable(item) {
    const compostables = this.vanillaCompostables;
    return compostables[compostables.findIndex(compostable => item === compostable.item)];
  }
  static isCompostable(block) {
    return block?.permutation?.getState('composter_fill_level') < 7;
  }
  static composting(dimension, composter, chance, hopper = false) {
    const composterFillLevel = composter.permutation.getState('composter_fill_level');
    if (Math.random() < chance || composterFillLevel <= 0) {
      const newComposterFillLevel = composterFillLevel + 1;
      composter.setPermutation(composter.permutation.withState('composter_fill_level', newComposterFillLevel));
      if (newComposterFillLevel === 7) {
        system.runTimeout(() => {
          if (!composter?.isValid() || composter.permutation.getState('composter_fill_level') != newComposterFillLevel) return;
          composter.setPermutation(composter.permutation.withState('composter_fill_level', 8));
          dimension.playSound('block.composter.ready', composter.center());
        }, 20);
      }
      dimension.playSound('block.composter.fill_success', composter.center());
    } else {
      dimension.playSound('block.composter.fill', composter.center());
    }
    if (hopper) return;
    dimension.playSound('item.bone_meal.use', composter.center(), {pitch: Math.random() * (1.1 - 0.9) + 0.9});
    dimension.spawnParticle('minecraft:crop_growth_emitter', composter.center());
  }
  static decrementStack(player) {
    if (player.matches({ gameMode: 'creative' })) return;
    const equippable = player.getComponent('equippable');
    const item = equippable.getEquipment('Mainhand');
    const stack = item.amount;
    if (stack > 1) --item.amount;
    equippable.setEquipment('Mainhand', stack > 1 ? item : null);
  }
}

world.beforeEvents.itemUseOn.subscribe(data => {
  const { block, itemStack, source: player } = data;
  const compostable = Compostables.getCompostable(itemStack?.typeId);
  if (compostable && Compostables.isCompostable(block) && !player?.isSneaking) {
    system.run(() => {
      Compostables.composting(block.dimension, block, compostable.chance);
      Compostables.decrementStack(player);
    });
  }
});

// Compost-by-dropping system

let compostByDropping = world?.getDynamicProperty('jlmcpe.compostables:compostByDropping') !== false;

world.afterEvents.entitySpawn.subscribe(data => {
  if (data.entity?.typeId === 'minecraft:item' && compostByDropping) {
    const item = data.entity;
    const itemStack = item?.getComponent('item')?.itemStack;
    const compostable = Compostables.getCompostable(itemStack.typeId) ?? Compostables.getVanillaCompostable(itemStack.typeId);
    if (!compostable) return;
    const { dimension } = item;
    const fallingItem = system.runInterval(() => {
      if (!item?.isValid() || !compostByDropping) return system.clearRun(fallingItem);
      if (!item.isFalling) {
        const block = dimension.getBlock(item.location);
        let stackAmount = itemStack.amount;
        if (Compostables.isCompostable(block)) {
          for (; stackAmount > 0; stackAmount--) {
            if (!Compostables.isCompostable(block)) break;
            if (stackAmount > 1) --itemStack.amount;
            Compostables.composting(dimension, block, compostable.chance);
          }
          if (stackAmount > 0) dimension.spawnItem(itemStack, item.location);
          item.remove();
        } else if (block.typeId === 'minecraft:composter' || block.below()?.typeId === 'minecraft:composter') return;
        system.clearRun(fallingItem);
      }
    }, 5);
  }
});

system.afterEvents.scriptEventReceive.subscribe(event => {
  if (event.id !== 'jlmcpe.compostables:compostByDropping') return;
  if (!compostByDropping) {
    world.setDynamicProperty('jlmcpe.compostables:compostByDropping');
  } else world.setDynamicProperty('jlmcpe.compostables:compostByDropping', false);
	compostByDropping = !compostByDropping;
	world.sendMessage({ translate: 'commands.gamerule.success', with: ['§6Compostables+: compostByDropping§r', `${compostByDropping}`]});
}, { namespaces: ['jlmcpe.compostables'] });

// Hoppers system

let hopperTicking;

class HopperRegistry {
	constructor(dimension, location) {
		this.dimension = dimension.id;
		this.location = location;
	}
	static registries = [];
	static getRegistries() {
		const ids = world.getDynamicPropertyIds(), len = ids.length;
		for (let i = 0; i < len; i++) {
			const id = ids[i];
			if (id.startsWith('jlmcpe.compostables:hopper')) this.registries.push(world.getDynamicProperty(id));
		}
		if (this.registries.length) this.hopperTicking();
	}
	static add(registry) {
		registry = JSON.stringify(registry);
		if (this.registries.includes(registry)) return;
		const id = 'jlmcpe.compostables:hopper_' + this.registries.length;
		world.setDynamicProperty(id, registry);
		if (!this.registries.length) this.hopperTicking();
		this.registries.push(registry);
	}
	static remove(registryIndex) {
		const registryIds = [], ids = world.getDynamicPropertyIds();
		for (let i = 0; i < ids.length; i++) {
			const id = ids[i];
			if (id.startsWith('jlmcpe.compostables:hopper')) registryIds.push(id);
		}
		this.registries.splice(registryIndex, 1);
		registryIds.sort((a, b) => a.y - b.y);
		world.setDynamicProperty(registryIds[registryIds.length - 1], null);
		const registries = this.registries;
		for (let i = 0; i < registryIds.length; i++) {
			const id = 'jlmcpe.compostables:hopper_' + i;
			world.setDynamicProperty(id, registries[i]);
		}
		if (!registries.length) system.clearRun(hopperTicking);
	}
	static getCompostingHopper(block) {
		if (block.permutation.matches('minecraft:hopper', { facing_direction: 0 }) && block.below()?.typeId === 'minecraft:composter') return block;
		const blockAbove = block.above();
		if (block?.typeId === 'minecraft:composter' && blockAbove.permutation.matches('minecraft:hopper', { facing_direction: 0 })) return blockAbove;
	}
	static getOutputComposter(hopper) {
		const hopperBelow = hopper.below();
		if (hopper.permutation.matches('minecraft:hopper', { facing_direction: 0 }) && hopperBelow?.typeId === 'minecraft:composter') return hopperBelow;
	}
  static hopperTick() {
		const { registries } = this;
		for (let i = registries.length; i--;) {
			const hopperData = JSON.parse(registries[i]);
      const dimension = Dimensions[hopperData.dimension];
      const hopper = dimension.getBlock(hopperData.location);
      if (hopper?.typeId !== 'minecraft:hopper') continue;
			const composter = this.getOutputComposter(hopper);
      if (!composter?.isValid()) {
        this.remove(i);
        continue;
      }
      if (hopper.permutation.getState('toggle_bit') === true) continue;
      const hopperContainer = hopper.getComponent('inventory').container;
      if (hopperContainer.emptySlotsCount === hopperContainer.size) continue;
      const hasVanillaCompostable = () => {
        let slot = hopperContainer.size;
        while (slot--) {
          const item = hopperContainer.getItem(slot);
          if (item && Compostables.getVanillaCompostable(item.typeId)) return true;
        }
      }
      if (hasVanillaCompostable()) continue;
      for (let slot = 0; slot < hopperContainer.size; slot++) {
        const item = hopperContainer.getItem(slot);
        if (!item) continue;
        const compostable = Compostables.getCompostable(item.typeId);
        if (!compostable || !Compostables.isCompostable(composter)) continue;
        const stack = item.amount;
        if (stack > 1) --item.amount;
        hopperContainer.setItem(slot, stack > 1 ? item : null);
        Compostables.composting(dimension, composter, compostable.chance, true);
        break;
      }
    }
  }
  static hopperTicking() {
    hopperTicking = system.runInterval(() => this.hopperTick(), 8);
  }
}

// Initialize
system.run(() => {
	HopperRegistry.getRegistries();
});

world.afterEvents.playerPlaceBlock.subscribe(data => {
  if (HopperRegistry.getCompostingHopper(data.block)) {
    HopperRegistry.add(new HopperRegistry(data.dimension, HopperRegistry.getCompostingHopper(data.block)));
  }
}, {blockTypes: ['minecraft:composter', 'minecraft:hopper']});

// Piston Updater

class Vec3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

world.afterEvents.pistonActivate.subscribe(data => {
	const { piston } = data, state = piston.state;
	const direction = data.block.permutation.getState('facing_direction');
	const movedBlocks = piston.getAttachedBlocks();
	system.runTimeout(() => {
		for (let i = movedBlocks.length; i--;) {
			const movedBlock = movedBlocks[i];
			const newLocation = {
				0: { Expanding: new Vec3(0, -1, 0), Retracting: new Vec3(0, 1, 0) },
				1: { Expanding: new Vec3(0, 1, 0), Retracting: new Vec3(0, -1, 0) },
				2: { Expanding: new Vec3(0, 0, 1), Retracting: new Vec3(0, 0, -1) },
				3: { Expanding: new Vec3(0, 0, -1), Retracting: new Vec3(0, 0, 1) },
				4: { Expanding: new Vec3(1, 0, 0), Retracting: new Vec3(-1, 0, 0) },
				5: { Expanding: new Vec3(-1, 0, 0), Retracting: new Vec3(1, 0, 0) }
			}[direction][state];
			const block = movedBlock?.offset(newLocation);
			if (!block?.isValid()) continue;
			const compostingHopper = HopperRegistry.getCompostingHopper(block);
      if (compostingHopper) {
        HopperRegistry.add(new HopperRegistry(compostingHopper.dimension, compostingHopper.location));
      }
		}
	}, 2);
});


/* © 2019-2024, @JeanLucasMCPE - All Rights Reserved. */