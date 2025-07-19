export const WoodTypeSounds = {
	door: {
		cherry: { open: 'open.cherry_wood_door', close: 'close.cherry_wood_door' },
		nether: { open: 'open.nether_wood_door', close: 'close.nether_wood_door' },
		default: { open: 'open.wooden_door', close: 'close.wooden_door' }
	}
};
export function getWoodType(blockId) {
	if (blockId.includes('cherry')) return 'cherry';
	if (blockId.includes('bamboo')) return 'bamboo';
	if (blockId.includes('copper')) return 'copper';
	if (blockId.includes('crimson') || blockId.includes('warped')) return 'nether';
	return 'default';
}