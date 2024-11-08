import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { typeIdToDataId, typeIdToID } from "typeIds.js";
import { ItemStack, system } from "@minecraft/server"
import * as main from "./main.js"
const number_of_custom_items = 0;
class CustomForm {
  categories = new Map();
  titleText = "";
  bodytext = "";

  title(title) {
    this.titleText = title;
    return this;
  }

  body(txt) {
    this.bodytext = txt;
    return this;
  }

  button(category, text, texture = "", enchanted = false) {
    if (this.categories.has(category)) {
      this.categories.get(category).push({ "text": text, "texture": texture, "enchanted": enchanted });
    } else {
      this.categories.set(category, [{ "text": text, "texture": texture, "enchanted": enchanted }]);
    }
    return this;
  }

  getKeyAtIndex(index) {
    const keysArray = Array.from(this.categories.keys());
    if (index >= 0 && index < keysArray.length) {
      return keysArray[index];
    } else {
      console.error('Index out of bounds.');
      return null;
    }
  }

  show(player, category = this.getKeyAtIndex(0)) {
    let actionform = new ActionFormData();
    let finalTitle = "§c§u§s§t§o§m§r" + this.titleText
    actionform.title(finalTitle);

    let buttons = this.categories.get(category);
    if (buttons) {
      for (const txt of buttons) {
        const ID = typeIdToDataId.get(txt.texture) ?? typeIdToID.get(txt.texture);
        let texture = String((((ID + (ID < 256 ? 0 : number_of_custom_items)) * 65536) + (!!txt.enchanted * 32768)) || txt.texture);
        actionform.button(txt.text, texture);
      }
    }

    for (let i = 0; i < this.categories.size; i++) {
      actionform.button(`§c§a§t§e§g§o§r§y§8 ${this.getKeyAtIndex(i)}`);
    }

    let fillertxt = "";
    let catesizetxt = JSON.stringify(this.categories.size).length;
    catesizetxt = catesizetxt % 2 == 0 ? catesizetxt : catesizetxt + 1;
    for (let i = catesizetxt; i <= 10; i++) {
      fillertxt += "]";
    }

    let finalbodytxt = JSON.stringify(this.categories.size) + fillertxt + this.bodytext;
    actionform.body(finalbodytxt);

    if (category == "§e§lFilter by name") {

      const formSearch = new ModalFormData()
        .title("Search")
        .textField("", "", "")

      formSearch.show(player).then(response => {
        if (response.canceled) { main.biomeCompass(player, ""); return; }

        main.biomeCompass(player, response.formValues.toString())
      })
      return
    }
    if (category == "§c§lStop search") {
      try { system.clearRun(main.interval) } catch (e) { /*console.warn(e)*/ }

      player.setDynamicProperty("biomecompassName", "null")
      player.setDynamicProperty("biomecompassActual", "null")

      player.onScreenDisplay.setActionBar("§aBiome Compass: §cSearch Stopped")
      let inventory = player.getComponent("minecraft:inventory").container;
      for (let i = 0; i < inventory.size; i++) {
        let itemStack = inventory.getItem(i);
        if (itemStack === undefined) continue;
        itemStack.getTags().forEach(tag => {
          if (tag == "biomecompass") {
            inventory.setItem(i, new ItemStack("biomecompass:biomecompass_00", itemStack.amount));
          }
        })
      }
      return
    }

    return actionform.show(player).then(response => {
      if (!response) {
        return;
      }
      let index = buttons ? buttons.length : 0;
      let maxIndex = index + this.categories.size;

      if (response.selection >= index && response.selection < maxIndex) {
        return this.show(player, this.getKeyAtIndex(response.selection - index));
      }
      if (buttons && response.selection < buttons.length) {
        response.text = buttons[response.selection].text;
      }
      response.category = category;

      return response;
    });
  }
}
export { CustomForm };