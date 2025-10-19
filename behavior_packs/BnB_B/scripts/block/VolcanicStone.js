import { world, system } from "@minecraft/server";

let magmaSettings = {
    "arcanecraft:abyss_stone": { // magma block id
        "damage_per_second": 1, // damage it does when walking
        "damage_cause": "fire", // cause of damage
        "damage_particle": "minecraft:small_soul_fire_flame", // particle that he does when dealing damage by stepping on
        "on_fall_effect": "levitation", // effect it gives when jumping on the block
        "on_fall_effect_duration": 60, // duration of the effect it gives when jumping on the block (in ticks)
        "on_fall_particle": "minecraft:small_soul_fire_flame", // particle that makes when he jumps 
        "random_particle": "minecraft:campfire_smoke_particle" // particle that spawns randomly
    }
};
system.beforeEvents.startup.subscribe(startup => {
    startup.blockComponentRegistry.registerCustomComponent("wypnt_bab:magma_block", {
        onStepOn: ({ entity }) => {
            if (entity.typeId === "minecraft:item") return;
            if (!entity.hasTag("wypnt_bab:function_looping.magma")) {
                entity.addTag("wypnt_bab:function_looping.magma");
                IsPlayerStillInTheBlock(entity);
            }
        },
        onEntityFallOn: ({ block, entity }) => {
            if (entity.typeId === "minecraft:item") return; // prevents items from disappearing if thrown at them;
            const b = magmaSettings[block.typeId];
            entity.addEffect(b.on_fall_effect, b.on_fall_effect_duration, {
                amplifier: 2, showParticles: false
            });
            if (b["fall_particle"]) entity.dimension.spawnParticle(b["fall_particle"], entity.location);
        },
        onRandomTick({ block }) {
            const b = magmaSettings[block.typeId];
            if (b && b["random_particle"]) block.dimension.spawnParticle(b["random_particle"], block.above().bottomCenter());
        }
    })
});
function IsPlayerStillInTheBlock(entity) {
    const entityLocation = entity.location;
    const blockBelow = entity.dimension.getBlock({
        x: Math.floor(entityLocation.x),
        y: Math.floor(entityLocation.y) - 1,
        z: Math.floor(entityLocation.z)
    });
    
    if (!blockBelow || !magmaSettings[blockBelow.typeId]) {
        entity?.removeTag("wypnt_bab:function_looping.magma");
        return;
    }
    
    const block = magmaSettings[blockBelow.typeId];
    if (!entity.isSneaking) {
        entity.applyDamage(block.damage_per_second, {
            cause: block.damage_cause
        });
        entity.dimension.spawnParticle(block.damage_particle, entity.location);
    };
    system.runTimeout(() => IsPlayerStillInTheBlock(entity), 20);
};

// To avoid a bug that occurs if the player leaves the world on top of the block
world.afterEvents.playerJoin.subscribe(() => {
    system.runTimeout(() => {
        world.getAllPlayers()?.forEach(player => {
            if (player) IsPlayerStillInTheBlock(player);
        });
    }, 100);
});
