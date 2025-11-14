import { world, system, BlockPermutation, GameMode, EntityComponentTypes, EquipmentSlot } from '@minecraft/server';

system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent("wypnt_bab:prevent_place_with_liquid_above", {
        beforeOnPlayerPlace: e => {
  const { block } = e;
  if (block?.isLiquid) {
    e.cancel = true; // prevents placing the block on liquids
  }
}
    });
});

function placeBlockAboveWater(source, blockPermutation, blockLocation) {
    const aboveBlockLocation = {
        x: blockLocation.x,
        y: blockLocation.y + 1,
        z: blockLocation.z
    };
    const blockAbove = source.dimension.getBlock(aboveBlockLocation);
    if (blockAbove) {
        blockAbove.setPermutation(blockPermutation);
    }
}

function decrementStack(player, quantity = 1) {
    if (player.getGameMode() === GameMode.Creative) return;
    const equippableComp = player.getComponent(EntityComponentTypes.Equippable);
    const item = equippableComp.getEquipment(EquipmentSlot.Mainhand);
    if (!item) return;
    if (item.amount <= quantity) equippableComp.setEquipment(EquipmentSlot.Mainhand, null);
    else { item.amount -= quantity; equippableComp.setEquipment(EquipmentSlot.Mainhand, item); }
}

world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
    const { player, block, itemStack } = data;
    if (!data.isFirstEvent || (block.typeId !== 'minecraft:water' && !block.isWaterlogged)) return;

    if (itemStack.typeId === 'wypnt_bab:lily_blossom') {
        data.cancel = true;
        system.run(() => {
            placeBlockAboveWater(player, BlockPermutation.resolve('wypnt_bab:lily_blossom'), block.location);
            decrementStack(player);
        });
    }

    if (itemStack.typeId === 'wypnt_bab:duckweed') {
        data.cancel = true;
        system.run(() => {
            placeBlockAboveWater(player, BlockPermutation.resolve('wypnt_bab:duckweed'), block.location);
            decrementStack(player);
        });
    }
});
