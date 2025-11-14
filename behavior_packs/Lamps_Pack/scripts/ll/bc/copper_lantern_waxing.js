import { world, system, BlockPermutation, GameMode } from "@minecraft/server";
import { decreaseItemStack } from "../../ntk_functions.js";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:copper_lantern_waxing", {
    onPlayerInteract: eventData => {
      const player = eventData.player;
      const block = eventData.block;
      const blockLocation = block.location;
      const playerEquippable = player.getComponent("equippable");
      const itemUsed = playerEquippable.getEquipment("Mainhand");
      const blockAllState = block.permutation.getAllStates();
      const customCopperLantern = [
        "nicothekid:copper_lantern",
        "nicothekid:exposed_copper_lantern",
        "nicothekid:oxidized_copper_lantern",
        "nicothekid:weathered_copper_lantern"
      ]
      
      if (itemUsed === undefined) return;
      if (customCopperLantern.includes(block.typeId) && itemUsed.typeId === "minecraft:honeycomb") {
        system.run(() => {
          const pitchRange = Math.random() * (1.2 - 0.8) + 0.8;
          if (block.permutation.matches("nicothekid:copper_lantern")) {
            decreaseItemStack(player, itemUsed, 1, "Mainhand");
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_copper_lantern", blockAllState ));
            return;
          }
          if (block.permutation.matches("nicothekid:exposed_copper_lantern")) {
            decreaseItemStack(player, itemUsed, 1, "Mainhand");
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_exposed_copper_lantern", blockAllState ));
            return;
          }
          if (block.permutation.matches("nicothekid:weathered_copper_lantern")) {
            decreaseItemStack(player, itemUsed, 1, "Mainhand");
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_weathered_copper_lantern", blockAllState ));
            return;
          }
          if (block.permutation.matches("nicothekid:oxidized_copper_lantern")) {
            decreaseItemStack(player, itemUsed, 1, "Mainhand");
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_oxidized_copper_lantern", blockAllState ));
            return;
          }
        });
      }
      else return;
    }
  });
});
