import { database } from "../../addons"
import { default_plugins } from "./DefaultPlugins";

export class PluginHandler {
    /**@type {PluginHandler} */
    static #instance;
    #plugins
    
    /**@private*/
    constructor(){
        this.#plugins = database.makeTable("plugins-data");   
        // if (this.#plugins.keys.length===0){ //first setup
        //     this.#initialize();
        // }
        this.#loadPlugins();
    }
    static getInstance(){
        if (!this.#instance){
            this.#instance=new PluginHandler();
        }
        return this.#instance;
    }
    /**imports the default plugins*/
    async #initialize(){
        for (const plugin of default_plugins) {
            this.#plugins.set(plugin.name, plugin)
        }
    }
    async #loadPlugins(){
        for (const plugin of this.#plugins.values()){
            try {
                await import(plugin.path)
            }
            catch(err){
                console.error(`(BedrockBridge) [importHelper] couldn't import plugin ${plugin.name}`);
            }
        }
    }
    /**
     * @param {string} raw_path 
     */
    async findPlugin(raw_path){
        let path = raw_path.trim();
        
        if (path.startsWith("./")) path = path.slice(2); // path+"/main.js" path+"/index.js"
        if (path.startsWith("../")) path = path.slice(3); // path+"/main.js" path+"/index.js"
        if (path.endsWith(".js")) path=path.slice(0, path.length-3);

        let success = false;

        success = await import(`../${path}.js`).then(() => true, () => false); if (success) return `../${path}.js`;
        success = await import(`../${path}/index.js`).then(() => true, () => false); if (success) return `../${path}/index.js`;
        success = await import(`../${path}/main.js`).then(() => true, () => false); if (success) return `../${path}/main.js`;
        success = await import(`../${path}/${path}.js`).then(() => true, () => false); if (success) return `../${path}/${path}.js`;
        
        throw new Error("it wasn't possible to find this plugin")
    }
    async addPlugin(name, raw_path){
        const path = await this.findPlugin(raw_path??name)
        this.#plugins.set(name, {name:name, path:path, enabled: true});
    }
    removePlugin(name){
        return this.#plugins.delete(name)
    }
    enablePlugin(name){
        const plugin = this.#plugins.get(name)
        plugin.enabled=true;
        this.#plugins.set(name, plugin); //save changes
    }
    disablePlugin(name){
        const plugin = this.#plugins.get(name)
        plugin.enabled = true;
        this.#plugins.set(name, plugin); //save changes
    }
    getList(){
        return this.#plugins.values();
    }
    reset(){
        this.#plugins.clear();
    }
}