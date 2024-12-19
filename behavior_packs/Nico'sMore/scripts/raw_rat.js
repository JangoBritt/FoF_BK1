import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent("nicothekid:raw_rat_on_consume", {
    onConsume: eventData => {
      const player = eventData.source;
      const itemUsed = eventData.itemStack;
      if (itemUsed.typeId === "nicothekid:raw_rat") {
        let hungerChance = Math.random();
        if (hungerChance <= 0.3) {
          player.addEffect("hunger", 600, {amplifier: 0, showParticles: true });
        }
        return;
      }
      else return;
    }
  });
});