import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  const customCopperLantern = [
    "nicothekid:copper_lantern",
    "nicothekid:exposed_copper_lantern",
    "nicothekid:weathered_copper_lantern"
  ]
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:copper_lantern_oxidization", {
    onRandomTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      const blockAllState = block.permutation.getAllStates();
      if (customCopperLantern.includes(block.typeId)) {
        let oxidizationChance = Math.random();
        if (block.permutation.matches("nicothekid:copper_lantern")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:exposed_copper_lantern", blockAllState ));
            return;
          }
          else return;
        }
        if (block.permutation.matches("nicothekid:exposed_copper_lantern")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:weathered_copper_lantern", blockAllState ));
            return;
          }
          else return;
        }
        if (block.permutation.matches("nicothekid:weathered_copper_lantern")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:oxidized_copper_lantern", blockAllState ));
            return;
          }
          else return;
        }
      }
      else return;
    }
  });
});