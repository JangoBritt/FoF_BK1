tellraw @s {"rawtext":[{"text":"§eProgress :"}]}




scoreboard objectives add AdvancementCount dummy
scoreboard players add @a AdvancementCount 0

tellraw @s[scores={AdvancementCount=1..}] {"rawtext":[{"text":"§sCompleted : §e"},{"score":{"name":"*","objective":"AdvancementCount"}},{"text":"/92 §sAdvancements\n"}]}

tellraw @s[scores={AdvancementCount=!1..}] {"rawtext":[{"text":"§cNo Advancements Completed Yet..\n"}]}




tellraw @s {"rawtext":[{"text":"\n\n§eMinecraft :"}]}
tellraw @s {"rawtext":[{"text":"§o§7The heart and story of the game"}]}
tellraw @s {"rawtext":[{"text":"\n"}]}

tellraw @s[tag=StoneAge] {"rawtext":[{"text":"§aStone Age"}]}
tellraw @s[tag=!StoneAge] {"rawtext":[{"text":"§cStone Age"}]}
tellraw @s[tag=GettingUpgrade] {"rawtext":[{"text":"§aGetting an Upgrade"}]}
tellraw @s[tag=!GettingUpgrade] {"rawtext":[{"text":"§cGetting an Upgrade"}]}
tellraw @s[tag=AcquireHardware] {"rawtext":[{"text":"§aAcquire Hardware"}]}
tellraw @s[tag=!AcquireHardware] {"rawtext":[{"text":"§cAcquire Hardware"}]}
tellraw @s[tag=SuitUp] {"rawtext":[{"text":"§aSuit Up"}]}
tellraw @s[tag=!SuitUp] {"rawtext":[{"text":"§cSuit Up"}]}
tellraw @s[tag=HotStuff] {"rawtext":[{"text":"§aHot Stuff"}]}
tellraw @s[tag=!HotStuff] {"rawtext":[{"text":"§cHot Stuff"}]}
tellraw @s[tag=IronPick] {"rawtext":[{"text":"§aIsn't it Iron Pick"}]}
tellraw @s[tag=!IronPick] {"rawtext":[{"text":"§cIsn't it Iron Pick"}]}
tellraw @s[tag=NotToday] {"rawtext":[{"text":"§aNot Today, Thank You"}]}
tellraw @s[tag=!NotToday] {"rawtext":[{"text":"§cNot Today, Thank You"}]}
tellraw @s[tag=IceBucket] {"rawtext":[{"text":"§aIce Bucket Challenge"}]}
tellraw @s[tag=!IceBucket] {"rawtext":[{"text":"§cIce Bucket Challenge"}]}
tellraw @s[tag=Diamonds] {"rawtext":[{"text":"§aDiamonds!"}]}
tellraw @s[tag=!Diamonds] {"rawtext":[{"text":"§cDiamonds!"}]}
tellraw @s[tag=EnterNether] {"rawtext":[{"text":"§aWe Need to Go Deeper"}]}
tellraw @s[tag=!EnterNether] {"rawtext":[{"text":"§cWe Need to Go Deeper"}]}
tellraw @s[tag=CoverDiamonds] {"rawtext":[{"text":"§aCover Me with Diamonds"}]}
tellraw @s[tag=!CoverDiamonds] {"rawtext":[{"text":"§cCover Me with Diamonds"}]}
tellraw @s[tag=Enchanter] {"rawtext":[{"text":"§aEnchanted"}]}
tellraw @s[tag=!Enchanter] {"rawtext":[{"text":"§cEnchanter"}]}
tellraw @s[tag=ZombieDoctor] {"rawtext":[{"text":"§aZombie Doctor"}]}
tellraw @s[tag=!ZombieDoctor] {"rawtext":[{"text":"§cZombie Doctor"}]}
tellraw @s[tag=EyeSpy] {"rawtext":[{"text":"§aEye Spy"}]}
tellraw @s[tag=!EyeSpy] {"rawtext":[{"text":"§cEye Spy"}]}
tellraw @s[tag=TheEnd] {"rawtext":[{"text":"§aThe End?"}]}
tellraw @s[tag=!TheEnd] {"rawtext":[{"text":"§cThe End?"}]}



