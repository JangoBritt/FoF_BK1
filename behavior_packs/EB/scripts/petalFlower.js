//bridge-file-version: #1
import { world, system, ItemStack, EquipmentSlot, EntityEquippableComponent, GameMode, ItemEnchantableComponent } from '@minecraft/server';
//function to spawn an item stack anywhere
function spawnItemAnywhere(item, location, dimension) {
    const itemEntity = dimension.spawnItem(item, {
        x: location.x,
        y: 100,
        z: location.z
    });
    itemEntity.teleport(location);
    return itemEntity;
}
//function to drop the patch items
function dropPatchItems(itemID, block, patchData, state) {
    if (state == 0) return;
    const item = new ItemStack(itemID, state);
    const loc = block.center();
    spawnItemAnywhere(item, loc, block.dimension);
}
//block components
const blockComponents = [
    {
        id: "pinkpetals:patch_block",
        code: {
            onPlayerInteract: (data)=>{
                const { block , dimension , player  } = data;
                //get the patch data
                const patchData = patchBlocks.find((f)=>f.blockID == data.block.typeId);
                //return if the patch data doesn't exist
                if (!patchData) return;
                //get the state number
                const state = block.permutation.getState(patchData.stateID);
                //return if the state is at max or higher
                if (state >= patchData.maxState) return;
                //get the mainhand
                const mainhand = player.getComponent(EntityEquippableComponent.componentId).getEquipmentSlot(EquipmentSlot.Mainhand);
                //get the held item
                const item = mainhand.getItem();
                //if there is no item, return
                if (!item) return;
                if (item.typeId == patchData.itemID) {
                    //run this if the item identifier matches the patch item identifier
                    //set the block state
                    block.setPermutation(block.permutation.withState(patchData.stateID, state + 1));
                    //play the sound if it exists
                    if (patchData.placeSound) {
                        const sound = patchData.placeSound;
                        dimension.playSound(sound.id, block.center(), {
                            volume: sound.volume,
                            pitch: sound.pitch
                        });
                    }
                    //return if the player's game mode is creative
                    if (player.getGameMode() == GameMode.creative) return;
                    //set the amount to the item amount - 1
                    let amount = item.amount - 1;
                    if (amount > 0) {
                        //if the reduced amount is more than 0, set the item amount to the reduced amount
                        item.amount = amount;
                        mainhand.setItem(item);
                    } else {
                        //if the reduced amount isn't higher than 0, set the item to nothing
                        mainhand.setItem();
                    }
                } else if (item.typeId == "minecraft:bone_meal" && patchData.bonemealable) {
                    //run this if the item identifier is bone meal
                    //set the block state
                    block.setPermutation(block.permutation.withState(patchData.stateID, state + 1));
                    //try to spawn the particle
                    try {
                        dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
                    } catch  {}
                    //play the sound
                    dimension.playSound("item.bone_meal.use", block.center());
                    //return if the player's game mode is creative
                    if (player.getGameMode() == GameMode.creative) return;
                    //set the amount to the item amount - 1
                    let amount1 = item.amount - 1;
                    if (amount1 > 0) {
                        //if the reduced amount is more than 0, set the item amount to the reduced amount
                        item.amount = amount1;
                        mainhand.setItem(item);
                    } else {
                        //if the reduced amount isn't higher than 0, set the item to nothing
                        mainhand.setItem();
                    }
                }
            },
            onPlayerDestroy: (data)=>{
                const { block , dimension , player  } = data;
                const perm = data.destroyedBlockPermutation;
                //get the patch data
                const patchData = patchBlocks.find((f)=>f.blockID == perm.type.id);
                //if the patch data doesn't exist; return
                if (patchData == undefined) return;
                //if the player's game mode is creative; return
                if (player.getGameMode() == GameMode.creative) return;
                //drop the patch items
                dropPatchItems(patchData.itemID, block, patchData, perm.getState(patchData.stateID));
            }
        }
    }
];
//patchBlock data
const patchBlocks = [
    {
        //the patch block identifier
        blockID: "korbon:daisy_petals",
        //the block placer item
        itemID: "korbon:daisy_petals_item",
        //the max 'growth' state
        maxState: 3,
        //the 'growth' state identifier
        stateID: "pinkpetals:growth",
        //set if this block can be bonemealed
        bonemealable: true,
        //not needed, the sound that plays when you add to the 'growth' state
        placeSound: {
            id: 'dig.grass',
            volume: 0.80,
            pitch: 0.90
        }
    }
];
world.beforeEvents.playerBreakBlock.subscribe((data)=>{
    //cancel the block destruction if the block is a patch block
    const { block , dimension , player , itemStack  } = data;
    try {
        const patchData = patchBlocks.find((f)=>f.blockID == block.typeId);
        if (patchData != undefined) {
            if (player.getGameMode() == GameMode.creative) return;
            if (itemStack != undefined) {
                const comp = itemStack.getComponent(ItemEnchantableComponent.componentId);
                if (comp != undefined) {
                    if (!comp.hasEnchantment("silk_touch")) return;
                    //cancel the block break if they use silk touch
                    data.cancel = true;
                    system.runTimeout(()=>{
                        if (!(block.isValid() && block.typeId == patchData.blockID)) return;
                        const loc = block.location;
                        //break the block
                        dropPatchItems(patchData.itemID, block, patchData, block.permutation.getState(patchData.stateID));
                        block.dimension.runCommand("fill " + loc.x + " " + loc.y + " " + loc.z + " " + loc.x + " " + loc.y + " " + loc.z + " air [] destroy");
                    });
                }
            }
        }
    } catch  {}
});
let reload = 0;
world.beforeEvents.worldInitialize.subscribe((data)=>{
    //reload needed to stop crashes
    reload = reload + 1;
    if (reload > 1) return;
    //register each block state
    for (const comp of blockComponents){
        data.blockComponentRegistry.registerCustomComponent(comp.id, comp.code);
    }
});
