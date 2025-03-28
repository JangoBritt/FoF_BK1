import { BlockInventoryComponent, BlockTypes, Container, world, Vector3, Dimension, system } from"@minecraft/server"
import { database } from "../../addons";
import { Chest } from "./Chest";

const chestRecord = database.makeTable("chests");

world.afterEvents.playerPlaceBlock.subscribe(e=>{
    if (e.block.typeId === BlockTypes.get("chest")) {
        chestRecord.set(Chest.makeChestId(e.block), e.player.id)
    }
})
world.afterEvents.playerBreakBlock.subscribe(e=>{
    chestRecord.delete(Chest.makeChestId(e.block))
})
world.afterEvents.blockExplode.subscribe(e => {
    chestRecord.delete(Chest.makeChestId(e.block))
})