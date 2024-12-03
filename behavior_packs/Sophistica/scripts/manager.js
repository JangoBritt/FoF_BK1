import { world, MinecraftDimensionTypes } from '@minecraft/server';
class WorldModel {
    constructor() {
        this.allPlayers = [];
        this.backpackEntities = [];
    }
    ["updateAllPlayers"]() {
        this.allPlayers = world.getAllPlayers();
    }
    ["updateAllBackpacks"]() {
        this.backpackEntities = [];
        const _0x23f820 = [MinecraftDimensionTypes.overworld, MinecraftDimensionTypes.nether, MinecraftDimensionTypes.theEnd];
        for (let _0x4a8989 of _0x23f820) {
            let _0x53d919 = world.getDimension(_0x4a8989).getEntities({
                'type': "backpack:entity_container"
            });
            for (let _0x2b9f43 of _0x53d919) {
                this.backpackEntities.push(_0x2b9f43);
            }
        }
    }
    ["addPlayer"](_0xcb5af3) {
        this.allPlayers.push(_0xcb5af3);
    }
    ["removePlayer"](_0x1745f8) {
        try {
            this.allPlayers = this.allPlayers.filter(_0x3d001a => _0x3d001a.name != _0x1745f8);
        } catch (_0x3c9b67) {
            console.warn(_0x3c9b67);
        }
    }
    ["addBackpack"](_0xe7affb) {
        this.backpackEntities.push(_0xe7affb);
    }
    ['getAllBackpacks']() {
        return this.backpackEntities;
    }
    ["getBackpacksWithTag"](_0x4bf951) {
        const _0x2a63f7 = this.backpackEntities.filter(_0x27dfd2 => {
            if (_0x27dfd2.isValid()) {
                if (_0x27dfd2.hasTag(_0x4bf951)) {
                    return true;
                }
            }
            return false;
        });
        return _0x2a63f7;
    }
    ["getAllPlayers"]() {
        return this.allPlayers;
    }
}
const sharedWorldModel = new WorldModel();
export default sharedWorldModel;