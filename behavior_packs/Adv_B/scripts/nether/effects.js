import {
    world,
    system
} from "@minecraft/server";

function effectId(player, effectName) {
    return player.getEffect(effectName).typeId;
}

world.afterEvents.effectAdd.subscribe((event) => {
  const player = event.entity;
  const effect = event.effect;
  if (player.typeId !== "minecraft:player") {return;}
  if (player.hasTag('FuriousCocktail')) {return;}
  if (player.getEffect('fire_resistance') && 
player.getEffect('infested') && 
player.getEffect('invisibility') && 
player.getEffect('jump_boost') && 
player.getEffect('night_vision') && 
player.getEffect('oozing') && 
player.getEffect('poison') && 
player.getEffect('regeneration') && 
player.getEffect('resistance') && 
player.getEffect('slow_falling') && 
player.getEffect('slowness') && 
player.getEffect('speed') && 
player.getEffect('strength') && 
player.getEffect('water_breathing') && 
player.getEffect('weakness') && 
player.getEffect('weaving') && 
player.getEffect('wind_charged') && !player.hasTag('FuriousCocktail')) {
player.runCommandAsync('function adv/a_furious_cocktail/grant')
return;
}

});

world.afterEvents.effectAdd.subscribe((event) => {
  const player = event.entity;
  const effect = event.effect;
  if (player.typeId !== "minecraft:player") {return;}
  if (player.hasTag('HowHere')) {return;}
  if (player.getEffect('fire_resistance') && 
player.getEffect('infested') && 
player.getEffect('invisibility') && 
player.getEffect('jump_boost') && 
player.getEffect('night_vision') && 
player.getEffect('oozing') && 
player.getEffect('poison') && 
player.getEffect('regeneration') && 
player.getEffect('resistance') && 
player.getEffect('slow_falling') && 
player.getEffect('slowness') && 
player.getEffect('speed') && 
player.getEffect('strength') && 
player.getEffect('water_breathing') && 
player.getEffect('weakness') && 
player.getEffect('weaving') && 
player.getEffect('wind_charged')&& 
player.getEffect('absorption') &&
player.getEffect('bad_omen') && 
player.getEffect('blindness') && 
player.getEffect('conduit_power') && 
player.getEffect('darkness') && 
player.getEffect('haste') && 
player.getEffect('village_hero') && 
player.getEffect('hunger') && 
player.getEffect('levitation') && 
player.getEffect('mining_fatigue') && 
player.getEffect('nausea') && 
player.getEffect('raid_omen') && 
player.getEffect('trial_omen') && 
player.getEffect('wither') && !player.hasTag('HowHere')) {
player.runCommandAsync('function adv/how_did_we_get_here/grant')
return;
}


});




world.afterEvents.effectAdd.subscribe((event) => {
  const player = event.entity;
  const effect = event.effect;
  if (player.typeId !== "minecraft:player") {return;}
  if (player.hasTag('HeroVillage')) {return;}
  if (player.getEffect('village_hero')
) {
    player.runCommandAsync('function adv/hero_of_the_village/grant')
  return;
  }
  

});