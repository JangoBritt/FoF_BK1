import { world, BlockVolume, ItemStack, system, BlockPermutation, GameMode } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { airBlocks, backBlockLocation, frontBlockLocation, leftBlockLocation, rightBlockLocation, solidBlock } from '../util/globalVariables';
import { MfSimpleRotation, MfSetOldDirection2 } from './Util';
import { cookingOnStove, MfStove } from './Stove';
import { MfBasket } from './Basket';
import { MfUpdateSidedBlocks } from './UpdateSidedBlocks';
import { MfToggleFurnitureBlock, MfBasicContainer, MfSitOnChair, MfWoodenChair, MfDefaultSitOnChair } from './Furniture';
import { MfBarrel, playerPlaceBarrel } from './Barrel';
import { MfBoxItem } from './BoxItem';
import { MfEasel } from './Easel';
import { MfPillar } from './Pillar';
import { MfSmokestackTick, MfSmokestack } from './Smokestack';
import { MfStackedLog } from './StackedLog';
import { MfBeerMug, MfFillMug } from './BeerMug';
import { MfBucketFill } from './Bucket';
import { MfGramophone } from './Gramophone';
// import { MfBook } from './Book';
import { MfStickPost } from './StickPost';
import { MfWindowTable } from './WindowTable';
import { MfNormalTable } from './NormalTable';
import { MfItemTable } from './ItemTable';
import { MfBridge } from './Bridge';
import { MfTopBlockDestroy, MfPendulumClock, MfEditPendulumClock } from './Clock';
import { MfBrazier } from './Brazier';
import { MfCarpetConnection } from './Carpet';
import { MfCookieJar } from './CookieJar';
import { MfWoodenStairs } from './WoodenStairs';
import { MfTripleSaddleStandTop, MfTripleSaddleStand, MfSaddleStand } from './SaddleStand';
import { MfItemBreakBlock, MfBeerEffects } from './Items';
import { MfScroll, MfHourglassTimer, MfHourglass, MfGlobeTimer, MfGlobe } from './Cartographer';
import { MfSupportConnection } from './Support';
// import { MfBowl } from './Bowl';
import { MfWeaponStand, MfWeaponStandInteract } from './WeaponStand';
import { MfIronThrone } from './IronThrone';
import { MfStreetlight, MfPostStreetlight } from './Streetlight';
import { MfDyePot } from './Pot';
import { MfFishDrying } from './FishDrying';
import { MfFlowerStand } from './FlowerStand';
import { MfSign } from './Sign';
import { MfHangingChandelier } from './Chandelier';
import { MfCabinetTall, MfCabinetTallInteract } from './CabinetTall';
import { MfFenceGateConnection, MfFenceGate } from './FenceGate';
import { MfUpdateBed } from './Bed';
import { MfBookshelfConnection } from './Bookshelf';
import { MfContainer } from './Container';
import { addItemInInventory, decrementItemInHand, decrementItemInInventory, getDirectionByPlayer, isCreative } from '../util/utils';
import { MfBreakLargeBlock, MfPlaceBase } from './LargeBlockPlacer ';
// import { McOpenDoor, McPlaceDoor } from './Door';
import { MfHelmetStand } from './HelmetStand';
import { blockConnections, MfBarsConnection, MfConnectFence } from './BlockConnections';
import { MfPlaceWinch, MfPortcullisBlock, MfWinch, MfWinchSetSize, PortcullisFillArea } from './Portcullis';

playerPlaceBarrel();
PortcullisFillArea();
cookingOnStove();
blockConnections();

