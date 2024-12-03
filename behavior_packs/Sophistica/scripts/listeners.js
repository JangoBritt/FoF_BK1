import { system } from '@minecraft/server';
import _0x161d87 from './manager.js';
export class MainHandItemChange {
    constructor() {
        this.running = true;
    }
    ["subscribe"](_0x5623e5) {
        this.run = system.runInterval(() => {
            let _0x428826 = {};
            let _0x2b9ca5 = _0x161d87.getAllPlayers();
            for (let _0x31cb34 of _0x2b9ca5) {
                const _0xed731f = _0x31cb34.selectedSlotIndex;
                const _0x3390fa = _0x428826[_0x31cb34.id]?.["slot"];
                if (_0xed731f != _0x3390fa) {
                    _0x5623e5({
                        'mainhandSlot': _0xed731f,
                        'oldMainhandSlot': _0x3390fa,
                        'player': _0x31cb34
                    });
                }
                _0x428826[_0x31cb34.id] = {
                    'slot': _0xed731f
                };
            }
        });
    }
    ["unsubscribe"]() {
        this.running = false;
        system.clearRun(this.run);
    }
}
export class PlayerHoldingBackpack {
    constructor() {
        this.running = true;
    }
    ['subscribe'](_0x20606d) {
        this.run = system.runInterval(() => {
            let _0x4c844c = _0x161d87.getAllPlayers();
            for (let _0x83832d of _0x4c844c) {
                const _0x10c9a6 = _0x83832d.location;
                const _0xa0bf1e = _0x83832d.getComponent("inventory").container;
                const _0x59ebab = _0xa0bf1e.getItem(_0x83832d.selectedSlotIndex);
                if (_0x59ebab) {
                    if (_0x59ebab.typeId.includes("backpack:backpack")) {
                        for (let _0x5e57a8 = -0x2; _0x5e57a8 <= 0x2; _0x5e57a8++) {
                            for (let _0x13b05e = -0x2; _0x13b05e <= 0x2; _0x13b05e++) {
                                for (let _0x810d3e = -0x2; _0x810d3e <= 0x2; _0x810d3e++) {
                                    const _0x3403f7 = {
                                        'x': Math.floor(_0x10c9a6.x) + _0x5e57a8,
                                        'y': Math.floor(_0x10c9a6.y) + _0x13b05e,
                                        'z': Math.floor(_0x10c9a6.z) + _0x810d3e
                                    };
                                    const _0x5b7a93 = _0x83832d.dimension.getBlock(_0x3403f7)?.["typeId"];
                                    if (_0x5b7a93 === "minecraft:portal" || _0x5b7a93 === "minecraft:end_portal") {
                                        _0x83832d.onScreenDisplay.setActionBar("§c§℃You can't open the backpack near a portal");
                                        return;
                                    }
                                }
                            }
                        }
                        _0x20606d({
                            'itemHolding': _0x59ebab,
                            'player': _0x83832d
                        });
                    }
                }
            }
        });
    }
    ["unsubscribe"]() {
        this.running = false;
        system.clearRun(this.run);
    }
    ["Listener"](_0x2c567f) { }
}
export class BackpackClosing {
    constructor() {
        this.running = true;
    }
    ["subscribe"](_0x5b6b96) {
        this.run = system.runInterval(() => {
            const _0x472717 = _0x161d87.getBackpacksWithTag("close");
            if (_0x472717.length > 0x0) {
                for (let _0x43c650 of _0x472717) {
                    _0x5b6b96({
                        'bpEntity': _0x43c650
                    });
                }
            }
        });
    }
    ['unsubscribe']() {
        this.running = false;
        system.clearRun(this.run);
    }
}