import { world, system } from "@minecraft/server";
import { ModalFormData, ActionFormData, MessageFormData } from "@minecraft/server-ui";

// Utility function to play the page turn sound at a player's location
function playPageTurnSound(player) {
    try {
        player.runCommand('playsound item.book.page_turn');
    } catch (e) {
        // Ignore errors if sound fails
    }
}

function ensureScoreboard() {
    if (!world.scoreboard.getObjective("joined")) {
        world.scoreboard.addObjective("joined", "Joined Players");
        console.log("Scoreboard 'joined' initialized.");
    }
}

function ensureEffectTags(player) {
    if (!player) return;

    let changed = false;

    if (!player.hasTag("leaf_enabled")) {
        player.addTag("leaf_enabled");
        player.removeTag("leaf_disabled");
        changed = true;
    }

    if (!player.hasTag("storms_enabled")) {
        player.addTag("storms_enabled");
        player.removeTag("storms_disabled");
        changed = true;
    }

    if (!player.hasTag("end_fog_enabled")) {
        player.addTag("end_fog_enabled");
        player.removeTag("end_fog_disabled");
        changed = true;
    }
}

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event?.player;
    if (!player) return;

    system.runTimeout(() => {
        ensureEffectTags(player);

        const joinedObjective = world.scoreboard.getObjective("joined");
        if (joinedObjective) {
            joinedObjective.setScore(player, 1);
        }
    }, 10);
});

function toggleSettings(player) {
    if (!player) return;
    
    const isStormEnabled = player.hasTag("storms_enabled");

    new ModalFormData()
        .title({ translate: "ui.biomes_beyond.gsetings.title.name"})
        .toggle({ translate: "ui.biomes_beyond.gsetings.blizard_sandstorm.name"}, {
            defaultValue: isStormEnabled
        })
        .show(player)
        .then(response => {
            if (response.canceled) return;
            playPageTurnSound(player);
            const toggleStorms = response.formValues[0];

            world.getPlayers().forEach(p => {
                if (toggleStorms) {
                    p.addTag("storms_enabled");
                    p.removeTag("storms_disabled");
                } else {
                    p.addTag("storms_disabled");
                    p.removeTag("storms_enabled");
                }
            });


world.sendMessage({
    translate: toggleStorms
        ? "ui.biomes_beyond.gsetings.storm.on"
        : "ui.biomes_beyond.gsetings.storm.off"
});

        });
}

function togglePersonalSettings(player) {
    if (!player) return;
    
    const isLeafEnabled = player.hasTag("leaf_enabled");
    const isFogEnabled = player.hasTag("end_fog_enabled");

    new ModalFormData()
        .title({ translate: "ui.biomes_beyond.psetings.title.name"})
        .toggle({ translate: "ui.biomes_beyond.psetings.particle.name"}, {
            defaultValue: isLeafEnabled
        })
        .toggle({ translate: "ui.biomes_beyond.psetings.end_fog.name"}, {
            defaultValue: isFogEnabled
        })
        .show(player)
        .then(response => {
            if (response.canceled) return;
            playPageTurnSound(player);
            const toggleLeaves = response.formValues[0];
            const toggleFog = response.formValues[1];

            if (toggleLeaves) {
                player.addTag("leaf_enabled");
                player.removeTag("leaf_disabled");
            } else {
                player.addTag("leaf_disabled");
                player.removeTag("leaf_enabled");
            }

            if (toggleFog) {
                player.addTag("end_fog_enabled");
                player.removeTag("end_fog_disabled");
            } else {
                player.addTag("end_fog_disabled");
                player.removeTag("end_fog_enabled");
            }
        });
}

world.afterEvents.itemUse.subscribe(event => {
    const player = event?.source;
    if (!player) return;
    
    if (event.itemStack?.typeId === "wypnt_bab:global_settings") toggleSettings(player);
    if (event.itemStack?.typeId === "wypnt_bab:personal_settings") togglePersonalSettings(player);
});


