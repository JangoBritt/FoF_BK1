import { system, BlockVolume, EquipmentSlot } from '@minecraft/server';

const flowersIds = [
    "minecraft:poppy", "minecraft:blue_orchid", "minecraft:allium",
    "minecraft:azure_bluet", "minecraft:red_tulip", "minecraft:orange_tulip",
    "minecraft:white_tulip", "minecraft:pink_tulip", "minecraft:oxeye_daisy",
    "minecraft:cornflower", "minecraft:lily_of_the_valley", "minecraft:dandelion",
    "minecraft:wither_rose", "minecraft:sunflower", "minecraft:lilac",
    "minecraft:rose_bush", "minecraft:peony", "minecraft:flowering_azalea",
    "minecraft:azalea_leaves_flowered", "minecraft:mangrove_propagule",
    "minecraft:pitcher_plant", "minecraft:torchflower", "minecraft:cherry_leaves",
    "minecraft:pink_petals", "minecraft:wildflowers", "minecraft:cactus_flower"
];

// volume 5x5x5 ao redor do bloco
function getVolume(block) {
    return new BlockVolume(
        { x: block.x - 2, y: block.y - 2, z: block.z - 2 },
        { x: block.x + 2, y: block.y + 2, z: block.z + 2 }
    );
}

// aplica offset
function getOffset(block, offset) {
    return {
        x: block.x + (offset?.x ?? 0),
        y: block.y + (offset?.y ?? 0),
        z: block.z + (offset?.z ?? 0)
    };
}

// pega índice aleatório
function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

// Verifica se a mega sapling está formada em 2x2
function isMegaSapling(block) {
    const offsets = [
        { x:  1,  z:  1 },
        { x: -1,  z:  1 },
        { x:  1,  z: -1 },
        { x: -1,  z: -1 }
    ];
    for (let i = 0; i < offsets.length; i++) {
        if (block.dimension.getBlocks(
          new BlockVolume({ x: block.x + offsets[i].x, y: block.y, z: block.z + offsets[i].z }, { x: block.x, y: block.y, z: block.z }),
          { includeTypes: [ block.typeId ] }).getCapacity() == 4) return offsets[i];
    };
    return false;
};

// Função para gerar mega árvore
function generateMegaTree(block, dimension, sapling, hasFlower, saplingOffset) {
    const structures = hasFlower && sapling.beehive_structures ? sapling.beehive_structures : sapling.structures;
    if (!structures || structures.length === 0) return;

    const structure_offsets = sapling.structure_offsets || [];
    const index = getRandomIndex(structures.length);
    const feature = structures[index];
    const offsetArr = structure_offsets[index] || [0, 0, 0];
    const offset = { x: offsetArr[0], y: offsetArr[1], z: offsetArr[2] };
    const loc = getOffset({
        x: Math.min(block.x, block.x + saplingOffset.x),
        y: block.y,
        z: Math.min(block.z, block.z + saplingOffset.z)
    }, offset);

    if (sapling.remove_sapling) block.dimension.fillBlocks(
        new BlockVolume({ x: block.x + saplingOffset.x, y: block.y, z: block.z + saplingOffset.z }, { x: block.x, y: block.y, z: block.z }),
        "minecraft:air", { blockFilter: {includeTypes: [ block.typeId ]}}
    );
    try {
        dimension.placeFeature(feature, loc, true);
    } catch { return; }
};

// função comum para gerar árvore
function generateTree(block, dimension, sapling, hasFlower) {
    // se houver estruturas customizadas definidas no JSON
    if (sapling.structures || (hasFlower && sapling.beehive_structures)) {
        // define qual array usar: beehive_structures se tiver flor e estiver definido, senão structures
        const structures = hasFlower && sapling.beehive_structures ? sapling.beehive_structures : sapling.structures;
        const structure_offsets = sapling.structure_offsets || [];

        const index = getRandomIndex(structures.length);
        const feature = structures[index];
        const offsetArr = structure_offsets[index] || [0, 0, 0];
        const offset = { x: offsetArr[0], y: offsetArr[1], z: offsetArr[2] };
        const loc = getOffset(block, offset);

        try {
            dimension.placeFeature(feature, loc, true);
        } catch { return; }

        if (sapling.remove_sapling) block.setType("minecraft:air");
        return;
    }

    // árvores padrão (com ou sem colmeia)
    try {
        if (sapling.beehive && hasFlower) {
            dimension.placeFeature(`wypnt_bab:${sapling.name}_tree_with_beehive_random_feature`, block.center(), true);
        } else {
            dimension.placeFeature(`wypnt_bab:${sapling.name}_tree_feature`, block.center(), true);
        }
    } catch { return; }

    if (sapling.remove_sapling) block.setType("minecraft:air");
}


