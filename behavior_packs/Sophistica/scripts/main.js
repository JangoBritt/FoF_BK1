import { world, system, ItemStack, EnchantmentTypes, MinecraftDimensionTypes } from '@minecraft/server';
import { Enchantments } from 'classes/Enchantments.js';
import { BackpackClosing, MainHandItemChange, PlayerHoldingBackpack } from './listeners.js';
import _0x3c0618 from './manager.js';
import { recipe } from './recipes.js';
import { backpackList, notBackpacksInBackpack, smoke, allowedItemsSeeds, fuelFurnace, comp, foodItems, seedToPlant, woodTypes, dimensions, desArray } from './exports.js';
function liquidSystem(_0x28a9d8, _0x1a6964, _0x2ced85, _0x56502a) {
    const _0xb7801e = _0x1a6964 + 0x1;
    const _0x58d3cb = _0x1a6964 + 0x2;
    const _0x3ee8b0 = _0x1a6964 + 0x3;
    const _0x32450b = _0x28a9d8.getItem(_0x3ee8b0);
    const _0x293edb = _0x28a9d8.getItem(_0x58d3cb);
    const _0x302e8c = _0x28a9d8.getItem(_0xb7801e);
    const _0x374fe8 = _0x28a9d8.getItem(_0x1a6964);
    const _0x3e5709 = _0x28a9d8.getItem(_0x3ee8b0);
    const _0x553dfd = _0x28a9d8.getItem(_0x58d3cb);
    if (_0x553dfd) {
        _0x553dfd.nameTag = '' + _0x553dfd.amount;
        _0x28a9d8.setItem(_0x58d3cb, _0x553dfd);
    }
    if (_0x3e5709) {
        _0x3e5709.nameTag = '' + _0x3e5709.amount;
        _0x28a9d8.setItem(_0x3ee8b0, _0x3e5709);
    }
    if (_0x302e8c && _0x302e8c.typeId === "minecraft:lava_bucket") {
        if (!_0x3e5709) {
            _0x28a9d8.setItem(_0xb7801e, undefined);
            _0x2ced85.addItem(new ItemStack("minecraft:bucket", 0x1));
            _0x28a9d8.setItem(_0x3ee8b0, new ItemStack("liquid:lava_bp", 0x1));
        } else if (_0x3e5709.typeId === "liquid:lava_bp" && _0x32450b.amount < _0x56502a) {
            _0x3e5709.amount += 0x1;
            _0x3e5709.nameTag = '' + _0x3e5709.amount;
            _0x28a9d8.setItem(_0x3ee8b0, _0x3e5709);
            _0x28a9d8.setItem(_0xb7801e, undefined);
            _0x2ced85.addItem(new ItemStack("minecraft:bucket", 0x1));
        }
    }
    if (_0x374fe8 && _0x374fe8.typeId === "minecraft:water_bucket") {
        if (!_0x553dfd) {
            _0x28a9d8.setItem(_0x1a6964, undefined);
            _0x2ced85.addItem(new ItemStack("minecraft:bucket", 0x1));
            _0x28a9d8.setItem(_0x58d3cb, new ItemStack("liquid:water_bp", 0x1));
        } else if (_0x553dfd.typeId === 'liquid:water_bp' && _0x293edb.amount < _0x56502a) {
            _0x553dfd.amount += 0x1;
            _0x553dfd.nameTag = '' + _0x553dfd.amount;
            _0x28a9d8.setItem(_0x58d3cb, _0x553dfd);
            _0x28a9d8.setItem(_0x1a6964, undefined);
            _0x2ced85.addItem(new ItemStack('minecraft:bucket', 0x1));
        }
    }
    if (_0x553dfd && _0x374fe8 && _0x374fe8.typeId === 'minecraft:bucket') {
        if (_0x553dfd.amount === 0x1) {
            _0x28a9d8.setItem(_0x58d3cb, undefined);
        } else if (_0x553dfd.typeId === "liquid:water_bp") {
            _0x553dfd.amount -= 0x1;
            _0x553dfd.nameTag = '' + _0x553dfd.amount;
            _0x28a9d8.setItem(_0x58d3cb, _0x553dfd);
        }
        if (_0x374fe8.amount === 0x1) {
            _0x28a9d8.setItem(_0x1a6964, undefined);
        } else if (_0x374fe8.amount > 0x1) {
            _0x2ced85.addItem(new ItemStack("minecraft:bucket", _0x374fe8.amount - 0x1));
            _0x28a9d8.setItem(_0x1a6964, undefined);
        }
        _0x2ced85.addItem(new ItemStack("minecraft:water_bucket", 0x1));
    }
    if (_0x3e5709 && _0x302e8c && _0x302e8c.typeId === "minecraft:bucket") {
        if (_0x3e5709.amount === 0x1) {
            _0x28a9d8.setItem(_0x3ee8b0, undefined);
        } else if (_0x3e5709.typeId === 'liquid:lava_bp') {
            _0x3e5709.amount -= 0x1;
            _0x3e5709.nameTag = '' + _0x3e5709.amount;
            _0x28a9d8.setItem(_0x3ee8b0, _0x3e5709);
        }
        if (_0x302e8c.amount === 0x1) {
            _0x28a9d8.setItem(_0xb7801e, undefined);
        } else if (_0x302e8c.amount > 0x1) {
            _0x2ced85.addItem(new ItemStack("minecraft:bucket", _0x302e8c.amount - 0x1));
            _0x28a9d8.setItem(_0xb7801e, undefined);
        }
        _0x2ced85.addItem(new ItemStack("minecraft:lava_bucket", 0x1));
    }
}
world.afterEvents.entityDie.subscribe(_0x2f0c91 => {
    if (_0x2f0c91.damageSource.damagingEntity) {
        const _0x134642 = _0x2f0c91.damageSource.damagingEntity;
        eventNotComp(_0x134642, "bp:not_backpack");
    }
}, {
    'entityTypes': ['minecraft:player']
});
class loreItem {
    constructor(_0xf7011a, _0x28af3e) {
        this.itemId = _0xf7011a;
        this.lore = _0x28af3e;
    }
}
const ItemArray = [new loreItem(comp.craft, desArray.craft), new loreItem(comp.liquid, desArray.liquid), new loreItem(comp.apple, desArray.hearts), new loreItem(comp.torch, desArray.torch), new loreItem(comp.magnet, desArray.magnet), new loreItem(comp.turtle, desArray.turtle), new loreItem(comp.mining, desArray.mining), new loreItem(comp.food, desArray.food), new loreItem(comp.transfer, desArray.transfer), new loreItem(comp.axeWood, desArray.axeWood), new loreItem(comp.magnet_v2, desArray.magnet_v2), new loreItem(comp.jump, desArray.jump), new loreItem(comp.force, desArray.force), new loreItem(comp.furnace, desArray.furn), new loreItem(comp.furnace_v2, desArray.furn_v2), new loreItem(comp.farming, desArray.farm), new loreItem(comp.music, desArray.music)];
system.runInterval(() => {
    for (const _0x59d6dc of world.getPlayers()) {
        const _0x196bd5 = _0x59d6dc.getComponent('inventory').container;
        for (let _0x3f9cae = 0x0; _0x3f9cae < _0x196bd5.size; _0x3f9cae++) {
            const _0x10305d = _0x196bd5.getItem(_0x3f9cae);
            const _0x131ae9 = ItemArray.find(_0x5dd191 => _0x5dd191.itemId == _0x10305d?.["typeId"]);
            const _0x1656e6 = _0x10305d?.["getLore"]();
            if (!_0x131ae9 || !_0x10305d || _0x1656e6?.["length"] != 0x0) {
                continue;
            }
            _0x10305d.setLore(_0x131ae9.lore);
            _0x196bd5.setItem(_0x3f9cae, _0x10305d);
        }
    }
}, 0x14);
function seedsAutoFarming(_0x1a4776, _0x28daf1, _0x682758, _0x3bc8f4) {
    let _0x4664af = _0x1a4776.location;
    let _0x4e312a = {
        'x': _0x4664af.x,
        'y': _0x4664af.y,
        'z': _0x4664af.z
    };
    let _0xb0319d = _0x1a4776.dimension;
    let _0x5564fa = _0xb0319d.getBlock(_0x4e312a);
    if (_0x5564fa && _0x5564fa.typeId === 'minecraft:farmland') {
        let _0x3a4331 = {
            'x': _0x4e312a.x,
            'y': _0x4e312a.y + 0x1,
            'z': _0x4e312a.z
        };
        let _0x481bef = _0xb0319d.getBlock(_0x3a4331);
        if (_0x481bef && _0x481bef.typeId === "minecraft:air") {
            let _0x2dc902 = false;
            let _0x56961b = null;
            let _0x173fcb = null;
            for (let _0x1f2810 = _0x682758; _0x1f2810 < _0x3bc8f4; _0x1f2810++) {
                let _0x3ef919 = _0x28daf1.getItem(_0x1f2810);
                if (_0x3ef919 && seedToPlant[_0x3ef919.typeId]) {
                    _0x2dc902 = true;
                    _0x56961b = _0x1f2810;
                    _0x173fcb = _0x3ef919.typeId;
                    break;
                }
            }
            if (_0x2dc902) {
                let _0x18cdf4 = seedToPlant[_0x173fcb];
                _0xb0319d.runCommandAsync("setblock " + _0x3a4331.x + " " + _0x3a4331.y + " " + _0x3a4331.z + " " + _0x18cdf4);
                let _0x3c64a9 = _0x28daf1.getItem(_0x56961b);
                if (_0x3c64a9.amount > 0x1) {
                    _0x3c64a9.amount--;
                    _0x28daf1.setItem(_0x56961b, _0x3c64a9);
                } else {
                    _0x28daf1.setItem(_0x56961b, null);
                }
            }
        }
    }
}
function imanItems(_0x581b68) {
    let _0x22da5e = _0x581b68.location;
    let _0x4d35cb = _0x581b68.dimension;
    let _0x45d052 = _0x4d35cb.getEntities({
        'location': _0x22da5e,
        'maxDistance': 0x8,
        'type': "minecraft:item"
    });
    for (let _0x4e9665 of _0x45d052) {
        let _0x214e50 = _0x4e9665.location;
        let _0x165ea8 = _0x4d35cb.getBlock({
            'x': _0x214e50.x,
            'y': _0x214e50.y - 0x1,
            'z': _0x214e50.z
        });
        if (_0x165ea8 && _0x165ea8.typeId !== "minecraft:air") {
            let _0x2c9ec1 = _0x4e9665.getComponent('minecraft:item').itemStack;
            let _0x1e046a = _0x581b68.getComponent("minecraft:inventory").container;
            let _0xf18227 = false;
            for (let _0x58d09c = 0x0; _0x58d09c < _0x1e046a.size; _0x58d09c++) {
                let _0x31cee8 = _0x1e046a.getItem(_0x58d09c);
                if (!_0x31cee8) {
                    _0x1e046a.setItem(_0x58d09c, _0x2c9ec1);
                    _0x4e9665.kill();
                    _0xf18227 = true;
                    break;
                } else {
                    if (_0x31cee8.typeId === _0x2c9ec1.typeId && _0x31cee8.amount < _0x31cee8.maxAmount) {
                        let _0x5678b8 = _0x31cee8.amount + _0x2c9ec1.amount;
                        if (_0x5678b8 <= _0x31cee8.maxAmount) {
                            _0x31cee8.amount = _0x5678b8;
                            _0x1e046a.setItem(_0x58d09c, _0x31cee8);
                            _0x4e9665.kill();
                            _0xf18227 = true;
                            break;
                        } else {
                            let _0x4cb4c0 = _0x5678b8 - _0x31cee8.maxAmount;
                            _0x31cee8.amount = _0x31cee8.maxAmount;
                            _0x1e046a.setItem(_0x58d09c, _0x31cee8);
                            _0x2c9ec1.amount = _0x4cb4c0;
                        }
                    }
                }
            }
        }
    }
}
function magnetItemsBackpackLevel2(_0x3c565c, _0x2f90cc, _0x4535f7, _0x52427b, _0xc11ca9) {
    const _0x17502b = {
        'type': "minecraft:item",
        'location': _0x3c565c.location,
        'maxDistance': 0x8
    };
    const _0x28f957 = _0x3c565c.dimension.getEntities(_0x17502b);
    for (let _0x18799e = _0x52427b; _0x18799e < _0xc11ca9; _0x18799e++) {
        const _0x4cd04e = _0x4535f7.getItem(_0x18799e);
        for (const _0x35d502 of _0x28f957) {
            const _0xa2e91d = _0x35d502.getComponent("item");
            if (!_0xa2e91d) {
                continue;
            }
            const _0x5da1f9 = _0xa2e91d.itemStack || _0xa2e91d;
            let _0x1915b7 = false;
            if (_0x4cd04e && _0x5da1f9.typeId === _0x4cd04e.typeId) {
                for (let _0x1cc94b = 0x0; _0x1cc94b < _0x4535f7.size; _0x1cc94b++) {
                    const _0xb1d58 = _0x4535f7.getItem(_0x1cc94b);
                    if (!_0xb1d58) {
                        _0x4535f7.setItem(_0x1cc94b, _0x5da1f9);
                        _0x35d502.kill();
                        _0x1915b7 = true;
                        break;
                    } else {
                        if (_0xb1d58.typeId === _0x5da1f9.typeId && _0xb1d58.amount < _0xb1d58.maxAmount) {
                            const _0x462367 = _0xb1d58.amount + _0x5da1f9.amount;
                            if (_0x462367 <= _0xb1d58.maxAmount) {
                                _0xb1d58.amount = _0x462367;
                                _0x4535f7.setItem(_0x1cc94b, _0xb1d58);
                                _0x35d502.kill();
                                _0x1915b7 = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (!_0x1915b7) {
                break;
            }
        }
    }
}
const lastPlacedBlock = new Map();
function torch_dynamic(_0x434848) {
    const _0x476b64 = _0x434848.location;
    const _0x7cb17f = {
        'x': Math.floor(_0x476b64.x),
        'y': Math.floor(_0x476b64.y) + 0x1,
        'z': Math.floor(_0x476b64.z)
    };
    _0x434848.runCommand("fill " + _0x7cb17f.x + " " + _0x7cb17f.y + " " + _0x7cb17f.z + " " + _0x7cb17f.x + " " + (_0x7cb17f.y + 0x1) + " " + _0x7cb17f.z + " light_block [\"block_light_level\" = 15 ] replace air");
}
function notTorch_dynamic(_0x46cd7f) {
    const _0xf471c3 = _0x46cd7f.location;
    const _0x6fc680 = {
        'x': Math.floor(_0xf471c3.x),
        'y': Math.floor(_0xf471c3.y),
        'z': Math.floor(_0xf471c3.z)
    };
    if (lastPlacedBlock.has(_0x46cd7f.name)) {
        const _0x5e8f96 = lastPlacedBlock.get(_0x46cd7f.name);
        const _0x4febe9 = [{
            'dx': 0x1,
            'dz1': -0x4,
            'dz2': 0x4
        }, {
            'dx': -0x1,
            'dz1': -0x4,
            'dz2': 0x4
        }, {
            'dx': 0x0,
            'dz1': -0x1,
            'dz2': -0x4
        }, {
            'dx': 0x0,
            'dz1': 0x1,
            'dz2': 0x4
        }, {
            'dx': 0x0,
            'dy': 0x2,
            'dz1': 0x0,
            'dz2': 0x0
        }, {
            'dx': 0x0,
            'dy': 0x0,
            'dz1': 0x0,
            'dz2': 0x0,
            'y2': _0x5e8f96.y - 0x3
        }];
        _0x4febe9.forEach(_0x1412d3 => {
            _0x46cd7f.runCommand("fill " + (_0x5e8f96.x + _0x1412d3.dx) + " " + (_0x5e8f96.y - 0x3 + (_0x1412d3.dy || 0x0)) + " " + (_0x5e8f96.z + _0x1412d3.dz1) + " " + (_0x5e8f96.x + _0x1412d3.dx) + " " + (_0x5e8f96.y + 0x5 + (_0x1412d3.dy || 0x0)) + " " + (_0x5e8f96.z + _0x1412d3.dz2) + " air replace light_block [\"block_light_level\" = 15 ]");
        });
    }
    lastPlacedBlock.set(_0x46cd7f.name, _0x6fc680);
}
function eventComp(_0x1f97a3, _0x5b0036) {
    _0x1f97a3.setProperty(_0x5b0036, true);
}
function eventNotComp(_0x49b575, _0x40bdab) {
    if (_0x40bdab === undefined) {
        return;
    }
    _0x49b575.setProperty(_0x40bdab, false);
}
const functionExecutionCounts = {};
function furnaceFunctionPortable(_0x4db3f7, _0xaffc63, _0x27c9e6, _0x33ce99, _0x1e8f8e) {
    const _0x10d30e = _0xaffc63 + 0x2;
    const _0x1d9269 = _0xaffc63 + 0x1;
    let _0x4d7bde = false;
    if (!functionExecutionCounts[_0x1e8f8e]) {
        functionExecutionCounts[_0x1e8f8e] = 0x0;
    }
    const _0x3fef89 = _0x4db3f7.getItem(_0x1d9269);
    const _0x421ef1 = _0x4db3f7.getItem(_0x10d30e);
    const _0x362075 = _0x4db3f7.getSlot(_0x10d30e).getItem();
    const _0xb9bcd2 = _0x4db3f7.getSlot(_0x1d9269).getItem();
    const _0x256e81 = _0x4db3f7.getSlot(_0xaffc63).getItem();
    for (let _0x15fe7b = 0x0; _0x15fe7b < 0x32; _0x15fe7b++) {
        for (let _0x15f8f0 = 0x0; _0x15f8f0 < 0x7; _0x15f8f0++) {
            for (const _0x39b607 of recipe[_0x15fe7b].i) {
                for (const _0x519fdd of recipe[_0x15fe7b].o) {
                    for (const _0x9557e1 of fuelFurnace[_0x15f8f0].fuel) {
                        if (_0x3fef89?.["typeId"] === _0x39b607 && _0x421ef1?.['typeId'] === _0x9557e1) {
                            if (_0x256e81?.["typeId"] && _0x256e81?.["typeId"] !== _0x519fdd) {
                                _0x4db3f7.addItem(new ItemStack(_0x256e81.typeId, _0x256e81.amount));
                                _0x4db3f7.getSlot(_0xaffc63).setItem(new ItemStack(_0x519fdd, 0x1));
                                if (_0xb9bcd2.amount === 0x1) {
                                    _0x4db3f7.getSlot(_0x1d9269).setItem(new ItemStack('minecraft:air', 0x1));
                                }
                                if (_0xb9bcd2.amount > 0x1) {
                                    _0x4db3f7.getSlot(_0x1d9269).setItem(new ItemStack(_0xb9bcd2.typeId, _0xb9bcd2.amount - 0x1));
                                }
                                return;
                            }
                            if (_0x4d7bde) {
                                continue;
                            }
                            _0x4d7bde = true;
                            if (_0xb9bcd2.amount === 0x1) {
                                _0x4db3f7.getSlot(_0x1d9269).setItem(new ItemStack("minecraft:air", 0x1));
                            }
                            if (_0xb9bcd2.amount > 0x1) {
                                _0x4db3f7.getSlot(_0x1d9269).setItem(new ItemStack(_0xb9bcd2.typeId, _0xb9bcd2.amount - 0x1));
                            }
                            if (!_0x256e81?.["typeId"]) {
                                _0x4db3f7.getSlot(_0xaffc63).setItem(new ItemStack(_0x519fdd, 0x1));
                            }
                            if (_0x256e81?.['typeId'] && _0x256e81.amount >= 0x1) {
                                _0x4db3f7.getSlot(_0xaffc63).setItem(new ItemStack(_0x519fdd, _0x256e81.amount + 0x1));
                            }
                            if (_0x256e81?.['typeId'] && _0x256e81.amount > 0x3f) {
                                _0x4db3f7.addItem(new ItemStack(_0x519fdd, _0x256e81.amount));
                                _0x4db3f7.getSlot(_0xaffc63).setItem(new ItemStack("minecraft:air", 0x1));
                                _0x4db3f7.getSlot(_0x1d9269).setItem(new ItemStack(_0xb9bcd2.typeId, _0xb9bcd2.amount));
                            }
                            for (const _0x13d4e9 of smoke[0x0].particle) {
                                _0x33ce99.runCommand(_0x13d4e9);
                            }
                            functionExecutionCounts[_0x1e8f8e]++;
                            if (functionExecutionCounts[_0x1e8f8e] === 0x3) {
                                if (_0x362075.amount > 0x1) {
                                    _0x4db3f7.getSlot(_0x10d30e).setItem(new ItemStack(_0x362075.typeId, _0x362075.amount - 0x1));
                                } else {
                                    _0x4db3f7.getSlot(_0x10d30e).setItem(new ItemStack('minecraft:air', 0x1));
                                }
                                functionExecutionCounts[_0x1e8f8e] = 0x0;
                            }
                        }
                    }
                }
            }
        }
    }
}
function furnaceFunctionPortableLevel2(_0x389e3f, _0x526484, _0x4f3b14, _0x3745b6, _0x1bf89f) {
    const _0x140d79 = _0x526484 + 0x2;
    const _0xcb9cbf = _0x526484 + 0x1;
    let _0x466eb5 = false;
    if (!functionExecutionCounts[_0x1bf89f]) {
        functionExecutionCounts[_0x1bf89f] = 0x0;
    }
    for (let _0x525653 = _0x140d79; _0x525653 < _0x4f3b14; _0x525653++) {
        const _0x50a196 = _0x389e3f.getItem(_0xcb9cbf);
        const _0x291f0e = _0x389e3f.getItem(_0x525653);
        const _0x4b93c3 = _0x389e3f.getSlot(_0x525653).getItem();
        const _0x9b4bde = _0x389e3f.getSlot(_0xcb9cbf).getItem();
        const _0x2617bd = _0x389e3f.getSlot(_0x526484).getItem();
        for (let _0x393c40 = 0x0; _0x393c40 < 0x32; _0x393c40++) {
            for (let _0x4128ac = 0x0; _0x4128ac < 0x7; _0x4128ac++) {
                for (const _0x210eab of recipe[_0x393c40].i) {
                    for (const _0xdecfdb of recipe[_0x393c40].o) {
                        for (const _0x2822dd of fuelFurnace[_0x4128ac].fuel) {
                            if (_0x50a196?.['typeId'] === _0x210eab && _0x291f0e?.["typeId"] === _0x2822dd) {
                                if (_0x2617bd?.["typeId"] && _0x2617bd?.["typeId"] !== _0xdecfdb) {
                                    _0x389e3f.addItem(new ItemStack(_0x2617bd.typeId, _0x2617bd.amount));
                                    _0x389e3f.getSlot(_0x526484).setItem(new ItemStack(_0xdecfdb, 0x1));
                                    if (_0x9b4bde.amount === 0x1) {
                                        _0x389e3f.getSlot(_0xcb9cbf).setItem(new ItemStack('minecraft:air', 0x1));
                                    }
                                    if (_0x9b4bde.amount > 0x1) {
                                        _0x389e3f.getSlot(_0xcb9cbf).setItem(new ItemStack(_0x9b4bde.typeId, _0x9b4bde.amount - 0x1));
                                    }
                                    return;
                                }
                                if (_0x466eb5) {
                                    continue;
                                }
                                _0x466eb5 = true;
                                if (_0x9b4bde.amount === 0x1) {
                                    _0x389e3f.getSlot(_0xcb9cbf).setItem(new ItemStack('minecraft:air', 0x1));
                                }
                                if (_0x9b4bde.amount > 0x1) {
                                    _0x389e3f.getSlot(_0xcb9cbf).setItem(new ItemStack(_0x9b4bde.typeId, _0x9b4bde.amount - 0x1));
                                }
                                if (!_0x2617bd?.["typeId"]) {
                                    _0x389e3f.getSlot(_0x526484).setItem(new ItemStack(_0xdecfdb, 0x1));
                                }
                                if (_0x2617bd?.["typeId"] && _0x2617bd.amount >= 0x1) {
                                    _0x389e3f.getSlot(_0x526484).setItem(new ItemStack(_0xdecfdb, _0x2617bd.amount + 0x1));
                                }
                                if (_0x2617bd?.['typeId'] && _0x2617bd.amount > 0x3f) {
                                    _0x389e3f.addItem(new ItemStack(_0xdecfdb, _0x2617bd.amount));
                                    _0x389e3f.getSlot(_0x526484).setItem(new ItemStack("minecraft:air", 0x1));
                                    _0x389e3f.getSlot(_0xcb9cbf).setItem(new ItemStack(_0x9b4bde.typeId, _0x9b4bde.amount));
                                }
                                for (const _0x367fa0 of smoke[0x0].particle) {
                                    _0x3745b6.runCommand(_0x367fa0);
                                }
                                functionExecutionCounts[_0x1bf89f]++;
                                if (functionExecutionCounts[_0x1bf89f] === 0x3) {
                                    if (_0x4b93c3.amount > 0x1) {
                                        _0x389e3f.getSlot(_0x525653).setItem(new ItemStack(_0x4b93c3.typeId, _0x4b93c3.amount - 0x1));
                                    } else {
                                        _0x389e3f.getSlot(_0x525653).setItem(new ItemStack("minecraft:air", 0x1));
                                    }
                                    functionExecutionCounts[_0x1bf89f] = 0x0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function foodAutoFun(_0x35c4cd, _0x2861ca, _0x1fce53, _0x25dd61) {
    const _0x558df0 = _0x2861ca.getItem(_0x1fce53);
    const _0x39de11 = _0x2861ca.getSlot(_0x1fce53).getItem();
    const _0x2f83d0 = foodItems.includes(_0x558df0?.["typeId"]);
    const _0x565d71 = _0x35c4cd.getComponent("health");
    if (_0x565d71.currentValue < 0x12 && _0x2f83d0) {
        _0x35c4cd.runCommand(_0x25dd61);
        if (_0x39de11.amount <= 0x1) {
            _0x2861ca.getSlot(_0x1fce53).setItem(new ItemStack('minecraft:air', 0x1));
        } else {
            _0x2861ca.getSlot(_0x1fce53).setItem(new ItemStack(_0x39de11.typeId, _0x39de11.amount - 0x1));
        }
    }
}
let playerMusicPlayState = {};
function jukeBoxFunctionMusic(_0x346924, _0x2960ba, _0x4ddc58, _0x4a5527) {
    const _0x2eb133 = _0x346924.name;
    const _0x16a713 = _0x2960ba.getItem(_0x4ddc58)?.["typeId"];
    if (!playerMusicPlayState[_0x2eb133]) {
        playerMusicPlayState[_0x2eb133] = false;
    }
    if (_0x16a713 && playerMusicPlayState[_0x2eb133] !== true) {
        playerMusicPlayState[_0x2eb133] = true;
        _0x346924.runCommand("playsound " + _0x16a713);
    } else if (!_0x16a713 && playerMusicPlayState[_0x2eb133] !== false) {
        playerMusicPlayState[_0x2eb133] = false;
        _0x346924.runCommand("stopsound @s");
    }
}
const effects = {
    'liquidChest': {
        'evento': "bp:liquid",
        'itemType': comp.liquid,
        'liquid_fun': liquidSystem
    },
    'jukebox': {
        'itemType': comp.music,
        'funcion': false,
        'evento': "bp:jukebox",
        'music': jukeBoxFunctionMusic
    },
    'magnet_v2': {
        'itemType': comp.magnet_v2,
        'funcion': magnetItemsBackpackLevel2,
        'transfer': true
    },
    'food_auto': {
        'itemType': comp.food,
        'funcion': false,
        'food': foodAutoFun,
        'effecto': "effect @s saturation 2 2 true"
    },
    'transfer': {
        'itemType': comp.transfer,
        'funcion': transferItemsBackpack,
        'transfer': true
    },
    'madera': {
        'itemType': comp.axeWood,
        'funcion': false,
        'evento': "bp:axe"
    },
    'farming': {
        'itemType': comp.farming,
        'funcion': seedsAutoFarming,
        'evento': "bp:farm",
        'seed': true
    },
    'furnace': {
        'itemType': comp.furnace,
        'funcion': false,
        'evento': 'bp:furn',
        'furnace': furnaceFunctionPortable
    },
    'furnace_v2': {
        'itemType': comp.furnace_v2,
        'funcion': false,
        'evento': "bp:furn",
        'furnace': furnaceFunctionPortableLevel2
    },
    'torch': {
        'itemType': comp.torch,
        'funcion': torch_dynamic,
        'evento': "bp:torch"
    },
    'apple': {
        'itemType': comp.apple,
        'command': "effect @s health_boost 2 1 true"
    },
    'mining': {
        'itemType': comp.mining,
        'command': "effect @s haste 2 3 true",
        'evento': "bp:pick"
    },
    'turtle': {
        'itemType': comp.turtle,
        'command': "effect @s water_breathing 2 2 true"
    },
    'magnet': {
        'itemType': comp.magnet,
        'funcion': imanItems
    }
};
const backpackConfigurations = {
    'backpack:backpack': {
        'indices': [0x1b],
        'effects': effects,
        'index1': 0x1c,
        'index2': 0x1f,
        'output': 0x1f,
        'input': 0x26,
        'magnet1': 0x26,
        'magnet2': 0x2a,
        'food': 0x2a,
        'music': 0x2b,
        'slotLiquid': 0x2c,
        'liquidMax': 0x4
    },
    'backpack:backpack_copper': {
        'indices': [36],
        'effects': effects,
        'index1': 37,
        'index2': 40,
        'output': 40,
        'input': 47,
        'magnet1': 47,
        'magnet2': 51,
        'food': 51,
        'music': 52,
        'slotLiquid': 53,
        'liquidMax': 0x4
    },
    'backpack:backpack_iron': {
        'indices': [0x2d, 0x2e],
        'effects': effects,
        'index1': 0x2f,
        'index2': 0x32,
        'output': 0x32,
        'input': 0x39,
        'magnet1': 0x39,
        'magnet2': 0x3d,
        'food': 0x3d,
        'music': 0x3e,
        'slotLiquid': 0x3f,
        'liquidMax': 0x6
    },
    'backpack:backpack_gold': {
        'indices': [54, 55],
        'effects': effects,
        'index1': 56,
        'index2': 59,
        'output': 59,
        'input': 66,
        'magnet1': 66,
        'magnet2': 70,
        'food': 70,
        'music': 71,
        'slotLiquid': 72,
        'liquidMax': 0x6
    },
    'backpack:backpack_diamond': {
        'indices': [0x3c, 0x3d, 0x3e, 0x3f],
        'effects': effects,
        'index1': 0x40,
        'index2': 0x43,
        'output': 0x43,
        'input': 0x4a,
        'magnet1': 0x4a,
        'magnet2': 0x4e,
        'food': 0x4e,
        'music': 0x4f,
        'slotLiquid': 0x50,
        'liquidMax': 0x8
    },
    'backpack:backpack_nether': {
        'indices': [0x6c, 0x6d, 0x6e, 0x6f, 0x70, 0x71],
        'effects': effects,
        'index1': 0x72,
        'index2': 0x75,
        'output': 0x75,
        'input': 0x7c,
        'magnet1': 0x7c,
        'magnet2': 0x80,
        'food': 0x80,
        'music': 0x81,
        'slotLiquid': 0x82,
        'liquidMax': 0xa
    }
};
const allowedItems = [comp.craft, comp.liquid, comp.axeWood, comp.torch, comp.apple, comp.mining, comp.turtle, comp.magnet, comp.magnet_v2, comp.jump, comp.force, comp.furnace, comp.furnace_v2, comp.farming, comp.transfer, comp.food, comp.music];
function isAllowedItem(_0x10bdd3, _0x3418ab) {
    return _0x3418ab.includes(_0x10bdd3.typeId);
}
function returnItemToPlayer(_0x43849b, _0x1b900a, _0x964540, _0x416a82, _0xce52a8) {
    for (let _0x2e884e = 0x0; _0x2e884e < _0x43849b.size; _0x2e884e++) {
        if (!_0x43849b.getItem(_0x2e884e)) {
            _0x43849b.setItem(_0x2e884e, _0x1b900a);
            return true;
        }
    }
    for (let _0x4d8bbf = 0x0; _0x4d8bbf < _0x964540.size; _0x4d8bbf++) {
        if (!_0x964540.getItem(_0x4d8bbf)) {
            _0x964540.setItem(_0x4d8bbf, _0x1b900a);
            return false;
        }
    }
}
function transferItemsBackpack(_0x5e21ac, _0x53f976, _0x8cc866) {
    let _0x35dedc = true;
    for (let _0x2cded = 0x0; _0x2cded < _0x53f976.size; _0x2cded++) {
        if (!_0x53f976.getItem(_0x2cded)) {
            _0x35dedc = false;
            break;
        }
    }
    if (_0x35dedc) {
        const _0x2924a3 = {
            'type': "minecraft:item",
            'location': _0x5e21ac.location,
            'maxDistance': 1.5
        };
        const _0x2e5fa7 = _0x5e21ac.dimension.getEntities(_0x2924a3);
        for (const _0x1aeb62 of _0x2e5fa7) {
            const _0x27e41e = _0x1aeb62.getComponent("item").itemStack;
            let _0x56b799 = false;
            for (let _0x3ba346 = 0x0; _0x3ba346 < _0x8cc866.size; _0x3ba346++) {
                const _0x53d5a1 = _0x8cc866.getItem(_0x3ba346);
                if (!_0x53d5a1) {
                    _0x8cc866.setItem(_0x3ba346, _0x27e41e);
                    _0x1aeb62.kill();
                    _0x56b799 = true;
                    break;
                } else {
                    if (_0x53d5a1.typeId === _0x27e41e.typeId && _0x53d5a1.amount < _0x53d5a1.maxAmount) {
                        const _0x18edd5 = _0x53d5a1.amount + _0x27e41e.amount;
                        if (_0x18edd5 <= _0x53d5a1.maxAmount) {
                            _0x53d5a1.amount = _0x18edd5;
                            _0x8cc866.setItem(_0x3ba346, _0x53d5a1);
                            _0x1aeb62.kill();
                            _0x56b799 = true;
                            break;
                        }
                    }
                }
            }
            if (!_0x56b799) {
                break;
            }
        }
    }
}
function checkEquip() {
    for (const _0x3c97cb of world.getAllPlayers()) {
        notTorch_dynamic(_0x3c97cb);
        for (const _0x70638c of dimensions) {
            const _0x1e866f = {
                'type': "backpack:entity_container"
            };
            const _0x1f1d03 = world.getDimension(_0x70638c).getEntities(_0x1e866f);
            for (const _0x103da5 of _0x1f1d03) {
                const _0x34a5cb = _0x103da5.getComponent('inventory').container;
                const _0x1ec2c8 = _0x103da5.getTags().find(_0x29fa92 => _0x29fa92.startsWith("§r§7Item id: §9"));
                if (!_0x1ec2c8) {
                    continue;
                }
                const _0x4aea18 = _0x3c97cb.getComponent("inventory").container;
                const _0x42360c = Object.keys(backpackConfigurations);
                const _0x4a9b5f = _0x42360c.find(_0x24d61c => Array.from({
                    'length': 0xa
                }).some((_0x1d3818, _0x5de1dd) => {
                    const _0x49c0ce = _0x4aea18.getItem(_0x5de1dd);
                    return _0x49c0ce && _0x49c0ce.typeId === _0x24d61c && _0x49c0ce.getLore().includes(_0x1ec2c8);
                }));
                const _0x4ed174 = _0x3c97cb.selectedSlotIndex;
                const _0x460698 = _0x4aea18.getItem(_0x4ed174);
                const _0x59b9ee = backpackList.includes(_0x4aea18.getItem(_0x3c97cb.selectedSlotIndex)?.["typeId"]);
                const _0x17bc45 = _0x4aea18.getItem(_0x3c97cb.selectedSlotIndex)?.["typeId"];
                for (let _0x2fc2bf = 0x0; _0x2fc2bf < _0x4aea18.size; _0x2fc2bf++) {
                    const _0x273445 = _0x4aea18.getItem(_0x2fc2bf);
                    if (_0x59b9ee && _0x460698?.["typeId"] === _0x17bc45) {
                        _0x460698.lockMode = true;
                        _0x4aea18.setItem(_0x4ed174, _0x460698);
                    }
                    if (backpackList.includes(_0x273445?.["typeId"]) && _0x2fc2bf !== _0x4ed174) {
                        _0x273445.lockMode = false;
                        _0x4aea18.setItem(_0x2fc2bf, _0x273445);
                    }
                }
                for (let _0x2a7e95 = 0x0; _0x2a7e95 < _0x34a5cb.size; _0x2a7e95++) {
                    const _0x5c73fa = _0x34a5cb.getItem(_0x2a7e95);
                    if (_0x5c73fa && notBackpacksInBackpack.includes(_0x5c73fa.typeId)) {
                        _0x34a5cb.setItem(_0x2a7e95, null);
                        returnItemToPlayer(_0x4aea18, _0x5c73fa, _0x34a5cb, _0x3c97cb);
                    }
                }
                if (_0x4a9b5f) {
                    const _0x3a78d0 = backpackConfigurations[_0x4a9b5f];
                    const {
                        indices: _0x37bd23,
                        effects: _0x4f7b36,
                        index1: _0x4fa86a,
                        index2: _0x4fa633,
                        output: _0x5173df,
                        input: _0x58442f,
                        magnet1: _0x9ce4d1,
                        magnet2: _0x1a701f,
                        food: _0x11373a,
                        music: _0x53cd28,
                        slotLiquid: _0x3ad5f2,
                        liquidMax: _0x3e69ad
                    } = _0x3a78d0;
                    _0x3c97cb.setProperty(_0x4a9b5f, true);
                    for (const _0x39d97a of _0x37bd23) {
                        const _0x5af3b0 = _0x34a5cb.getItem(_0x39d97a);
                        if (_0x5af3b0 && allowedItems.includes(_0x5af3b0.typeId)) {
                            let _0x3bfbc6 = 0x0;
                            for (const _0x119d67 of _0x37bd23) {
                                const _0x1f4728 = _0x34a5cb.getItem(_0x119d67);
                                if (_0x1f4728 && _0x1f4728?.["typeId"] === _0x5af3b0?.["typeId"]) {
                                    _0x3bfbc6++;
                                }
                            }
                            if (_0x3bfbc6 >= 0x2) {
                                _0x34a5cb.setItem(_0x39d97a, null);
                                returnItemToPlayer(_0x4aea18, _0x5af3b0, _0x34a5cb, _0x3c97cb);
                            }
                        }
                    }
                    for (const _0x37c947 of _0x37bd23) {
                        const _0x284329 = _0x34a5cb.getItem(_0x37c947);
                        if (_0x284329 && !allowedItems.includes(_0x284329.typeId)) {
                            _0x34a5cb.setItem(_0x37c947, null);
                            returnItemToPlayer(_0x4aea18, _0x284329, _0x34a5cb, _0x3c97cb);
                        }
                    }
                    for (let _0x37a921 = _0x4fa86a; _0x37a921 < _0x4fa633; _0x37a921++) {
                        const _0x5a65e6 = _0x34a5cb.getItem(_0x37a921);
                        if (_0x5a65e6 && !allowedItemsSeeds.includes(_0x5a65e6.typeId)) {
                            _0x34a5cb.setItem(_0x37a921, null);
                            returnItemToPlayer(_0x4aea18, _0x5a65e6, _0x34a5cb, _0x3c97cb);
                        }
                    }
                    for (const _0x3b70cc in _0x4f7b36) {
                        const _0x5d3ffc = _0x4f7b36[_0x3b70cc];
                        const _0x44e818 = _0x37bd23.some(_0x4dff52 => _0x34a5cb.getItem(_0x4dff52)?.['typeId'] === _0x5d3ffc.itemType);
                        if (_0x44e818 && _0x5d3ffc.liquid_fun) {
                            _0x5d3ffc.liquid_fun(_0x34a5cb, _0x3ad5f2, _0x4aea18, _0x3e69ad);
                        }
                        if (_0x44e818 && _0x5d3ffc.music) {
                            _0x5d3ffc.music(_0x3c97cb, _0x34a5cb, _0x53cd28, _0x4a9b5f);
                        }
                        if (_0x44e818 && _0x5d3ffc.transfer) {
                            _0x5d3ffc.funcion(_0x3c97cb, _0x4aea18, _0x34a5cb, _0x9ce4d1, _0x1a701f);
                        }
                        if (_0x44e818 && _0x5d3ffc.evento) {
                            eventComp(_0x3c97cb, _0x5d3ffc.evento);
                        } else {
                            eventNotComp(_0x3c97cb, _0x5d3ffc.evento);
                        }
                        if (_0x44e818 && _0x5d3ffc.seed) {
                            _0x5d3ffc.funcion(_0x3c97cb, _0x34a5cb, _0x4fa86a, _0x4fa633);
                        }
                        if (_0x44e818 && _0x5d3ffc.funcion && _0x5d3ffc.funcion !== false && _0x5d3ffc.seed !== true && _0x5d3ffc.transfer !== true && _0x5d3ffc.furnace !== true) {
                            _0x5d3ffc.funcion(_0x3c97cb);
                        }
                        if (_0x44e818 && !_0x5d3ffc.funcion && _0x5d3ffc.funcion !== false && !_0x5d3ffc.liquid_fun) {
                            _0x3c97cb.runCommand(_0x5d3ffc.command);
                        }
                    }
                } else {
                    _0x3c97cb.runCommandAsync("event entity @s bp:not_backpack");
                }
            }
        }
    }
}
function autoFoodSlotEvaule() {
    for (const _0x1d9250 of world.getAllPlayers()) {
        for (const _0x43cafd of dimensions) {
            const _0x400484 = {
                'type': "backpack:entity_container"
            };
            const _0x47f8d1 = world.getDimension(_0x43cafd).getEntities(_0x400484);
            for (const _0x7e16c2 of _0x47f8d1) {
                const _0x16aee6 = _0x7e16c2.getComponent("inventory").container;
                const _0x49b255 = _0x7e16c2.getTags().find(_0x3ed35e => _0x3ed35e.startsWith("§r§7Item id: §9"));
                if (!_0x49b255) {
                    continue;
                }
                const _0x5413b0 = _0x1d9250.getComponent("inventory").container;
                const _0x49a33e = Object.keys(backpackConfigurations);
                const _0x154e88 = _0x49a33e.find(_0x1a65ce => Array.from({
                    'length': 0xa
                }).some((_0x1c432f, _0x359767) => {
                    const _0x5c0cf9 = _0x5413b0.getItem(_0x359767);
                    return _0x5c0cf9 && _0x5c0cf9.typeId === _0x1a65ce && _0x5c0cf9.getLore().includes(_0x49b255);
                }));
                if (_0x154e88) {
                    const _0x39593b = backpackConfigurations[_0x154e88];
                    const {
                        indices: _0x34701a,
                        effects: _0x5b4a6f,
                        index1: _0x2e540f,
                        index2: _0x258e7d,
                        output: _0x3c9e84,
                        input: _0x148ea9,
                        magnet1: _0x2edec0,
                        magnet2: _0x5a5fe5,
                        food: _0x1369ad
                    } = _0x39593b;
                    for (const _0x3f5364 in _0x5b4a6f) {
                        const _0x47457e = _0x5b4a6f[_0x3f5364];
                        const _0x2e2acf = _0x34701a.some(_0x1242ed => _0x16aee6.getItem(_0x1242ed)?.["typeId"] === _0x47457e.itemType);
                        if (_0x2e2acf && _0x47457e.food) {
                            _0x47457e.food(_0x1d9250, _0x16aee6, _0x1369ad, _0x47457e.effecto);
                        }
                    }
                }
            }
        }
    }
}
function checkEquipFurnace() {
    for (const _0x426099 of world.getAllPlayers()) {
        notTorch_dynamic(_0x426099);
        for (const _0x543cd3 of dimensions) {
            const _0x5734c2 = {
                'type': 'backpack:entity_container'
            };
            const _0x41bc01 = world.getDimension(_0x543cd3).getEntities(_0x5734c2);
            for (const _0xd02853 of _0x41bc01) {
                const _0x15c3cf = _0xd02853.getComponent("inventory").container;
                const _0x41ae7c = _0xd02853.getTags().find(_0x8f0520 => _0x8f0520.startsWith("§r§7Item id: §9"));
                if (!_0x41ae7c) {
                    continue;
                }
                const _0x292384 = _0x426099.getComponent('inventory').container;
                const _0x171d05 = Object.keys(backpackConfigurations);
                const _0x525304 = _0x171d05.find(_0x1f1819 => Array.from({
                    'length': 0xa
                }).some((_0x5ce9d8, _0xc71da4) => {
                    const _0x40ad38 = _0x292384.getItem(_0xc71da4);
                    return _0x40ad38 && _0x40ad38.typeId === _0x1f1819 && _0x40ad38.getLore().includes(_0x41ae7c);
                }));
                if (_0x525304) {
                    const _0x449b0a = backpackConfigurations[_0x525304];
                    const {
                        indices: _0x23e890,
                        effects: _0xf50a92,
                        index1: _0xc49735,
                        index2: _0x518fe0,
                        output: _0x27ff1b,
                        input: _0x282dee
                    } = _0x449b0a;
                    for (const _0x2ff14d in _0xf50a92) {
                        const _0x2fc547 = _0xf50a92[_0x2ff14d];
                        const _0x1ee3ac = _0x23e890.some(_0x3787b4 => _0x15c3cf.getItem(_0x3787b4)?.["typeId"] === _0x2fc547.itemType);
                        if (_0x1ee3ac && _0x2fc547.furnace) {
                            _0x2fc547.furnace(_0x15c3cf, _0x27ff1b, _0x282dee, _0x426099, _0x525304);
                        }
                    }
                }
            }
        }
    }
}
world.beforeEvents.playerBreakBlock.subscribe(({
    block: _0x2143d7,
    player: _0x11d67b
}) => {
    for (const _0x179479 of dimensions) {
        const _0x18bd75 = {
            'type': "backpack:entity_container"
        };
        const _0x4edbba = world.getDimension(_0x179479).getEntities(_0x18bd75);
        for (const _0x3b4a23 of _0x4edbba) {
            const _0x18d34c = _0x3b4a23.getComponent("inventory").container;
            const _0x5d925b = _0x3b4a23.getTags().find(_0x58e1c6 => _0x58e1c6.startsWith("§r§7Item id: §9"));
            if (!_0x5d925b) {
                continue;
            }
            const _0x44f28c = _0x11d67b.getComponent("inventory").container;
            const _0x3e1c82 = Object.keys(backpackConfigurations);
            const _0x1be87d = _0x3e1c82.find(_0x513f95 => Array.from({
                'length': 0xa
            }).some((_0x45f3ef, _0x3958fc) => {
                const _0x1b5474 = _0x44f28c.getItem(_0x3958fc);
                return _0x1b5474 && _0x1b5474.typeId === _0x513f95 && _0x1b5474.getLore().includes(_0x5d925b);
            }));
            if (_0x1be87d) {
                const _0xe8e759 = backpackConfigurations[_0x1be87d];
                const {
                    indices: _0x12585b
                } = _0xe8e759;
                const _0x565ac0 = _0x12585b.some(_0x6543d5 => _0x18d34c.getItem(_0x6543d5)?.["typeId"] == comp.axeWood);
                if (_0x565ac0 && _0x2143d7 && woodTypes.includes(_0x2143d7.typeId)) {
                    destroyConnectedWoodBlocks(_0x11d67b.dimension, _0x2143d7.location);
                }
            }
        }
    }
});
function isWoodBlock(_0x54d2f4) {
    return _0x54d2f4 && woodTypes.includes(_0x54d2f4.typeId);
}
function destroyConnectedWoodBlocks(_0x144fdb, _0x14b981) {
    let _0x49edf6 = [_0x14b981];
    let _0x35efde = new Set();
    while (_0x49edf6.length > 0x0) {
        let _0x5cd852 = _0x49edf6.pop();
        let _0x52a6d9 = _0x5cd852.x + ',' + _0x5cd852.y + ',' + _0x5cd852.z;
        if (_0x35efde.has(_0x52a6d9)) {
            continue;
        }
        _0x35efde.add(_0x52a6d9);
        let _0x38f757 = _0x144fdb.getBlock(_0x5cd852);
        if (_0x38f757 && woodTypes.includes(_0x38f757.typeId)) {
            _0x144fdb.runCommandAsync("setblock " + Math.floor(_0x5cd852.x) + " " + Math.floor(_0x5cd852.y) + " " + Math.floor(_0x5cd852.z) + " air destroy");
            _0x49edf6.push({
                'x': _0x5cd852.x + 0x1,
                'y': _0x5cd852.y,
                'z': _0x5cd852.z
            });
            _0x49edf6.push({
                'x': _0x5cd852.x - 0x1,
                'y': _0x5cd852.y,
                'z': _0x5cd852.z
            });
            _0x49edf6.push({
                'x': _0x5cd852.x,
                'y': _0x5cd852.y + 0x1,
                'z': _0x5cd852.z
            });
            _0x49edf6.push({
                'x': _0x5cd852.x,
                'y': _0x5cd852.y - 0x1,
                'z': _0x5cd852.z
            });
            _0x49edf6.push({
                'x': _0x5cd852.x,
                'y': _0x5cd852.y,
                'z': _0x5cd852.z + 0x1
            });
            _0x49edf6.push({
                'x': _0x5cd852.x,
                'y': _0x5cd852.y,
                'z': _0x5cd852.z - 0x1
            });
        }
    }
}
system.runInterval(autoFoodSlotEvaule, 60);
system.runInterval(checkEquipFurnace, 120);
system.runInterval(checkEquip, 0x0);
const DimensionList = [MinecraftDimensionTypes.overworld, MinecraftDimensionTypes.nether, MinecraftDimensionTypes.theEnd];
const forbiddentItems = ["backpack:", "shulker"];
let inactiveBpRun = null;
const itemChangeEvent = new MainHandItemChange();
const holdingBackpackEvent = new PlayerHoldingBackpack();
const backpackClosingEvent = new BackpackClosing();
world.afterEvents.worldInitialize.subscribe(() => {
    system.runTimeout(() => {
        BackpackMain();
        system.runInterval(async () => {
            _0x3c0618.updateAllPlayers();
        }, 0x3c);
    }, 0x78);
});
function BackpackMain() {
    world.sendMessage("§eBackpacks working successfully!");
    console.warn("§eBackpacks working successfully!");
    _0x3c0618.updateAllPlayers();
    _0x3c0618.updateAllBackpacks();
    itemChangeEvent.subscribe(({
        mainhandSlot: _0x3e39bf,
        oldMainhandSlot: _0x5839d8,
        player: _0x41eb7a
    }) => {
        const _0xd04321 = _0x41eb7a.getDynamicProperty("playerHeldItemStatus");
        const _0x2548a1 = _0x41eb7a.getComponent('inventory').container;
        const _0x37cb43 = _0x41eb7a.selectedSlotIndex;
        const _0x57c051 = _0x2548a1.getItem(_0x37cb43);
        const _0x3cc42a = {
            'item': _0x57c051 ? _0x57c051.typeId : undefined,
            'slot': _0x37cb43,
            'id': _0x57c051 && _0x57c051.getLore().length > 0x0 ? _0x57c051.getLore()[0x0] : undefined
        };
        const _0x5ae362 = JSON.stringify(_0x3cc42a);
        if (_0xd04321 === undefined || _0xd04321 !== _0x5ae362) {
            let _0x55ab2d = false;
            if (_0xd04321) {
                const _0x422e13 = JSON.parse(_0xd04321);
                _0x55ab2d = _0x422e13.slot !== _0x37cb43 || _0x422e13.item !== _0x3cc42a.item;
            } else {
                _0x55ab2d = true;
            }
            if (_0x55ab2d) {
                onChanged(_0x41eb7a, _0x2548a1, _0x3cc42a, JSON.parse(_0xd04321 || '{}'));
            }
            _0x41eb7a.setDynamicProperty("playerHeldItemStatus", _0x5ae362);
        }
    });
    holdingBackpackEvent.subscribe(({
        itemHolding: _0x935851,
        player: _0x354f83
    }) => {
        const _0x380a86 = _0x354f83.location;
        const _0x3728e8 = _0x354f83.dimension;
        const _0xf68f0e = _0x935851.getLore()[0x0];
        if (_0xf68f0e != undefined) {
            let _0x5105c1 = {
                'tags': [_0xf68f0e]
            };
            let _0x56410b = getBackpackEntity(_0x5105c1);
            for (let _0x1fd2ba of _0x56410b) {
                if (checkForNearbyPortal(_0x3728e8, _0x380a86)) {
                    closeBackpack(_0x1fd2ba);
                    continue;
                }
                let _0x1e4561 = _0x354f83.location;
                _0x1e4561.y = _0x1e4561.y + 1.5;
                _0x1fd2ba.teleport(_0x1e4561);
            }
        }
    });
    backpackClosingEvent.subscribe(({
        bpEntity: _0x658519
    }) => {
        let _0x4fe340 = _0x658519.getComponent("inventory").container;
        let _0x312753 = recordItems(_0x658519.getTags()[0x0], _0x4fe340, _0x658519);
        let _0x44bcee = {
            'type': "minecraft:player",
            'closest': 0x1,
            'location': _0x658519.location
        };
        let _0x3cf0d1 = _0x658519.dimension.getEntities(_0x44bcee);
        for (let _0x4d378f of _0x3cf0d1) {
            let _0x4ddfe5 = _0x4d378f.getComponent('inventory').container;
            let _0x570073 = _0x4ddfe5.getItem(_0x4d378f.selectedSlotIndex);
            if (!_0x570073) {
                continue;
            }
            if (_0x570073.getLore()[0x0] != _0x658519.getTags()[0x0]) {
                continue;
            }
            _0x570073.setLore(_0x312753);
            _0x4ddfe5.setItem(_0x4d378f.selectedSlotIndex, _0x570073);
        }
        _0x658519.removeTag("close");
    });
    inactiveBpRun = system.runInterval(() => {
        let _0x483a86 = getBackpackEntity({
            'families': ["backpack"]
        });
        for (let _0x3d5841 of _0x483a86) {
            const _0x355fa5 = _0x3d5841.dimension;
            let _0x5b81fd = _0x3d5841.location;
            switch (_0x355fa5.id) {
                case MinecraftDimensionTypes.overworld:
                    if (_0x5b81fd.y == -0x40) {
                        continue;
                    }
                    _0x5b81fd.y = -0x40;
                    break;
                case MinecraftDimensionTypes.nether:
                    if (_0x5b81fd.y == 0x0) {
                        continue;
                    }
                    _0x5b81fd.y = 0x0;
                    break;
                case MinecraftDimensionTypes.theEnd:
                    if (_0x5b81fd.y == 0x0) {
                        continue;
                    }
                    _0x5b81fd.y = 0x0;
                    break;
            }
            let _0x5cad4e = {
                'type': "minecraft:player",
                'location': _0x3d5841.location,
                'maxDistance': 0x3
            };
            let _0x2f23c2 = _0x3d5841.dimension.getEntities(_0x5cad4e);
            if (_0x2f23c2.length == 0x0) {
                _0x3d5841.teleport(_0x5b81fd);
            }
        }
    }, 0x14);
}
function checkForNearbyPortal(_0x380989, _0x3a423d) {
    _0x3a423d.y += 0x1;
    try {
        const _0x51c005 = _0x380989.getBlock(_0x3a423d);
        const _0x4af3cc = [_0x51c005, _0x51c005.above(0x1), _0x51c005.below(0x1), _0x51c005.north(0x1), _0x51c005.south(0x1), _0x51c005.east(0x1), _0x51c005.west(0x1)];
        for (const _0x151f0d of _0x4af3cc) {
            if (_0x151f0d.typeId.includes("portal")) {
                return true;
            }
        }
    } catch (_0xaf1bcd) { }
    return false;
}
function restartBackpackAddon() {
    system.clearRun(inactiveBpRun);
    backpackClosingEvent.unsubscribe();
    holdingBackpackEvent.unsubscribe();
    itemChangeEvent.unsubscribe();
    BackpackMain();
}
function onChanged(_0x26716a, _0x2a8933, _0x2eab82, _0x46aae9) {
    const _0x4407eb = _0x2a8933.getItem(_0x2eab82.slot);
    const _0x3c729c = _0x46aae9.id;
    if (_0x4407eb && _0x4407eb.typeId.includes("backpack:backpack")) {
        let _0x169150 = _0x4407eb.getLore();
        if (_0x169150.length === 0x0) {
            const _0x2448a6 = "§r§7Item id: §9" + Math.floor(Math.random() * 0xf423f);
            _0x4407eb.setLore([_0x2448a6]);
            _0x2a8933.setItem(_0x2eab82.slot, _0x4407eb);
            const _0x1623bd = _0x26716a.dimension.spawnEntity("backpack:entity_container", _0x26716a.location);
            _0x1623bd.triggerEvent(backpackType(_0x4407eb));
            _0x1623bd.addTag(_0x2448a6);
            _0x1623bd.nameTag = backpackName(_0x4407eb);
            _0x3c0618.updateAllBackpacks();
        } else {
            handleBackpackEntities(_0x26716a, _0x3c729c, _0x308142 => closeBackpack(_0x308142, _0x26716a, _0x46aae9));
            openBackpack(_0x26716a, _0x4407eb);
            _0x3c0618.updateAllBackpacks();
        }
    } else {
        if (_0x4407eb) {
            handleBackpackEntities(_0x26716a, _0x3c729c, _0xd50fd7 => {
                const _0x2fff8f = _0xd50fd7.getComponent("inventory").container;
                for (let _0x1521d9 = 0x0; _0x1521d9 < _0x2fff8f.size; _0x1521d9++) {
                    const _0x2bd293 = _0x2fff8f.getItem(_0x1521d9);
                    if (_0x2bd293 && forbiddentItems.some(_0x2456cc => _0x2bd293.typeId.includes(_0x2456cc))) {
                        _0xd50fd7.dimension.spawnItem(_0x2bd293, _0xd50fd7.location);
                        _0x2fff8f.setItem(_0x1521d9, undefined);
                    }
                }
                closeBackpack(_0xd50fd7, _0x26716a, _0x46aae9);
            });
        } else if (_0x3c729c) {
            handleBackpackEntities(_0x26716a, _0x3c729c, _0x44c4f4 => {
                const _0x42fee8 = _0x44c4f4.getComponent("inventory").container;
                for (let _0x4b146d = 0x0; _0x4b146d < _0x42fee8.size; _0x4b146d++) {
                    const _0x40d38e = _0x42fee8.getItem(_0x4b146d);
                    if (_0x40d38e && forbiddentItems.some(_0x41dd38 => _0x40d38e.typeId.includes(_0x41dd38))) {
                        _0x44c4f4.dimension.spawnItem(_0x40d38e, _0x44c4f4.location);
                        _0x42fee8.setItem(_0x4b146d, undefined);
                    }
                }
                closeBackpack(_0x44c4f4, _0x26716a, _0x46aae9);
            });
        }
    }
}
function handleBackpackEntities(_0x36e4e8, _0x148d95, _0x14aff6) {
    if (_0x148d95) {
        const _0x85c4f1 = {
            'tags': [_0x148d95]
        };
        const _0x22a723 = _0x36e4e8.dimension.getEntities(_0x85c4f1);
        for (const _0xdb4a12 of _0x22a723) {
            _0x14aff6(_0xdb4a12);
        }
    }
}
function backpackType(_0x5365a3) {
    let _0x2f34d8 = _0x5365a3.typeId;
    switch (_0x2f34d8) {
        case "backpack:backpack":
            return "leather";
        case "backpack:backpack_copper":
            return 'copper';
        case "backpack:backpack_iron":
            return "iron";
        case "backpack:backpack_gold":
            return "gold";
        case "backpack:backpack_diamond":
            return 'diamond';
        case "backpack:backpack_nether":
            return 'netherite';
    }
}
function backpackName(_0x433a33) {
    let _0x5f1c02 = _0x433a33.typeId;
    switch (_0x5f1c02) {
        case 'backpack:backpack':
            return "backpackExecuteDefault";
        case "backpack:backpack_copper":
            return "backpackExecuteCopper";
        case "backpack:backpack_iron":
            return 'backpackExecuteIron';
        case "backpack:backpack_gold":
            return 'backpackExecuteGold';
        case "backpack:backpack_diamond":
            return 'backpackExecuteDiamond';
        case "backpack:backpack_nether":
            return "backpackExecuteNetherite";
    }
}
function getBackpackEntity(_0x46d4d7) {
    let _0x18bf6f = [];
    for (let _0xf8a981 of DimensionList) {
        let _0x315b9c = world.getDimension(_0xf8a981).getEntities(_0x46d4d7);
        if (_0x315b9c.length > 0x0) {
            for (let _0x2d800c of _0x315b9c) {
                _0x18bf6f.push(_0x2d800c);
            }
        }
    }
    return _0x18bf6f;
}
function openBackpack(_0x3719b3, _0x27d9b9) {
    const _0x3bfc18 = _0x27d9b9.getLore();
    const _0x26d7ec = _0x3bfc18[0x0];
    let _0x22e415 = getBackpackEntity({
        'tags': [_0x26d7ec]
    });
    if (_0x22e415.length === 0x0) {
        _0x3719b3.sendMessage("§cBackpack items cannot be recovered");
        _0x3719b3.sendMessage("§cTrying to recover items");
        _0x22e415 = recoverItems(_0x3719b3, _0x26d7ec);
        if (!_0x22e415) {
            return;
        }
    }
    const _0x1b4af1 = _0x3719b3.dimension.spawnEntity("backpack:entity_container", _0x3719b3.location);
    _0x1b4af1.triggerEvent(backpackType(_0x27d9b9));
    const _0x11f693 = _0x1b4af1.getComponent("inventory").container;
    for (const _0x51cf01 of _0x22e415) {
        const _0x3af7ff = _0x51cf01.getComponent('inventory').container;
        transferItems(_0x3af7ff, _0x11f693);
        _0x51cf01.kill();
        try {
            _0x51cf01.triggerEvent('despawn2');
        } catch (_0xeb319e) { }
    }
    _0x1b4af1.addTag(_0x26d7ec);
    _0x1b4af1.nameTag = backpackName(_0x27d9b9);
}
function transferItems(_0x3d18ba, _0xfb479e) {
    for (let _0xe77ad7 = 0x0; _0xe77ad7 < _0x3d18ba.size; _0xe77ad7++) {
        const _0x2d753d = _0x3d18ba.getItem(_0xe77ad7);
        if (_0x2d753d) {
            _0xfb479e.setItem(_0xe77ad7, _0x2d753d);
            _0x3d18ba.setItem(_0xe77ad7, undefined);
        }
    }
}
function closeBackpack(_0x287654, _0x2dbbe2, _0x547059) {
    let _0x378e97 = _0x287654.location;
    _0x378e97.y = -0x40;
    _0x287654.teleport(_0x378e97);
}
function recordItems(_0x22fbe2, _0xd1ce4f, _0x2d4ea9) {
    let _0x3f4e98 = 0x0;
    let _0x45904f = 0x0;
    const _0x31c700 = [];
    const _0x474a79 = ['' + _0x22fbe2];
    for (let _0x276485 = 0x0; _0x276485 < _0xd1ce4f.size; _0x276485++) {
        const _0x4ac968 = _0xd1ce4f.getItem(_0x276485);
        if (!_0x4ac968) {
            continue;
        }
        const _0x44d703 = _0x4ac968.typeId;
        if (forbiddentItems.some(_0x37b706 => _0x44d703.includes(_0x37b706))) {
            _0x2d4ea9.dimension.spawnItem(_0x4ac968, _0x2d4ea9.location);
            _0xd1ce4f.setItem(_0x276485, undefined);
            continue;
        }
        _0x31c700.push(getItemProperties(_0x4ac968));
        if (_0x3f4e98 < 0x5) {
            const _0x16aabc = _0x44d703.split(':')[0x1].split('_').map(_0x2212bf => _0x2212bf.charAt(0x0).toUpperCase() + _0x2212bf.slice(0x1)).join(" ");
            _0x474a79.push("  §r§n" + _0x16aabc + " x" + _0x4ac968.amount);
        } else {
            _0x45904f++;
        }
        _0x3f4e98++;
    }
    if (_0x45904f > 0x0) {
        _0x474a79.push("§r  " + _0x45904f + " más...");
    }
    world.setDynamicProperty('' + _0x22fbe2, JSON.stringify(_0x31c700));
    return _0x474a79;
}
function getItemProperties(_0xa88796) {
    const _0xdb1888 = {
        'id': _0xa88796.typeId,
        'name': _0xa88796.nameTag || undefined,
        'amount': _0xa88796.amount,
        'lore': _0xa88796.getLore().length > 0x0 ? _0xa88796.getLore() : undefined,
        'durability': _0xa88796.hasComponent("durability") ? _0xa88796.getComponent('durability').damage : undefined,
        'enchant': []
    };
    const _0x1339c8 = Enchantments.getEnchants(_0xa88796);
    if (_0x1339c8.length > 0x0) {
        _0xdb1888.enchant = _0x1339c8.map(_0x31796e => ({
            'enchantName': _0x31796e.type.id,
            'level': _0x31796e.level
        }));
    }
    return _0xdb1888;
}
function recoverItems(_0x796285, _0x464cb6) {
    const _0xb5b130 = world.getDynamicProperty(_0x464cb6);
    if (_0xb5b130) {
        const _0x21508e = _0x796285.getComponent('inventory').container;
        const _0x34b537 = _0x796285.dimension.spawnEntity('backpack:entity_container', _0x796285.location);
        const _0x13c6de = _0x21508e.getItem(_0x796285.selectedSlotIndex);
        _0x34b537.addTag(_0x464cb6);
        _0x34b537.nameTag = backpackName(_0x13c6de);
        _0x34b537.triggerEvent(backpackType(_0x13c6de));
        const _0x54a56b = _0x34b537.getComponent('inventory').container;
        const _0x30fa4d = JSON.parse(_0xb5b130);
        for (const _0x31dde0 of _0x30fa4d) {
            const _0x18dba0 = new ItemStack(_0x31dde0.id, _0x31dde0.amount);
            if (_0x31dde0.name) {
                _0x18dba0.nameTag = _0x31dde0.name;
            }
            if (_0x31dde0.lore) {
                _0x18dba0.setLore(_0x31dde0.lore);
            }
            if (_0x31dde0.durability) {
                _0x18dba0.getComponent("durability").damage = _0x31dde0.durability;
            }
            if (_0x31dde0.enchant) {
                for (const _0x5554f6 of _0x31dde0.enchant) {
                    Enchantments.addEnchant(_0x18dba0, {
                        'type': EnchantmentTypes.get(_0x5554f6.enchantName),
                        'level': _0x5554f6.level
                    });
                }
            }
            _0x54a56b.addItem(_0x18dba0);
        }
        _0x796285.sendMessage("§aItems successfully recovered");
        return [_0x34b537];
    } else {
        _0x796285.sendMessage("§cNo recovery backup found");
        return false;
    }
}