// Function to show the wiki main menu
function showWikiForm(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.title" }) 
        .button({ translate: "ui.biomes_beyond.wiki.mobs.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/mob_icon.png")
        .button({ translate: "ui.biomes_beyond.wiki.items.name" }, "textures/ui/icon_recipe_item.png")
        .button({ translate: "ui.biomes_beyond.wiki.tools.name" }, "textures/ui/icon_recipe_equipment.png")
        .button({ translate: "ui.biomes_beyond.wiki.biomes.name" }, "textures/ui/world_glyph_color.png")
        .button({ translate: "ui.biomes_beyond.wiki.structures.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/structure_icon.png")
        .button({ translate: "ui.biomes_beyond.wiki.ores.name" }, "textures/ui/icon_recipe_nature.png")
        .button({ translate: "ui.biomes_beyond.wiki.more.name" }, "textures/ui/more-dots.png");

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            switch (response.selection) {
                case 0:
                    showMobsList(player);
                    break;
                case 1:
                    showItemsList(player);
                    break;
                case 2:
                    showToolList(player);
                    break;
                case 3:
                    showBiomesList(player);
                    break;
                case 4:
                    showStructureList(player);
                    break;
                case 5:
                    showOreList(player);
                    break;    
                case 6:
                    showOtherCategoriesList(player);
                    break;
            }
        }
    });
}

// Function to show a list of biomes
function showBiomesList(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.biomes.name" })
        .button({ translate: "ui.biomes_beyond.wiki.aspen_forest.name" })
        .button({ translate: "ui.biomes_beyond.wiki.lavender_fields.name" })
        .button({ translate: "ui.biomes_beyond.wiki.autumn_woods.name" })
        .button({ translate: "ui.biomes_beyond.wiki.badlands.name" })
        .button({ translate: "ui.biomes_beyond.wiki.prairie.name" })
        .button({ translate: "ui.biomes_beyond.wiki.savanna.name" })
        .button({ translate: "ui.biomes_beyond.wiki.deciduous_forest.name" })
        .button({ translate: "ui.biomes_beyond.wiki.pendula_birch_forest.name" })
        .button({ translate: "ui.biomes_beyond.wiki.boggy_swamplands.name" })
        .button({ translate: "ui.biomes_beyond.wiki.pale_garden.name" })
        .button({ translate: "ui.biomes_beyond.wiki.forsaken_depths.name" })
        .button({ translate: "ui.biomes_beyond.wiki.chorus_forest.name" })
        .button({ translate: "ui.biomes_beyond.wiki.velvium_expanses.name" })
        .button({ translate: "ui.biomes_beyond.wiki.depraved_wetlands.name" })

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            const biomeDescriptions = {
                0: {
                    name: { translate: "ui.biomes_beyond.wiki.aspen_forest.name" },
                    description: { translate: "ui.biomes_beyond.wiki.aspen_forest.description" }
                },
                1: {
                    name: { translate: "ui.biomes_beyond.wiki.lavender_fields.name" },
                    description: { translate: "ui.biomes_beyond.wiki.lavender_fields.description" }
                },
                2: {
                    name: { translate: "ui.biomes_beyond.wiki.autumn_woods.name" },
                    description: { translate: "ui.biomes_beyond.wiki.autumn_woods.description" }
                },
                3: {
                    name: { translate: "ui.biomes_beyond.wiki.badlands.name" },
                    description: { translate: "ui.biomes_beyond.wiki.badlands.description" }
                },
                4: {
                    name: { translate: "ui.biomes_beyond.wiki.prairie.name" },
                    description: { translate: "ui.biomes_beyond.wiki.prairie.description" }
                },
                5: {
                    name: { translate: "ui.biomes_beyond.wiki.savanna.name" },
                    description: { translate: "ui.biomes_beyond.wiki.savanna.description" }
                },
                6: {
                    name: { translate: "ui.biomes_beyond.wiki.deciduous_forest.name" },
                    description: { translate: "ui.biomes_beyond.wiki.deciduous_forest.description" }
                },
                7: {
                    name: { translate: "ui.biomes_beyond.wiki.pendula_birch_forest.name" },
                    description: { translate: "ui.biomes_beyond.wiki.pendula_birch_forest.description" }
                },
                8: {
                    name: { translate: "ui.biomes_beyond.wiki.boggy_swamplands.name" },
                    description: { translate: "ui.biomes_beyond.wiki.boggy_swamplands.description" }
                },
                9: {
                    name: { translate: "ui.biomes_beyond.wiki.pale_garden.name" },
                    description: { translate: "ui.biomes_beyond.wiki.pale_garden.description" }
                },
                10: {
                    name: { translate: "ui.biomes_beyond.wiki.forsaken_depths.name" },
                    description: { translate: "ui.biomes_beyond.wiki.forsaken_depths.description" }
                },
                11: {
                    name: { translate: "ui.biomes_beyond.wiki.chorus_forest.name" },
                    description: { translate: "ui.biomes_beyond.wiki.chorus_forest.description" }
                },
                12: {
                    name: { translate: "ui.biomes_beyond.wiki.velvium_expanses.name" },
                    description: { translate: "ui.biomes_beyond.wiki.velvium_expanses.description" }
                },
                13: {
                    name: { translate: "ui.biomes_beyond.wiki.depraved_wetlands.name" },
                    description: { translate: "ui.biomes_beyond.wiki.depraved_wetlands.description" }
                },
            };

            if (biomeDescriptions[response.selection]) {
            const { name, description } = biomeDescriptions[response.selection];
            showBiomeInfo(player, name, description);
            }
        }
    });
}

