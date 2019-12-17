# frozen_string_literal: true

GAMES[:orcs_must_die_2] = {
  buy_link:        'http://store.steampowered.com/app/201790/',
  site:            'steam',
  title:           'Orcs Must Die 2',
  generator_title: 'Loadout',
  background:      'omd2.jpg',
  added:           Date.strptime('20150323', '%Y%m%d'),
  last_updated:    Date.strptime('20150323', '%Y%m%d'),
  columns: {
    character: {
      sub_trees:          %i[sorcerer_traps_and_weapons war_mage_traps_and_weapons],
      chance_of_multiple: 0,
      min:                1,
      max:                1,
      options:            [
        {
          sorcerer: {
            title:              'Traps and Weapons',
            chance_of_multiple: 0,
            min:                10,
            max:                10,
            options:            [
              :'Acid Sprayer',
              :'Ice Vent',
              :'Mana Well',
              :'Archer Guardian',
              :Barricade,
              :'Bear Trap',
              :'Boom Barrel Dispenser',
              :'Boulder Chute',
              :Decoy,
              :'Dwarf Guardian',
              :Grinder,
              :Haymaker,
              :'Shock Zapper',
              :'Spike Trap',
              :'Spring Trap',
              :'Void Wall',
              :'Boom Barrel',
              :Autoballista,
              :Brimstone,
              :Coinforge,
              :'Floor Scorcher',
              :'Paladin Guardian',
              :Pounder,
              :'Push Trap',
              :'Spore Mushrooms',
              :'Steam Trap',
              :'Swinging Mace',
              :'Wall Blades',
              :'Dart Spitter',
              :'Floor Portal',
              :'Web Spinner',
              :'Spike Wall',
              :'Berserker Trinket',
              :'Defense Trinket',
              :'Freedom Trinket',
              :'Healing Trinket',
              :'Mana Rage Trinket',
              :'Rift Defender Trinket',
              :'Scavenger Trinket',
              :'Trap Reset Trinket',
              :'Jar of Ghosts (Trinket)',
              :'Guardian Trinket',
              :'Polymorph Ring',
              :'Sceptre of Domination',
              :Bladestaff,
              :Crossbow,
              :'Wind Belt',
              :'Alchemist Satchel',
              :'Lightning Ring',
              :'Bone Amulet',
              :'Vampiric Gauntlets',
              :'Flame Bracers',
              :'Ice Amulet',
              :'Stone Staff',
              :'Teleportation Ring',
              :'Dwarven Missile Launcher',
            ],
          },
        },
        {
          war_mage: {
            title:              'Traps and Weapons',
            chance_of_multiple: 0,
            min:                10,
            max:                10,
            options:            [
              :'Arrow Wall',
              :'Healing Well',
              :'Tar Trap',
              :'Archer Guardian',
              :Barricade,
              :'Bear Trap',
              :'Boom Barrel Dispenser',
              :'Boulder Chute',
              :'Decoy ',
              :'Dwarf Guardian',
              :'Grinder ',
              :Haymaker,
              :'Shock Zapper',
              :'Spike Trap',
              :'Spring Trap',
              :'Void Wall',
              :'Boom Barrel',
              :Autoballista,
              :Brimstone,
              :Coinforge,
              :'Floor Scorcher',
              :'Paladin Guardian',
              :Pounder,
              :'Push Trap',
              :'Spore Mushrooms',
              :'Steam Trap',
              :'Swinging Mace',
              :'Wall Blades',
              :'Dart Spitter',
              :'Floor Portal',
              :'Web Spinner',
              :'Spike Wall',
              :'Berserker Trinket',
              :'Defense Trinket',
              :'Freedom Trinket',
              :'Healing Trinket',
              :'Mana Rage Trinket',
              :'Rift Defender Trinket',
              :'Scavenger Trinket',
              :'Trap Reset Trinket',
              :'Jar of Ghosts (Trinket)',
              :'Guardian Trinket',
              :Blunderbuss,
              :'Dwarven Hammer',
              :Bladestaff,
              :Crossbow,
              :'Wind Belt',
              :'Alchemist Satchel',
              :'Lightning Ring',
              :'Bone Amulet',
              :'Vampiric Gauntlets',
              :'Flame Bracers',
              :'Ice Amulet',
              :'Stone Staff',
              :'Teleportation Ring',
              :'Dwarven Missile Launcher',
            ],
          },
        },
      ],
    },
    level_type: {
      sub_trees:          %i[regular_map endless_map],
      chance_of_multiple: 0,
      min:                1,
      max:                1,
      options:            [
        {
          regular: {
            title:              'Map',
            chance_of_multiple: 0,
            min:                1,
            max:                1,
            options:            [
              :'Big Valleys',
              :'Hidden Gulch',
              :Precipice,
              :'Servant Entrance',
              :Passages,
              :Corridors,
              :'Upstairs Downstairs',
              :Crunch,
              :'Mirror Image',
              :'Wind Up',
              :'Twisted Halls',
              :'Twin Halls',
              :'Lunch Break',
              :'Sludge Hole',
              :'Chaos Chamber',
              :'The Arena',
              :'The Library',
              :'Hard Climb',
              :'The Squeeze',
              :'Stairs of Doom',
              :Finale,
              :'Traffic Jammed',
              :'Double Decker',
              :'The West Wing',
              :'Rush Hour',
              :'Breakneck Triad',
              :'Triple Threat',
              :'Yeti Den',
              :'The Hive',
              :'Chilled Cavern',
            ],
          },
        },
        {
          endless: {
            title:              'Map',
            chance_of_multiple: 0,
            min:                1,
            max:                1,
            options:            [
              :Tunnels,
              :'Hidden Gulch',
              :Precipice,
              :Crunch,
              :'Wind Up',
              :Crossfire,
              :'Close Cliffs',
              :'The Quarry',
              :Caldera,
              :'King Of The Hill',
              :'The Library',
              :'The Crossing',
              :'The West Wing',
              :'Stairs of Doom',
              :'Servant Entrance',
              :'Breakneck Triad',
              :Passages,
              :'The Tower',
              :'Chilled Cavern',
            ],
          },
        },
      ],
    },
  },
}
