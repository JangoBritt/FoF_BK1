import {
  world,
  system
} from "@minecraft/server";

//TAME MOUNT

world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
  const mob = event.entity;
  const eventId = event.eventId;
  if (eventId !== 'minecraft:on_tame') {
    return;
  }
  const mount = mob.getComponent('minecraft:rideable');
  if (!mount) {
    return;
  }
  const mountRider = mount.getRiders()[0];
  if (!mountRider) {
    return;
  }
  if (mountRider.typeId === 'minecraft:player' && !mountRider.hasTag('BestFriends')) {
    mountRider.runCommandAsync('function adv/best_friends_forever/grant')
  }
})

//TAME ITEM

world.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const entity = event.target;
  const player = event.player;
  const item = event.beforeItemStack;
  if (!entity || !player || !item) {
    return;
  }
  const entityTamed = entity.getComponent('minecraft:is_tamed');
  if (!entityTamed || entity.hasTag('tamed')) {
    return;
  }

  entity.addTag('tamed')
  if (!player.hasTag('BestFriends')) player.runCommandAsync('function adv/best_friends_forever/grant')

  if (entity.typeId !== 'minecraft:wolf' && entity.typeId !== 'minecraft:cat') {
    return;
  }
  const variant = entity.getComponent('minecraft:variant');
  
  if (entity.typeId === 'minecraft:wolf') {
    if (!variant) { player.addTag('TamedPaleWolf')
    return;}
    switch (variant.value) {
        case 0:
          player.addTag('TamedPaleWolf')
          break;
        case 1:
          player.addTag('TamedAshenWolf')
          break;
        case 2:
          player.addTag('TamedBlackWolf')
          break;
        case 3:
          player.addTag('TamedChestnutWolf')
          break;
        case 4:
          player.addTag('TamedRustyWolf')
          break;
        case 5:
          player.addTag('TamedSnowyWolf')
          break;
        case 6:
          player.addTag('TamedSpottedWolf')
          break;
        case 7:
          player.addTag('TamedStripedWolf')
          break;
        case 8:
          player.addTag('TamedWoodsWolf')
          break;
        default:
          player.addTag('TamedPaleWolf')
          return;
      }
    if (!player.hasTag('WholePack')) player.runCommandAsync('function adv/the_whole_pack/test')
  }
  if (entity.typeId === 'minecraft:cat') {
    switch (variant.value) {
        case 0:
          player.addTag('TamedWhiteCat')
          break;
        case 1:
          player.addTag('TamedTuxedoCat')
          break;
        case 2:
          player.addTag('TamedRedCat')
          break;
        case 3:
          player.addTag('TamedSiameseCat')
          break;
        case 4:
          player.addTag('TamedBritishCat')
          break;
        case 5:
          player.addTag('TamedCalicoCat')
          break;
        case 6:
          player.addTag('TamedPersianCat')
          break;
        case 7:
          player.addTag('TamedRagdollCat')
          break;
        case 8:
          player.addTag('TamedTabbyCat')
          break;
        case 9:
          player.addTag('TamedBlackCat')
          break;
        case 10:
          player.addTag('TamedJellieCat')
          break;
        default:
          player.addTag('TamedWhiteCat')
          return;
      }
if (!player.hasTag('CompleteCatalogue')) player.runCommandAsync('function adv/a_complete_catalogue/test')
  }

})