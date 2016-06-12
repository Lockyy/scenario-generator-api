GAMES[:skyrim] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/rpgs/elder-scrolls-v-skyrim-legendary-edition/#b',
    site: 'gmg',
    title: 'Skyrim',
    generator_title: 'Character',
    background: 'skyrim.jpg',
    columns: {
        race: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Altmer',
                :'Argonian',
                :'Bosmer',
                :'Breton',
                :'Dunmer',
                :'Imperial',
                :'Khajiit',
                :'Nord',
                :'Orsimer',
                :'Redguard'
            ]
        },
        birthsign: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'The Apprentice',
                :'The Atronach',
                :'The Lady',
                :'The Lord',
                :'The Lover',
                :'The Mage',
                :'The Ritual',
                :'The Serpent',
                :'The Shadow',
                :'The Steed',
                :'The Thief',
                :'The Tower',
                :'The Warrior'
            ]
        },
        focus_skills: {
            help: 'The primary skills you should aim to use and improve',
            chance_of_multiple: 100,
            min: 3,
            max: 3,
            options: [
                :'Illusion',
                :'Conjuration',
                :'Restoration',
                :'Alteration',
                :'Enchanting',
                :'Smithing',
                :'Block',
                :'Sneak',
                :'Lockpicking',
                :'Pickpocket',
                :'Speech',
                :'Alchemy'
            ]
        },
        factions_to_join: {
            help: 'The factions you are required to join, you can join others if you want as well',
            chance_of_multiple: -1,
            min: 1,
            max: 5,
            options: [
                :"Bard's College",
                :'College of Winterhold',
                :'The Companions',
                :'Dark Brotherhood',
                :'Thieves Guild'
            ]
        },
        weapons: {
            chance_of_multiple: 100,
            min: 2,
            max: 2,
            options: [
                [
                    :'Daggers',
                    :'Dagger and Shield'
                ],
                [
                    :'Maces',
                    :'Mace and Shield'
                ],
                [
                    :'One Handed Swords',
                    :'Sword and Shield'
                ],
                [
                    :'War Axes',
                    :'War Axe and Shield'
                ],
                [
                    :'Destruction',
                    :'Destruction and Shield'
                ],
                :'Battleaxes',
                :'Greatswords',
                :'Warhammers',
                :'Bows',
                :'Destruction',
                :'Crossbows',
            ]
        },
        armour: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                [:'Heavy', 0.35],
                [:'Light', 0.35],
                :'Regular Clothes',
                :'Robes',
                :'Robes'
            ]
        },
        civil_war_side: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Imperial Legion',
                :'Stormcloaks'
            ]
        },
        dawnguard_side: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'The Volkihar Clan',
                :'The Dawnguard'
            ]
        },
        home: {
            chance_of_multiple: 20,
            min: 1,
            max: 8,
            options: [
                :'Breezehome (Whiterun)',
                :'Honeyside (Riften)',
                :'Vlindrel Hall (Markarth)',
                :'Hjerim (Windhelm)',
                :'Proudspire Manor (Solitude)',
                :'Heljarchen Hall (Dawnstar)',
                :'Lakeview Manor (Falkreath)',
                :'Windstad Manor (Morthal)',
            ]
        },
        companion: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Housecarl for your home city',
                :'Belrand',
                :'Erik the Slayer',
                :'Jenassa',
                :'Marcurio',
                :'Stenvar',
                :'Teldryn',
                :'Vorstag',
                :'Adelaisa Vendicci ',
                :'Ahtar',
                :'Annekke Crag-Jumper',
                :'Aranea Ienith',
                :'Eola',
                :'Erandur',
                :'Faendal',
                :'Frea',
                :'Golldir',
                :'Illia',
                :'Kharjo',
                :'Lob',
                :'Mjoll the Lioness',
                :'Ogol',
                :'Ralis Sedarys',
                :'Roggi Knot-Beard',
                :'Serana',
                :'Sven',
                :'Talvas Fathryon',
                :'Ugor',
                :'Benor',
                :'Borgakh the Steel Heart',
                :'Cosnach',
                :'Derkeethus',
                :'Ghorbash the Iron Hand',
                :'Uthgerd the Unbroken',
                :'Meeko',
                :'Vigilance'
            ]
        },
        freelance_theft: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'No freelance theft',
                :"If its too tempting to resist",
                :'Habitual',
                :"If it's not nailed down, it's yours"
            ]
        },
        unprovoked_murder: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'No murder',
                :'Occasional',
                :'Frequent',
                :'Constant rampage'
            ]
        }
    }
}