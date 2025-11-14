import { system, Player, ItemCustomComponent } from '@minecraft/server';

export class CoconutItem {
    constructor() {
        // Defer registration to after world is ready
        system.runTimeout(() => {
            this.coconutItemComponent = new ItemCustomComponent('wypnt_bab:coconut');
            this.coconutItemComponent.onCompleteUse = (eventData) => this.onCoconutThrown(eventData);
            system.registerCustomComponent(this.coconutItemComponent);
        }, 1);
    }

    // Handle when the coconut item is used (thrown)
    onCoconutThrown(eventData) {
        const player = eventData.player;
        const itemStack = eventData.itemStack;
        
        // Ensure it's the coconut item
        if (itemStack.__identifier__ === 'wypnt_bab:coconut') {
            // Deplete one coconut from the player's inventory
            this.depleteCoconut(player, itemStack);
        }
    }

    // Deplete one coconut from the player's inventory
    depleteCoconut(player, itemStack) {
        const inventory = player.getComponent('minecraft:inventory');
        
        // Find the coconut item in the inventory
        const coconutSlot = inventory.container.findFirst(itemStack.__identifier__);

        if (coconutSlot && coconutSlot.count > 0) {
            // Decrease the count of coconuts by 1
            coconutSlot.count -= 1;
        }

    }
}

// Initialize the CoconutItem component
const coconutItemScript = new CoconutItem();
