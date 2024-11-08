import { EntityInventoryComponent, system, world } from "@minecraft/server";
import { advancementsManager } from "./advancementsManager";
//onMobDefeated advancement code
world.afterEvents.entityDie.subscribe((data)=>{
    if (!data.damageSource.damagingEntity) return;
    if (data.damageSource.damagingEntity.typeId != "minecraft:player") return;
    const player = data.damageSource.damagingEntity;
    const advData = advancementsManager.advancements.find((f)=>f.code.onMobDefeated && f.code.onMobDefeated.mobId == data.deadEntity.typeId);
    if (!advData) return;
    if (player.getDynamicProperty(advData.typeId) != undefined) return;
    advancementsManager.completeAdvancement(player, advData);
});
//onHurtMob & onHurtByMob advancement code
world.afterEvents.entityHurt.subscribe((data)=>{
    if (!data.damageSource.damagingEntity) return;
    if (data.damageSource.damagingEntity.typeId != "minecraft:player") {
        if (data.hurtEntity.typeId != "minecraft:player") return;
        const damagingEntity = data.damageSource.damagingEntity;
        const player = data.hurtEntity;
        const advData = advancementsManager.advancements.find((f)=>f.code.onHurtByMob && f.code.onHurtByMob.mobId == damagingEntity.typeId);
        if (!advData) return;
        if (player.getDynamicProperty(advData.typeId) != undefined) return;
        advancementsManager.completeAdvancement(player, advData);
    } else {
        const player1 = data.damageSource.damagingEntity;
        const advData1 = advancementsManager.advancements.find((f)=>f.code.onHurtMob && f.code.onHurtMob.mobId == data.hurtEntity.typeId);
        if (!advData1) return;
        if (player1.getDynamicProperty(advData1.typeId) != undefined) return;
        advancementsManager.completeAdvancement(player1, advData1);
    }
});
//onBlockDestroyed advancement code
world.afterEvents.playerBreakBlock.subscribe((data)=>{
    const advData = advancementsManager.advancements.find((f)=>f.code.onBlockDestroyed && f.code.onBlockDestroyed.blockId == data.brokenBlockPermutation.type.id);
    if (!advData) return;
    if (data.player.getDynamicProperty(advData.typeId) != undefined) return;
    advancementsManager.completeAdvancement(data.player, advData);
});
//onBlockPlaced advancement code
world.afterEvents.playerPlaceBlock.subscribe((data)=>{
    const advData = advancementsManager.advancements.find((f)=>f.code.onBlockPlaced && f.code.onBlockPlaced.blockId == data.block.type.id);
    if (!advData) return;
    if (data.player.getDynamicProperty(advData.typeId) != undefined) return;
    advancementsManager.completeAdvancement(data.player, advData);
});
//onItemUse advancement code
world.afterEvents.itemUse.subscribe((data)=>{
    const { itemStack , source  } = data;
    const advData = advancementsManager.advancements.find((f)=>f.code.onItemUse && f.code.onItemUse.itemId == itemStack.typeId);
    if (!advData) return;
    if (source.getDynamicProperty(advData.typeId)) return;
    advancementsManager.completeAdvancement(source, advData);
});
//onItemCompleteUse advancement code
world.afterEvents.itemCompleteUse.subscribe((data)=>{
    const { itemStack , source  } = data;
    const advData = advancementsManager.advancements.find((f)=>f.code.onItemCompleteUse && f.code.onItemCompleteUse.itemId == itemStack.typeId);
    if (!advData) return;
    if (source.getDynamicProperty(advData.typeId)) return;
    advancementsManager.completeAdvancement(source, advData);
});
//onItemReleaseUse advancement code
world.afterEvents.itemReleaseUse.subscribe((data)=>{
    const { itemStack , source  } = data;
    if (!itemStack) return;
    const advData = advancementsManager.advancements.find((f)=>f.code.onItemReleaseUse && f.code.onItemReleaseUse.itemId == itemStack.typeId);
    if (!advData) return;
    if (source.getDynamicProperty(advData.typeId)) return;
    advancementsManager.completeAdvancement(source, advData);
});
//onItemStopUse advancement code
world.afterEvents.itemStopUse.subscribe((data)=>{
    const { itemStack , source  } = data;
    if (!itemStack) return;
    const advData = advancementsManager.advancements.find((f)=>f.code.onItemStopUse && f.code.onItemStopUse.itemId == itemStack.typeId);
    if (!advData) return;
    if (source.getDynamicProperty(advData.typeId)) return;
    advancementsManager.completeAdvancement(source, advData);
});
//onItemStartUse advancement code
world.afterEvents.itemStartUse.subscribe((data)=>{
    const { itemStack , source  } = data;
    const advData = advancementsManager.advancements.find((f)=>f.code.onItemStartUse && f.code.onItemStartUse.itemId == itemStack.typeId);
    if (!advData) return;
    if (source.getDynamicProperty(advData.typeId)) return;
    advancementsManager.completeAdvancement(source, advData);
});
//onItemUseOn advancement code
world.afterEvents.itemUseOn.subscribe((data)=>{
    const { itemStack , source , block  } = data;
    for (const advancement of advancementsManager.advancements){
        if (!advancement.code.onItemUseOn) continue;
        const itemUseCode = advancement.code.onItemUseOn;
        if (itemUseCode.itemId != itemStack.typeId) continue;
        if (itemUseCode.blockId && itemUseCode.blockId != block.typeId) continue;
        if (source.getDynamicProperty(advancement.typeId)) return;
        advancementsManager.completeAdvancement(source, advancement);
    }
});
//onItemStartUseOn advancement code
world.afterEvents.itemStartUseOn.subscribe((data)=>{
    const { itemStack , source , block  } = data;
    if (!itemStack) return;
    for (const advancement of advancementsManager.advancements){
        if (!advancement.code.onItemStartUseOn) continue;
        const itemUseCode = advancement.code.onItemStartUseOn;
        if (itemUseCode.itemId != itemStack.typeId) continue;
        if (itemUseCode.blockId && itemUseCode.blockId != block.typeId) continue;
        if (source.getDynamicProperty(advancement.typeId)) return;
        advancementsManager.completeAdvancement(source, advancement);
    }
});
//onItemStopUseOn advancement code
world.afterEvents.itemStopUseOn.subscribe((data)=>{
    const { itemStack , source , block  } = data;
    if (!itemStack) return;
    for (const advancement of advancementsManager.advancements){
        if (!advancement.code.onItemStopUseOn) continue;
        const itemUseCode = advancement.code.onItemStopUseOn;
        if (itemUseCode.itemId != itemStack.typeId) continue;
        if (itemUseCode.blockId && itemUseCode.blockId != block.typeId) continue;
        if (source.getDynamicProperty(advancement.typeId)) return;
        advancementsManager.completeAdvancement(source, advancement);
    }
});
//hasItem advancement code
system.runInterval(()=>{
    for (const player of world.getAllPlayers()){
        const inv = player.getComponent(EntityInventoryComponent.componentId);
        const container = inv.container;
        if (!container) continue;
        for(let i = 0; i < container.size; i++){
            const item = container.getItem(i);
            if (!item) continue;
            const advData = advancementsManager.advancements.find((f)=>f.code.hasItem && f.code.hasItem.itemId == item.typeId);
            if (!advData) continue;
            if (player.getDynamicProperty(advData.typeId)) continue;
            advancementsManager.completeAdvancement(player, advData);
        }
    }
}, 40);
