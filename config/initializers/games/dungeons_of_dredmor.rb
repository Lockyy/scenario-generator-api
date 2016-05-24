GAMES[:dungeons_of_dredmor] = {
    buy_link: 'http://store.steampowered.com/app/98800/',
    site: 'steam',
    title: 'Dungeons of Dredmor',
    generator_title: 'Character',
    background: 'dungeons-of-dredmor.jpg',
    added: Date.strptime('20150227',"%Y%m%d"),
    last_updated: Date.strptime('20150227',"%Y%m%d"),
    columns: {
        skills: {
            chance_of_multiple: 0,
            min: 7,
            max: 7,
            options: [
                :'Swords',
                :'Axes',
                :'Maces',
                :'Polearms',
                :'Staves',
                :'Unarmed Combat',
                :'Dual Wielding',
                :'Shield Bearer',
                :'Berserker Rage',
                :'Master of Arms',
                :'Smithing',
                :'Daggers',
                :'Archery',
                :'Thrown Weapons',
                :'Artful Dodger',
                :'Perception',
                :'Burglary',
                :'Assassination',
                :'Fungal Arts',
                :'Archaeology',
                :'Tinkering',
                :'Vampirism',
                :'Golemancy',
                :'Fleshsmithing',
                :'Mathemagic',
                :'Psionics',
                :'Necronomiconomics',
                :'Viking Wizardry',
                :'Astrology',
                :'Promethean Magic',
                :'Magic Training',
                :'Blood Magic',
                :'Ley Walker',
                :'Alchemy',
                :'Wand Lore',
                :'Demonologist',
                :'Big Game Hunter',
                :'Emomancy',
                :'Killer Vegan',
                :'Piracy',
                :'Werediggle Curse',
                :'Clockwork Knight',
                :'Rogue Scientist',
                :'Battle Geology',
                :'Warlockery',
                :'Bankster',
                :'Communist',
                :'Egyptian Magic',
                :'Magical Law',
                :'Paranormal Investigator',
                :'Tourist'
            ]
        },
        gender: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Male,
                :Female
            ]
        },
        difficulty: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Elvishly Easy',
                :'Dwarvish Moderation',
                :'Going Rogue'
            ]
        },
        permadeath: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Enabled,
                :Disabled
            ]
        }
    }
}