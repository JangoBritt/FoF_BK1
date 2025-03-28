import { ModalFormData } from "@minecraft/server-ui"
import { BasicEventEmitter } from "../BasicEventEmitter"
import { PluginHandler } from "../PluginHandler"

class PluginlistMenu extends BasicEventEmitter {
    static handler = PluginHandler.getInstance();
    static #form;
    static makeForm(){
        const form = new ModalFormData().title("Known Plugins List")
        for (const plugin of handler.getList()){
            form.toggle(plugin.name, plugin.enabled);
        }
        return form;
    }
    async show(player){

    }
}