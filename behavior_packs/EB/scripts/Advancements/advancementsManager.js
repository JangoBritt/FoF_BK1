import { world } from "@minecraft/server";
import { AdvancementTypes } from "./interfaces";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";

export class advancementsManager {
    static sendMessage(player, advancement) {
        world.sendMessage(`${player.name} has ${this.getInbetweenText(advancement)} ${advancement.type} ${this.getAdvancementColor(advancement.type)}[${advancement.name}]\n§7${advancement.description}`);
    }

    static getInbetweenText(advancement) {
        let inbetweenText = "";
        switch(advancement.type){
            case AdvancementTypes.Advancement:
                inbetweenText = "made the";
                break;
            case AdvancementTypes.Achievement:
                inbetweenText = "earned the";
                break;
            case AdvancementTypes.Goal:
                inbetweenText = "reached the";
                break;
            case AdvancementTypes.Challenge:
                inbetweenText = "completed the";
                break;
        }
        return inbetweenText;
    }

    static completeAdvancement(player, advancement) {
        this.sendMessage(player, advancement);
        if (advancement.type == AdvancementTypes.Challenge) player.playSound("achievements.complete_challenge", {
            volume: 0.5
        });
        player.setDynamicProperty(advancement.typeId, true);
        if (!advancement.onCompleteAdvancement) return;
        advancement.onCompleteAdvancement(player);
    }

    static getAdvancementColor(advancementType) {
        let color = "§f"; // default color
        switch(advancementType) {
            case AdvancementTypes.Advancement:
                color = "§a";
                break;
            case AdvancementTypes.Achievement:
                color = "§a";
                break;
            case AdvancementTypes.Goal:
                color = "§6";
                break;
            case AdvancementTypes.Challenge:
                color = "§5";
                break;
        }
        return color;
    }

    static openAdvancementMenu(player) {
        this.openMainUI(player);
    }

    static openMainUI(player) {
        const mainUi = new ActionFormData();
        for (const adv of this.advancements){
            let color = "§c";
            if (this.getCompleted(player, adv)) {
                color = this.getAdvancementColor(adv.type);
            }
            mainUi.button(`§l${color}${adv.name}`, adv.icon);
        }
        mainUi.show(player).then((onfulfilled)=>{
            if (onfulfilled.canceled) return;
            let selection = 0;
            if (onfulfilled.selection) selection = onfulfilled.selection;
            this.openAdvancementUI(player, this.advancements[selection]);
        });
    }

    static openAdvancementUI(player, advancement) {
        const advancementUI = new MessageFormData();
        advancementUI.title(advancement.name);
        advancementUI.body(advancement.description);
        advancementUI.button1("§cBack");
        advancementUI.show(player).then((onfulfilled)=>{
            if (onfulfilled.canceled) return;
            if (onfulfilled.selection == 0) this.openMainUI(player);
        });
    }

    static getCompleted(player, advancement) {
        return player.getDynamicProperty(advancement.typeId) != undefined;
    }
}

advancementsManager.advancements = [
    {
        typeId: "achievements:grizzly_bear_defeated",
        name: "Bear Necessities",
        description: "Defeat a Grizzly Bear.",
        type: AdvancementTypes.Achievement,
        icon: "textures/items/grizzly_bear_pelt",
        code: {
            onMobDefeated: {
                mobId: "korbon:grizzly_bear"
            }
        }
    },
    {
        typeId: "achievements:deer_trophy_placed",
        name: "Oh, Deer",
        description: "Place a deer trophy.",
        type: AdvancementTypes.Achievement,
        icon: "textures/items/deer_antler",
        code: {
            onBlockPlaced: {
                blockId: "korbon:deer_trophy"
            }
        }
    },
    {
        typeId: "achievements:has_vibranium",
        name: "Vibranium!",
        description: "Collect a vibranium crystal.",
        type: AdvancementTypes.Achievement,
        icon: "textures/items/vibranium",
        code: {
            hasItem: {
                itemId: "korbon:vibranium"
            }
        }
    },
    {
        typeId: "achievements:has_vibranium_ingot",
        name: "Vibranium!... again?",
        description: "Collect a vibranium ingot.",
        type: AdvancementTypes.Achievement,
        icon: "textures/items/vibranium_ingot",
        code: {
            hasItem: {
                itemId: "korbon:vibranium_ingot"
            }
        }
    },
    {
        typeId: "achievements:use_bolas",
        name: "In a Bind",
        description: "Throw a bola.",
        type: AdvancementTypes.Achievement,
        icon: "textures/items/bola",
        code: {
            onItemUse: {
                itemId: "korbon:bola"
            }
        }
    },
];
