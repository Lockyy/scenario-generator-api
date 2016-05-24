GAMES[:tales_of_majeyal] = {
    buy_link: 'http://te4.org/',
    site: 'te4',
    title: 'Tales of Maj\'Eyal',
    background: 'tome.jpg',
    added: Date.strptime('20150306',"%Y%m%d"),
    last_updated: Date.strptime('20150306',"%Y%m%d"),
    columns: {
        campaigns: {
            sub_trees: [ :infinite_dungeon_lives, :age_of_ascendancy_lives ],
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Arena,
                {
                    :'Infinite Dungeon' => {
                        title: 'Lives',
                        help: 'If you get Exploration and haven\'t unlocked it, reroll',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Exploration,
                            :Adventure,
                            :Roguelike
                        ]
                    }
                },
                {
                    :'Age of Ascendancy' => {
                        title: 'Lives',
                        help: 'If you get Exploration and haven\'t unlocked it, reroll',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Exploration,
                            :Adventure,
                            :Roguelike
                        ]
                    }
                }
            ]
        },
        difficulty: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Easier,
                :Normal,
                :Nightmare,
                :Insane,
                :Madness,
                :'Free Pick'
            ]
        },
        race: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Cornac',
                :'Higher',
                :'Shalore',
                :'Thalore',
                :'Halfling',
                :'Dwarf',
                :'Ghoul',
                :'Skeleton',
                :'Yeek',
                :'Free Pick'
            ]
        },
        class: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Berserker',
                :'Bulwark',
                :'Archer',
                :'Arcane Blade',
                :'Brawler',
                :'Rogue',
                :'Shadowblade',
                :'Marauder',
                :'Skirmisher',
                :'Alchemist',
                :'Archmage',
                :'Necromancer',
                :'Summoner',
                :'Wyrmic',
                :'Oozemancer',
                :'Stone Warden',
                :'Sun Paladin',
                :'Anorithil',
                :'Reaver',
                :'Corruptor',
                :'Cursed',
                :'Doomed',
                :'Paradox Mage',
                :'Temporal Warden',
                :'Mindslayer',
                :'Solipsist',
                :'Free Pick'
            ]
        },
        gender: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Male,
                :Female,
                :'Free Pick'
            ]
        },
        ziguranth: {
            help: 'Ignore if you are a mage',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Join,
                :Destroy,
                :Ignore
            ]
        }
    }
}