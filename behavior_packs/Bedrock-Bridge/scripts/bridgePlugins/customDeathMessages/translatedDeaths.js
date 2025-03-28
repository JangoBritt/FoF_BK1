import { bridge } from '../addons';
import { EntityDamageCause } from '@minecraft/server'

bridge.events.playerDieLog.subscribe((e, player, damageSource)=>{
    if (damageSource.cause===EntityDamageCause.void){
        e.message = `${player.name} decided to meet his creator.`
    }
})