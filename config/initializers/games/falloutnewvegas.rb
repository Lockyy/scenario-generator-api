GAMES[:falloutnewvegas] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/action/fallout-new-vegas-ultimate-edition/',
    site: 'gmg',
    title: 'Fallout: New Vegas',
    generator_title: 'Character',
    background: 'newvegas.jpg',
    added: Date.strptime('20150227',"%Y%m%d"),
    last_updated: Date.strptime('20150227',"%Y%m%d"),
    columns: {
        special: {
            max_per: 10,
            min: 1,
            max: 21,
            type: 'Column::Stats',
            options: [:strength, :perception, :endurance, :charisma, :intelligence, :agility, :luck]
        },
        tag_skills: {
            chance_of_multiple: 100,
            min: 3,
            max: 3,
            options: [
                :"Barter",
                :"Lockpick",
                :"Medicine",
                :"Repair",
                :"Science",
                :"Sneak",
                :"Speech",
                :"Survival",
                :'Appropriate for your primary weapon'
            ]
        },
        traits: {
            chance_of_multiple: 100,
            min: 2,
            max: 2,
            options: [
                :"Built to Destroy",
                :"Fast Shot",
                :"Four Eyes",
                :"Good Natured ",
                :"Heavy Handed",
                :"Kamikaze",
                :"Loose Cannon",
                :"Small Frame",
                :"Trigger Discipline",
                :"Wild Wasteland",
                :"Claustrophobia",
                :"Early Bird",
                :"Hoarder",
                :"Hot Blooded",
                :"Logan's Loophole",
                :"Skilled"
            ]
        },
        hardcore_mode: {
            title: 'Hardcore Mode',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'On',
                [:'Off', 0.66]
            ]
        },
        primary_weapon: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Energy: Pistols",
                :"Energy: Rifles",
                :"Energy: Heavy",
                :"Explosives",
                :"Melee: Bladed",
                :"Melee: Blunt",
                :"Melee: Thrown",
                :"Guns: Pistols",
                :"Guns: Shotguns",
                :"Guns: SMGs",
                :"Guns: Rifles",
                :"Guns: Heavy",
                :"Unarmed: Knuckles/Gauntlet/Gloves/Power Fists",
                :"Unarmed: Bare Fists",
                :"Pacifist"
            ]
        },
        faction: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"NCR",
                :"Caesar's Legion",
                :"House",
                :"Yes Man"
            ]
        },
        human_companion: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"None",
                :"Arcade",
                :"Boone",
                :"Lily",
                :"Raul",
                :"Cass",
                :"Veronica"
            ]
        },
        other_companion: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"None",
                [:'ED-E', 0.3],
                [:'Rex', 0.3],
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