// Function to show biome details
function showBiomeInfo(player, name, description) {
    const form = new MessageFormData()
        .title(name)
        .body(description)
        .button1({ translate: "ui.biomes_beyond.wiki.back_biomes.name" })
        .button2({ translate: "ui.biomes_beyond.wiki.close.name" });

    form.show(player).then(response => {
        if (response.selection === 0) {
            playPageTurnSound(player);
            showBiomesList(player);
        }
    });
}

// Function to show a list of mobs
function showMobsList(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.mobs.name" })
        .button({ translate: "ui.biomes_beyond.wiki.deer.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/deer.png")
        .button({ translate: "ui.biomes_beyond.wiki.grizzly_bear.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/bear_brown.png")
        .button({ translate: "ui.biomes_beyond.wiki.raccoon.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/raccoon.png")
        .button({ translate: "ui.biomes_beyond.wiki.crocodile.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/crocodile.png")
        .button({ translate: "ui.biomes_beyond.wiki.mummy.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/mummy.png")
        .button({ translate: "ui.biomes_beyond.wiki.warthog.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/warthog.png")
        .button({ translate: "ui.biomes_beyond.wiki.nautiling.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/nautiling.png")
        .button({ translate: "ui.biomes_beyond.wiki.dweller.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/dweller.png")
        .button({ translate: "ui.biomes_beyond.wiki.lurker.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/lurker.png")
        .button({ translate: "ui.biomes_beyond.wiki.spectre.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/spectre.png")
        .button({ translate: "ui.biomes_beyond.wiki.voidcaller.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/voidcaller.png")
        .button({ translate: "ui.biomes_beyond.wiki.sigiling.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/sigiling.png")
        .button({ translate: "ui.biomes_beyond.wiki.hollowed.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/hollowed.png")
        .button({ translate: "ui.biomes_beyond.wiki.puffling.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/puffling.png")
        .button({ translate: "ui.biomes_beyond.wiki.chimp.name" }, "textures/coreblockstudios/biomesandbeyond/ui/wiki/chimp.png");

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            const mobDescriptions = {
                0: {
                    name: { translate: "ui.biomes_beyond.wiki.deer.name" },
                    description: { translate: "ui.biomes_beyond.wiki.deer.description" }
                },
                1: {
                    name: { translate: "ui.biomes_beyond.wiki.grizzly_bear.name" },
                    description: { translate: "ui.biomes_beyond.wiki.grizzly_bear.description" }
                },
                2: {
                    name: { translate: "ui.biomes_beyond.wiki.raccoon.name" },
                    description: { translate: "ui.biomes_beyond.wiki.raccoon.description" }
                },
                3: {
                    name: { translate: "ui.biomes_beyond.wiki.crocodile.name" },
                    description: { translate: "ui.biomes_beyond.wiki.crocodile.description" }
                },
                4: {
                    name: { translate: "ui.biomes_beyond.wiki.mummy.name" },
                    description: { translate: "ui.biomes_beyond.wiki.mummy.description" }
                },
                5: {
                    name: { translate: "ui.biomes_beyond.wiki.warthog.name" },
                    description: { translate: "ui.biomes_beyond.wiki.warthog.description" }
                },
                6: {
                    name: { translate: "ui.biomes_beyond.wiki.nautiling.name" },
                    description: { translate: "ui.biomes_beyond.wiki.nautiling.description" }
                },
                7: {
                    name: { translate: "ui.biomes_beyond.wiki.dweller.name" },
                    description: { translate: "ui.biomes_beyond.wiki.dweller.description" }
                },
                8: {
                    name: { translate: "ui.biomes_beyond.wiki.lurker.name" },
                    description: { translate: "ui.biomes_beyond.wiki.lurker.description" }
                },
                9: {
                    name: { translate: "ui.biomes_beyond.wiki.spectre.name" },
                    description: { translate: "ui.biomes_beyond.wiki.spectre.description" }
                },
                10: {
                    name: { translate: "ui.biomes_beyond.wiki.voidcaller.name" },
                    description: { translate: "ui.biomes_beyond.wiki.voidcaller.description" }
                },
                11: {
                    name: { translate: "ui.biomes_beyond.wiki.sigiling.name" },
                    description: { translate: "ui.biomes_beyond.wiki.sigiling.description" }
                },
                12: {
                    name: { translate: "ui.biomes_beyond.wiki.hollowed.name" },
                    description: { translate: "ui.biomes_beyond.wiki.hollowed.description" }
                },
                13: {
                    name: { translate: "ui.biomes_beyond.wiki.puffling.name" },
                    description: { translate: "ui.biomes_beyond.wiki.puffling.description" }
                },
                
                14: {
                    name: { translate: "ui.biomes_beyond.wiki.chimp.name" },
                    description: { translate: "ui.biomes_beyond.wiki.chimp.description" }
                },
            };

            if (mobDescriptions[response.selection]) {
                const { name, description } = mobDescriptions[response.selection];
                showMobInfo(player, name, description);
            }
        }
    });
}

// Function to show mob details
function showMobInfo(player, name, description) {
    const form = new MessageFormData()
        .title(name)
        .body(description)
        .button1({ translate: "ui.biomes_beyond.wiki.back_mobs.name" })
        .button2({ translate: "ui.biomes_beyond.wiki.close.name" });

    form.show(player).then(response => {
        if (response.selection === 0) {
            playPageTurnSound(player);
            showMobsList(player);
        }
    });
}

// Function to show a list of items
function showItemsList(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.items.name" })
        .button({ translate: "ui.biomes_beyond.wiki.deer_antler.name" }, "textures/coreblockstudios/biomesandbeyond/items/deer_antler.png")
        .button({ translate: "ui.biomes_beyond.wiki.deer_hide.name" }, "textures/coreblockstudios/biomesandbeyond/items/deer_hide.png")
        .button({ translate: "ui.biomes_beyond.wiki.dweller_flesh.name" }, "textures/coreblockstudios/biomesandbeyond/items/dweller_flesh.png")
        .button({ translate: "ui.biomes_beyond.wiki.aloe_vera.name" }, "textures/coreblockstudios/biomesandbeyond/items/aloe.png")
        .button({ translate: "ui.biomes_beyond.wiki.coconut.name" }, "textures/coreblockstudios/biomesandbeyond/items/coconut.png")
        .button({ translate: "ui.biomes_beyond.wiki.banana.name" }, "textures/coreblockstudios/biomesandbeyond/items/banana.png")
        .button({ translate: "ui.biomes_beyond.wiki.banana_seeds.name" }, "textures/coreblockstudios/biomesandbeyond/items/banana_seeds.png")
        .button({ translate: "ui.biomes_beyond.wiki.grizzly_pelt.name" }, "textures/coreblockstudios/biomesandbeyond/items/grizzly_pelt.png")
        .button({ translate: "ui.biomes_beyond.wiki.lurker_foot.name" }, "textures/coreblockstudios/biomesandbeyond/items/lurker_foot.png")
        .button({ translate: "ui.biomes_beyond.wiki.sulfur.name" }, "textures/coreblockstudios/biomesandbeyond/items/sulfur.png")
        .button({ translate: "ui.biomes_beyond.wiki.raw_tungsten.name" }, "textures/coreblockstudios/biomesandbeyond/items/tungsten_raw.png")
        .button({ translate: "ui.biomes_beyond.wiki.tungsten_ingot.name" }, "textures/coreblockstudios/biomesandbeyond/items/tungsten_ingot.png");

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            const itemDescriptions = {
            0: {
                    name: { translate: "ui.biomes_beyond.wiki.deer_antler.name" },
                    description: { translate: "ui.biomes_beyond.wiki.deer_antler.description" }
                },
                1: {
                    name: { translate: "ui.biomes_beyond.wiki.deer_hide.name" },
                    description: { translate: "ui.biomes_beyond.wiki.deer_hide.description" }
                },
                2: {
                    name: { translate: "ui.biomes_beyond.wiki.dweller_flesh.name" },
                    description: { translate: "ui.biomes_beyond.wiki.dweller_flesh.description" }
                },
                3: {
                    name: { translate: "ui.biomes_beyond.wiki.aloe_vera.name" },
                    description: { translate: "ui.biomes_beyond.wiki.aloe_vera.description" }
                },
                4: {
                    name: { translate: "ui.biomes_beyond.wiki.coconut.name" },
                    description: { translate: "ui.biomes_beyond.wiki.coconut.description" }
                },
                5: {
                    name: { translate: "ui.biomes_beyond.wiki.banana.name" },
                    description: { translate: "ui.biomes_beyond.wiki.banana.description" }
                },
                6:  {
                    name: { translate: "ui.biomes_beyond.wiki.banana_seeds.name" },
                    description: { translate: "ui.biomes_beyond.wiki.banana_seeds.description" }
                },
                7: {
                    name: { translate: "ui.biomes_beyond.wiki.grizzly_pelt.name" },
                    description: { translate: "ui.biomes_beyond.wiki.grizzly_pelt.description" }
                },
                8: {
                    name: { translate: "ui.biomes_beyond.wiki.lurker_foot.name" },
                    description: { translate: "ui.biomes_beyond.wiki.lurker_foot.description" }
                },
                9: {
                    name: { translate: "ui.biomes_beyond.wiki.sulfur.name" },
                    description: { translate: "ui.biomes_beyond.wiki.sulfur.description" }
                },
                10: {
                    name: { translate: "ui.biomes_beyond.wiki.raw_tungsten.name" },
                    description: { translate: "ui.biomes_beyond.wiki.raw_tungsten.description" }
                },
                11: {
                    name: { translate: "ui.biomes_beyond.wiki.tungsten_ingot.name" },
                    description: { translate: "ui.biomes_beyond.wiki.tungsten_ingot.description" }
                },
            };
            if (itemDescriptions[response.selection]) {
                const {name, description} = itemDescriptions[response.selection];
                showItemInfo(player, name, description);
            }
        }
    });
}

// Function to show item details
function showItemInfo(player, name, description) {
    const form = new MessageFormData()
        .title(name)
        .body(description)
        .button1({ translate: "ui.biomes_beyond.wiki.back_items.name" })
        .button2({ translate: "ui.biomes_beyond.wiki.close.name" });;

    form.show(player).then(response => {
        if (response.selection === 0) {
            playPageTurnSound(player);
            showItemsList(player);
        }
    });
}

// Function to show a list of other categories
function showOtherCategoriesList(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.other_categ.name"})
        .button({ translate: "ui.biomes_beyond.wiki.credits.name"}, "textures/ui/Feedback.png"); 

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            switch (response.selection) {
                case 0:
                    showCredits(player);
                    break;
            }
        }
    });
}


function showCredits(player) {
    const playerName = player.name || "Player";

    const form = new MessageFormData()
        .title({ translate: "ui.biomes_beyond.wiki.credits.name"})
        .body({
    translate: "ui.biomes_beyond.wiki.credits.description",
    with: [playerName]
})
        .button1({ translate: "ui.biomes_beyond.wiki.back.name" })
        .button2({ translate: "ui.biomes_beyond.wiki.close.name" });

    form.show(player).then(response => {
        if (response.selection === 0) {
            playPageTurnSound(player);
            showOtherCategoriesList(player);
        }
    });
}

// Function to show a list of tools
function showToolList(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.tools.name" })
        .button({ translate: "ui.biomes_beyond.wiki.khopesh.name" }, "textures/coreblockstudios/biomesandbeyond/items/khopesh.png")
        .button({ translate: "ui.biomes_beyond.wiki.swiftrunner_boots.name" }, "textures/coreblockstudios/biomesandbeyond/items/swiftrunner_boots.png")
        .button({ translate: "ui.biomes_beyond.wiki.tungsten.name" }, "textures/coreblockstudios/biomesandbeyond/items/tungsten_helmet.png");

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            const toolDescriptions = {
                0: {
                    name: { translate: "ui.biomes_beyond.wiki.khopesh.name" },
                    description: { translate: "ui.biomes_beyond.wiki.khopesh.description" }
                },
                1: {
                    name: { translate: "ui.biomes_beyond.wiki.swiftrunner_boots.name" },
                    description: { translate: "ui.biomes_beyond.wiki.swiftrunner_boots.description" }
                },
                2: {
                    name: { translate: "ui.biomes_beyond.wiki.tungsten.name" },
                    description: { translate: "ui.biomes_beyond.wiki.tungsten.description" }
                },
            };

            if (toolDescriptions[response.selection]) {
                const {name, description} = toolDescriptions[response.selection];
                showToolInfo(player, name, description);
            }
        }
    });
}

// Function to show tool details
function showToolInfo(player, name, description) {
    const form = new MessageFormData()
        .title(name)
        .body(description)
        .button1({ translate: "ui.biomes_beyond.wiki.back_tools.name" })
        .button2({ translate: "ui.biomes_beyond.wiki.close.name" });

    form.show(player).then(response => {
        if (response.selection === 0) {
            playPageTurnSound(player);
            showToolList(player);
        }
    });
}

// Function to show a list of biomes
function showStructureList(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.structures.name"})
        .button({ translate: "ui.biomes_beyond.wiki.trial_tower.name"})
        .button({ translate: "ui.biomes_beyond.wiki.goblin_hut.name"})
        .button({ translate: "ui.biomes_beyond.wiki.ruined_altars.name"});

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            const structureDescriptions = {
                0: {
                    name: { translate: "ui.biomes_beyond.wiki.trial_tower.name" },
                    description: { translate: "ui.biomes_beyond.wiki.trial_tower.description" }
                },
                1: {
                    name: { translate: "ui.biomes_beyond.wiki.goblin_hut.name" },
                    description: { translate: "ui.biomes_beyond.wiki.goblin_hut.description" }
                },
                2: {
                    name: { translate: "ui.biomes_beyond.wiki.ruined_altars.name" },
                    description: { translate: "ui.biomes_beyond.wiki.ruined_altars.description" }
                },
            };

            if (structureDescriptions[response.selection]) {
                const {name, description} = structureDescriptions[response.selection];
                showStructureInfo(player, name, description);
            }
        }
    });
}