tellraw @s {"rawtext":[{"text":"\n\n§eNether :"}]}
tellraw @s {"rawtext":[{"text":"§o§7Bring summer clothes"}]}
tellraw @s {"rawtext":[{"text":"\n"}]}

tellraw @s[tag=ReturnSender] {"rawtext":[{"text":"§5Return to Sender"}]}
tellraw @s[tag=!ReturnSender] {"rawtext":[{"text":"§cReturn to Sender"}]}
tellraw @s[tag=HiddenDepths] {"rawtext":[{"text":"§aHidden in the Depths"}]}
tellraw @s[tag=!HiddenDepths] {"rawtext":[{"text":"§cHidden in the Depths"}]}
tellraw @s[tag=CuttingOnions] {"rawtext":[{"text":"§aWho is Cutting Onions?"}]}
tellraw @s[tag=!CuttingOnions] {"rawtext":[{"text":"§cWho is Cutting Onions"}]}
tellraw @s[tag=OhShiny] {"rawtext":[{"text":"§aOh Shiny"}]}
tellraw @s[tag=!OhShiny] {"rawtext":[{"text":"§cOh Shiny"}]}
tellraw @s[tag=BoatLegs] {"rawtext":[{"text":"§aThis Boat has Legs"}]}
tellraw @s[tag=!BoatLegs] {"rawtext":[{"text":"§cThis Boat has Legs"}]}
tellraw @s[tag=UneasyAlliance] {"rawtext":[{"text":"§5Uneasy Alliance"}]}
tellraw @s[tag=!UneasyAlliance] {"rawtext":[{"text":"§cUneasy Alliance"}]}
tellraw @s[tag=WarPigs] {"rawtext":[{"text":"§aWar Pigs"}]}
tellraw @s[tag=!WarPigs] {"rawtext":[{"text":"§cWar Pigs"}]}
tellraw @s[tag=CountryLode] {"rawtext":[{"text":"§aCountry Lode, Take Me Home"}]}
tellraw @s[tag=!CountryLode] {"rawtext":[{"text":"§cCountry Lode, Take Me Home"}]}
tellraw @s[tag=CoverDebris] {"rawtext":[{"text":"§5Cover Me in Debris"}]}
tellraw @s[tag=!CoverDebris] {"rawtext":[{"text":"§cCover Me in Debris"}]}
tellraw @s[tag=SpookySkeleton] {"rawtext":[{"text":"§aSpooky Scary Skeleton"}]}
tellraw @s[tag=!SpookySkeleton] {"rawtext":[{"text":"§cSpooky Scary Skeleton"}]}
tellraw @s[tag=IntoFire] {"rawtext":[{"text":"§aInto Fire"}]}
tellraw @s[tag=!IntoFire] {"rawtext":[{"text":"§cInto Fire"}]}
tellraw @s[tag=NotNine] {"rawtext":[{"text":"§aNot Quite \"Nine\" Lives"}]}
tellraw @s[tag=!NotNine] {"rawtext":[{"text":"§cNot Quite \"Nine\" Lives"}]}
tellraw @s[tag=LikeHome] {"rawtext":[{"text":"§aFeels Like Home"}]}
tellraw @s[tag=!LikeHome] {"rawtext":[{"text":"§cFeels Like Home"}]}
tellraw @s[tag=HotTourist] {"rawtext":[{"text":"§5Hot Tourist Destinations"}]}
tellraw @s[tag=!HotTourist] {"rawtext":[{"text":"§cHot Tourist Destinations"}]}
tellraw @s[tag=WitheringHeights] {"rawtext":[{"text":"§aWithering Heights"}]}
tellraw @s[tag=!WitheringHeights] {"rawtext":[{"text":"§cWithering Heights"}]}
tellraw @s[tag=LocalBrewery] {"rawtext":[{"text":"§aLocal Brewery"}]}
tellraw @s[tag=!LocalBrewery] {"rawtext":[{"text":"§cLocal Brewery"}]}
tellraw @s[tag=BringBeacon] {"rawtext":[{"text":"§aBring Home the Beacon"}]}
tellraw @s[tag=!BringBeacon] {"rawtext":[{"text":"§cBring Home the Beacon"}]}
tellraw @s[tag=FuriousCocktail] {"rawtext":[{"text":"§5A Furious Cocktail"}]}
tellraw @s[tag=!FuriousCocktail] {"rawtext":[{"text":"§cA Furious Cocktail"}]}
tellraw @s[tag=HowHere] {"rawtext":[{"text":"§5How Did We Get Here?"}]}
tellraw @s[tag=!HowHere] {"rawtext":[{"text":"§m[Hidden]"}]}



