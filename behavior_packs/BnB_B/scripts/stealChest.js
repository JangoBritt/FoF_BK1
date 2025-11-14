import { world, system, ItemStack, EquipmentSlot } from "@minecraft/server";

class Raccoon {
    static IDENTIFIER = 'wypnt_bab:raccoon';
    static VALID_CONTAINERS = ['minecraft:chest'];
    static CHEST_RANGE = 8;
    static WAIT_TIME_RANGE = [1.0, 1.0];

    constructor() {
        system.runTimeout(() => this.registerStayDoneEvent(), 1);
    }

    registerStayDoneEvent() {
        system.afterEvents.scriptEventReceive.subscribe(({ id, sourceEntity }) => {
            if (id === "wypnt_bab:stay_done" && sourceEntity?.typeId === Raccoon.IDENTIFIER) {
                this.searchChestAndStealItem(sourceEntity);
            }
        });
    }

    async searchChestAndStealItem(raccoon) {
        if (!(await this.isMainHandEmpty(raccoon))) return;
        const chestBlock = this.getNearbyChestBlock(raccoon);
        if (chestBlock) this.stealRandomItemFromChest(chestBlock, raccoon);
    }

    async isMainHandEmpty(raccoon) {
        try {
            await raccoon.runCommand('testfor @s[hasitem={location=slot.weapon.mainhand}]');
            return false;
        } catch {
            return true;
        }
    }

    getNearbyChestBlock(entity) {
        const dim = entity.dimension;
        const { x, y, z } = entity.location;
        const range = Raccoon.CHEST_RANGE;
        for (let r = 0; r <= range; r++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue;
                    const block = dim.getBlock({ x: x + dx, y: y, z: z + dz });
                    if (block && Raccoon.VALID_CONTAINERS.includes(block.typeId)) return block;
                }
            }
        }
        return null;
    }

    stealRandomItemFromChest(chestBlock, raccoon) {
        const inventoryComponent = chestBlock.getComponent("minecraft:inventory");
        if (!inventoryComponent) return;
        const container = inventoryComponent.container;
        const foodItems = [];
        for (let i = 0; i < container.size; i++) {
            const item = container.getItem(i);
            if (item && item.hasTag("minecraft:is_food")) foodItems.push({ slot: i, item });
        }
        if (foodItems.length === 0) return;

        const waitTime = Math.floor(Math.random() * (Raccoon.WAIT_TIME_RANGE[1] - Raccoon.WAIT_TIME_RANGE[0] + 1)) + Raccoon.WAIT_TIME_RANGE[0];
        raccoon.dimension.playSound("random.chestopen", chestBlock.location);

        system.runTimeout(() => {
            const { slot, item } = foodItems[Math.floor(Math.random() * foodItems.length)];
            const result = raccoon.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 keep ${item.typeId}`);
            if (result.successCount <= 0) {
                raccoon.dimension.playSound("random.chestclosed", chestBlock.location);
                return;
            }
            if (item.amount > 1) {
                item.amount -= 1;
                container.setItem(slot, item);
            } else {
                container.setItem(slot, undefined);
            }
            raccoon.dimension.playSound("random.chestclosed", chestBlock.location);
        }, waitTime * 20);
    }
}

new Raccoon();
