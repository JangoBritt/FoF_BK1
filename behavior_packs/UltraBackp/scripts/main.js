import * as mc from "@minecraft/server";
mc.world.afterEvents.worldInitialize.subscribe(data => {
    const backpackAPI = import("./api/backpack.js");
})