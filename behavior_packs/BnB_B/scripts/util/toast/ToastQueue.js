var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ToastQueue_queue;
import { system, TicksPerSecond, world } from "@minecraft/server";

export class ToastQueue {
    constructor() {
        _ToastQueue_queue.set(this, new Map());
        system.runInterval(() => system.runJob(this.process()), 1);
    }

    add(player, toast) {
        let queue = __classPrivateFieldGet(this, _ToastQueue_queue, "f").get(player.id) ?? [];
        queue.push(toast);
        __classPrivateFieldGet(this, _ToastQueue_queue, "f").set(player.id, queue);
    }

    *process() {
        for (const player of world.getAllPlayers()) {
            const playerToasts = __classPrivateFieldGet(this, _ToastQueue_queue, "f").get(player.id);
            if (!playerToasts || playerToasts.length <= 0) continue;
            if (
                player["toastQueueStart"] === undefined ||
                (system.currentTick - (player["toastQueueStart"] ?? 0)) % (4 * TicksPerSecond) === 0
            ) {
                const toast = playerToasts[0];
                const icon = toast.getIcon();
                const text = toast.getText();

                if (typeof text === "string") {
                    player.onScreenDisplay.setTitle(`!toast.${icon}.${text}`);
                } else if (text && typeof text === "object" && text.translate) {
                    // Use rawtext with translation 
                    player.onScreenDisplay.setTitle({
                        rawtext: [
                            { text: `!toast.${icon}.` },
                            { translate: text.translate,
                               with: text.with ?? []
                            }
                        ]
                    });
                } else {
                    // fallback para toasts malformados
                    player.onScreenDisplay.setTitle(`!toast.${icon}.${String(text)}`);
                }

                player.playSound("ui.toast.slide_in");
                player["toastQueueStart"] = system.currentTick;

                system.runTimeout(() => {
                    playerToasts?.shift();
                    player["toastQueueStart"] = undefined;
                }, 4 * TicksPerSecond - 2);
            }

            yield;
        }
    }
}

_ToastQueue_queue = new WeakMap();
export const toastQueue = new ToastQueue();
