import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:rotten_brute_flesh_on_consume", {
    onConsume: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      if (itemUsed.typeId === "nicothekid:rotten_brute_flesh") {
        player.addEffect("strength", 2400, {amplifier: 0, showParticles: true });
        player.addEffect("hunger", 600, {amplifier: 0, showParticles: true });
      }
      else return;
    }
  });
});