system.beforeEvents.startup.subscribe(startup => {
    startup.blockComponentRegistry.registerCustomComponent("wypnt_bab:sapling", {
        onPlayerInteract: ({ player, block, dimension }, { params: sapling }) => {
            const equip = player.getComponent("minecraft:equippable");
            let item = equip.getEquipment(EquipmentSlot.Mainhand);

            if (!item || item.typeId !== "minecraft:bone_meal") return;

            const isCreative = player.getGameMode() === "Creative";
            
            if (sapling.can_mega && isMegaSapling(block, sapling)) return;

            // efeitos visuais
            dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
            dimension.playSound("item.bone_meal.use", block.center());

            // consumo do bone meal
            if (!isCreative) {
                item.amount <= 1 ? item = undefined : item.amount--;
                equip.setEquipment(EquipmentSlot.Mainhand, item);
            }

            // chance de falhar no modo sobrevivência
            if (!isCreative && Math.random() < 0.45) return;

            // verifica estágio atual
            let stage = block.permutation.getState("wypnt_bab:stage");
            if (stage == 0 && !isCreative) {
                // avança estágio ao usar bone meal
                block.setPermutation(block.permutation.withState("wypnt_bab:stage", 1));
                return; // ainda não gera árvore
            }

            const hasFlower = block.dimension.getBlocks(getVolume(block), {
                includeTags: ["wypnt_bab:flowers"],
                includeTypes: flowersIds
            }).getCapacity() > 0;

            // stage 1 ou criativo → gera árvore
            generateTree(block, dimension, sapling, hasFlower);
        },

        onRandomTick: ({ block, dimension }, { params: sapling }) => {
        	if (sapling.can_mega && isMegaSapling(block, sapling)) return;
            if (Math.random() < 0.10) return;

            const isCreative = false; // ticks nunca consideram criativo
            let stage = block.permutation.getState("wypnt_bab:stage");

            if (stage == 0) {
                // chance de crescer naturalmente
                if (Math.random() < 0.05) { 
                    block.setPermutation(block.permutation.withState("wypnt_bab:stage", 1));
                }
                return; // ainda não gera árvore
            }

            // stage 1 → pode gerar árvore
            const hasFlower = block.dimension.getBlocks(getVolume(block), {
                includeTags: ["wypnt_bab:flowers"],
                includeTypes: flowersIds
            }).getCapacity() > 0;

            generateTree(block, dimension, sapling, hasFlower);
        }
    });
    startup.blockComponentRegistry.registerCustomComponent("wypnt_bab:mega_sapling", {
        onPlayerInteract: ({ player, block, dimension }, { params: sapling }) => {
            const equip = player.getComponent("minecraft:equippable");
            let item = equip.getEquipment(EquipmentSlot.Mainhand);
            if (item.typeId === "minecraft:bone_meal") {

            const isCreative = player.getGameMode() === "Creative";
            const sapplingOffset = isMegaSapling(block);
            if (sapplingOffset === false) return;

            // efeitos visuais apenas na muda clicada
            dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
            dimension.playSound("item.bone_meal.use", block.center());

            // consumo do bone meal
            if (!isCreative) {
                item.amount <= 1 ? item = undefined : item.amount--;
                equip.setEquipment(EquipmentSlot.Mainhand, item);
            }

            // chance de falhar no modo sobrevivência
            if (!isCreative && Math.random() < 0.45) return;

            // verifica estágio atual da muda clicada
            let stage = block.permutation.getState("wypnt_bab:stage");
            if (stage === 0 && !isCreative) {
                block.setPermutation(block.permutation.withState("wypnt_bab:stage", 1));
                return;
            }

            const hasFlower = block.dimension.getBlocks(getVolume(block), {
                includeTags: ["wypnt_bab:flowers"],
                includeTypes: flowersIds
            }).getCapacity() > 0;

            // stage 1 ou criativo → gera mega árvore
            generateMegaTree(block, dimension, sapling, hasFlower, sapplingOffset);
            }
        },

        onRandomTick: ({ block, dimension }, { params: sapling }) => {
            if (Math.random() < 0.10) return;
            const sapplingOffset = isMegaSapling(block);
            if (sapplingOffset === false) return;

            let stage = block.permutation.getState("wypnt_bab:stage");
            if (stage === 0 && Math.random() < 0.05) {
                block.setPermutation(block.permutation.withState("wypnt_bab:stage", 1));
                return;
            }

            const hasFlower = block.dimension.getBlocks(getVolume(block), {
                includeTags: ["wypnt_bab:flowers"],
                includeTypes: flowersIds
            }).getCapacity() > 0;

            generateMegaTree(block, dimension, sapling, hasFlower, sapplingOffset);
        }
    });
});
