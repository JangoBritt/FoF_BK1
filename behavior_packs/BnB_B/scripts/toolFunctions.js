import { system, world, EquipmentSlot, GameMode, ItemStack } from "@minecraft/server";

const addonNamespaces = ["wypnt_bab:"];
const isAxeTagInteractBlocks = [
    {
        matches: id=>id.includes("_log")||id.includes("_wood"),
        sound: id=>id.includes("cherry")?"step.cherry_wood":"use.wood",
        pitch: 0.8
    },
    {
        matches: id=>id.includes("_stem")||id.includes("_hyphae"),
        sound: "use.stem",
        pitch: 0.8
    },
    {
        matches: id=>id=="minecraft:stripped_bamboo_block",
        sound: "step.bamboo_wood",
        pitch: 0.8
    }
];
const isHoeTagInteractBlocks = [
    {
        matches: (id,block)=>id=="minecraft:farmland"||block.hasTag("grass"),
        sound: "use.gravel",
        pitch: 0.8
    }
];
const isShovelTagInteractBlocks = [
    {
        matches: id=>id=="minecraft:grass_path",
        sound: "use.grass",
        pitch: 0.8
    }
];
const isShovelTagUseOnBlocks = [
    {
        matches: id=>id=="minecraft:coarse_dirt",
        sound: "use.grass",
        pitch: 0.8
    },
    {
        matches: id=>id=="minecraft:dirt",
        sound: "use.grass",
        pitch: 0.8
    },
    {
        matches: id=>id=="minecraft:dirt_with_roots",
        sound: "use.grass",
        pitch: 0.8
    },
    {
        matches: id=>id=="minecraft:mycelium",
        sound: "use.grass",
        pitch: 0.8
    },
    {
        matches: id=>id=="minecraft:podzol",
        sound: "use.grass",
        pitch: 0.8
    },
    {
        matches: id=>id=="minecraft:campfire"||id=="minecraft:soul_campfire",
        sound: "random.fizz",
        pitch: ()=>1.8+Math.random()*0.6,
        volume: 0.5
    },
    {
        matches: id=>id=="minecraft:snow_layer",
        sound: "dig.snow",
        pitch: ()=>1.8+Math.random()*0.6,
        volume: 1.0
    }
];

const isShovelTagUseOnBlocksToGrassPath = [
    "minecraft:coarse_dirt",
    "minecraft:dirt",
    "minecraft:dirt_with_roots",
    "minecraft:mycelium",
    "minecraft:podzol"
];
const isShovelTagUseOnBlocksToExtinguish = [
    "minecraft:campfire",
    "minecraft:soul_campfire"
];
const isShovelTagUseOnSnow = [
    "minecraft:snow_layer"
];

function interactDamageTool(durability,enchantable,mainhand,player,itemStack) {
    if (player.getGameMode()==GameMode.Creative) return;
    const unbreaking = enchantable?.getEnchantment("unbreaking")?.level;
    const damageChance = 1/(unbreaking+1);
    if (Math.random()>damageChance) return;
    if (durability.damage>=durability.maxDurability) {
        mainhand.setItem(undefined);
        player.playSound("random.break");
    }
    else {
        durability.damage++;
        mainhand.setItem(itemStack);
    }
}

function interactToolUse(block,itemStack,player,interactBlocks) {
    const mainhand = player.getComponent("minecraft:equippable").getEquipmentSlot(EquipmentSlot.Mainhand);
    const durability = itemStack.getComponent("minecraft:durability");
    const enchantable = itemStack.getComponent("minecraft:enchantable");
    const blockId = block.typeId;
    const center = block.center();
    for (const{matches,sound="use.stone",pitch=1.0,volume=1.0} of interactBlocks) {
        if (matches(blockId,block)) {
            interactDamageTool(durability,enchantable,mainhand,player,itemStack);
            const soundId = typeof sound=="function"?sound(blockId):sound;
            const pitchRange = typeof pitch=="function"?pitch():pitch;
            const volumeRange = typeof volume=="function"?volume():volume;
            player.playSound(soundId,{location:center,pitch:pitchRange,volume:volumeRange});
            return true;
        }
    }
    return false;
}

// Defer event registration to after world is ready
system.runTimeout(() => {
    world.beforeEvents.playerInteractWithBlock.subscribe(({player,block,itemStack}) => {
        if (!itemStack) return;
        const id = itemStack.typeId;
        if (addonNamespaces.some(prefix=>id.startsWith(prefix))) {
            if (itemStack.hasTag("minecraft:is_shovel")) {
                const blockAbove = block.dimension.getBlock(block.location).above(1);
                if (isShovelTagUseOnBlocksToGrassPath.includes(block.typeId)) {
                    if (!blockAbove.isAir) return;
                    system.run(() => {
                        interactToolUse(block,itemStack,player,isShovelTagUseOnBlocks);
                        block.setType("minecraft:grass_path");
                    });
                }
                if (isShovelTagUseOnBlocksToExtinguish.includes(block.typeId)) {
                    const extinguished = block.permutation.getState("extinguished");
                    if (extinguished==true) return;
                    system.run(() => {
                        interactToolUse(block,itemStack,player,isShovelTagUseOnBlocks);
                        block.setPermutation(block.permutation.withState("extinguished",true));
                    });
                }
                if (isShovelTagUseOnSnow.includes(block.typeId)) {
                    const height = block.permutation.getState('height');
                    const snowBallCount = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4 };
                    system.run(() => {
                        interactToolUse(block,itemStack,player,isShovelTagUseOnBlocks);
                        block.dimension.spawnItem(new ItemStack('minecraft:snowball', snowBallCount[height]), block.center());
                        block.setType('minecraft:air');
                    });
                }
            }
        }
    });
    world.afterEvents.playerInteractWithBlock.subscribe(({block,itemStack,player}) => {
        if (!itemStack) return;
        const id = itemStack.typeId;
        if (addonNamespaces.some(prefix=>id.startsWith(prefix))) {
            if (itemStack.hasTag("minecraft:is_axe")) return interactToolUse(block,itemStack,player,isAxeTagInteractBlocks);
            if (itemStack.hasTag("minecraft:is_hoe")) return interactToolUse(block,itemStack,player,isHoeTagInteractBlocks);
            if (itemStack.hasTag("minecraft:is_shovel")) return interactToolUse(block,itemStack,player,isShovelTagInteractBlocks);
        }
    });
}, 1);