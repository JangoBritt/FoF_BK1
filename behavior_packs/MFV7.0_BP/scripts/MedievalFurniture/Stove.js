import { ItemStack, world } from '@minecraft/server';
import { COOKING_RECIPES, FUEL_DURATION } from './Recipes';
import { addItemInInventory, decrementItemInInventory, spawnEntityRotatedByBlock } from '../util/utils';

const COOKING_TIME = 10;
const UPDATE_INTERVAL = 0.1;
const MAX_TIMER_STACK = 64;

export function cookingOnStove() {
	world.afterEvents.dataDrivenEntityTrigger.subscribe(({ entity, eventId }) => {
		if (!entity) return;
		try {
			const inventory = entity.getComponent("inventory").container;
			const [input0, input1, input2] = [0, 1, 2].map(slot => inventory.getItem(slot));
			const fuel = inventory.getItem(3);
			const stoveData = JSON.parse(entity.getDynamicProperty("mf:stove_data") || JSON.stringify({
				burnTimeRemaining: 0,
				cookProgress: [0, 0, 0],
				isActive: false
			}));

			const isValidInput = (item) => item?.typeId && COOKING_RECIPES[item.typeId];
			const isValidFuel = () => fuel?.typeId && FUEL_DURATION[fuel.typeId];
			const isValidOutput = (input, outputSlot) => {
				if (!input) return true;
				const expectedOutput = COOKING_RECIPES[input.typeId]?.result;
				const outputItem = inventory.getItem(outputSlot);
				return !outputItem || (outputItem.typeId === expectedOutput && outputItem.amount < outputItem.maxAmount);
			};

			if (eventId === "mf:check") {
				const shouldBeActive = isValidFuel() && [input0, input1, input2].some(isValidInput);
				if (shouldBeActive !== stoveData.isActive) {
					entity.triggerEvent(shouldBeActive ? "mf:start_cooking" : "mf:stop_cooking");
					stoveData.isActive = shouldBeActive;
				}
				return;
			}

			if (eventId === "mf:update_timer") {
				const currentFuel = inventory.getItem(3);
				const isValidCurrentFuel = currentFuel?.typeId && FUEL_DURATION[currentFuel.typeId];
				const shouldConsumeFuel = [0, 1, 2].some(inputSlot => {
					const inputItem = inventory.getItem(inputSlot);
					const outputSlot = inputSlot + 4;
					return isValidInput(inputItem) && isValidOutput(inputItem, outputSlot);
				});
				if (isValidCurrentFuel && stoveData.burnTimeRemaining <= 0 && shouldConsumeFuel) {
					decrementItemInInventory(entity, 3, { amount: 1 });
					stoveData.currentFuelType = currentFuel.typeId;
					stoveData.burnTimeRemaining = FUEL_DURATION[currentFuel.typeId];
					stoveData.maxBurnTime = FUEL_DURATION[currentFuel.typeId];
					inventory.setItem(10, new ItemStack("medieval:timer", 64));
				}
				[0, 1, 2].forEach((inputSlot) => {
					const inputItem = inventory.getItem(inputSlot);
					const outputSlot = inputSlot + 4;
					const timerSlot = inputSlot + 7;

					if (isValidInput(inputItem) && isValidOutput(inputItem, outputSlot) && stoveData.burnTimeRemaining > 0) {
						stoveData.cookProgress[inputSlot] = parseFloat(
							(stoveData.cookProgress[inputSlot] + UPDATE_INTERVAL).toFixed(1)
						);
						
						const timerAmount = Math.max(1, Math.min(64, Math.floor(
							(stoveData.cookProgress[inputSlot] / COOKING_TIME) * MAX_TIMER_STACK
						)));
						inventory.setItem(timerSlot, new ItemStack("medieval:timer", timerAmount));

						if (timerAmount >= 64) {
							const recipe = COOKING_RECIPES[inputItem.typeId];
							decrementItemInInventory(entity, inputSlot, { 
								amount: 1,
								convertTo: recipe?.convertTo 
							});
							addItemInInventory(entity, outputSlot, new ItemStack(recipe.result, 1));
							stoveData.cookProgress[inputSlot] = 0;
							inventory.setItem(timerSlot, new ItemStack("medieval:timer", 1));
						}
					} else {
						inventory.setItem(timerSlot, new ItemStack("medieval:timer", 1));
						stoveData.cookProgress[inputSlot] = 0;
					}
				});
				if (stoveData.burnTimeRemaining > 0 && stoveData.currentFuelType) {
					stoveData.burnTimeRemaining -= UPDATE_INTERVAL;
					const fuelRatio = stoveData.burnTimeRemaining / stoveData.maxBurnTime;
					const fuelAmount = Math.max(1, Math.min(64, Math.floor(fuelRatio * MAX_TIMER_STACK)));
					inventory.setItem(10, new ItemStack("medieval:timer", fuelAmount));
				} else {
					inventory.setItem(10, new ItemStack("medieval:timer", 1));
					stoveData.burnTimeRemaining = 0;
				}
				entity.setDynamicProperty("mf:stove_data", JSON.stringify(stoveData));
			}
		} catch (error) {}
	}, {
		entityTypes: ["medieval:stove_entity"],
		eventTypes: ["mf:check", "mf:update_timer"]
	});
}

export class MfStove {
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const part = block.permutation.getState("mc:block_parts");
		if (part === 1) return;
		const stove = spawnEntityRotatedByBlock("medieval:stove_entity", block, direction, { x: -0.5 });
		stove.addEffect("invisibility", 10, { showParticles: false });
		stove.nameTag = "med_fur.ui.stove";
		const container = stove.getComponent("inventory").container;
		container.setItem(7, new ItemStack("medieval:timer", 1));
		container.setItem(8, new ItemStack("medieval:timer", 1));
		container.setItem(9, new ItemStack("medieval:timer", 1));
		container.setItem(10, new ItemStack("medieval:timer", 1));
	}
}