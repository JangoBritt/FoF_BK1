import { system, world } from '@minecraft/server';

const mysticalMusicDisc = [
    'korbon:record_mystical'
];

const antiMusicDisc = [
    'korbon:record_anti'
];

const blazeMusicDisc = [
    'korbon:record_blaze'
];

const blueMusicDisc = [
    'korbon:record_blue'
];

const carrotMusicDisc = [
    'korbon:record_carrot'
];

const repeatMusicDisc = [
    'korbon:record_repeat'
];

const scopophobiaMusicDisc = [
    'korbon:record_scopophobia'
];

const weirdRealmMusicDisc = [
    'korbon:record_weird_realm'
];

world.beforeEvents.playerInteractWithBlock.subscribe(evd => {
    const { player, itemStack, block } = evd;

    // This returns if the interacted block is not a Jukebox
    if (!block.permutation.matches('minecraft:jukebox')) return;

    if (itemStack) {
        if (mysticalMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.mystical", block.location)
                player.runCommand(`title @a[r=10] actionbar §dNow playing: MysticSwe - mystical`);
            })
            return;
        }
        if (antiMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.anti", block.location)

                player.runCommand(`title @a[r=10] actionbar §dNow playing: Firch - anti`);
            })
            return;
        }        
        if (blazeMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.blaze", block.location)
                player.runCommand(`title @a[r=10] actionbar §dNow playing: mango unit - blaze`);
            })
            return;
        }
        if (blueMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.blue", block.location)
                player.runCommand(`title @a[r=10] actionbar §dNow playing: TheChillVibesGuy - Blue`);
            })
            return;
        }
        if (carrotMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.carrot", block.location)
                player.runCommand(`title @a[r=10] actionbar §dNow playing: CarrotAndCo - carrot`);
            })
            return;
        }
        if (repeatMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.repeat", block.location)
                player.runCommand(`title @a[r=10] actionbar §dNow playing: iKorbon - repeat`);
            })
            return;
        }
        if (scopophobiaMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.scopophobia", block.location)
                player.runCommand(`title @a[r=10] actionbar §dNow playing: mango unit - scopophobia`);
            })
            return;
        }
        if (weirdRealmMusicDisc.includes(itemStack.typeId)) {
            system.run(function () {
                block.dimension.playSound("record.weird_realm", block.location)
                player.runCommand(`title @a[r=10] actionbar §dNow playing: ToastDot.39 - weird realm`);
            })
            return;
        }
    }
    system.run(function () {
        player.runCommand(`stopsound @a record.mystical`);
        player.runCommand(`stopsound @a record.anti`);
        player.runCommand(`stopsound @a record.blaze`);
        player.runCommand(`stopsound @a record.blue`);
        player.runCommand(`stopsound @a record.carrot`);
        player.runCommand(`stopsound @a record.repeat`);
        player.runCommand(`stopsound @a record.scopophobia`);
        player.runCommand(`stopsound @a record.weird_realm`);
    })
})