// Function to show structure details
function showStructureInfo(player, name, description) {
    const form = new MessageFormData()
        .title(name)
        .body(description)
        .button1({ translate: "ui.biomes_beyond.wiki.back_structures.name" })
        .button2({ translate: "ui.biomes_beyond.wiki.close.name" });


    form.show(player).then(response => {
        if (response.selection === 0) {
            playPageTurnSound(player);
            showStructureList(player);
        }
    });
}

// Function to show a list of ores
function showOreList(player) {
    const form = new ActionFormData()
        .title({ translate: "ui.biomes_beyond.wiki.ores.name"})
        .button({ translate: "ui.biomes_beyond.wiki.sulfur_ore.name"}, "textures/coreblockstudios/biomesandbeyond/ui/wiki/sulfur_ore.png")
        .button({ translate: "ui.biomes_beyond.wiki.tungsten_ore.name"}, "textures/coreblockstudios/biomesandbeyond/ui/wiki/tungsten_ore.png");

    form.show(player).then(response => {
        if (!response.canceled) {
            playPageTurnSound(player);
            const oreDescriptions = {
                0: {
                    name: { translate: "ui.biomes_beyond.wiki.sulfur_ore.name" },
                    description: { translate: "ui.biomes_beyond.wiki.sulfur_ore.description" }
                },
                1: {
                    name: { translate: "ui.biomes_beyond.wiki.tungsten_ore.name" },
                    description: { translate: "ui.biomes_beyond.wiki.tungsten_ore.description" }
                },
            };

            if (oreDescriptions[response.selection]) {
                const {name, description} = oreDescriptions[response.selection];
                showOreInfo(player, name, description);
            }
        }
    });
}

// Function to show ore details
function showOreInfo(player, name, description) {
    const form = new MessageFormData()
        .title(name)
        .body(description)
        .button1({ translate: "ui.biomes_beyond.wiki.back_ores.name" })
        .button2({ translate: "ui.biomes_beyond.wiki.close.name" });

    form.show(player).then(response => {
        if (response.selection === 0) {
            playPageTurnSound(player);
            showOreList(player);
        }
    });
}

// Ensure the itemUse event subscription is handled correctly as per the original code
world.afterEvents.itemUse.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;

    if (player && item && item.typeId === "wypnt_bab:info_book") {
        showWikiForm(player);
    }
});
