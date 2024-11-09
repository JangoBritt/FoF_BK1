import {
    world,
    system
} from "@minecraft/server";

function monsterHunter(player) {
    player.runCommandAsync('function adv/monster_hunter/grant')
}

function monstersHunted(player) {
    player.runCommandAsync('function adv/monsters_hunted/test')
}

world.afterEvents.entityDie.subscribe((event) => {
    const deadEntity = event.deadEntity;
    const damageSource = event.damageSource.damagingEntity;
    const damageProjectile = event.damageSource.damagingProjectile;

    if (!damageSource) {
        return;
    }


    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:blaze") {
        if (!damageSource.hasTag('Killed_Blaze')) damageSource.addTag('Killed_Blaze')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:bogged") {
        if (!damageSource.hasTag('Killed_Bogged')) damageSource.addTag('Killed_Bogged')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:creeper") {
        if (!damageSource.hasTag('Killed_Creeper')) damageSource.addTag('Killed_Creeper')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:cave_spider") {
        if (!damageSource.hasTag('Killed_CaveSpider')) damageSource.addTag('Killed_CaveSpider')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:drowned") {
        if (!damageSource.hasTag('Killed_Drowned')) damageSource.addTag('Killed_Drowned')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:enderman") {
        if (!damageSource.hasTag('Killed_Enderman')) damageSource.addTag('Killed_Enderman')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:endermite") {
        if (!damageSource.hasTag('Killed_Endermite')) damageSource.addTag('Killed_Endermite')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:evocation_illager") {
        if (!damageSource.hasTag('Killed_Evoker')) damageSource.addTag('Killed_Evoker')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:guardian") {
        if (!damageSource.hasTag('Killed_Guardian')) damageSource.addTag('Killed_Guardian')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:hoglin") {
        if (!damageSource.hasTag('Killed_Hoglin')) damageSource.addTag('Killed_Hoglin')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:husk") {
        if (!damageSource.hasTag('Killed_Husk')) damageSource.addTag('Killed_Husk')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:magma_cube") {
        if (!damageSource.hasTag('Killed_MagmaCube')) damageSource.addTag('Killed_MagmaCube')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:piglin_brute") {
        if (!damageSource.hasTag('Killed_PiglinBrute')) damageSource.addTag('Killed_PiglinBrute')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:piglin") {
        if (!damageSource.hasTag('Killed_Piglin')) damageSource.addTag('Killed_Piglin')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:ravager") {
        if (!damageSource.hasTag('Killed_Ravager')) damageSource.addTag('Killed_Ravager')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:shulker") {
        if (!damageSource.hasTag('Killed_Shulker')) damageSource.addTag('Killed_Shulker')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:silverfish") {
        if (!damageSource.hasTag('Killed_Silverfish')) damageSource.addTag('Killed_Silverfish')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:skeleton") {
        if (!damageSource.hasTag('Killed_Skeleton')) damageSource.addTag('Killed_Skeleton')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:slime") {
        if (!damageSource.hasTag('Killed_Slime')) damageSource.addTag('Killed_Slime')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:spider") {
        if (!damageSource.hasTag('Killed_Spider')) damageSource.addTag('Killed_Spider')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:stray") {
        if (!damageSource.hasTag('Killed_Stray')) damageSource.addTag('Killed_Stray')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:vex") {
        if (!damageSource.hasTag('Killed_Vex')) damageSource.addTag('Killed_Vex')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:witch") {
        if (!damageSource.hasTag('Killed_Witch')) damageSource.addTag('Killed_Witch')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:wither_skeleton") {
        if (!damageSource.hasTag('Killed_WitherSkeleton')) damageSource.addTag('Killed_WitherSkeleton')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:wither") {
        if (!damageSource.hasTag('Killed_Wither')) damageSource.addTag('Killed_Wither')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:zoglin") {
        if (!damageSource.hasTag('Killed_Zoglin')) damageSource.addTag('Killed_Zoglin')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:zombie") {
        if (!damageSource.hasTag('Killed_Zombie')) damageSource.addTag('Killed_Zombie')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:zombie_pigman") {
        if (!damageSource.hasTag('Killed_ZombifiedPiglin')) damageSource.addTag('Killed_ZombifiedPiglin')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:zombie_villager_v2") {
        if (!damageSource.hasTag('Killed_ZombieVillager')) damageSource.addTag('Killed_ZombieVillager')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);
    }






    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:breeze") {
        if (!damageSource.hasTag('Killed_Breeze')) damageSource.addTag('Killed_Breeze')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);

        if (!damageProjectile || damageSource.hasTag('Blowback')) {
            return;
        }
        if (damageSource.typeId === 'minecraft:player' && damageProjectile.typeId === 'minecraft:breeze_wind_charge_projectile' && deadEntity.typeId === 'minecraft:breeze') damageSource.runCommandAsync('function adv/blowback/grant')
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:elder_guardian") {
        if (!damageSource.hasTag('Killed_ElderGuardian')) damageSource.addTag('Killed_ElderGuardian')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);

        if (!damageSource.hasTag('DeepEnd')) damageSource.runCommandAsync('function adv/the_deep_end/grant')
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:ender_dragon") {
        if (!damageSource.hasTag('Killed_EnderDragon')) damageSource.addTag('Killed_EnderDragon')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);

        if (!damageSource.hasTag('FreeEnd')) damageSource.runCommandAsync('function adv/free_the_end/grant')
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:ghast") {
        if (!damageSource.hasTag('Killed_Ghast')) damageSource.addTag('Killed_Ghast')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);

        if (!damageSource.hasTag('UneasyAlliance') && damageSource.dimension.id === 'minecraft:overworld') damageSource.runCommandAsync('function adv/uneasy_alliance/grant')

        if (!damageProjectile || damageSource.hasTag('ReturnSender')) {
            return;
        }
        if (damageSource.typeId === 'minecraft:player' && damageProjectile.typeId === 'minecraft:fireball' && deadEntity.typeId === 'minecraft:ghast') damageSource.runCommandAsync('function adv/return_to_sender/grant')
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:phantom") {
        if (!damageSource.hasTag('Killed_Phantom')) damageSource.addTag('Killed_Phantom')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);

        if (!damageProjectile || damageSource.hasTag('TwoBirds')) {
            return;
        }
        const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
        if (heldItem.typeId !== "minecraft:crossbow") {
            return;
        }
        if (damageSource.typeId === 'minecraft:player' && damageProjectile.typeId === 'minecraft:arrow' && deadEntity.typeId === 'minecraft:phantom') damageSource.runCommandAsync('function adv/two_birds_one_arrow/increment')
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:pillager") {
        if (!damageSource.hasTag('Killed_Pillager')) damageSource.addTag('Killed_Pillager')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);

        if (deadEntity.getComponent('minecraft:is_illager_captain') && !damageSource.hasTag('VoluntaryExile')) damageSource.runCommandAsync('function adv/voluntary_exile/grant')

        if (!damageProjectile || damageSource.hasTag('WhoPillager')) {
            return;
        }
        const heldItem = damageSource.getComponent("minecraft:equippable").getEquipment("Mainhand");
        if (heldItem.typeId !== "minecraft:crossbow") {
            return;
        }
        if (damageSource.typeId === 'minecraft:player' && damageProjectile.typeId === 'minecraft:arrow' && deadEntity.typeId === 'minecraft:pillager') damageSource.runCommandAsync('function adv/whos_the_pillager_now/grant')
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:vindicator") {
        if (!damageSource.hasTag('Killed_Vindicator')) damageSource.addTag('Killed_Vindicator')
        if (!damageSource.hasTag('MonsterHunter')) monsterHunter(damageSource);
        if (!damageSource.hasTag('MonstersHunted')) monstersHunted(damageSource);

        if (deadEntity.getComponent('minecraft:is_illager_captain') && !damageSource.hasTag('VoluntaryExile')) damageSource.runCommandAsync('function adv/voluntary_exile/grant')
    }

    if (damageSource.typeId === "minecraft:player" && deadEntity.typeId === "minecraft:warden") {
        if (!damageSource.hasTag('Killed_Warden')) damageSource.addTag('Killed_Warden')

        if (!damageSource.hasTag('BackCame')) damageSource.runCommandAsync('function adv/back_from_whence_you_came/grant')
    }

});