tellraw @s {"rawtext":[{"text":"\n\n§eThe End? :"}]}
tellraw @s {"rawtext":[{"text":"§o§7Or the beginning?"}]}
tellraw @s {"rawtext":[{"text":"\n"}]}

tellraw @s[tag=FreeEnd] {"rawtext":[{"text":"§aFree The End"}]}
tellraw @s[tag=!FreeEnd] {"rawtext":[{"text":"§cFree The End"}]}
tellraw @s[tag=NextGeneration] {"rawtext":[{"text":"§aThe Next Generation"}]}
tellraw @s[tag=!NextGeneration] {"rawtext":[{"text":"§cThe Next Generation"}]}
tellraw @s[tag=RemoteGateway] {"rawtext":[{"text":"§aRemote Gateway"}]}
tellraw @s[tag=!RemoteGateway] {"rawtext":[{"text":"§cRemote Gateway"}]}
tellraw @s[tag=EndAgain] {"rawtext":[{"text":"§aThe End... Again..."}]}
tellraw @s[tag=!EndAgain] {"rawtext":[{"text":"§cThe End... Again..."}]}
tellraw @s[tag=NeedMint] {"rawtext":[{"text":"§aYou Need a Mint"}]}
tellraw @s[tag=!NeedMint] {"rawtext":[{"text":"§cYou Need a Mint"}]}
tellraw @s[tag=SkyLimit] {"rawtext":[{"text":"§aSky's the Limit"}]}
tellraw @s[tag=!SkyLimit] {"rawtext":[{"text":"§cSky's the Limit"}]}



tellraw @s {"rawtext":[{"text":"\n\n§eAdventure :"}]}
tellraw @s {"rawtext":[{"text":"§o§7Adventure, exploration, and combat"}]}
tellraw @s {"rawtext":[{"text":"\n"}]}