world.beforeEvents.worldInitialize.subscribe((e) => {
	e.blockComponentRegistry.registerCustomComponent("mf:portcullis", new MfPortcullisBlock());
	e.blockComponentRegistry.registerCustomComponent("mf:old_rotation2", new MfSetOldDirection2());
	e.blockComponentRegistry.registerCustomComponent("mf:default_sit", new MfDefaultSitOnChair());
	e.blockComponentRegistry.registerCustomComponent("mf:sit_on_chair", new MfSitOnChair());
	e.blockComponentRegistry.registerCustomComponent("mf:wooden_chair", new MfWoodenChair());
	e.blockComponentRegistry.registerCustomComponent("mf:update_sided_blocks", new MfUpdateSidedBlocks());
	e.blockComponentRegistry.registerCustomComponent("mf:basic_container", new MfBasicContainer());
	e.blockComponentRegistry.registerCustomComponent("mf:toggle_furniture_block", new MfToggleFurnitureBlock());
	e.blockComponentRegistry.registerCustomComponent("mf:barrel", new MfBarrel());
	e.blockComponentRegistry.registerCustomComponent("mf:place_container", new MfContainer());
	e.blockComponentRegistry.registerCustomComponent("mf:place_2x1x1_block", new (
		class extends MfPlaceBase { get sizeKey() { return "2x1x1" } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mf:place_1x1x2_block", new (
		class extends MfPlaceBase { get sizeKey() { return "1x1x2" } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mf:place_1x2x1_block", new (
		class extends MfPlaceBase { get sizeKey() { return "1x2x1" } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mf:place_2x2x2_block", new (
		class extends MfPlaceBase { get sizeKey() { return "2x2x2" } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mf:break_big_block", new MfBreakLargeBlock());
	e.blockComponentRegistry.registerCustomComponent("mf:stacked_log", new MfStackedLog());
	e.blockComponentRegistry.registerCustomComponent("mf:box_item", new MfBoxItem());
	e.blockComponentRegistry.registerCustomComponent("mf:easel", new MfEasel());
	e.blockComponentRegistry.registerCustomComponent("mf:pillar", new MfPillar());
	e.blockComponentRegistry.registerCustomComponent("mf:smokestack", new MfSmokestack());
	e.blockComponentRegistry.registerCustomComponent("mf:smokestack_tick", new MfSmokestackTick());
	e.blockComponentRegistry.registerCustomComponent("mf:beer_mug", new MfBeerMug());
	e.blockComponentRegistry.registerCustomComponent("mf:bucket_fill", new MfBucketFill());
	e.blockComponentRegistry.registerCustomComponent("mf:gramophone", new MfGramophone());
	// e.blockComponentRegistry.registerCustomComponent("mf:book", new MfBook());
	e.blockComponentRegistry.registerCustomComponent("mf:stick_post", new MfStickPost());
	e.blockComponentRegistry.registerCustomComponent("mf:window_table", new MfWindowTable());
	e.blockComponentRegistry.registerCustomComponent("mf:normal_table", new MfNormalTable());
	e.blockComponentRegistry.registerCustomComponent("mf:simple_rotation", new MfSimpleRotation());
	e.blockComponentRegistry.registerCustomComponent("mf:item_table", new MfItemTable());
	e.blockComponentRegistry.registerCustomComponent("mf:bridge_detection", new MfBridge());
	e.blockComponentRegistry.registerCustomComponent("mf:pendulum_clock", new MfPendulumClock());
	e.blockComponentRegistry.registerCustomComponent("mf:edit_clock", new MfEditPendulumClock());
	e.blockComponentRegistry.registerCustomComponent("mf:brazier", new MfBrazier());
	e.blockComponentRegistry.registerCustomComponent("mf:carpet_connection", new MfCarpetConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:cookie_jar", new MfCookieJar());
	e.blockComponentRegistry.registerCustomComponent("mf:wooden_stairs", new MfWoodenStairs());
	e.blockComponentRegistry.registerCustomComponent("mf:saddle_stand", new MfSaddleStand());
	e.blockComponentRegistry.registerCustomComponent("mf:triple_saddle_stand", new MfTripleSaddleStand());
	e.blockComponentRegistry.registerCustomComponent("mf:triple_saddle_stand_top", new MfTripleSaddleStandTop());
	e.blockComponentRegistry.registerCustomComponent("mf:globe", new MfGlobe());
	e.blockComponentRegistry.registerCustomComponent("mf:globe_timer", new MfGlobeTimer());
	e.blockComponentRegistry.registerCustomComponent("mf:hourglass", new MfHourglass());
	e.blockComponentRegistry.registerCustomComponent("mf:hourglass_timer", new MfHourglassTimer());
	e.blockComponentRegistry.registerCustomComponent("mf:scroll", new MfScroll());
	e.blockComponentRegistry.registerCustomComponent("mf:fish_drying", new MfFishDrying());
	e.blockComponentRegistry.registerCustomComponent("mf:support_connection", new MfSupportConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:flower_stand", new MfFlowerStand());
	// e.blockComponentRegistry.registerCustomComponent("mf:bowl", new MfBowl());
	e.blockComponentRegistry.registerCustomComponent("mf:weapon_stand", new MfWeaponStand());
	e.blockComponentRegistry.registerCustomComponent("mf:wepapon_stand_i", new MfWeaponStandInteract());
	e.blockComponentRegistry.registerCustomComponent("mf:sit_iron_throne", new MfIronThrone());
	e.blockComponentRegistry.registerCustomComponent("mf:hanging_chandelier", new MfHangingChandelier());
	e.blockComponentRegistry.registerCustomComponent("mf:post_streetlight", new MfPostStreetlight());
	e.blockComponentRegistry.registerCustomComponent("mf:streetlight", new MfStreetlight());
	e.blockComponentRegistry.registerCustomComponent("mf:dye_pot", new MfDyePot());
	e.blockComponentRegistry.registerCustomComponent("mf:sign", new MfSign());
	e.blockComponentRegistry.registerCustomComponent("mf:cabinet_tall", new MfCabinetTall());
	e.blockComponentRegistry.registerCustomComponent("mf:cabinet_add_armor", new MfCabinetTallInteract());
	e.blockComponentRegistry.registerCustomComponent("mf:fence_gate", new MfFenceGate());
	e.blockComponentRegistry.registerCustomComponent("mf:fence_gate_connection", new MfFenceGateConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:bookshelf_connection", new MfBookshelfConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:update_bed", new MfUpdateBed());
	// e.blockComponentRegistry.registerCustomComponent("mf:basket", new MfBasket());
	e.blockComponentRegistry.registerCustomComponent("mf:stove", new MfStove());
	e.blockComponentRegistry.registerCustomComponent("mf:bars_connection", new MfBarsConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:break_by_quantity", new MfBreakByQuantity());
	// e.blockComponentRegistry.registerCustomComponent("mf:door_place", new McPlaceDoor());
	// e.blockComponentRegistry.registerCustomComponent("mf:door_interact", new McOpenDoor());
	e.blockComponentRegistry.registerCustomComponent("mf:connect_fence", new MfConnectFence());
	e.blockComponentRegistry.registerCustomComponent("mf:winch", new MfWinch());
	e.blockComponentRegistry.registerCustomComponent("mf:helmet_stand", new MfHelmetStand());
	e.blockComponentRegistry.registerCustomComponent("mf:diagonal_roofs", new MfDiagonalRoof());
	e.itemComponentRegistry.registerCustomComponent("mf:item_break_block", new MfItemBreakBlock());
	e.itemComponentRegistry.registerCustomComponent("mf:beer_effects", new MfBeerEffects());
	e.itemComponentRegistry.registerCustomComponent("mf:fill_mug", new MfFillMug());
	e.itemComponentRegistry.registerCustomComponent("mf:portcullis_set_size", new MfWinchSetSize());
	e.itemComponentRegistry.registerCustomComponent("mf:portcullis_set_wheel", new MfPlaceWinch());
});
class MfDiagonalRoof {
	constructor() {
		this.directionState = "minecraft:cardinal_direction";
		this.blockTag = "mf:diagonal_roof";
		this.onPlace = this.onPlace.bind(this);
		this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
	}
	UpdateCorner(block) {
		const direction = block.permutation.getState(this.directionState);
		const [frontBlock, backBlock] = [block.offset(frontBlockLocation[direction]), block.offset(backBlockLocation[direction])];
		const [isFrontStair, isBackStair] = [frontBlock.hasTag(this.blockTag), backBlock.hasTag(this.blockTag)];
		const directionMap = {
			north: { outer: { east: "outer_right", west: "outer_left" }, 
					inner: { west: "inner_left", east: "inner_right" }},
			south: { outer: { west: "outer_right", east: "outer_left" }, 
					inner: { east: "inner_left", west: "inner_right" }},
			east: { outer: { north: "outer_left", south: "outer_right" }, 
					inner: { south: "inner_right", north: "inner_left" }},
			west: { outer: { south: "outer_left", north: "outer_right" }, 
					inner: { north: "inner_right", south: "inner_left" }}
		};
		let shape = "straight";
		if (isFrontStair) {
			const frontDir = frontBlock.permutation.getState(this.directionState);
			shape = directionMap[direction]?.outer?.[frontDir] || shape;
		}
		if (isBackStair && !backBlock.permutation.getState("mf:shape").startsWith("outer")) {
			const backDir = backBlock.permutation.getState(this.directionState);
			shape = directionMap[direction]?.inner?.[backDir] || shape;
		}
		block.setPermutation(block.permutation.withState("mf:shape", shape));
	}
	updateAdjacentBlocks(block, permutation) {
		if (block.hasTag(this.blockTag)) this.UpdateCorner(block, this.blockTag);
		const direction = permutation.getState(this.directionState);
		[leftBlockLocation[direction], rightBlockLocation[direction]].forEach(offset => {
			const adjacentBlock = block.offset(offset);
			if (adjacentBlock.hasTag(this.blockTag)) this.UpdateCorner(adjacentBlock, this.blockTag);
		});
	}
	onPlace(e) { this.updateAdjacentBlocks(e.block, e.block.permutation); }
	onPlayerDestroy(e) { this.updateAdjacentBlocks(e.block, e.destroyedBlockPermutation); }
}
const horseVariant = [ "minecraft:make_white", "minecraft:make_creamy", "minecraft:make_chestnut", "minecraft:make_brown", "minecraft:make_black", "minecraft:make_gray", "minecraft:make_darkbrown" ];

function spawnHorseAtPos(woodenCart, offsetXZ) {
	const yRot = woodenCart.getRotation().y * (Math.PI / 180);
	const offset = {
		x: Math.sin(-yRot) * offsetXZ.z + Math.cos(yRot) * offsetXZ.x,
		z: Math.cos(yRot) * offsetXZ.z - Math.sin(-yRot) * offsetXZ.x
	};
	const pos = { x: woodenCart.location.x + offset.x, y: woodenCart.location.y, z: woodenCart.location.z + offset.z
	};
	const horse = woodenCart.dimension.spawnEntity("minecraft:horse", pos);
	horse.triggerEvent(horseVariant[woodenCart.getProperty("mf:base_color")]);
	horse.triggerEvent("minecraft:ageable_grow_up");
	horse.triggerEvent("minecraft:on_tame");
	horse.getComponent("mark_variant").value = woodenCart.getProperty("mf:mark_variant");
}
function dropInventory(entity, slots = entity.getComponent("inventory").container.size) {
	const container = entity.getComponent("inventory").container;
	for (let i = 0; i < slots; i++) {
		const item = container.getItem(i);
		if (item) entity.dimension.spawnItem(item, entity.location);
	}
}
function spawnHorses(entity, message) {
	const horseSpawnOffsets = JSON.parse(message.slice(1, -1));
	horseSpawnOffsets.forEach(offset => spawnHorseAtPos(entity, offset));
}
system.afterEvents.scriptEventReceive.subscribe(e => {
	const { id, sourceEntity, message } = e;
	if (!sourceEntity || !sourceEntity.matches({ families: [ "medieval_return_inv" ] })) return;
	switch (id) {
		case "mf:break_wooden_cart":
			dropInventory(sourceEntity);
			if (sourceEntity.hasComponent("minecraft:is_tamed")) spawnHorses(sourceEntity, message);
			sourceEntity.remove();
			break;
		case "mf:wooden_cart_spawn_horse":
			spawnHorses(sourceEntity, message);
			sourceEntity.triggerEvent("mf:trigger_detach_horse");
			break;

		case "medieval:drop_inventory":
			dropInventory(sourceEntity);
			sourceEntity.remove();
			break;
		case "medieval:drop_stove":
			dropInventory(sourceEntity, message);
			sourceEntity.remove();
			break;
	}
});

world.afterEvents.playerInteractWithEntity.subscribe((e) => {
	const { player, target } = e;
	if (player.isSneaking && target.matches({ families: [ "medieval_cart" ] }) && !target.hasComponent("minecraft:is_tamed")) {
		if (player.getComponent("inventory").container.getItem(player.selectedSlotIndex)?.typeId !== "minecraft:lead") return;
		const requiredHorses = target.getProperty("mf:amount_horse");
		const nearestHorses = target.dimension.getEntities({
			location: target.location,
			maxDistance: 10,
			type: "minecraft:horse"
		});
		const validHorses = [];

		for (const horse of nearestHorses) {
			const leashComp = horse.getComponent("leashable");
			const isBaby = horse.hasComponent("is_baby");
			const horseInv = horse.hasComponent("minecraft:inventory")
			if (isBaby || !horseInv || !leashComp?.isLeashed || !leashComp.leashHolder.matches({ type: "minecraft:player", name: player.name })) continue;
			if (validHorses.length > 0) {
				const firstHorse = validHorses[0];
				if (horse.getComponent("variant").value !== firstHorse.getComponent("variant").value || horse.getComponent("minecraft:mark_variant").value !== firstHorse.getComponent("minecraft:mark_variant").value) continue;
			}
			validHorses.push(horse);
			if (validHorses.length >= requiredHorses) break;
		};
		if (validHorses.length < requiredHorses) {
			if (requiredHorses === 1) return player.sendMessage({ translate: "mf.message.required_unique_horse" });
			else return player.sendMessage({ translate: "mf.message.required_horses", with: [ `${requiredHorses}` ] });
		}
		const firstHorse = validHorses[0];
		target.setProperty("mf:base_color", firstHorse.getComponent("variant").value);
		target.setProperty("mf:mark_variant", firstHorse.getComponent("minecraft:mark_variant").value);
		target.triggerEvent("mf:attach_horse");
		validHorses.forEach(horse => {
			const hinv = horse.getComponent("minecraft:inventory").container;
			for (let i = 0; i < hinv.size; i++) {
				const is = hinv.getItem(i);
				if (is) horse.dimension.spawnItem(is, horse.location);
			}
			horse.dimension.spawnItem(new ItemStack("minecraft:lead", 1), horse.location);
			horse.remove();
		});
		decrementItemInHand(player);
		player.dimension.playSound("mob.horse.armor", target.location);
	}
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(({ entity }) => {
	if (!entity) return;
	const player = entity?.getComponent("rideable")?.getRiders()[0];
	if (!player) return;
	player.playAnimation("animation.medieval.player.sleep", { stopExpression: "!q.is_riding" } )
}, {
	entityTypes: [ "medieval:hidden_mount_sleeping_anim" ],
	eventTypes: [ "mf:set_player_sleep_animation" ]
});

//---SLEEPING
let timeLoop = null;
let sleepingPlayers = [];
let hasFaded = false;
let accelerateTime = false;

const isNightTime = () => {
	const time = world.getTimeOfDay();
	return time >= 13000 && time < 23000;
};
const stopTimeAcceleration = () => {
	if (timeLoop) {
		system.clearRun(timeLoop);
		timeLoop = null;
	}
};
const showWakeUpEffects = () => {
	hasFaded = true;
	const allPlayers = world.getAllPlayers();
	sleepingPlayers.forEach(player => {
		player.camera.fade({
			fadeTime: { fadeInTime: 2.0, holdTime: 0.0, fadeOutTime: 1.0 },
			fadeColor: { red: 0.0, green: 0.0, blue: 0.0 }
		});
	});
	system.runTimeout(() => {
		allPlayers.forEach(player => {
			player.dimension.setWeather("Clear");
			player.onScreenDisplay.setActionBar("06:00");
		});
		world.setTimeOfDay(0);
		hasFaded = false;
	}, 40);
};
const accelerateTimeCycle = () => {
	if (timeLoop) return;
	timeLoop = system.runInterval(() => {
		const currentTime = world.getTimeOfDay();
		const newTime = (currentTime + 40) % 24000;
		world.setTimeOfDay(newTime);
		if (newTime < 40) {
			world.getDimension("overworld").setWeather("Clear");
			stopTimeAcceleration();
			showWakeUpEffects();
		}
	}, 1);
};
system.runInterval(() => {
	if (!isNightTime()) {
		stopTimeAcceleration();
		return;
	}
	const allPlayers = world.getAllPlayers();
	sleepingPlayers = allPlayers.filter(player => 
		player.getComponent("minecraft:riding")?.entityRidingOn?.typeId === "medieval:hidden_mount_sleeping_anim"
	);
	if (sleepingPlayers.length === 0) return;
	const requiredCount = Math.ceil(world.gameRules.playersSleepingPercentage / 100 * allPlayers.length);
	const sleepingCount = sleepingPlayers.length;
	if (sleepingCount >= requiredCount) {
		if (accelerateTime) {
			accelerateTimeCycle();
		} else if (!hasFaded) {
			showWakeUpEffects();
		}
	} else {
		sleepingPlayers.forEach(player => { player.onScreenDisplay.setActionBar({ translate: "mf.actionbar.sleeping_players", with: [ `${sleepingCount}/${requiredCount}` ] }); });
		stopTimeAcceleration();
	}
}, 20);
class MfBreakByQuantity {
	onPlayerDestroy(e) {
		if (isCreative(e.player)) return;
		const quantity = e.destroyedBlockPermutation.getState("medieval:quantity");
		if (quantity === 0) return;
		e.dimension.spawnItem(new ItemStack(e.destroyedBlockPermutation.type.id, quantity), e.block.location);
	}
}
world.afterEvents.projectileHitBlock.subscribe((e) => {
	try {
		const block = e.getBlockHit().block;
		if (block?.typeId === "medieval:cookie_jar_0") {
			const quantity = block.permutation.getState("medieval:quantity");
			e.source.runCommandAsync(`setblock ${block.location.x} ${block.location.y} ${block.location.z} air destroy`);
			e.dimension.spawnItem(new ItemStack("minecraft:cookie", quantity), block.center());
		}
	} catch (error) {return;}
});