export class BasicEventEmitter {
    #data = new Map();
    on(event, callback){
        if (this.#data.has(event)){
            this.#data.get(event).push(callback);
        }
        else {
            this.#data.set(event, [callback])
        }
        return callback;        
    }
    emit(event, ...args){
        for (callback of this.#data.get(event) ?? []){
            try {
                callback(...args)
            }
            catch(err){
                if (this.#data.has("error"))
                    this.emit("error", err);
                else
                    console.error("bridge plugin emitter error: "+err)
            }
        }
    }
}