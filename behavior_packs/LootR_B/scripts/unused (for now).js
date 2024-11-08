server.system.afterEvents.scriptEventReceive.subscribe(result => {
    let id = result.id
    let msg = result.message
    if (id == "lootr:create") {
        let block = result.sourceEntity.dimension.getBlock({ x: result.sourceEntity.location.x, y: result.sourceEntity.location.y - 0.4, z: result.sourceEntity.location.z })
        if (!lootrBlocksIds.includes(block.typeId)) { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.not_a_block" }] }); return; }
        if (msg == "") { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.missing_name", "with": [`${id}`] }] }); return; }
        if (msg.startsWith("lootr:") || msg == "lootr:") { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.wrong_namespace" }] }); return; }

        try {
            let structure = server.world.structureManager.createFromWorld("lootr:" + msg, result.sourceEntity.dimension, block.location, block.location, { includeEntities: false })
            structure.saveToWorld()
            result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.structure_saved", "with": [`${msg}`] }] })
        } catch (e) { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.error_structure", "with": [`${e}`] }] }) }
    }
    else if (id == "lootr:list") {
        let lootrStructures = server.world.structureManager.getWorldStructureIds().filter(name => name.startsWith("lootr:")).join(", ").replaceAll("lootr:", "");

        if (!lootrStructures) result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.structure_list_equals0", "with": [`${lootrStructures}`] }] });

        else result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.structure_list", "with": [`${lootrStructures}`] }] });
    }
    else if (id == "lootr:place") {
        if (msg == "") { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.missing_name", "with": [`${id}`] }] }); return; }
        if (msg.startsWith("lootr:")) { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.wrong_namespace" }] }); return; }
        try {
            server.world.structureManager.place("lootr:" + msg, result.sourceEntity.dimension, result.sourceEntity.location)
            result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.structure_placed", "with": [`${msg}`] }] })
        } catch (e) { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.error_placing_structure", "with": [`${e}`] }] }) }
    }
    else if (id == "lootr:delete") {

        if (msg == "all") {
            let count = 0
            let lootrStructures = server.world.structureManager.getWorldStructureIds().filter(name => name.startsWith("lootr:"))
            try {
                lootrStructures.forEach(structure => {
                    count++
                    server.world.structureManager.delete(structure)
                })
                result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.deleted_count", "with": [`${count}`] }] })
            } catch (e) { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.error_deleting_structure", "with": [`${e}`] }] }) }
            return
        }

        if (msg == "") { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.missing_name_2", "with": [`${id}`] }] }); return; }
        if (msg.startsWith("lootr:") || msg == "lootr:") { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.wrong_namespace" }] }); return; }

        try {
            let lootrStructures = server.world.structureManager.getWorldStructureIds().filter(name => name.startsWith("lootr:")).join(", ");
            if (lootrStructures.includes(msg)) { server.world.structureManager.delete("lootr:" + msg), result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.structure_deleted", "with": [`${msg}`] }] }) }
            else { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.structure_not_found", "with": [`${msg}`] }] }); }
        } catch (e) { result.sourceEntity.sendMessage({ "rawtext": [{ "translate": "lootr.error_deleting_structure", "with": [`${e}`] }] }) }
    }
    //lootr:help para mostrar los comandos disponibles
})