import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("fables_misc:ravager_milk_on_consume", {
    onConsume: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      if (itemUsed.typeId === "fables_misc:ravager_milk_mug_item") {
        player.addEffect("strength", 12000, { amplifier: 1, showParticles: true });
        player.addEffect("speed", 12000, { amplifier: 1, showParticles: true });
        player.addEffect("haste", 12000, { amplifier: 1, showParticles: true });
        player.addEffect("nausea", 150, { amplifier: 0, showParticles: true });
        player.addEffect("hunger", 300, { amplifier: 0, showParticles: true });
      }
      else return;
    }
  });
});