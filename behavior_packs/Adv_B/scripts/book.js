import {
  ActionFormData,
  MessageFormData,
  ModalFormData
} from "@minecraft/server-ui";

import {
  world,
  system
} from "@minecraft/server";

world.afterEvents.itemUse.subscribe(event => {
  if (event.itemStack.typeId === "adv:book_of_advancements") {

    let advancementCount = world.scoreboard.getObjective('AdvancementCount').getScore(event.source)
    let minecraftCount = world.scoreboard.getObjective('MinecraftCount').getScore(event.source)
    let netherCount = world.scoreboard.getObjective('NetherCount').getScore(event.source)
    let endCount = world.scoreboard.getObjective('EndCount').getScore(event.source)
    let adventureCount = world.scoreboard.getObjective('AdventureCount').getScore(event.source)
    let husbandryCount = world.scoreboard.getObjective('HusbandryCount').getScore(event.source)
    let achievementCount = world.scoreboard.getObjective('AchievementCount').getScore(event.source)

    let minecraftMax = 15
    let netherMax = 19
    let endMax = 6
    let adventureMax = 31
    let husbandryMax = 22
    let achievementMax = 12

    let advancementMax = (minecraftMax + netherMax + endMax + adventureMax + husbandryMax + achievementMax)

    let advancementPct = (Math.round((advancementCount/advancementMax)*1000))/10
    let minecraftPct = Math.round((minecraftCount/minecraftMax)*100)
    let netherPct = Math.round((netherCount/netherMax)*100)
    let endPct = Math.round((endCount/endMax)*100)
    let adventurePct = Math.round((adventureCount/adventureMax)*100)
    let husbandryPct = Math.round((husbandryCount/husbandryMax)*100)
    let achievementPct = Math.round((achievementCount/achievementMax)*100)


    let minecraftColour = ""
    if (minecraftPct <= 0) {
        minecraftColour = "§m"
    }
    if (minecraftPct > 0 && minecraftPct <= 24) {
        minecraftColour = "§c"
    }
    if (minecraftPct >= 25 && minecraftPct <= 49) {
        minecraftColour = "§6"
    }
    if (minecraftPct >=50 && minecraftPct <= 74) {
        minecraftColour = "§e"
    }
    if (minecraftPct >= 75 && minecraftPct <= 99) {
        minecraftColour = "§q"
    }
    if (minecraftPct >= 100) {
        minecraftColour = "§a"
    }

    let netherColour = ""
    if (netherPct <= 0) {
        netherColour = "§m"
    }
    if (netherPct > 0 && netherPct <= 24) {
        netherColour = "§c"
    }
    if (netherPct >= 25 && netherPct <= 49) {
        netherColour = "§6"
    }
    if (netherPct >=50 && netherPct <= 74) {
        netherColour = "§e"
    }
    if (netherPct >= 75 && netherPct <= 99) {
        netherColour = "§q"
    }
    if (netherPct >= 100) {
        netherColour = "§a"
    }

    let endColour = ""
    if (endPct <= 0) {
        endColour = "§m"
    }
    if (endPct > 0 && endPct <= 24) {
        endColour = "§c"
    }
    if (endPct >= 25 && endPct <= 49) {
        endColour = "§6"
    }
    if (endPct >=50 && endPct <= 74) {
        endColour = "§e"
    }
    if (endPct >= 75 && endPct <= 99) {
        endColour = "§q"
    }
    if (endPct >= 100) {
        endColour = "§a"
    }

    let adventureColour = ""
    if (adventurePct <= 0) {
        adventureColour = "§m"
    }
    if (adventurePct > 0 && adventurePct <= 24) {
        adventureColour = "§c"
    }
    if (adventurePct >= 25 && adventurePct <= 49) {
        adventureColour = "§6"
    }
    if (adventurePct >=50 && adventurePct <= 74) {
        adventureColour = "§e"
    }
    if (adventurePct >= 75 && adventurePct <= 99) {
        adventureColour = "§q"
    }
    if (adventurePct >= 100) {
        adventureColour = "§a"
    }

    let husbandryColour = ""
    if (husbandryPct <= 0) {
        husbandryColour = "§m"
    }
    if (husbandryPct > 0 && husbandryPct <= 24) {
        husbandryColour = "§c"
    }
    if (husbandryPct >= 25 && husbandryPct <= 49) {
        husbandryColour = "§6"
    }
    if (husbandryPct >=50 && husbandryPct <= 74) {
        husbandryColour = "§e"
    }
    if (husbandryPct >= 75 && husbandryPct <= 99) {
        husbandryColour = "§q"
    }
    if (husbandryPct >= 100) {
        husbandryColour = "§a"
    }

    let achievementColour = ""
    if (achievementPct <= 0) {
        achievementColour = "§m"
    }
    if (achievementPct > 0 && achievementPct <= 24) {
        achievementColour = "§c"
    }
    if (achievementPct >= 25 && achievementPct <= 49) {
        achievementColour = "§6"
    }
    if (achievementPct >=50 && achievementPct <= 74) {
        achievementColour = "§e"
    }
    if (achievementPct >= 75 && achievementPct <= 99) {
        achievementColour = "§q"
    }
    if (achievementPct >= 100) {
        achievementColour = "§a"
    }


    let advancements = new ActionFormData();

    advancements.title("Advancements");
    advancements.body(`Click on a category to discover what advancements it holds.\n§eComplete :§b ${advancementCount}§e/§b${advancementMax}\n§6[${advancementPct}%%]`);

    advancements.button(`Minecraft  -  ${minecraftColour}${minecraftPct}%%`, "textures/icons/category/minecraft.png");

    advancements.button(`Nether  -  ${netherColour}${netherPct}%%`, "textures/icons/category/nether.png");

    advancements.button(`The End  -  ${endColour}${endPct}%%`, "textures/icons/category/the_end.png");

    advancements.button(`Adventure  -  ${adventureColour}${adventurePct}%%`, "textures/icons/category/adventure.png");

    advancements.button(`Husbandry  -  ${husbandryColour}${husbandryPct}%%`, "textures/icons/category/husbandry.png");

    advancements.button(`Achievements  -  ${achievementColour}${achievementPct}%%`, "textures/icons/category/achievements.png");

    advancements.show(event.source).then(r => {

      if (r.canceled) return;

      let minecraft = new ActionFormData();

      minecraft.title("Minecraft");
      minecraft.body(`The heart and story of the game.\n§eComplete :§b ${minecraftCount}§e/§b${minecraftMax}\n§6[${minecraftPct}%%]`);
      if (event.source.hasTag('StoneAge')) {
        minecraft.button("§aStone Age", "textures/icons/advancement/stone_age.png");
      } else {
        minecraft.button("Stone Age", "textures/icons/advancement/incomplete/stone_age.png");
      }

      if (event.source.hasTag('GettingUpgrade')) {
        minecraft.button("§aGetting an Upgrade", "textures/icons/advancement/getting_an_upgrade.png");
      } else {
        minecraft.button("Getting an Upgrade", "textures/icons/advancement/incomplete/getting_an_upgrade.png");
      }

      if (event.source.hasTag('AcquireHardware')) {
        minecraft.button("§aAcquire Hardware", "textures/icons/advancement/acquire_hardware.png");
      } else {
        minecraft.button("Acquire Hardware", "textures/icons/advancement/incomplete/acquire_hardware.png");
      }
      if (event.source.hasTag('SuitUp')) {
        minecraft.button("§aSuit Up", "textures/icons/advancement/suit_up.png");
      } else {
        minecraft.button("Suit Up", "textures/icons/advancement/incomplete/suit_up.png");
      }

      if (event.source.hasTag('HotStuff')) {
        minecraft.button("§aHot Stuff", "textures/icons/advancement/hot_stuff.png");
      } else {
        minecraft.button("Hot Stuff", "textures/icons/advancement/incomplete/hot_stuff.png");
      }
      if (event.source.hasTag('IronPick')) {
        minecraft.button("§aIsn't it Iron Pick", "textures/icons/advancement/isnt_it_iron_pick.png");
      } else {
        minecraft.button("Isn't it Iron Pick", "textures/icons/advancement/incomplete/isnt_it_iron_pick.png");
      }
      if (event.source.hasTag('NotToday')) {
        minecraft.button("§aNot Today, Thank You", "textures/icons/advancement/not_today_thank_you.png");
      } else {
        minecraft.button("Not Today, Thank You", "textures/icons/advancement/incomplete/not_today_thank_you.png");
      }
      if (event.source.hasTag('IceBucket')) {
        minecraft.button("§aIce Bucket Challenge", "textures/icons/advancement/ice_bucket_challenge.png");
      } else {
        minecraft.button("Ice Bucket Challenge", "textures/icons/advancement/incomplete/ice_bucket_challenge.png");
      }
      if (event.source.hasTag('Diamonds')) {
        minecraft.button("§aDiamonds!", "textures/icons/advancement/diamonds.png");
      } else {
        minecraft.button("Diamonds!", "textures/icons/advancement/incomplete/diamonds.png");
      }
      if (event.source.hasTag('EnterNether')) {
        minecraft.button("§aWe Need to Go Deeper", "textures/icons/advancement/we_need_to_go_deeper.png");
      } else {
        minecraft.button("We Need to Go Deeper", "textures/icons/advancement/incomplete/we_need_to_go_deeper.png");
      }
      if (event.source.hasTag('CoverDiamonds')) {
        minecraft.button("§aCover Me with Diamonds", "textures/icons/advancement/cover_me_with_diamonds.png");
      } else {
        minecraft.button("Cover Me with Diamonds", "textures/icons/advancement/incomplete/cover_me_with_diamonds.png");
      }
      if (event.source.hasTag('Enchanter')) {
        minecraft.button("§aEnchanter", "textures/icons/advancement/enchanter.png");
      } else {
        minecraft.button("Enchanter", "textures/icons/advancement/incomplete/enchanter.png");
      }

      if (event.source.hasTag('ZombieDoctor')) {
        minecraft.button("§eZombie Doctor", "textures/icons/advancement/zombie_doctor.png");
      } else {
        minecraft.button("Zombie Doctor", "textures/icons/advancement/incomplete/zombie_doctor.png");
      }
      if (event.source.hasTag('EyeSpy')) {
        minecraft.button("§aEye Spy", "textures/icons/advancement/eye_spy.png");
      } else {
        minecraft.button("Eye Spy", "textures/icons/advancement/incomplete/eye_spy.png");
      }
      if (event.source.hasTag('TheEnd')) {
        minecraft.button("§aThe End?", "textures/icons/advancement/the_end.png");
      } else {
        minecraft.button("The End?", "textures/icons/advancement/incomplete/the_end.png");
      }

      let nether = new ActionFormData();

      nether.title("Nether");
      nether.body(`Bring summer clothes.\n§eComplete :§b ${netherCount}§e/§b${netherMax}\n§6[${netherPct}%%]`);
      if (event.source.hasTag('ReturnSender')) {
        nether.button("§5Return to Sender", "textures/icons/advancement/return_to_sender.png");
      } else {
        nether.button("Return to Sender", "textures/icons/advancement/incomplete/return_to_sender.png");
      }
      if (event.source.hasTag('HiddenDepths')) {
        nether.button("§aHidden in the Depths", "textures/icons/advancement/hidden_in_the_depths.png");
      } else {
        nether.button("Hidden in the Depths", "textures/icons/advancement/incomplete/hidden_in_the_depths.png");
      }
      if (event.source.hasTag('CuttingOnions')) {
        nether.button("§aWho is Cutting Onions?", "textures/icons/advancement/who_is_cutting_onions.png");
      } else {
        nether.button("Who is Cutting Onions?", "textures/icons/advancement/incomplete/who_is_cutting_onions.png");
      }
      if (event.source.hasTag('OhShiny')) {
        nether.button("§aOh Shiny", "textures/icons/advancement/oh_shiny.png");
      } else {
        nether.button("Oh Shiny", "textures/icons/advancement/incomplete/oh_shiny.png");
      }
      if (event.source.hasTag('BoatLegs')) {
        nether.button("§aThis Boat Has Legs", "textures/icons/advancement/this_boat_has_legs.png");
      } else {
        nether.button("This Boat Has Legs", "textures/icons/advancement/incomplete/this_boat_has_legs.png");
      }
      if (event.source.hasTag('UneasyAlliance')) {
        nether.button("§5Uneasy Alliance", "textures/icons/advancement/uneasy_alliance.png");
      } else {
        nether.button("Uneasy Alliance", "textures/icons/advancement/incomplete/uneasy_alliance.png");
      }
      if (event.source.hasTag('WarPigs')) {
        nether.button("§aWar Pigs", "textures/icons/advancement/war_pigs.png");
      } else {
        nether.button("War Pigs", "textures/icons/advancement/incomplete/war_pigs.png");
      }
      if (event.source.hasTag('CountryLode')) {
        nether.button("§aCountry Lode, Take Me Home", "textures/icons/advancement/country_lode_take_me_home.png");
      } else {
        nether.button("Country Lode, Take Me Home", "textures/icons/advancement/incomplete/country_lode_take_me_home.png");
      }
      if (event.source.hasTag('CoverDebris')) {
        nether.button("§5Cover Me in Debris", "textures/icons/advancement/cover_me_in_debris.png");
      } else {
        nether.button("Cover Me in Debris", "textures/icons/advancement/incomplete/cover_me_in_debris.png");
      }
      if (event.source.hasTag('SpookySkeleton')) {
        nether.button("§aSpooky Scary Skeleton", "textures/icons/advancement/spooky_scary_skeleton.png");
      } else {
        nether.button("Spooky Scary Skeleton", "textures/icons/advancement/incomplete/spooky_scary_skeleton.png");
      }
      if (event.source.hasTag('IntoFire')) {
        nether.button("§aInto Fire", "textures/icons/advancement/into_fire.png");
      } else {
        nether.button("Into Fire", "textures/icons/advancement/incomplete/into_fire.png");
      }
      if (event.source.hasTag('NotNine')) {
        nether.button("§aNot Quite \"Nine\" Lives", "textures/icons/advancement/not_quite_nine_lives.png");
      } else {
        nether.button("Not Quite \"Nine\" Lives", "textures/icons/advancement/incomplete/not_quite_nine_lives.png");
      }
      if (event.source.hasTag('LikeHome')) {
        nether.button("§aFeels Like Home", "textures/icons/advancement/feels_like_home.png");
      } else {
        nether.button("Feels Like Home", "textures/icons/advancement/incomplete/feels_like_home.png");
      }
      if (event.source.hasTag('HotTourist')) {
        nether.button("§5Hot Tourist Destinations", "textures/icons/advancement/hot_tourist_destinations.png");
      } else {
        nether.button("Hot Tourist Destinations", "textures/icons/advancement/incomplete/hot_tourist_destinations.png");
      }
      if (event.source.hasTag('WitheringHeights')) {
        nether.button("§aWithering Heights", "textures/icons/advancement/withering_heights.png");
      } else {
        nether.button("Withering Heights", "textures/icons/advancement/incomplete/withering_heights.png");
      }
      if (event.source.hasTag('LocalBrewery')) {
        nether.button("§aLocal Brewery", "textures/icons/advancement/local_brewery.png");
      } else {
        nether.button("Local Brewery", "textures/icons/advancement/incomplete/local_brewery.png");
      }
      if (event.source.hasTag('BringBeacon')) {
        nether.button("§aBring Home the Beacon", "textures/icons/advancement/bring_home_the_beacon.png");
      } else {
        nether.button("Bring Home the Beacon", "textures/icons/advancement/incomplete/bring_home_the_beacon.png");
      }
      if (event.source.hasTag('FuriousCocktail')) {
        nether.button("§5A Furious Cocktail", "textures/icons/advancement/a_furious_cocktail.png");
      } else {
        nether.button("A Furious Cocktail", "textures/icons/advancement/incomplete/a_furious_cocktail.png");
      }
      if (event.source.hasTag('HowHere')) {
        nether.button("§5How Did We Get Here?", "textures/icons/advancement/how_did_we_get_here.png");
      } else {
        nether.button("???", "textures/icons/advancement/incomplete/locked_challenge.png");
      }


      let end = new ActionFormData();

      end.title("The End");
      end.body(`Or the beginning?\n§eComplete :§b ${endCount}§e/§b${endMax}\n§6[${endPct}%%]`);
      if (event.source.hasTag('FreeEnd')) {
        end.button("§aFree the End", "textures/icons/advancement/free_the_end.png");
      } else {
        end.button("Free the End", "textures/icons/advancement/incomplete/free_the_end.png");
      }
      if (event.source.hasTag('NextGeneration')) {
        end.button("§eThe Next Generation", "textures/icons/advancement/the_next_generation.png");
      } else {
        end.button("The Next Generation", "textures/icons/advancement/incomplete/the_next_generation.png");
      }
      if (event.source.hasTag('RemoteGateway')) {
        end.button("§aRemote Gateway", "textures/icons/advancement/remote_gateway.png");
      } else {
        end.button("Remote Gateway", "textures/icons/advancement/incomplete/remote_gateway.png");
      }
      if (event.source.hasTag('EndAgain')) {
        end.button("§eThe End... Again...", "textures/icons/advancement/the_end_again.png");
      } else {
        end.button("The End Again", "textures/icons/advancement/incomplete/the_end_again.png");
      }
      if (event.source.hasTag('NeedMint')) {
        end.button("§eYou Need a Mint", "textures/icons/advancement/you_need_a_mint.png");
      } else {
        end.button("You Need a Mint", "textures/icons/advancement/incomplete/you_need_a_mint.png");
      }
      if (event.source.hasTag('SkyLimit')) {
        end.button("§eSky's the Limit", "textures/icons/advancement/skys_the_limit.png");
      } else {
        end.button("Sky's the Limit", "textures/icons/advancement/incomplete/skys_the_limit.png");
      }

      let adventure = new ActionFormData();

      adventure.title("Adventure");
      adventure.body(`Adventure, exploration and combat.\n§eComplete :§b ${adventureCount}§e/§b${adventureMax}\n§6[${adventurePct}%%]`);

      if (event.source.hasTag('MonsterHunter')) {
        adventure.button("§aMonster Hunter", "textures/icons/advancement/monster_hunter.png");
      } else {
        adventure.button("Monster Hunter", "textures/icons/advancement/incomplete/monster_hunter.png");
      }
      if (event.source.hasTag('TakeAim')) {
        adventure.button("§aTake Aim", "textures/icons/advancement/take_aim.png");
      } else {
        adventure.button("Take Aim", "textures/icons/advancement/incomplete/take_aim.png");
      }
      if (event.source.hasTag('ThrowawayJoke')) {
        adventure.button("§aA Throwaway Joke", "textures/icons/advancement/a_throwaway_joke.png");
      } else {
        adventure.button("A Throwaway Joke", "textures/icons/advancement/incomplete/a_throwaway_joke.png");
      }
      if (event.source.hasTag('VeryFrightening')) {
        adventure.button("§aVery Very Frightening", "textures/icons/advancement/very_very_frightening.png");
      } else {
        adventure.button("Very Very Frightening", "textures/icons/advancement/incomplete/very_very_frightening.png");
      }
      if (event.source.hasTag('MonstersHunted')) {
        adventure.button("§5Monsters Hunted", "textures/icons/advancement/monsters_hunted.png");
      } else {
        adventure.button("Monsters Hunted", "textures/icons/advancement/incomplete/monsters_hunted.png");
      }
      if (event.source.hasTag('Postmortal')) {
        adventure.button("§ePostmortal", "textures/icons/advancement/postmortal.png");
      } else {
        adventure.button("Postmortal", "textures/icons/advancement/incomplete/postmortal.png");
      }
      if (event.source.hasTag('StickySituation')) {
        adventure.button("§aSticky Situation", "textures/icons/advancement/sticky_situation.png");
      } else {
        adventure.button("Sticky Situation", "textures/icons/advancement/incomplete/sticky_situation.png");
      }
      if (event.source.hasTag('CraftLook')) {
        adventure.button("§aCrafting a New Look", "textures/icons/advancement/crafting_a_new_look.png");
      } else {
        adventure.button("Crafting a New Look", "textures/icons/advancement/incomplete/crafting_a_new_look.png");
      }
      if (event.source.hasTag('SmithingStyle')) {
        adventure.button("§5Smithing with Style", "textures/icons/advancement/smithing_with_style.png");
      } else {
        adventure.button("Smithing with Style", "textures/icons/advancement/incomplete/smithing_with_style.png");
      }
      if (event.source.hasTag('OlBetsy')) {
        adventure.button("§aOl' Betsy", "textures/icons/advancement/ol_betsy.png");
      } else {
        adventure.button("Ol' Betsy", "textures/icons/advancement/incomplete/ol_betsy.png");
      }
      if (event.source.hasTag('TwoBirds')) {
        adventure.button("§5Two Birds, One Arrow", "textures/icons/advancement/two_birds_one_arrow.png");
      } else {
        adventure.button("Two Birds, One Arrow", "textures/icons/advancement/incomplete/two_birds_one_arrow.png");
      }
      if (event.source.hasTag('WhoPillager')) {
        adventure.button("§aWho's the Pillager Now?", "textures/icons/advancement/whos_the_pillager_now.png");
      } else {
        adventure.button("Who's the Pillager Now", "textures/icons/advancement/incomplete/whos_the_pillager_now.png");
      }
      if (event.source.hasTag('CavesCliffs')) {
        adventure.button("§aCaves & Cliffs", "textures/icons/advancement/caves_and_cliffs.png");
      } else {
        adventure.button("Caves & Cliffs", "textures/icons/advancement/incomplete/caves_and_cliffs.png");
      }
      if (event.source.hasTag('RespectingRemnants')) {
        adventure.button("§aRespecting the Remnants", "textures/icons/advancement/respecting_the_remnants.png");
      } else {
        adventure.button("Respecting the Remnants", "textures/icons/advancement/incomplete/respecting_the_remnants.png");
      }
      if (event.source.hasTag('CarefulRestoration')) {
        adventure.button("§aCareful Restoration", "textures/icons/advancement/careful_restoration.png");
      } else {
        adventure.button("Careful Restoration", "textures/icons/advancement/incomplete/careful_restoration.png");
      }
      if (event.source.hasTag('Sneak100')) {
        adventure.button("§aSneak 100", "textures/icons/advancement/sneak_100.png");
      } else {
        adventure.button("Sneak 100", "textures/icons/advancement/incomplete/sneak_100.png");
      }
      if (event.source.hasTag('SweetDreams')) {
        adventure.button("§aSweet Dreams", "textures/icons/advancement/sweet_dreams.png");
      } else {
        adventure.button("Sweet Dreams", "textures/icons/advancement/incomplete/sweet_dreams.png");
      }
      if (event.source.hasTag('AdventuringTime')) {
        adventure.button("§5Adventuring Time", "textures/icons/advancement/adventuring_time.png");
      } else {
        adventure.button("Adventuring Time", "textures/icons/advancement/incomplete/adventuring_time.png");
      }
      if (event.source.hasTag('LightRabbit')) {
        adventure.button("§aLight as a Rabbit", "textures/icons/advancement/light_as_a_rabbit.png");
      } else {
        adventure.button("Light as a Rabbit", "textures/icons/advancement/incomplete/light_as_a_rabbit.png");
      }
      if (event.source.hasTag('ItScute')) {
        adventure.button("§aIsn't it Scute?", "textures/icons/advancement/isnt_it_scute.png");
      } else {
        adventure.button("Isn't it Scute?", "textures/icons/advancement/incomplete/isnt_it_scute.png");
      }
      if (event.source.hasTag('HiredHelp')) {
        adventure.button("§eHired Help", "textures/icons/advancement/hired_help.png");
      } else {
        adventure.button("Hired Help", "textures/icons/advancement/incomplete/hired_help.png");
      }
      if (event.source.hasTag('VoluntaryExile')) {
        adventure.button("§aVoluntary Exile", "textures/icons/advancement/voluntary_exile.png");
      } else {
        adventure.button("???", "textures/icons/advancement/incomplete/locked.png");
      }
      if (event.source.hasTag('HeroVillage')) {
        adventure.button("§5Hero of the Village", "textures/icons/advancement/hero_of_the_village.png");
      } else {
        adventure.button("???", "textures/icons/advancement/incomplete/locked_challenge.png");
      }
      if (event.source.hasTag('ItBird')) {
        adventure.button("§aIs It a Bird?", "textures/icons/advancement/is_it_a_bird.png");
      } else {
        adventure.button("Is It a Bird?", "textures/icons/advancement/incomplete/is_it_a_bird.png");
      }
      if (event.source.hasTag('ItBalloon')) {
        adventure.button("§aIs It a Balloon?", "textures/icons/advancement/is_it_a_balloon.png");
      } else {
        adventure.button("Is It a Balloon?", "textures/icons/advancement/incomplete/is_it_a_balloon.png");
      }
      if (event.source.hasTag('ItPlane')) {
        adventure.button("§aIs It a Plane?", "textures/icons/advancement/is_it_a_plane.png");
      } else {
        adventure.button("Is It a Plane?", "textures/icons/advancement/incomplete/is_it_a_plane.png");
      }
      if (event.source.hasTag('LockKey')) {
        adventure.button("§aUnder Lock and Key", "textures/icons/advancement/under_lock_and_key.png");
      } else {
        adventure.button("Under Lock and Key", "textures/icons/advancement/incomplete/under_lock_and_key.png");
      }
      if (event.source.hasTag('Revaulting')) {
        adventure.button("§eRevaulting", "textures/icons/advancement/revaulting.png");
      } else {
        adventure.button("Revaulting", "textures/icons/advancement/incomplete/revaulting.png");
      }
      if (event.source.hasTag('NeedsRockets')) {
        adventure.button("§aWho Needs Rockets?", "textures/icons/advancement/who_needs_rockets.png");
      } else {
        adventure.button("Who Needs Rockets?", "textures/icons/advancement/incomplete/who_needs_rockets.png");
      }
      if (event.source.hasTag('Blowback')) {
        adventure.button("§5Blowback", "textures/icons/advancement/blowback.png");
      } else {
        adventure.button("Blowback", "textures/icons/advancement/incomplete/blowback.png");
      }
      if (event.source.hasTag('OverOverkill')) {
        adventure.button("§5Over-Overkill", "textures/icons/advancement/over_overkill.png");
      } else {
        adventure.button("Over-Overkill", "textures/icons/advancement/incomplete/over_overkill.png");
      }


      let husbandry = new ActionFormData();

      husbandry.title("Husbandry");
      husbandry.body(`The world is full of friends and food.\n§eComplete :§b ${husbandryCount}§e/§b${husbandryMax}\n§6[${husbandryPct}%%]`);
      if (event.source.hasTag('BestFriends')) {
        husbandry.button("§aBest Friends Forever", "textures/icons/advancement/best_friends_forever.png");
      } else {
        husbandry.button("Best Friends Forever", "textures/icons/advancement/incomplete/best_friends_forever.png");
      }
      if (event.source.hasTag('CompleteCatalogue')) {
        husbandry.button("§5A Complete Catalogue", "textures/icons/advancement/a_complete_catalogue.png");
      } else {
        husbandry.button("A Complete Catalogue", "textures/icons/advancement/incomplete/a_complete_catalogue.png");
      }
      if (event.source.hasTag('WholePack')) {
        husbandry.button("§5The Whole Pack", "textures/icons/advancement/the_whole_pack.png");
      } else {
        husbandry.button("The Whole Pack", "textures/icons/advancement/incomplete/the_whole_pack.png");
      }
      if (event.source.hasTag('FloatGoat')) {
        husbandry.button("§aWhatever Floats Your Goat!", "textures/icons/advancement/whatever_floats_your_goat.png");
      } else {
        husbandry.button("Whatever Floats Your Goat!", "textures/icons/advancement/incomplete/whatever_floats_your_goat.png");
      }
      if (event.source.hasTag('BeeGuest')) {
        husbandry.button("§aBee Our Guest", "textures/icons/advancement/bee_our_guest.png");
      } else {
        husbandry.button("Bee Our Guest", "textures/icons/advancement/incomplete/bee_our_guest.png");
      }
      if (event.source.hasTag('TotalBeelocation')) {
        husbandry.button("§aTotal Beelocation", "textures/icons/advancement/total_beelocation.png");
      } else {
        husbandry.button("Total Beelocation", "textures/icons/advancement/incomplete/total_beelocation.png");
      }
      if (event.source.hasTag('WaxOn')) {
        husbandry.button("§aWax On", "textures/icons/advancement/wax_on.png");
      } else {
        husbandry.button("Wax On", "textures/icons/advancement/incomplete/wax_on.png");
      }
      if (event.source.hasTag('WaxOff')) {
        husbandry.button("§aWax Off", "textures/icons/advancement/wax_off.png");
      } else {
        husbandry.button("Wax Off", "textures/icons/advancement/incomplete/wax_off.png");
      }
      if (event.source.hasTag('GlowBehold')) {
        husbandry.button("§aGlow and Behold!", "textures/icons/advancement/glow_and_behold.png");
      } else {
        husbandry.button("Glow and Behold!", "textures/icons/advancement/incomplete/glow_and_behold.png");
      }
      if (event.source.hasTag('FishyBusiness')) {
        husbandry.button("§aFishy Business", "textures/icons/advancement/fishy_business.png");
      } else {
        husbandry.button("Fishy Business", "textures/icons/advancement/incomplete/fishy_business.png");
      }
      if (event.source.hasTag('TacticalFishing')) {
        husbandry.button("§aTactical Fishing", "textures/icons/advancement/tactical_fishing.png");
      } else {
        husbandry.button("Tactical Fishing", "textures/icons/advancement/incomplete/tactical_fishing.png");
      }
      if (event.source.hasTag('CutestPredator')) {
        husbandry.button("§aThe Cutest Predator", "textures/icons/advancement/the_cutest_predator.png");
      } else {
        husbandry.button("The Cutest Predator", "textures/icons/advancement/incomplete/the_cutest_predator.png");
      }
      if (event.source.hasTag('BukkitBukkit')) {
        husbandry.button("§aBukkit Bukkit", "textures/icons/advancement/bukkit_bukkit.png");
      } else {
        husbandry.button("Bukkit Bukkit", "textures/icons/advancement/incomplete/bukkit_bukkit.png");
      }
      if (event.source.hasTag('PowersCombined')) {
        husbandry.button("§5With Our Powers Combined", "textures/icons/advancement/with_our_powers_combined.png");
      } else {
        husbandry.button("With Our Powers Combined", "textures/icons/advancement/incomplete/with_our_powers_combined.png");
      }
      if (event.source.hasTag('GoodNew')) {
        husbandry.button("§aGood as New", "textures/icons/advancement/good_as_new.png");
      } else {
        husbandry.button("Good as New", "textures/icons/advancement/incomplete/good_as_new.png");
      }
      if (event.source.hasTag('ShearBrilliance')) {
        husbandry.button("§aShear Brilliance", "textures/icons/advancement/shear_brilliance.png");
      } else {
        husbandry.button("Shear Brilliance", "textures/icons/advancement/incomplete/shear_brilliance.png");
      }
      if (event.source.hasTag('SeedyPlace')) {
        husbandry.button("§aA Seedy Place", "textures/icons/advancement/a_seedy_place.png");
      } else {
        husbandry.button("A Seedy Place", "textures/icons/advancement/incomplete/a_seedy_place.png");
      }
      if (event.source.hasTag('BalancedDiet')) {
        husbandry.button("§5A Balanced Diet", "textures/icons/advancement/a_balanced_diet.png");
      } else {
        husbandry.button("A Balanced Diet", "textures/icons/advancement/incomplete/a_balanced_diet.png");
      }
      if (event.source.hasTag('SeriousDedication')) {
        husbandry.button("§5Serious Dedication", "textures/icons/advancement/serious_dedication.png");
      } else {
        husbandry.button("Serious Dedication", "textures/icons/advancement/incomplete/serious_dedication.png");
      }
      if (event.source.hasTag('FriendMe')) {
        husbandry.button("§aYou've Got a Friend in Me", "textures/icons/advancement/youve_got_a_friend_in_me.png");
      } else {
        husbandry.button("???", "textures/icons/advancement/incomplete/locked.png");
      }
      if (event.source.hasTag('SmellsInteresting')) {
        husbandry.button("§aSmells Interesting", "textures/icons/advancement/smells_interesting.png");
      } else {
        husbandry.button("???", "textures/icons/advancement/incomplete/locked.png");
      }
      if (event.source.hasTag('PlantingPast')) {
        husbandry.button("§aPlanting the Past", "textures/icons/advancement/planting_the_past.png");
      } else {
        husbandry.button("???", "textures/icons/advancement/incomplete/locked.png");
      }



      let achievements = new ActionFormData();

      achievements.title("Achievements");
      achievements.body(`Bonus Missions - Can you beat them all?\n§eComplete :§b ${achievementCount}§e/§b${achievementMax}\n§6[${achievementPct}%%]`);
      if (event.source.hasTag('MagicHappens')) {
        achievements.button("§5Where the Magic Happens", "textures/icons/advancement/where_the_magic_happens.png");
      } else {
        achievements.button("Where the Magic Happens", "textures/icons/advancement/incomplete/where_the_magic_happens.png");
      }

      if (event.source.hasTag('RunLife')) {
        achievements.button("§aRun for Your Life!!!", "textures/icons/advancement/run_for_your_life.png");
      } else {
        achievements.button("Run for Your Life!!!", "textures/icons/advancement/incomplete/run_for_your_life.png");
      }
      if (event.source.hasTag('BackCame')) {
        achievements.button("§5Back from Whence You Came!", "textures/icons/advancement/back_from_whence_you_came.png");
      } else {
        achievements.button("Back from Whence You Came!", "textures/icons/advancement/incomplete/back_from_whence_you_came.png");
      }

      if (event.source.hasTag('WildWorld')) {
        achievements.button("§eA Wild World", "textures/icons/advancement/a_wild_world.png");
      } else {
        achievements.button("A Wild World", "textures/icons/advancement/incomplete/a_wild_world.png");
      }

      if (event.source.hasTag('FruitLoom')) {
        achievements.button("§eFruit on the Loom", "textures/icons/advancement/fruit_on_the_loom.png");
      } else {
        achievements.button("Fruit on the Loom", "textures/icons/advancement/incomplete/fruit_on_the_loom.png");
      }

      if (event.source.hasTag('DeepEnd')) {
        achievements.button("§aThe Deep End", "textures/icons/advancement/the_deep_end.png");
      } else {
        achievements.button("The Deep End", "textures/icons/advancement/incomplete/the_deep_end.png");
      }

      if (event.source.hasTag('RecordBreaker')) {
        achievements.button("§aRecord Breaker", "textures/icons/advancement/record_breaker.png");
      } else {
        achievements.button("Record Breaker", "textures/icons/advancement/incomplete/record_breaker.png");
      }

      if (event.source.hasTag('GardenAwakens')) {
        achievements.button("§aThe Garden Awakens..", "textures/icons/advancement/the_garden_awakens.png");
      } else {
        achievements.button("The Garden Awakens..", "textures/icons/advancement/incomplete/the_garden_awakens.png");
      }
      if (event.source.hasTag('ItTree')) {
        achievements.button("§aIs It a... Tree?", "textures/icons/advancement/is_it_a_tree.png");
      } else {
        achievements.button("Is It a... Tree?", "textures/icons/advancement/incomplete/is_it_a_tree.png");
      }
      if (event.source.hasTag('Timber')) {
        achievements.button("§aTimber!!!", "textures/icons/advancement/timber.png");
      } else {
        achievements.button("Timber!!!", "textures/icons/advancement/incomplete/timber.png");
      }
      if (event.source.hasTag('PureHeart')) {
        achievements.button("§aPure of Heart", "textures/icons/advancement/pure_of_heart.png");
      } else {
        achievements.button("Pure of Heart", "textures/icons/advancement/incomplete/pure_of_heart.png");
      }

      if (event.source.hasTag('SpeakTrees')) {
        achievements.button("§5I Speak for the Trees", "textures/icons/advancement/i_speak_for_the_trees.png");
      } else {
        achievements.button("I Speak for the Trees", "textures/icons/advancement/incomplete/i_speak_for_the_trees.png");
      }

      let response = r.selection;
      switch (response) {
        case 0:
          minecraft.show(event.source).then(r => {
            if (r.canceled) return;

            let minecraft_response = r.selection;
            switch (minecraft_response) {
              case 0:
                let stoneAge = new ActionFormData();
                stoneAge.title("Stone Age");
                stoneAge.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Mine Stone with your new Pickaxe\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                stoneAge.button("Close");
                stoneAge.show(event.source).then(r => {
                  if (r.canceled) return;

                  let stoneAge_response = r.selection;
                  switch (stoneAge_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 1:
                let gettingUpgrade = new ActionFormData();
                gettingUpgrade.title("Getting an Upgrade");
                gettingUpgrade.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Construct a better Pickaxe\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                gettingUpgrade.button("Close");
                gettingUpgrade.show(event.source).then(r => {
                  if (r.canceled) return;

                  let gettingUpgrade_response = r.selection;
                  switch (gettingUpgrade_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 2:
                let acquireHardware = new ActionFormData();
                acquireHardware.title("Acquire Hardware");
                acquireHardware.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Smelt an Iron Ingot\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                acquireHardware.button("Close");
                acquireHardware.show(event.source).then(r => {
                  if (r.canceled) return;

                  let acquireHardware_response = r.selection;
                  switch (acquireHardware_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 3:
                let suitUp = new ActionFormData();
                suitUp.title("Suit Up");
                suitUp.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Protect Yourself with a piece of iron armour\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                suitUp.button("Close");
                suitUp.show(event.source).then(r => {
                  if (r.canceled) return;

                  let suitUp_response = r.selection;
                  switch (suitUp_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 4:
                let hotStuff = new ActionFormData();
                hotStuff.title("Hot Stuff");
                hotStuff.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Fill a Bucket with lava\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                hotStuff.button("Close");
                hotStuff.show(event.source).then(r => {
                  if (r.canceled) return;

                  let hotStuff_response = r.selection;
                  switch (hotStuff_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 5:
                let ironPick = new ActionFormData();
                ironPick.title("Isn't it Iron Pick");
                ironPick.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Upgrade your Pickaxe\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                ironPick.button("Close");
                ironPick.show(event.source).then(r => {
                  if (r.canceled) return;

                  let ironPick_response = r.selection;
                  switch (ironPick_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 6:
                let notToday = new ActionFormData();
                notToday.title("Not Today, Thank You");
                notToday.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Try out your new Shield\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                notToday.button("Close");
                notToday.show(event.source).then(r => {
                  if (r.canceled) return;

                  let notToday_response = r.selection;
                  switch (notToday_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 7:
                let iceBucket = new ActionFormData();
                iceBucket.title("Ice Bucket Challenge");
                iceBucket.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Obtain a block of Obsidian\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                iceBucket.button("Close");
                iceBucket.show(event.source).then(r => {
                  if (r.canceled) return;

                  let iceBucket_response = r.selection;
                  switch (iceBucket_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 8:
                let diamonds = new ActionFormData();
                diamonds.title("Diamonds!");
                diamonds.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Acquire Diamonds\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                diamonds.button("Close");
                diamonds.show(event.source).then(r => {
                  if (r.canceled) return;

                  let diamonds_response = r.selection;
                  switch (diamonds_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 9:
                let goDeeper = new ActionFormData();
                goDeeper.title("We Need to Go Deeper");
                goDeeper.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Build, light and enter a Nether Portal\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                goDeeper.button("Close");
                goDeeper.show(event.source).then(r => {
                  if (r.canceled) return;

                  let goDeeper_response = r.selection;
                  switch (goDeeper_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 10:
                let coverDiamonds = new ActionFormData();
                coverDiamonds.title("Cover Me with Diamonds");
                coverDiamonds.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Diamond armour saves lives\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                coverDiamonds.button("Close");
                coverDiamonds.show(event.source).then(r => {
                  if (r.canceled) return;

                  let coverDiamonds_response = r.selection;
                  switch (coverDiamonds_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 11:
                let enchanter = new ActionFormData();
                enchanter.title("Enchanter");
                enchanter.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Obtain an Enchanting Table\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                enchanter.button("Close");
                enchanter.show(event.source).then(r => {
                  if (r.canceled) return;

                  let enchanter_response = r.selection;
                  switch (enchanter_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 12:
                let zombieDoctor = new ActionFormData();
                zombieDoctor.title("Zombie Doctor");
                zombieDoctor.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Weaken and then cure a Zombie Villager\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                zombieDoctor.button("Close");
                zombieDoctor.show(event.source).then(r => {
                  if (r.canceled) return;

                  let zombieDoctor_response = r.selection;
                  switch (zombieDoctor_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 13:
                let eyeSpy = new ActionFormData();
                eyeSpy.title("Eye Spy");
                eyeSpy.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Follow an Eye of Ender\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                eyeSpy.button("Close");
                eyeSpy.show(event.source).then(r => {
                  if (r.canceled) return;

                  let eyeSpy_response = r.selection;
                  switch (eyeSpy_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 14:
                let theEnd = new ActionFormData();
                theEnd.title("The End?");
                theEnd.body("§7 Category\n§r Minecraft\n\n§7 Description\n§r Enter the End Portal\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                theEnd.button("Close");
                theEnd.show(event.source).then(r => {
                  if (r.canceled) return;

                  let theEnd_response = r.selection;
                  switch (theEnd_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              default:
                return;
            }
          }).catch(e => {
            console.error(e, e.stack);
          });
          break;

        case 1:
          nether.show(event.source).then(r => {
            if (r.canceled) return;

            let nether_response = r.selection;
            switch (nether_response) {
              case 0:
                let returnSender = new ActionFormData();
                returnSender.title("Return to Sender");
                returnSender.body("§7 Category\n§r Nether\n\n§7 Description\n§r Destroy a Ghast with a fireball\n\n§e Reward\n§r 50 experience\n\n§e Type\n§5 Challenge\n\n");
                returnSender.button("Close");
                returnSender.show(event.source).then(r => {
                  if (r.canceled) return;

                  let returnSender_response = r.selection;
                  switch (returnSender_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 1:
                let hiddenDepths = new ActionFormData();
                hiddenDepths.title("Hidden in the Depths");
                hiddenDepths.body("§7 Category\n§r Nether\n\n§7 Description\n§r Obtain Ancient Debris\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                hiddenDepths.button("Close");
                hiddenDepths.show(event.source).then(r => {
                  if (r.canceled) return;

                  let hiddenDepths_response = r.selection;
                  switch (hiddenDepths_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 2:
                let cuttingOnions = new ActionFormData();
                cuttingOnions.title("Who is Cutting Onions?");
                cuttingOnions.body("§7 Category\n§r Nether\n\n§7 Description\n§r Obtain Crying Obsidian\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                cuttingOnions.button("Close");
                cuttingOnions.show(event.source).then(r => {
                  if (r.canceled) return;

                  let cuttingOnions_response = r.selection;
                  switch (cuttingOnions_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 3:
                let ohShiny = new ActionFormData();
                ohShiny.title("Oh Shiny");
                ohShiny.body("§7 Category\n§r Nether\n\n§7 Description\n§r Distract Piglins with Gold\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                ohShiny.button("Close");
                ohShiny.show(event.source).then(r => {
                  if (r.canceled) return;

                  let ohShiny_response = r.selection;
                  switch (ohShiny_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 4:
                let boatLegs = new ActionFormData();
                boatLegs.title("This Boat Has Legs");
                boatLegs.body("§7 Category\n§r Nether\n\n§7 Description\n§r Ride a Strider with a Warped Fungus on a Stick\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                boatLegs.button("Close");
                boatLegs.show(event.source).then(r => {
                  if (r.canceled) return;

                  let boatLegs_response = r.selection;
                  switch (boatLegs_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 5:
                let uneasyAlliance = new ActionFormData();
                uneasyAlliance.title("Uneasy Alliance");
                uneasyAlliance.body("§7 Category\n§r Nether\n\n§7 Description\n§r Rescue a Ghast from the Nether, bring it safely home to the Overworld... and then kill it\n\n§e Reward\n§r 100 experience\n\n§e Type\n§5 Challenge\n\n");
                uneasyAlliance.button("Close");
                uneasyAlliance.show(event.source).then(r => {
                  if (r.canceled) return;

                  let uneasyAlliance_response = r.selection;
                  switch (uneasyAlliance_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 6:
                let warPigs = new ActionFormData();
                warPigs.title("War Pigs");
                warPigs.body("§7 Category\n§r Nether\n\n§7 Description\n§r Retrieve a Netherite Upgrade Smithing Template from a Bastion Remnant\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                warPigs.button("Close");
                warPigs.show(event.source).then(r => {
                  if (r.canceled) return;

                  let warPigs_response = r.selection;
                  switch (warPigs_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 7:
                let countryLode = new ActionFormData();
                countryLode.title("Country Lode, Take Me Home");
                countryLode.body("§7 Category\n§r Nether\n\n§7 Description\n§r Use a Compass on a Lodestone\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                countryLode.button("Close");
                countryLode.show(event.source).then(r => {
                  if (r.canceled) return;

                  let countryLode_response = r.selection;
                  switch (countryLode_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 8:
                let coverDebris = new ActionFormData();
                coverDebris.title("Cover Me in Debris");
                coverDebris.body("§7 Category\n§r Nether\n\n§7 Description\n§r Get a full suit of Netherite Armour\n\n§e Reward\n§r 100 experience\n\n§e Type\n§5 Challenge\n\n");
                coverDebris.button("Close");
                coverDebris.show(event.source).then(r => {
                  if (r.canceled) return;

                  let coverDebris_response = r.selection;
                  switch (coverDebris_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 9:
                let spookySkeleton = new ActionFormData();
                spookySkeleton.title("Spooky Scary Skeleton");
                spookySkeleton.body("§7 Category\n§r Nether\n\n§7 Description\n§r Obtain a Wither Skeleton's skull\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                spookySkeleton.button("Close");
                spookySkeleton.show(event.source).then(r => {
                  if (r.canceled) return;

                  let spookySkeleton_response = r.selection;
                  switch (spookySkeleton_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 10:
                let intoFire = new ActionFormData();
                intoFire.title("Into Fire");
                intoFire.body("§7 Category\n§r Nether\n\n§7 Description\n§r Relieve a Blaze of its rod\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                intoFire.button("Close");
                intoFire.show(event.source).then(r => {
                  if (r.canceled) return;

                  let intoFire_response = r.selection;
                  switch (intoFire_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 11:
                let notNine = new ActionFormData();
                notNine.title("Not Quite \"Nine\" Lives");
                notNine.body("§7 Category\n§r Nether\n\n§7 Description\n§r Construct a Respawn Anchor\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                notNine.button("Close");
                notNine.show(event.source).then(r => {
                  if (r.canceled) return;

                  let notNine_response = r.selection;
                  switch (notNine_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 12:
                let likeHome = new ActionFormData();
                likeHome.title("Feels like Home");
                likeHome.body("§7 Category\n§r Nether\n\n§7 Description\n§r Take a Strider for a ride on lava in the Overworld\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                likeHome.button("Close");
                likeHome.show(event.source).then(r => {
                  if (r.canceled) return;

                  let likeHome_response = r.selection;
                  switch (likeHome_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 13:
                let hotTourist = new ActionFormData();
                hotTourist.title("Hot Tourist Destinations");
                hotTourist.body("§7 Category\n§r Nether\n\n§7 Description\n§r Explore all Nether Biomes\n\n§e Reward\n§r 500 experience\n\n§e Type\n§5 Challenge\n\n");
                hotTourist.button("Close");
                hotTourist.show(event.source).then(r => {
                  if (r.canceled) return;

                  let hotTourist_response = r.selection;
                  switch (hotTourist_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 14:
                let witheringHeights = new ActionFormData();
                witheringHeights.title("Withering Heights");
                witheringHeights.body("§7 Category\n§r Nether\n\n§7 Description\n§r Summon the Wither\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                witheringHeights.button("Close");
                witheringHeights.show(event.source).then(r => {
                  if (r.canceled) return;

                  let witheringHeights_response = r.selection;
                  switch (witheringHeights_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 15:
                let localBrewery = new ActionFormData();
                localBrewery.title("Local Brewery");
                localBrewery.body("§7 Category\n§r Nether\n\n§7 Description\n§r Obtain a Brewing Stand\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                localBrewery.button("Close");
                localBrewery.show(event.source).then(r => {
                  if (r.canceled) return;

                  let localBrewery_response = r.selection;
                  switch (localBrewery_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 16:
                let bringBeacon = new ActionFormData();
                bringBeacon.title("Bring Home the Beacon");
                bringBeacon.body("§7 Category\n§r Nether\n\n§7 Description\n§r Construct a Beacon\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                bringBeacon.button("Close");
                bringBeacon.show(event.source).then(r => {
                  if (r.canceled) return;

                  let bringBeacon_response = r.selection;
                  switch (bringBeacon_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 17:
                let furiousCocktail = new ActionFormData();
                furiousCocktail.title("A Furious Cocktail");
                furiousCocktail.body("§7 Category\n§r Nether\n\n§7 Description\n§r Have every potion effect applied at the same time\n\n§e Reward\n§r 100 experience\n\n§e Type\n§5 Challenge\n\n");
                furiousCocktail.button("Close");
                furiousCocktail.show(event.source).then(r => {
                  if (r.canceled) return;

                  let furiousCocktail_response = r.selection;
                  switch (furiousCocktail_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 18:
                let howHere = new ActionFormData();

                if (event.source.hasTag('HowHere')) {
                  howHere.title("How Did We Get Here?");
                  howHere.body("§7 Category\n§r Nether\n\n§7 Description\n§r Have every effect applied at the same time\n\n§e Reward\n§r 1000 experience\n\n§e Type\n§5 Challenge\n\n");
                  howHere.button("Close");
                } else {
                  howHere.title("???");
                  howHere.body("§7 Category\n§r Nether\n\n§7 Description\n§r This advancement is a secret, its info is only revealed after completion.\n");
                  howHere.button("Close");
                }

                howHere.show(event.source).then(r => {
                  if (r.canceled) return;

                  let howHere_response = r.selection;
                  switch (howHere_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              default:
                return;
            }
          }).catch(e => {
            console.error(e, e.stack);
          });
          break;
        case 2:
          end.show(event.source).then(r => {
            if (r.canceled) return;

            let end_response = r.selection;
            switch (end_response) {
              case 0:
                let freeEnd = new ActionFormData();
                freeEnd.title("Free the End");
                freeEnd.body("§7 Category\n§r The End\n\n§7 Description\n§r Good luck\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                freeEnd.button("Close");
                freeEnd.show(event.source).then(r => {
                  if (r.canceled) return;

                  let freeEnd_response = r.selection;
                  switch (freeEnd_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 1:
                let nextGeneration = new ActionFormData();
                nextGeneration.title("The Next Generation");
                nextGeneration.body("§7 Category\n§r The End\n\n§7 Description\n§r Hold the Dragon Egg\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                nextGeneration.button("Close");
                nextGeneration.show(event.source).then(r => {
                  if (r.canceled) return;

                  let nextGeneration_response = r.selection;
                  switch (nextGeneration_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 2:
                let remoteGateway = new ActionFormData();
                remoteGateway.title("Remote Gateway");
                remoteGateway.body("§7 Category\n§r The End\n\n§7 Description\n§r Escape the Island\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                remoteGateway.button("Close");
                remoteGateway.show(event.source).then(r => {
                  if (r.canceled) return;

                  let remoteGateway_response = r.selection;
                  switch (remoteGateway_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 3:
                let endAgain = new ActionFormData();
                endAgain.title("The End... Again...");
                endAgain.body("§7 Category\n§r The End\n\n§7 Description\n§r Respawn the Ender Dragon\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                endAgain.button("Close");
                endAgain.show(event.source).then(r => {
                  if (r.canceled) return;

                  let endAgain_response = r.selection;
                  switch (endAgain_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 4:
                let needMint = new ActionFormData();
                needMint.title("You Need a Mint");
                needMint.body("§7 Category\n§r The End\n\n§7 Description\n§r Collect Dragon's Breath in a Glass Bottle\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                needMint.button("Close");
                needMint.show(event.source).then(r => {
                  if (r.canceled) return;

                  let needMint_response = r.selection;
                  switch (needMint_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 5:
                let skyLimit = new ActionFormData();
                skyLimit.title("Sky's the Limit");
                skyLimit.body("§7 Category\n§r The End\n\n§7 Description\n§r Find Elytra\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                skyLimit.button("Close");
                skyLimit.show(event.source).then(r => {
                  if (r.canceled) return;

                  let skyLimit_response = r.selection;
                  switch (skyLimit_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              default:
                return;
            }
          }).catch(e => {
            console.error(e, e.stack);
          });
          break;
        case 3:
          adventure.show(event.source).then(r => {
            if (r.canceled) return;

            let adventure_response = r.selection;
            switch (adventure_response) {
              case 0:
                let monsterHunter = new ActionFormData();
                monsterHunter.title("Monster Hunter");
                monsterHunter.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Kill any Hostile Monster\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                monsterHunter.button("Close");
                monsterHunter.show(event.source).then(r => {
                  if (r.canceled) return;

                  let monsterHunter_response = r.selection;
                  switch (monsterHunter_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 1:
                let takeAim = new ActionFormData();
                takeAim.title("Take Aim");
                takeAim.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Obtain a Bow\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                takeAim.button("Close");
                takeAim.show(event.source).then(r => {
                  if (r.canceled) return;

                  let takeAim_response = r.selection;
                  switch (takeAim_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 2:
                let throwawayJoke = new ActionFormData();
                throwawayJoke.title("A Throwaway Joke");
                throwawayJoke.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Obtain a Trident\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                throwawayJoke.button("Close");
                throwawayJoke.show(event.source).then(r => {
                  if (r.canceled) return;

                  let throwawayJoke_response = r.selection;
                  switch (throwawayJoke_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 3:
                let veryFrightening = new ActionFormData();
                veryFrightening.title("Very Very Frightening");
                veryFrightening.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Strike a Villager with lightning\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                veryFrightening.button("Close");
                veryFrightening.show(event.source).then(r => {
                  if (r.canceled) return;

                  let veryFrightening_response = r.selection;
                  switch (veryFrightening_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 4:
                let monstersHunted = new ActionFormData();
                monstersHunted.title("Monsters Hunted");
                monstersHunted.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Kill one of every hostile monster\n\n§e Reward\n§r 100 experience\n\n§e Type\n§5 Challenge\n\n");
                monstersHunted.button("Close");
                monstersHunted.show(event.source).then(r => {
                  if (r.canceled) return;

                  let monstersHunted_response = r.selection;
                  switch (monstersHunted_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 5:
                let postmortal = new ActionFormData();
                postmortal.title("Postmortal");
                postmortal.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Use a Totem of Undying to cheat death\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                postmortal.button("Close");
                postmortal.show(event.source).then(r => {
                  if (r.canceled) return;

                  let postmortal_response = r.selection;
                  switch (postmortal_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 6:
                let stickySituation = new ActionFormData();
                stickySituation.title("Sticky Situation");
                stickySituation.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Jump into a Honey Block to break your fall\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                stickySituation.button("Close");
                stickySituation.show(event.source).then(r => {
                  if (r.canceled) return;

                  let stickySituation_response = r.selection;
                  switch (stickySituation_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 7:
                let craftLook = new ActionFormData();
                craftLook.title("Crafting a New Look");
                craftLook.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Obtain an Armour Trim Smithing Template\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                craftLook.button("Close");
                craftLook.show(event.source).then(r => {
                  if (r.canceled) return;

                  let craftLook_response = r.selection;
                  switch (craftLook_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 8:
                let smithingStyle = new ActionFormData();
                smithingStyle.title("Smithing with Style");
                smithingStyle.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Carry these smithing templates at once : Spire, Snout, Rib, Ward, Silence, Vex, Tide, Wayfinder\n\n§e Reward\n§r 150 experience\n\n§e Type\n§5 Challenge\n\n");
                smithingStyle.button("Close");
                smithingStyle.show(event.source).then(r => {
                  if (r.canceled) return;

                  let smithingStyle_response = r.selection;
                  switch (smithingStyle_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 9:
                let olBetsy = new ActionFormData();
                olBetsy.title("Ol' Betsy");
                olBetsy.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Obtain a Crossbow\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                olBetsy.button("Close");
                olBetsy.show(event.source).then(r => {
                  if (r.canceled) return;

                  let olBetsy_response = r.selection;
                  switch (olBetsy_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 10:
                let twoBirds = new ActionFormData();
                twoBirds.title("Two Birds, One Arrow");
                twoBirds.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Kill two Phantoms with a piercing Arrow\n\n§e Reward\n§r 65 experience\n\n§e Type\n§5 Challenge\n\n");
                twoBirds.button("Close");
                twoBirds.show(event.source).then(r => {
                  if (r.canceled) return;

                  let twoBirds_response = r.selection;
                  switch (twoBirds_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 11:
                let whoPillager = new ActionFormData();
                whoPillager.title("Who's the Pillager Now?");
                whoPillager.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Give a Pillager a taste of their own medicine\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                whoPillager.button("Close");
                whoPillager.show(event.source).then(r => {
                  if (r.canceled) return;

                  let whoPillager_response = r.selection;
                  switch (whoPillager_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 12:
                let cavesCliffs = new ActionFormData();
                cavesCliffs.title("Caves & Cliffs");
                cavesCliffs.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Free fall from the top of the world (build limit) to the bottom of the world and survive\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                cavesCliffs.button("Close");
                cavesCliffs.show(event.source).then(r => {
                  if (r.canceled) return;

                  let cavesCliffs_response = r.selection;
                  switch (cavesCliffs_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 13:
                let respectingRemnants = new ActionFormData();
                respectingRemnants.title("Respecting the Remnants");
                respectingRemnants.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Use your brush to uncover a Pottery Sherd\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                respectingRemnants.button("Close");
                respectingRemnants.show(event.source).then(r => {
                  if (r.canceled) return;

                  let respectingRemnants_response = r.selection;
                  switch (respectingRemnants_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 14:
                let carefulRestoration = new ActionFormData();
                carefulRestoration.title("Careful Restoration");
                carefulRestoration.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Construct a Decorated Pot\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                carefulRestoration.button("Close");
                carefulRestoration.show(event.source).then(r => {
                  if (r.canceled) return;

                  let carefulRestoration_response = r.selection;
                  switch (carefulRestoration_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 15:
                let sneak100 = new ActionFormData();
                sneak100.title("Sneak 100");
                sneak100.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Sneak past a warden to prevent it sensing you\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                sneak100.button("Close");
                sneak100.show(event.source).then(r => {
                  if (r.canceled) return;

                  let sneak100_response = r.selection;
                  switch (sneak100_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 16:
                let sweetDreams = new ActionFormData();
                sweetDreams.title("Sweet Dreams");
                sweetDreams.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Sleep in a Bed to change your respawn point\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                sweetDreams.button("Close");
                sweetDreams.show(event.source).then(r => {
                  if (r.canceled) return;

                  let sweetDreams_response = r.selection;
                  switch (sweetDreams_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 17:
                let adventuringTime = new ActionFormData();
                adventuringTime.title("Adventuring Time");
                adventuringTime.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Discover every biome\n\n§e Reward\n§r 500 experience\n\n§e Type\n§5 Challenge\n\n");
                adventuringTime.button("Close");
                adventuringTime.show(event.source).then(r => {
                  if (r.canceled) return;

                  let adventuringTime_response = r.selection;
                  switch (adventuringTime_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 18:
                let lightRabbit = new ActionFormData();
                lightRabbit.title("Light as a Rabbit");
                lightRabbit.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Walk on Powder Snow... without sinking in it\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                lightRabbit.button("Close");
                lightRabbit.show(event.source).then(r => {
                  if (r.canceled) return;

                  let lightRabbit_response = r.selection;
                  switch (lightRabbit_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 19:
                let itScute = new ActionFormData();
                itScute.title("Isn't it Scute");
                itScute.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Get Armadillo Scutes from an Armadillo using a Brush\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                itScute.button("Close");
                itScute.show(event.source).then(r => {
                  if (r.canceled) return;

                  let itScute_response = r.selection;
                  switch (itScute_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 20:
                let hiredHelp = new ActionFormData();
                hiredHelp.title("Hired Help");
                hiredHelp.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Summon an Iron Golem to help defend a village\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                hiredHelp.button("Close");
                hiredHelp.show(event.source).then(r => {
                  if (r.canceled) return;

                  let hiredHelp_response = r.selection;
                  switch (hiredHelp_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 21:
                let voluntaryExile = new ActionFormData();

                if (event.source.hasTag('VoluntaryExile')) {
                  voluntaryExile.title("Voluntary Exile");
                  voluntaryExile.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Kill a raid captain. Maybe consider staying away from villages for the time being...\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                  voluntaryExile.button("Close");
                } else {
                  voluntaryExile.title("???");
                  voluntaryExile.body("§7 Category\n§r Adventure\n\n§7 Description\n§r This advancement is a secret, its info is only revealed after completion.\n");
                  voluntaryExile.button("Close");
                }

                voluntaryExile.show(event.source).then(r => {
                  if (r.canceled) return;

                  let voluntaryExile_response = r.selection;
                  switch (voluntaryExile_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 22:
                let VillageHero = new ActionFormData();

                if (event.source.hasTag('HeroVillage')) {
                  VillageHero.title("Hero of the Village");
                  VillageHero.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Defend a Village from a raid \n\n§e Reward\n§r 100 experience\n\n§e Type\n§5 Challenge\n\n");
                  VillageHero.button("Close");
                } else {
                  VillageHero.title("???");
                  VillageHero.body("§7 Category\n§r Adventure\n\n§7 Description\n§r This advancement is a secret, its info is only revealed after completion.\n");
                  VillageHero.button("Close");
                }

                VillageHero.show(event.source).then(r => {
                  if (r.canceled) return;

                  let VillageHero_response = r.selection;
                  switch (VillageHero_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 23:
                let itBird = new ActionFormData();
                itBird.title("Is It a Bird");
                itBird.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Look at a Parrot through a Spyglass\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                itBird.button("Close");
                itBird.show(event.source).then(r => {
                  if (r.canceled) return;

                  let itBird_response = r.selection;
                  switch (itBird_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 24:
                let itBalloon = new ActionFormData();
                itBalloon.title("Is It a Balloon");
                itBalloon.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Look at a Ghast through a Spyglass\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                itBalloon.button("Close");
                itBalloon.show(event.source).then(r => {
                  if (r.canceled) return;

                  let itBalloon_response = r.selection;
                  switch (itBalloon_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 25:
                let itPlane = new ActionFormData();
                itPlane.title("Is It a Plane");
                itPlane.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Look at the Ender Dragon through a Spyglass\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                itPlane.button("Close");
                itPlane.show(event.source).then(r => {
                  if (r.canceled) return;

                  let itPlane_response = r.selection;
                  switch (itPlane_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 26:
                let lockKey = new ActionFormData();
                lockKey.title("Under Lock and Key");
                lockKey.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Use a Trial Key on a Vault\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                lockKey.button("Close");
                lockKey.show(event.source).then(r => {
                  if (r.canceled) return;

                  let lockKey_response = r.selection;
                  switch (lockKey_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 27:
                let revaulting = new ActionFormData();
                revaulting.title("Revaulting");
                revaulting.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Use an Ominous Trial Key on an Ominous Vault\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                revaulting.button("Close");
                revaulting.show(event.source).then(r => {
                  if (r.canceled) return;

                  let revaulting_response = r.selection;
                  switch (revaulting_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 28:
                let needsRockets = new ActionFormData();
                needsRockets.title("Who Needs Rockets?");
                needsRockets.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Use a Wind Charge\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                needsRockets.button("Close");
                needsRockets.show(event.source).then(r => {
                  if (r.canceled) return;

                  let needsRockets_response = r.selection;
                  switch (needsRockets_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 29:
                let blowback = new ActionFormData();
                blowback.title("Blowback");
                blowback.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Kill a Breeze with a deflected Breeze-shot Wind Charge\n\n§e Reward\n§r 40 experience\n\n§e Type\n§5 Challenge\n\n");
                blowback.button("Close");
                blowback.show(event.source).then(r => {
                  if (r.canceled) return;

                  let blowback_response = r.selection;
                  switch (blowback_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
            case 30:
                let overOverkill = new ActionFormData();
                overOverkill.title("Over-Overkill");
                overOverkill.body("§7 Category\n§r Adventure\n\n§7 Description\n§r Deal atleast 50 hearts of damage in a single hit using the Mace\n\n§e Reward\n§r 50 experience\n\n§e Type\n§5 Challenge\n\n");
                overOverkill.button("Close");
                overOverkill.show(event.source).then(r => {
                  if (r.canceled) return;

                  let overOverkill_response = r.selection;
                  switch (overOverkill_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              default:
                return;
            }
          }).catch(e => {
            console.error(e, e.stack);
          });
          break;

          case 4:
          husbandry.show(event.source).then(r => {
            if (r.canceled) return;

            let husbandry_response = r.selection;
            switch (husbandry_response) {
              case 0:
                let bestFriends = new ActionFormData();
                bestFriends.title("Best Friends Forever");
                bestFriends.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Tame an animal\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                bestFriends.button("Close");
                bestFriends.show(event.source).then(r => {
                  if (r.canceled) return;

                  let bestFriends_response = r.selection;
                  switch (bestFriends_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 1:
                let completeCatalogue = new ActionFormData();
                completeCatalogue.title("A Complete Catalogue");
                completeCatalogue.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Tame all Cat variants!\n\n§e Reward\n§r 50 experience\n\n§e Type\n§5 Challenge\n\n");
                completeCatalogue.button("Close");
                 completeCatalogue.show(event.source).then(r => {
                  if (r.canceled) return;

                  let completeCatalogue_response = r.selection;
                  switch (completeCatalogue_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 2:
                let wholePack = new ActionFormData();
                wholePack.title("The Whole Pack");
                wholePack.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Tame one of each Wolf variant\n\n§e Reward\n§r 50 experience\n\n§e Type\n§5 Challenge\n\n");
                wholePack.button("Close");
                wholePack.show(event.source).then(r => {
                  if (r.canceled) return;

                  let wholePack_response = r.selection;
                  switch (wholePack_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 3:
                let floatGoat = new ActionFormData();
                floatGoat.title("Whatever Floats Your Goat!");
                floatGoat.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Get in a Boat and float with a Goat\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                floatGoat.button("Close");
                floatGoat.show(event.source).then(r => {
                  if (r.canceled) return;

                  let floatGoat_response = r.selection;
                  switch (floatGoat_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 4:
                let beeGuest = new ActionFormData();
                beeGuest.title("Bee Our Guest");
                beeGuest.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Collect Honey in a bottle\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                beeGuest.button("Close");
                beeGuest.show(event.source).then(r => {
                  if (r.canceled) return;

                  let beeGuest_response = r.selection;
                  switch (beeGuest_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 5:
                let Beelocation = new ActionFormData();
                Beelocation.title("Total Beelocation");
                Beelocation.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Move a Bee Nest using Silk Touch\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                Beelocation.button("Close");
                Beelocation.show(event.source).then(r => {
                  if (r.canceled) return;

                  let Beelocation_response = r.selection;
                  switch (Beelocation_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 6:
                let waxOn = new ActionFormData();
                waxOn.title("Wax On");
                waxOn.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Apply Honeycomb to a Copper block!\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                waxOn.button("Close");
                waxOn.show(event.source).then(r => {
                  if (r.canceled) return;

                  let waxOn_response = r.selection;
                  switch (waxOn_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 7:
                let waxOff = new ActionFormData();
                waxOff.title("Wax Off");
                waxOff.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Scrape Wax off a Copper block!\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                waxOff.button("Close");
                waxOff.show(event.source).then(r => {
                  if (r.canceled) return;

                  let waxOff_response = r.selection;
                  switch (waxOff_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 8:
                let glowBehold = new ActionFormData();
                glowBehold.title("Glow and Behold!");
                glowBehold.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Make the text of any kind of sign glow\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                glowBehold.button("Close");
                glowBehold.show(event.source).then(r => {
                  if (r.canceled) return;

                  let glowBehold_response = r.selection;
                  switch (glowBehold_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 9:
                let fishyBusiness = new ActionFormData();
                fishyBusiness.title("Fishy Business");
                fishyBusiness.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Reel in a Fishing Rod\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                fishyBusiness.button("Close");
                fishyBusiness.show(event.source).then(r => {
                  if (r.canceled) return;

                  let fishyBusiness_response = r.selection;
                  switch (fishyBusiness_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 10:
                let tacticalFishing = new ActionFormData();
                tacticalFishing.title("Tactical Fishing");
                tacticalFishing.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Catch a Fish... without a Fishing Rod!\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                tacticalFishing.button("Close");
                tacticalFishing.show(event.source).then(r => {
                  if (r.canceled) return;

                  let tacticalFishing_response = r.selection;
                  switch (tacticalFishing_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 11:
                let cutestPredator = new ActionFormData();
                cutestPredator.title("The Cutest Predator");
                cutestPredator.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Catch an Axolotl in a Bucket\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                cutestPredator.button("Close");
                cutestPredator.show(event.source).then(r => {
                  if (r.canceled) return;

                  let cutestPredator_response = r.selection;
                  switch (cutestPredator_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 12:
                let bukkitBukkit = new ActionFormData();
                bukkitBukkit.title("Bukkit Bukkit");
                bukkitBukkit.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Catch an Tadpole in a Bucket\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                bukkitBukkit.button("Close");
                bukkitBukkit.show(event.source).then(r => {
                  if (r.canceled) return;

                  let bukkitBukkit_response = r.selection;
                  switch (bukkitBukkit_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 13:
                let powersCombined = new ActionFormData();
                powersCombined.title("With Our Powers Combined!");
                powersCombined.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Have all Froglights in your inventory\n\n§e Reward\n§r None\n\n§e Type\n§5 Challenge\n\n");
                powersCombined.button("Close");
                powersCombined.show(event.source).then(r => {
                  if (r.canceled) return;

                  let powersCombined_response = r.selection;
                  switch (powersCombined_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 14:
                let goodNew = new ActionFormData();
                goodNew.title("Good as New");
                goodNew.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Repair a damaged Wolf Armour using Armadillo Scutes\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                goodNew.button("Close");
                goodNew.show(event.source).then(r => {
                  if (r.canceled) return;

                  let goodNew_response = r.selection;
                  switch (goodNew_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 15:
                let shearBrilliance = new ActionFormData();
                shearBrilliance.title("Shear Brilliance");
                shearBrilliance.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Remove Wolf Armour from a Wolf using Shears\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                shearBrilliance.button("Close");
                shearBrilliance.show(event.source).then(r => {
                  if (r.canceled) return;

                  let shearBrilliance_response = r.selection;
                  switch (shearBrilliance_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 16:
                let seedyPlace = new ActionFormData();
                seedyPlace.title("A Seedy Place");
                seedyPlace.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Plant a seed and watch it grow\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                seedyPlace.button("Close");
                seedyPlace.show(event.source).then(r => {
                  if (r.canceled) return;

                  let seedyPlace_response = r.selection;
                  switch (seedyPlace_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 17:
                let balancedDiet = new ActionFormData();
                balancedDiet.title("A Balanced Diet");
                balancedDiet.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Eat everything that is edible (except Cake), even if it's not good for you\n\n§e Reward\n§r 100 Experience\n\n§e Type\n§5 Challenge\n\n");
                balancedDiet.button("Close");
                balancedDiet.show(event.source).then(r => {
                  if (r.canceled) return;

                  let balancedDiet_response = r.selection;
                  switch (balancedDiet_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 18:
                let seriousDedication = new ActionFormData();
                seriousDedication.title("Serious Dedication");
                seriousDedication.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Use a Netherite Ingot to upgrade a Hoe, and then reevaluate your life choices\n\n§e Reward\n§r 100 Experience\n\n§e Type\n§5 Challenge\n\n");
                seriousDedication.button("Close");
                seriousDedication.show(event.source).then(r => {
                  if (r.canceled) return;

                  let seriousDedication_response = r.selection;
                  switch (seriousDedication_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 19:
                let friendMe = new ActionFormData();

                if (event.source.hasTag('FriendMe')) {
                  friendMe.title("You've Got a Friend in Me");
                  friendMe.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Exchange items with an Allay\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                  friendMe.button("Close");
                } else {
                  friendMe.title("???");
                  friendMe.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r This advancement is a secret, its info is only revealed after completion.\n");
                  friendMe.button("Close");
                }

                friendMe.show(event.source).then(r => {
                  if (r.canceled) return;

                  let friendMe_response = r.selection;
                  switch (friendMe_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 20:
                let smellsInteresting = new ActionFormData();

                if (event.source.hasTag('SmellsInteresting')) {
                  smellsInteresting.title("Smells Interesting");
                  smellsInteresting.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Obtain a Sniffer Egg\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                  smellsInteresting.button("Close");
                } else {
                  smellsInteresting.title("???");
                  smellsInteresting.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r This advancement is a secret, its info is only revealed after completion.\n");
                  smellsInteresting.button("Close");
                }

                smellsInteresting.show(event.source).then(r => {
                  if (r.canceled) return;

                  let smellsInteresting_response = r.selection;
                  switch (smellsInteresting_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 21:
                let plantingPast = new ActionFormData();

                if (event.source.hasTag('PlantingPast')) {
                  plantingPast.title("Planting the Past");
                  plantingPast.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r Plant any Sniffer seed\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                  plantingPast.button("Close");
                } else {
                  plantingPast.title("???");
                  plantingPast.body("§7 Category\n§r Husbandry\n\n§7 Description\n§r This advancement is a secret, its info is only revealed after completion.\n");
                  plantingPast.button("Close");
                }

                plantingPast.show(event.source).then(r => {
                  if (r.canceled) return;

                  let plantingPast_response = r.selection;
                  switch (plantingPast_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              default:
                return;
            }
          }).catch(e => {
            console.error(e, e.stack);
          });
          break;

          case 5:
          achievements.show(event.source).then(r => {
            if (r.canceled) return;

            let achievements_response = r.selection;
            switch (achievements_response) {

              case 0:
                let magicHappens = new ActionFormData();
                magicHappens.title("Where the Magic Happens");
                magicHappens.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Obtain the fabled Book of Advancements\n\n§e Reward\n§r 50 Experience\n\n§e Type\n§5 Challenge\n\n");
                magicHappens.button("Close");
                magicHappens.show(event.source).then(r => {
                  if (r.canceled) return;

                  let magicHappens_response = r.selection;
                  switch (magicHappens_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 1:
                let runLife = new ActionFormData();
                runLife.title("Run for Your Life!!!");
                runLife.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Awaken the Warden... and then RUN!\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                runLife.button("Close");
                runLife.show(event.source).then(r => {
                  if (r.canceled) return;

                  let runLife_response = r.selection;
                  switch (runLife_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 2:
                let backCame = new ActionFormData();
                backCame.title("Back from Whence You Came!");
                backCame.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Defeat the Warden\n\n§e Reward\n§r 250 Experience\n\n§e Type\n§5 Challenge\n\n");
                backCame.button("Close");
                backCame.show(event.source).then(r => {
                  if (r.canceled) return;

                  let backCame_response = r.selection;
                  switch (backCame_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 3:
                let wildWorld = new ActionFormData();
                wildWorld.title("A Wild World");
                wildWorld.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Hold all unique saplings at once\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                wildWorld.button("Close");
                wildWorld.show(event.source).then(r => {
                  if (r.canceled) return;

                  let wildWorld_response = r.selection;
                  switch (wildWorld_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 4:
                let fruitLoom = new ActionFormData();
                fruitLoom.title("Fruit on the Loom");
                fruitLoom.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Create the \'Thing\' Banner Pattern using an Enchanted Apple\n\n§e Reward\n§r None\n\n§e Type\n§e Goal\n\n");
                fruitLoom.button("Close");
                fruitLoom.show(event.source).then(r => {
                  if (r.canceled) return;

                  let fruitLoom_response = r.selection;
                  switch (fruitLoom_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 5:
                let deepEnd = new ActionFormData();
                deepEnd.title("The Deep End");
                deepEnd.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Defeat an Elder Guardian\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                deepEnd.button("Close");
                deepEnd.show(event.source).then(r => {
                  if (r.canceled) return;

                  let deepEnd_response = r.selection;
                  switch (deepEnd_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 6:
                let recordBreaker = new ActionFormData();
                recordBreaker.title("Record Breaker");
                recordBreaker.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Take a listen to Disc 11\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                recordBreaker.button("Close");
                recordBreaker.show(event.source).then(r => {
                  if (r.canceled) return;

                  let recordBreaker_response = r.selection;
                  switch (recordBreaker_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 7:
                let gardenAwakens = new ActionFormData();
                gardenAwakens.title("Record Breaker");
                gardenAwakens.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Enter a Pale Garden and beware what lurks inside\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                gardenAwakens.button("Close");
                gardenAwakens.show(event.source).then(r => {
                  if (r.canceled) return;

                  let gardenAwakens_response = r.selection;
                  switch (gardenAwakens_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

            case 8:
                let itTree = new ActionFormData();
                itTree.title("Is It a... Tree?");
                itTree.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Look at a Creaking through a Spyglass... and maybe dont look away after\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                itTree.button("Close");
                itTree.show(event.source).then(r => {
                  if (r.canceled) return;

                  let itTree_response = r.selection;
                  switch (itTree_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              case 9:
                let timber = new ActionFormData();
                timber.title("Timber!!!");
                timber.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Destroy a natural Creaking Heart\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                timber.button("Close");
                timber.show(event.source).then(r => {
                  if (r.canceled) return;

                  let timber_response = r.selection;
                  switch (timber_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 10:
                let pureHeart = new ActionFormData();
                pureHeart.title("Pure of Heart");
                pureHeart.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Collect the resin of a Creaking Heart\n\n§e Reward\n§r None\n\n§e Type\n§a Advancement\n\n");
                pureHeart.button("Close");
                pureHeart.show(event.source).then(r => {
                  if (r.canceled) return;

                  let pureHeart_response = r.selection;
                  switch (pureHeart_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;
              case 11:
                let speakTrees = new ActionFormData();
                speakTrees.title("I Speak for the Trees");
                backCame.body("§7 Category\n§r Achievements\n\n§7 Description\n§r Obtain a Creaking Heart\n\n§e Reward\n§r 50 Experience\n\n§e Type\n§5 Challenge\n\n");
                speakTrees.button("Close");
                speakTrees.show(event.source).then(r => {
                  if (r.canceled) return;

                  let speakTrees_response = r.selection;
                  switch (speakTrees_response) {
                    default:
                      return;
                  }
                }).catch(e => {
                  console.error(e, e.stack);
                });
                break;

              default:
                return;
            }
          }).catch(e => {
            console.error(e, e.stack);
          });
          break;
        default:
          return;
      }
    }).catch(e => {
      console.error(e, e.stack);
    });
  };
});