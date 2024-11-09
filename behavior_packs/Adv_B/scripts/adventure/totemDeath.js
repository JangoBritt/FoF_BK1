import {
    world,
    system
} from "@minecraft/server";

// no clue how this works

world.afterEvents.entityHurt.subscribe((hurt) => {
    const {
        damage,
        hurtEntity,
        damageSource: {
            cause, damagingEntity
        }
    } = hurt;
    if (damage > 0 || cause !== 'none') {return;}
    world.afterEvents.entityHurt.subscribe((hurt2) => {
        if (hurtEntity !== hurt2.hurtEntity) {return;}
        const { cause, damagingEntity } = hurt2.damageSource;
        if (cause == 'none') {return;}
        if (hurtEntity.hasTag('Postmortal')) {return;}
        hurtEntity.runCommandAsync('function adv/postmortal/grant')
        hurtEntity.addTag('Postmortal')
    })
}, { entityTypes: ['minecraft:player'] })