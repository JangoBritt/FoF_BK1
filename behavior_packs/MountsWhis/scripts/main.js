import { world } from '@minecraft/server';

const whistles = {
	'whs:whistle_black': 'whistle_black',
	'whs:whistle_gray': 'whistle_gray',
	'whs:whistle_blue': 'whistle_blue',
	'whs:whistle_brown': 'whistle_brown',
	'whs:whistle_cyan': 'whistle_cyan',
	'whs:whistle_green': 'whistle_green',
	'whs:whistle_light_blue': 'whistle_light_blue',
	'whs:whistle_light_gray': 'whistle_light_gray',
	'whs:whistle_lime': 'whistle_lime',
	'whs:whistle_magenta': 'whistle_magenta',
	'whs:whistle_orange': 'whistle_orange',
	'whs:whistle_pink': 'whistle_pink',
	'whs:whistle_purple': 'whistle_purple',
	'whs:whistle_red': 'whistle_red',
	'whs:whistle_white': 'whistle_white',
	'whs:whistle_yellow': 'whistle_yellow'
}

world.beforeEvents.worldInitialize.subscribe(event => {
	const {itemComponentRegistry,blockTypeRegistry} = event;
	itemComponentRegistry.registerCustomComponent('whs:whistle', {
		onUse: data => {
			const {itemStack,source: player} = data;
			const items = whistles[itemStack.typeId]
			if (items) {
				player.dimension.playSound('random.whistle', player.location);
				const en = player.dimension.getEntities().find(entity => entity.hasTag(items));
				if (en) en.teleport(player.location);
				if (itemStack.getComponent('cooldown')) itemStack.getComponent('cooldown').startCooldown(player);
			}
		}
	});
});