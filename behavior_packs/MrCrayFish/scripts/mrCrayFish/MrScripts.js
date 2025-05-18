import { world } from "@minecraft/server";
import { MrSofa } from './Sofa';
import { MrBlinds } from './Blinds';
import { foodGrill, MrGrill } from './Grill';
import { MrFenceGate } from './FenceGate';
import { MrFillSink } from './Sink';
import { MrCounter } from './Counter';
import { MrRockPath } from './RockPath';
import { MrFridge, MrMailBox, MrPlaceContainer, MrPostBox, playerPlaceMailbox } from './Container';
import { MrBounce, MrBounceBoard } from './Trampolin';
import { MrSit } from './SitOnChair';
import { MrUpdateCoffeeTable, MrUpdateShortCoffeeTable, MrUpdateTable, MrUpdateTrampoline } from './Table';
import { MrParkBench, MrUpdateDesk } from './UpdateSideBlocks';
import { MrBreakLargeBlock, MrOnPlaceBase, MrPlaceBase } from './PlaceBlockParts';
import { freezingEvent } from './FreezerEvent';
import { MrConnectFence, MrConnectWall, fenceEvent } from './Fence';

fenceEvent();
foodGrill();
freezingEvent();
playerPlaceMailbox();

world.beforeEvents.worldInitialize.subscribe((e) => {
	e.blockComponentRegistry.registerCustomComponent("mr:update_short_coffee_table", new MrUpdateShortCoffeeTable());
	e.blockComponentRegistry.registerCustomComponent("mr:update_coffee_table", new MrUpdateCoffeeTable());
	e.blockComponentRegistry.registerCustomComponent("mr:update_table", new MrUpdateTable());
	e.blockComponentRegistry.registerCustomComponent("mr:blinds", new MrBlinds());
	e.blockComponentRegistry.registerCustomComponent("mr:rock_path", new MrRockPath());
	e.blockComponentRegistry.registerCustomComponent("mr:sit", new MrSit());
	e.blockComponentRegistry.registerCustomComponent("mr:fill_sink", new MrFillSink());
	e.blockComponentRegistry.registerCustomComponent("mr:place_container", new MrPlaceContainer());
//	e.blockComponentRegistry.registerCustomComponent("mr:mail_box", new MrMailBox());
//	e.blockComponentRegistry.registerCustomComponent("mr:post_box", new MrPostBox());
	e.blockComponentRegistry.registerCustomComponent("mr:update_desk", new MrUpdateDesk());
	e.blockComponentRegistry.registerCustomComponent("mr:counter_detection", new MrCounter());
	e.blockComponentRegistry.registerCustomComponent("mr:update_park_bench", new MrParkBench());
	e.blockComponentRegistry.registerCustomComponent("mr:fence_gate", new MrFenceGate());
	e.blockComponentRegistry.registerCustomComponent("mr:sofa", new MrSofa());
	e.blockComponentRegistry.registerCustomComponent("mr:grill", new MrGrill());
	e.blockComponentRegistry.registerCustomComponent("mr:fridge", new MrFridge());
	e.blockComponentRegistry.registerCustomComponent("mr:update_trampoline", new MrUpdateTrampoline());
	e.blockComponentRegistry.registerCustomComponent("mr:bounce", new MrBounce());
	e.blockComponentRegistry.registerCustomComponent("mr:bounce_board", new MrBounceBoard());
	e.blockComponentRegistry.registerCustomComponent("mr:break_large_block", new MrBreakLargeBlock());
	e.blockComponentRegistry.registerCustomComponent("mr:place_1x1x2_block", new (
		class extends MrPlaceBase { get sizeKey() { return "1x1x2"; } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mr:place_1x1x2_parts", new (
		class extends MrOnPlaceBase { get sizeKey() { return "1x1x2"; } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mr:place_1x2x1_block", new (
		class extends MrPlaceBase { get sizeKey() { return "1x2x1"; } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mr:place_1x2x1_parts", new (
		class extends MrOnPlaceBase { get sizeKey() { return "1x2x1"; } })()
	);
	e.blockComponentRegistry.registerCustomComponent("mr:connect_fence", new MrConnectFence());
	e.blockComponentRegistry.registerCustomComponent("mr:connect_wall", new MrConnectWall());
});