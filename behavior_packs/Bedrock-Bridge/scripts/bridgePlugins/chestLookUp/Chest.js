import { BlockInventoryComponent, BlockTypes, Container, world, Vector3, Dimension } from "@minecraft/server"

export const sleep = async (n) => new Promise(acc => system.runTimeout(acc, n));

export class Chest {
    static #dimensions = {
        [MinecraftDimensionTypes.overworld]: world.getDimension(MinecraftDimensionTypes.overworld),
        [MinecraftDimensionTypes.nether]: world.getDimension(MinecraftDimensionTypes.nether),
        [MinecraftDimensionTypes.theEnd]: world.getDimension(MinecraftDimensionTypes.theEnd)
    }
    /**@param {Vector3} location @param {Dimension} dimension*/
    constructor(location, dimension) {
        this.location = location;
        this.dimension = dimension;
    }
    static fromJSON(data) {
        return new Chest(data.location, Chest.#dimensions[data.dimension]);
    }
    /**Form key format string. @param {string} key */
    static fromKey(key) {
        const [x, y, z, dimension] = key.split("_")
        return new Chest({ x: Number.parseInt(x), y: Number.parseInt(y), z: Number.parseInt(z) }, this.#dimensions[dimension])
    }
    /**@returns { Container } */
    async getChest() {
        const dimension = world.getDimension(this.dimension)
        let block = dimension.getBlock(this.location);

        if (!block) {
            dimension.runCommand(`tickingarea add circle ${this.location.x} ${this.location.y} ${this.location.z} 2 esploratori:load false`)

            while (!block) {
                block = dimension.getBlock(this.location);
                await sleep(2);
            }

            dimension.runCommand(`tickingarea remove esploratori:load`);
        }

        if (block.typeId !== "minecraft:chest") throw "Bad block type for chest"

        return block.getComponent("minecraft:inventory").container;
    }

    static makeChestId(block){
        return `${block.location.x}_${block.location.y}_${block.location.z}_${block.dimension.id}`
    }
}