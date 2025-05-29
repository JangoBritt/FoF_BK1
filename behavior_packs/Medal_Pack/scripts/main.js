import { world, system } from "@minecraft/server";
import "./double_slabs.js";
import "./ravager_milk.js";
import "./utils.js";
import { FoFMilkMug } from "./milk_mug_block.js";


world.beforeEvents.worldInitialize.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent("fables_misc:ravager_milk_mug", new FoFMilkMug());
})