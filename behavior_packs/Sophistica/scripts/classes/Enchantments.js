import { EnchantmentTypes, ItemEnchantableComponent } from '@minecraft/server';
export class Enchantments {
    static ["addEnchant"](_0x45a613, _0x54154d) {
        const _0xb74c84 = _0x45a613.getComponent(ItemEnchantableComponent.componentId);
        _0xb74c84.addEnchantment(_0x54154d);
        return _0x45a613;
    }
    static ["setEnchantName"](_0x2d39a1, _0x120bb4, _0x3f2033) {
        const _0x50f64f = _0x2d39a1.getComponent('minecraft:enchantments');
        let _0x5d974a = EnchantmentTypes.get(_0x120bb4);
        if (_0x5d974a.maxLevel < _0x3f2033) {
            throw "Enchantment level " + _0x3f2033 + " too high!";
        }
        let _0x5138e9 = {
            'level': _0x3f2033,
            'type': _0x5d974a.id
        };
        if (_0x50f64f.canAddEnchantment(_0x5138e9)) {
            _0x50f64f.addEnchant(_0x5138e9);
            return _0x2d39a1;
        } else {
            throw "Enchantment " + _0x120bb4 + " Incompatible with " + _0x2d39a1.id + '!';
        }
        throw "No Enchant " + _0x120bb4 + " Found!";
    }
    static ["getEnchants"](_0x4049ad) {
        let _0x6b3ecc = [];
        if (!_0x4049ad.hasComponent(ItemEnchantableComponent.componentId)) {
            return [];
        }
        const _0xf0177c = _0x4049ad.getComponent(ItemEnchantableComponent.componentId);
        _0x6b3ecc = _0xf0177c.getEnchantments();
        return _0x6b3ecc;
    }
    static ['removeEnchant'](_0x30106a, _0xf80df3) {
        const _0x434164 = _0x30106a.getComponent(ItemEnchantableComponent.componentId);
        let _0x3a6491 = _0xf80df3.type;
        if (_0x434164.hasEnchantment(_0x3a6491)) {
            _0x434164.removeEnchantment(_0x3a6491);
            return _0x30106a;
        }
        throw "No Enchant " + enchantType.id + " Found!";
    }
}