import { ItemStack, system, world } from '@minecraft/server';
import { addItemInInventory, decrementItemInInventory } from '../util/utils';
import { FREEZE_DURATION, FREEZING_RECIPES } from './Recipes';

const COOKING_TIME = 10.5;

export function freezingEvent() {
	world.afterEvents.dataDrivenEntityTrigger.subscribe(({ entity, eventId }) => {
		const inventory = entity.getComponent("inventory").container;
		const [inputItem, fuelItem, outputItem, freezeItem, arrowItem] = [0, 1, 2, 3, 4].map(slot => inventory.getItem(slot));
		const furnaceData = JSON.parse(entity.getDynamicProperty("mr:furnace_data") || "{}");
		const FREEZE_BASE = "mr:freeze_";
		const ARROW_BASE = "mr:arrow_";
		const isValidInput = () => inputItem?.typeId && FREEZING_RECIPES[inputItem.typeId];
		const isValidFuel = () => fuelItem?.typeId && FREEZE_DURATION[fuelItem.typeId];
		const isValidOutput = () => {
			if (!inputItem) return true;
			const expectedOutput = FREEZING_RECIPES[inputItem.typeId]?.freezing;
			return !outputItem || (outputItem.typeId === expectedOutput && outputItem.amount < outputItem.maxAmount);
		};
		if (eventId === "mr:check_freeze") {
			const shouldBeActive = isValidInput() && isValidFuel() && isValidOutput();
			if (shouldBeActive !== furnaceData.isActive) {
				entity.triggerEvent(shouldBeActive ? "mr:start_freezing" : "mr:stop_freezing");
				furnaceData.isActive = shouldBeActive;
			}
			return;
		}
		if (eventId !== "mr:update_freezer_timer") return;
		if (isValidFuel() && (!freezeItem || freezeItem.typeId === "mr:freeze_0")) {
			if ((isValidInput() && isValidOutput()) || furnaceData.burnTimeRemaining > 0) {
				decrementItemInInventory(entity, 1, { amount: 1 });
				furnaceData.burnTimeRemaining = FREEZE_DURATION[fuelItem.typeId];
				furnaceData.maxBurnTime = furnaceData.burnTimeRemaining;
				inventory.setItem(3, new ItemStack(`${FREEZE_BASE}12`, 1));
				if (!furnaceData.isActive) {
					entity.triggerEvent("mr:start_freezing");
					furnaceData.isActive = true;
				}
			}
		}
		if (furnaceData.burnTimeRemaining > 0) {
			furnaceData.burnTimeRemaining -= 0.5;
			const freezeLevel = furnaceData.burnTimeRemaining > 0 ? Math.min(12, Math.max(0, Math.ceil((furnaceData.burnTimeRemaining / furnaceData.maxBurnTime) * 12))) : 0;
			inventory.setItem(3, new ItemStack(`${FREEZE_BASE}${freezeLevel}`, 1));
			if (isValidInput() && isValidOutput()) {
				if (!arrowItem?.typeId || arrowItem.typeId === "mr:arrow_0") furnaceData.cookProgress = 0;

				furnaceData.cookProgress += 0.5;
				const arrowProgress = Math.min(21, Math.floor((furnaceData.cookProgress / COOKING_TIME) * 21));
				inventory.setItem(4, new ItemStack(`${ARROW_BASE}${arrowProgress}`, 1));
				if (arrowProgress === 21) {
					const resultItem = FREEZING_RECIPES[inputItem.typeId];
					if (resultItem && (!outputItem || outputItem.typeId === resultItem.freezing)) {
						decrementItemInInventory(entity, 0, { convertTo: resultItem.convertTo });
						addItemInInventory(entity, 2, new ItemStack(resultItem.freezing, 1));
						inventory.setItem(4, new ItemStack("mr:arrow_0", 1));
						furnaceData.cookProgress = 0;
					}
				}
			} else {
				if (arrowItem?.typeId !== "mr:arrow_0") {
					inventory.setItem(4, new ItemStack("mr:arrow_0", 1));
					furnaceData.cookProgress = 0;
				}
				if ((!isValidInput() || !isValidOutput()) && furnaceData.burnTimeRemaining === 0) {
					entity.triggerEvent("mr:stop_freezing");
					furnaceData.isActive = false;
				}
			}
		} else if (freezeItem?.typeId !== "mr:freeze_0" || arrowItem?.typeId !== "mr:arrow_0") {
			inventory.setItem(3, new ItemStack("mr:freeze_0", 1));
			inventory.setItem(4, new ItemStack("mr:arrow_0", 1));
			furnaceData.cookProgress = 0;
			furnaceData.burnTimeRemaining = 0;
			if (furnaceData.isActive) {
				entity.triggerEvent("mr:stop_freezing");
				furnaceData.isActive = false;
			}
		}
		entity.setDynamicProperty("mr:furnace_data", JSON.stringify(furnaceData));
	}, {
		entityTypes: ["mr:freezer"],
		eventTypes: ["mr:check_freeze", "mr:update_freezer_timer"]
	});
	system.afterEvents.scriptEventReceive.subscribe((e) => {
		const { id, sourceEntity } = e;
		if (id !== "mr:freezer_loot") return;
		if (!sourceEntity) return;
		const inv = sourceEntity.getComponent("inventory").container;
		[0, 1, 2].forEach(slot => {
			const item = inv.getItem(slot);
			if (item) {
				sourceEntity.dimension.spawnItem(item, sourceEntity.location);
			}
		});
		sourceEntity.remove();
	});
}