import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:potion_of_brute_on_consume", {
    onConsume: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      if (itemUsed.typeId === "nicothekid:potion_of_brute") {
        player.addEffect("strength", 12000, { amplifier: 1, showParticles: true });
        player.addEffect("speed", 2400, { amplifier: 0, showParticles: true });
      }
      else return;
    }
  });
});