import { ActionFormData } from "@minecraft/server-ui"
import { BasicEventEmitter } from "../BasicEventEmitter"

class MainMenu extends BasicEventEmitter {
    static #form = new ActionFormData()
        .title("Bridge Extension Import Menu")
        .body("with this menu you can enable, disable, add, remove bridge plugins/extensions.")
        .button("Enable / Disable")
        .button("Add plugin")
        .button("Remove plugin")  
    static show(player){
        this.#form.show(player).then(res=>{
            if (res.canceled) return;
            switch (res.selection){
                case 0: super.emit("enable", player); break;
                case 1: super.emit("add", player); break;
                case 2: super.emit("remove", player); break;
            }            
        })
    }
}