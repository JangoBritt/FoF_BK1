//bridge-file-version: #1
import { world, system, ItemStack, EquipmentSlot, EntityEquippableComponent, GameMode, ItemEnchantableComponent } from '@minecraft/server';
//function to spawn an item stack anywhere


//block components
const blockComponents = [
    {
        id: "wypnt_bab:patch_block",
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
                    if (player.getGameMode() == GameMode.Creative) return;
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
                    if (player.getGameMode() == GameMode.Creative) return;
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
            }
        }
    }
];
//patchBlock data
const patchBlocks = [
    {
        //the patch block identifier
        blockID: "wypnt_bab:daisy_petals",
        //the block placer item
        itemID: "wypnt_bab:daisy_petals",
        //the max 'growth' state
        maxState: 3,
        //the 'growth' state identifier
        stateID: "wypnt_bab:growth",
        //set if this block can be bonemealed
        bonemealable: true,
        //not needed, the sound that plays when you add to the 'growth' state
        placeSound: {
            id: 'dig.grass',
            volume: 0.80,
            pitch: 0.90
        }
    },
    {
        //the patch block identifier
        blockID: "wypnt_bab:clovers",
        //the block placer item
        itemID: "wypnt_bab:clovers",
        //the max 'growth' state
        maxState: 3,
        //the 'growth' state identifier
        stateID: "wypnt_bab:growth",
        //set if this block can be bonemealed
        bonemealable: true,
        //not needed, the sound that plays when you add to the 'growth' state
        placeSound: {
            id: 'dig.grass',
            volume: 0.80,
            pitch: 0.90
        }
    },
    {
        //the patch block identifier
        blockID: "wypnt_bab:puffshroom",
        //the block placer item
        itemID: "wypnt_bab:puffshroom",
        //the max 'growth' state
        maxState: 3,
        //the 'growth' state identifier
        stateID: "wypnt_bab:growth",
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
let reload = 0;
system.beforeEvents.startup.subscribe((data)=>{
    //reload needed to stop crashes
    reload = reload + 1;
    if (reload > 1) return;
    //register each block state
    for (const comp of blockComponents){
        data.blockComponentRegistry.registerCustomComponent(comp.id, comp.code);
    }
});