tellraw @s[tag=VoluntaryExile] {"rawtext":[{"text":"§aVoluntaryExile"}]}
tellraw @s[tag=!VoluntaryExile] {"rawtext":[{"text":"§m[Hidden]"}]}
tellraw @s[tag=MonsterHunter] {"rawtext":[{"text":"§aMonster Hunter"}]}
tellraw @s[tag=!MonsterHunter] {"rawtext":[{"text":"§cMonster Hunter"}]}
tellraw @s[tag=CraftLook] {"rawtext":[{"text":"§aCrafting a New Look"}]}
tellraw @s[tag=!CraftLook] {"rawtext":[{"text":"§cCrafting a New Look"}]}
tellraw @s[tag=StickySituation] {"rawtext":[{"text":"§aSticky Situation"}]}
tellraw @s[tag=!StickySituation] {"rawtext":[{"text":"§cSticky Situation"}]}
tellraw @s[tag=OlBetsy] {"rawtext":[{"text":"§aOl' Betsy"}]}
tellraw @s[tag=!OlBetsy] {"rawtext":[{"text":"§cOl' Betsy"}]}
tellraw @s[tag=CavesCliffs] {"rawtext":[{"text":"§aCaves & Cliffs"}]}
tellraw @s[tag=!CavesCliffs] {"rawtext":[{"text":"§cCaves & Cliffs"}]}
tellraw @s[tag=RespectingRemnants] {"rawtext":[{"text":"§aRespecting the Remnants"}]}
tellraw @s[tag=!RespectingRemnants] {"rawtext":[{"text":"§cRespecting the Remnants"}]}
tellraw @s[tag=Sneak100] {"rawtext":[{"text":"§aSneak 100"}]}
tellraw @s[tag=!Sneak100] {"rawtext":[{"text":"§cSneak 100"}]}
tellraw @s[tag=SweetDreams] {"rawtext":[{"text":"§aSweet Dreams"}]}
tellraw @s[tag=!SweetDreams] {"rawtext":[{"text":"§cSweet Dreams"}]}
tellraw @s[tag=HeroVillage] {"rawtext":[{"text":"§5Hero of the Village"}]}
tellraw @s[tag=!HeroVillage] {"rawtext":[{"text":"§m[Hidden]"}]}
tellraw @s[tag=ThrowawayJoke] {"rawtext":[{"text":"§aA Throwaway Joke"}]}
tellraw @s[tag=!ThrowawayJoke] {"rawtext":[{"text":"§cA Throwaway Joke"}]}
tellraw @s[tag=TakeAim] {"rawtext":[{"text":"§aTake Aim"}]}
tellraw @s[tag=!TakeAim] {"rawtext":[{"text":"§cTake Aim"}]}
tellraw @s[tag=MonstersHunted] {"rawtext":[{"text":"§5Monsters Hunted"}]}
tellraw @s[tag=!MonstersHunted] {"rawtext":[{"text":"§cMonsters Hunted"}]}
tellraw @s[tag=Postmortal] {"rawtext":[{"text":"§aPostmortal"}]}
tellraw @s[tag=!Postmortal] {"rawtext":[{"text":"§cPostmortal"}]}
tellraw @s[tag=HiredHelp] {"rawtext":[{"text":"§aHired Help"}]}
tellraw @s[tag=!HiredHelp] {"rawtext":[{"text":"§cHired Help"}]}
tellraw @s[tag=SmithingStyle] {"rawtext":[{"text":"§5Smithing with Style"}]}
tellraw @s[tag=!SmithingStyle] {"rawtext":[{"text":"§cSmithing with Style"}]}
tellraw @s[tag=TwoBirds] {"rawtext":[{"text":"§5Two Birds, One Arrow"}]}
tellraw @s[tag=!TwoBirds] {"rawtext":[{"text":"§cTwo Birds, One Arrow"}]}
tellraw @s[tag=WhoPillager] {"rawtext":[{"text":"§aWho's the Pillager Now?"}]}
tellraw @s[tag=!WhoPillager] {"rawtext":[{"text":"§cWho's the Pillager Now?"}]}
tellraw @s[tag=CarefulRestoration] {"rawtext":[{"text":"§aCareful Restoration"}]}
tellraw @s[tag=!CarefulRestoration] {"rawtext":[{"text":"§cCareful Restoration"}]}
tellraw @s[tag=AdventuringTime] {"rawtext":[{"text":"§5Adventuring Time"}]}
tellraw @s[tag=!AdventuringTime] {"rawtext":[{"text":"§cAdventuring Time"}]}
tellraw @s[tag=LightRabbit] {"rawtext":[{"text":"§aLight as a Rabbit"}]}
tellraw @s[tag=!LightRabbit] {"rawtext":[{"text":"§cLight as a Rabbit"}]}
tellraw @s[tag=VeryFrightening] {"rawtext":[{"text":"§aVery Very Frightening"}]}
tellraw @s[tag=!VeryFrightening] {"rawtext":[{"text":"§cVery Very Frightening"}]}




tellraw @s {"rawtext":[{"text":"\n\n§eHusbandry :"}]}
tellraw @s {"rawtext":[{"text":"§o§7The world is full of friends and food"}]}
tellraw @s {"rawtext":[{"text":"\n"}]}

