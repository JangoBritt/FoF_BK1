var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Toast_text, _Toast_icon;
import { toastQueue } from "./ToastQueue";
export class Toast {
    constructor(toastId) {
        this.toastId = toastId;
        _Toast_text.set(this, void 0);
        _Toast_icon.set(this, void 0);
    }
    isEnabled(player) {
        return !player.getDynamicProperty("toast_disabled:".concat(this.toastId));
    }
    enable(player) {
        player.setDynamicProperty("toast_disabled:".concat(this.toastId), false);
    }
    disable(player) {
        player.setDynamicProperty("toast_disabled:".concat(this.toastId), true);
    }
    send(player) {
        if (player.getDynamicProperty("toast_enabled:".concat(this.toastId))) {
            return;
        }
        toastQueue.add(player, this);
    }
    setText(text) {
        __classPrivateFieldSet(this, _Toast_text, text, "f");
        return this;
    }
    setIcon(icon) {
        __classPrivateFieldSet(this, _Toast_icon, icon, "f");
        return this;
    }
    getText() {
        return __classPrivateFieldGet(this, _Toast_text, "f");
    }
    getIcon() {
        return __classPrivateFieldGet(this, _Toast_icon, "f");
    }
}
_Toast_text = new WeakMap(), _Toast_icon = new WeakMap();
//# sourceMappingURL=Toast.js.map