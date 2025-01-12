import { world, EquipmentSlot, EntityEquippableComponent, GameMode } from '@minecraft/server';

// List of flower types
const flowerTypes = [
    "korbon:bluebell",
    "korbon:lavender_flower",
    "korbon:buttercup",
    "korbon:violet_flower",
    "korbon:whispering_willow",
    "korbon:brittlebush",
    "korbon:daisy_petals",
    // Add more flower types here
];

// Function to spawn an item stack anywhere
function spawnItemAnywhere(item, location, dimension) {
    const itemEntity = dimension.spawnItem(item, location);
    return itemEntity;
}

// Function to check and spawn flowers and short grass
function spawnFlowersAndGrassAround(block, dimension, flowerType) {
    const positions = [
        { x: block.location.x + 1, y: block.location.y, z: block.location.z },
        { x: block.location.x - 1, y: block.location.y, z: block.location.z },
        { x: block.location.x, y: block.location.y, z: block.location.z + 1 },
        { x: block.location.x, y: block.location.y, z: block.location.z - 1 },
        { x: block.location.x + 1, y: block.location.y, z: block.location.z + 1 },
        { x: block.location.x + 1, y: block.location.y, z: block.location.z - 1 },
        { x: block.location.x - 1, y: block.location.y, z: block.location.z + 1 },
        { x: block.location.x - 1, y: block.location.y, z: block.location.z - 1 }
    ];

    let hasSpawnedFlower = false;
    let numberOfItemsToSpawn = Math.floor(Math.random() * 3) + 1; // Randomly 1 to 3 items
    let itemsSpawned = 0;

    positions.forEach(pos => {
        if (itemsSpawned >= numberOfItemsToSpawn) return;

        if (Math.random() < 0.3) {
            let targetPos = { ...pos };
            let blockAtPos = dimension.getBlock(targetPos);

            // Adjust the position if the block below is not air
            if (blockAtPos && blockAtPos.typeId !== "minecraft:air") {
                targetPos.y += 1;
                blockAtPos = dimension.getBlock(targetPos);
            }

            // Check if we can place a flower or grass at the adjusted position and the block below is grass or dirt
            const blockBelow = dimension.getBlock({ x: targetPos.x, y: targetPos.y - 1, z: targetPos.z });
            if (blockAtPos && blockAtPos.typeId === "minecraft:air" && 
                blockBelow && (blockBelow.typeId === "minecraft:grass_block" || blockBelow.typeId === "minecraft:dirt")) {
                
                const itemType = Math.random() < 0.5 ? flowerType : "minecraft:tallgrass";
                dimension.runCommand(`setblock ${targetPos.x} ${targetPos.y} ${targetPos.z} ${itemType}`);
                itemsSpawned += 1;
                hasSpawnedFlower = true;
            }
        }
    });

    // If no flower has been spawned, force spawn one at a random position
    if (!hasSpawnedFlower) {
        const randomPos = positions[Math.floor(Math.random() * positions.length)];
        const blockBelow = dimension.getBlock({ x: randomPos.x, y: randomPos.y - 1, z: randomPos.z });
        if (blockBelow && (blockBelow.typeId === "minecraft:grass_block" || blockBelow.typeId === "minecraft:dirt")) {
            dimension.runCommand(`setblock ${randomPos.x} ${randomPos.y} ${randomPos.z} ${flowerType}`);
        }
    }
}

// Block components
const blockComponents = [
    {
        id: "korbon:flowerSpread",
        code: {
            onPlayerInteract: (data) => {
                const { block, dimension, player } = data;

                // Get the mainhand
                const mainhand = player.getComponent(EntityEquippableComponent.componentId).getEquipmentSlot(EquipmentSlot.Mainhand);
                // Get the held item
                const item = mainhand.getItem();
                // If there is no item, return
                if (!item) return;

                if (item.typeId === "minecraft:bone_meal") {
                    // Run this if the item identifier is bone meal

                    // Ensure block.typeId is defined before using includes
                    if (block.typeId) {
                        console.log(`Block Type ID: ${block.typeId}`);
                        
                        // Determine the flower type from the block ID
                        let flowerType = "";
                        flowerTypes.forEach(type => {
                            if (block.typeId.includes(type.split(":")[1])) {
                                flowerType = type;
                            }
                        });

                        console.log(`Flower Type: ${flowerType}`);

                        if (flowerType) {
                            spawnFlowersAndGrassAround(block, dimension, flowerType);

                            // Try to spawn the particle
                            try {
                                dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
                            } catch {}

                            // Play the sound
                            dimension.playSound("item.bone_meal.use", block.center());

                            // Return if the player's game mode is creative
                            if (player.getGameMode() === GameMode.creative) return;

                            // Set the amount to the item amount - 1
                            let amount = item.amount - 1;
                            if (amount > 0) {
                                // If the reduced amount is more than 0, set the item amount to the reduced amount
                                item.amount = amount;
                                mainhand.setItem(item);
                            } else {
                                // If the reduced amount isn't higher than 0, set the item to nothing
                                mainhand.setItem();
                            }
                        }
                    }
                }
            }
        }
    }
];

// Register custom components and set initial flower type
world.beforeEvents.worldInitialize.subscribe((data) => {
    // Register each block state
    for (const comp of blockComponents) {
        data.blockComponentRegistry.registerCustomComponent(comp.id, comp.code);
    }
});