tellraw @s[tag=BeeGuest] {"rawtext":[{"text":"§aBee Our Guest"}]}
tellraw @s[tag=!BeeGuest] {"rawtext":[{"text":"§cBee Our Guest"}]}
tellraw @s[tag=FriendMe] {"rawtext":[{"text":"§aYou've Got a Friend in Me"}]}
tellraw @s[tag=!FriendMe] {"rawtext":[{"text":"§m[Hidden]"}]}
tellraw @s[tag=FloatGoat] {"rawtext":[{"text":"§aWhatever Floats Your Goat!"}]}
tellraw @s[tag=!FloatGoat] {"rawtext":[{"text":"§cWhatever Floats Your Goat!"}]}
tellraw @s[tag=BestFriends] {"rawtext":[{"text":"§aBest Friends Forever"}]}
tellraw @s[tag=!BestFriends] {"rawtext":[{"text":"§cBest Friends Forever"}]}
tellraw @s[tag=GlowBehold] {"rawtext":[{"text":"§aGlow and Behold!"}]}
tellraw @s[tag=!GlowBehold] {"rawtext":[{"text":"§cGlow and Behold!"}]}
tellraw @s[tag=FishyBusiness] {"rawtext":[{"text":"§aFishy Business"}]}
tellraw @s[tag=!FishyBusiness] {"rawtext":[{"text":"§cFishy Business"}]}
tellraw @s[tag=TotalBeelocation] {"rawtext":[{"text":"§aTotal Beelocation"}]}
tellraw @s[tag=!TotalBeelocation] {"rawtext":[{"text":"§cTotal Beelocation"}]}
tellraw @s[tag=BukkitBukkit] {"rawtext":[{"text":"§aBukkit Bukkit"}]}
tellraw @s[tag=!BukkitBukkit] {"rawtext":[{"text":"§cBukkit Bukkit"}]}
tellraw @s[tag=SmellsInteresting] {"rawtext":[{"text":"§aSmells Interesting"}]}
tellraw @s[tag=!SmellsInteresting] {"rawtext":[{"text":"§m[Hidden]"}]}
tellraw @s[tag=SeedyPlace] {"rawtext":[{"text":"§aA Seedy Place"}]}
tellraw @s[tag=!SeedyPlace] {"rawtext":[{"text":"§cA Seedy Place"}]}
tellraw @s[tag=CompleteCatalogue] {"rawtext":[{"text":"§5A Complete Catalogue"}]}
tellraw @s[tag=!CompleteCatalogue] {"rawtext":[{"text":"§cA Complete Catalogue"}]}
tellraw @s[tag=TacticalFishing] {"rawtext":[{"text":"§aTactical Fishing"}]}
tellraw @s[tag=!TacticalFishing] {"rawtext":[{"text":"§cTactical Fishing"}]}
tellraw @s[tag=BalancedDiet] {"rawtext":[{"text":"§5A Balanced Diet"}]}
tellraw @s[tag=!BalancedDiet] {"rawtext":[{"text":"§cA Balanced Diet"}]}
tellraw @s[tag=SeriousDedication] {"rawtext":[{"text":"§5Serious Dedication"}]}
tellraw @s[tag=!SeriousDedication] {"rawtext":[{"text":"§cSerious Dedication"}]}
tellraw @s[tag=CutestPredator] {"rawtext":[{"text":"§aThe Cutest Predator"}]}
tellraw @s[tag=!CutestPredator] {"rawtext":[{"text":"§cThe Cutest Predator"}]}
tellraw @s[tag=PowersCombined] {"rawtext":[{"text":"§aWith Our Powers Combined!"}]}
tellraw @s[tag=!PowersCombined] {"rawtext":[{"text":"§cWith Our Powers Combined!"}]}
tellraw @s[tag=PlantingPast] {"rawtext":[{"text":"§aPlanting the Past"}]}
tellraw @s[tag=!PlantingPast] {"rawtext":[{"text":"§m[Hidden]"}]}




tellraw @s {"rawtext":[{"text":"\n\n§eAchievements :"}]}
tellraw @s {"rawtext":[{"text":"§o§7Extra challenges, not found within the original Java Advancements"}]}
tellraw @s {"rawtext":[{"text":"\n"}]}

tellraw @s[tag=MagicHappens] {"rawtext":[{"text":"§5Where the Magic Happens"}]}
tellraw @s[tag=!MagicHappens] {"rawtext":[{"text":"§cWhere the Magic Happens"}]}