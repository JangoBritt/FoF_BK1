import { world, system, BlockPermutation } from "@minecraft/server";

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent("wypnt_bab:double_block", {
        "beforeOnPlayerPlace": (e, { params }) => {
            let headBlock;
            try {
                headBlock = params.upside_down ? e.block.below() : e.block.above();
            } catch { e.cancel = true; return; };

            const heightLimit = e.block.dimension.heightRange;
            if ((headBlock?.y > heightLimit.min) && (headBlock?.y < heightLimit.max) && headBlock && headBlock?.isAir) {
                const states = {};
                for (const [key, value] of Object.entries(params.states)) {
                    if (Array.isArray(value)) {
                        states[key] = value[Math.floor(Math.random() * value.length)];
                        continue;
                    };
                    states[key] = value;
                };
                if (!params.allow_place_on_water && e.block.typeId === "minecraft:water") {
                    e.cancel = true; return;
                };
                try {
                    system.run(() => {
                        headBlock.setPermutation(BlockPermutation.resolve(e.permutationToPlace.type.id, states))
                    });
                } catch { e.cancel = true; }
                return;
            };
            e.cancel = true;
        },
        "onPlayerBreak": ({ brokenBlockPermutation, block, player }) => {
            let sk = []
            try { sk[0] = block.above(); } catch {};
            try { sk[1] = block.below(); } catch {};
            sk.forEach(b => {
                if(b?.typeId === brokenBlockPermutation.type.id) {
                	if (player.getGameMode() !== "Creative") {
                    b.dimension.runCommand(`setblock ${b.x} ${b.y} ${b.z} air destroy`);
                    } else { b.setType("minecraft:air");}
                }
            }); 
        }
    });
});