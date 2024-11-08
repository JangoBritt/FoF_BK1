// Import necessary modules from Minecraft server API
import { world, ItemStack, EquipmentSlot } from '@minecraft/server';

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_fence_on_player_destroy for fence destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_fence_on_player_destroy', {
        // Define behavior when a player destroys the fence
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Remove korbon:baobab_fence_inventory on top if present
            if (aboveBlock.typeId === 'korbon:baobab_fence_inventory') {
                aboveBlock.setType('minecraft:air')
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_fence_on_player_destroy for fence destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_fence_on_player_destroy', {
        // Define behavior when a player destroys the fence
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Remove korbon:jacaranda_fence_inventory on top if present
            if (aboveBlock.typeId === 'korbon:jacaranda_fence_inventory') {
                aboveBlock.setType('minecraft:air')
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_fence_on_player_destroy for fence destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_fence_on_player_destroy', {
        // Define behavior when a player destroys the fence
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Remove korbon:redwood_fence_inventory on top if present
            if (aboveBlock.typeId === 'korbon:redwood_fence_inventory') {
                aboveBlock.setType('minecraft:air')
            }
        }
    });
});






// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_fence_gate_on_player_destroy for fence destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_fence_gate_on_player_destroy', {
        // Define behavior when a player destroys the fence
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Remove the invisible korbon:fence_gate on top of our fence gate if present
            if (aboveBlock.typeId === 'korbon:baobab_fence_gate' && aboveBlock.permutation.getState('korbon:invisible')) {
                aboveBlock.setType('minecraft:air')
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_fence_gate_on_player_destroy for fence destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_fence_gate_on_player_destroy', {
        // Define behavior when a player destroys the fence
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Remove the invisible korbon:fence_gate on top of our fence gate if present
            if (aboveBlock.typeId === 'korbon:jacaranda_fence_gate' && aboveBlock.permutation.getState('korbon:invisible')) {
                aboveBlock.setType('minecraft:air')
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_fence_gate_on_player_destroy for fence destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_fence_gate_on_player_destroy', {
        // Define behavior when a player destroys the fence
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Remove the invisible korbon:fence_gate on top of our fence gate if present
            if (aboveBlock.typeId === 'korbon:redwood_fence_gate' && aboveBlock.permutation.getState('korbon:invisible')) {
                aboveBlock.setType('minecraft:air')
            }
        }
    });
});





// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_slab_on_player_destroy for slab destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_slab_on_player_destroy', {
        // Define behavior when a player destroys the slab
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { player, dimension } = e;

            // Extract destroyed block permutation from event data
            const { destroyedBlockPermutation: perm } = e;

            // Check if player is valid
            if (!player) {
                return;
            }

            // Check if the slab is in the double state
            if (perm.getState('korbon:double')) {
                // Use destroyedBlockPermutation to get the ItemStack directly
                const slabItem = perm.getItemStack(1);
                if (slabItem) {
                    // Spawn the item at the destroyed block location
                    dimension.spawnItem(slabItem, e.block.location);
                }
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_slab_on_player_destroy for slab destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_slab_on_player_destroy', {
        // Define behavior when a player destroys the slab
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { player, dimension } = e;

            // Extract destroyed block permutation from event data
            const { destroyedBlockPermutation: perm } = e;

            // Check if player is valid
            if (!player) {
                return;
            }

            // Check if the slab is in the double state
            if (perm.getState('korbon:double')) {
                // Use destroyedBlockPermutation to get the ItemStack directly
                const slabItem = perm.getItemStack(1);
                if (slabItem) {
                    // Spawn the item at the destroyed block location
                    dimension.spawnItem(slabItem, e.block.location);
                }
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_slab_on_player_destroy for slab destruction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_slab_on_player_destroy', {
        // Define behavior when a player destroys the slab
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { player, dimension } = e;

            // Extract destroyed block permutation from event data
            const { destroyedBlockPermutation: perm } = e;

            // Check if player is valid
            if (!player) {
                return;
            }

            // Check if the slab is in the double state
            if (perm.getState('korbon:double')) {
                // Use destroyedBlockPermutation to get the ItemStack directly
                const slabItem = perm.getItemStack(1);
                if (slabItem) {
                    // Spawn the item at the destroyed block location
                    dimension.spawnItem(slabItem, e.block.location);
                }
            }
        }
    });
});


/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 * */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Register a custom component before the world is loaded
world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("korbon:spawnxp", {
        onPlayerDestroy({ block, dimension, player }) {
            // Check the tool in the player's hand
            const equippable = player?.getComponent("minecraft:equippable");
            if (!equippable) return; // Exit if the player or its equipment are undefined

            const itemStack = equippable.getEquipment(EquipmentSlot.Mainhand);
            if (!itemStack) return; // Exit if the player isn't holding any item

            // Check if the player is holding a diamond, netherite, or vibranium pickaxe
            if (itemStack.typeId !== "minecraft:diamond_pickaxe" && itemStack.typeId !== "minecraft:netherite_pickaxe" && itemStack.typeId !== "korbon:vibranium_pickaxe") return; // Exit if the player isn't holding a valid pickaxe

            // Specify enchantments
            const enchantable = itemStack.getComponent("minecraft:enchantable");
            const silkTouch = enchantable?.getEnchantment("silk_touch");
            if (silkTouch) return; // Exit if the pickaxe has the Silk Touch enchantment

            // Spawn the XP orbs
            const xpAmount = randomInt(2, 3); // Number of XP orbs to spawn

            for (let i = 0; i < xpAmount; i++) {
                dimension.spawnEntity("minecraft:xp_orb", block.location);
            }
        },
    });
});




