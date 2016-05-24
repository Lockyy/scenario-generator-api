civs = [
    :'Aztecs',
    :'Britons',
    :'Byzantines',
    :'Celts',
    :'Chinese',
    :'Franks',
    :'Goths',
    :'Huns',
    :'Incas',
    :'Indians',
    :'Italians',
    :'Japanese',
    :'Koreans',
    :'Magyars',
    :'Mayans',
    :'Mongols',
    :'Persians',
    :'Saracens',
    :'Slavs',
    :'Spanish',
    :'Teutons',
    :'Turks',
    :'Vikings'
]

GAMES[:age_of_empires_2] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/strategy/age-empires-ii-hd-edition/',
    site: 'gmg',
    title: 'Age of Empires 2',
    generator_title: 'Scenario',
    background: 'age_of_empires.jpg',
    added: Date.strptime('20150305',"%Y%m%d"),
    last_updated: Date.strptime('20150305',"%Y%m%d"),
    columns: {
        civilization: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: civs
        },
        other_players: {
            chance_of_multiple: -1,
            min: 1,
            max: 7,
            allow_duplicate_options: true,
            options: civs
        },
        game_mode: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Supremacy',
                :'Conquest',
                :'Deathmatch',
                :'Lightning',
                :'Nomad',
                :'King of the Hill',
                :'Sudden Death'
            ]
        },
        restrictions: {
            help: 'Optional',
            chance_of_multiple: 25,
            min: 1,
            max: 3,
            options: [
                :'No archers',
                :'No infantry',
                :'No cavalry',
                :'No seige units',
                :'No scout units - Only explore the map with an army to either conquer or take control of a settlement',
                :'You may only use the resources in your immediate base',
                :'Settle no new bases',
                :'Build no extra town centers',
                :'No houses',
                :'Do not attack for the first 5 minutes',
                :'You can only have one settlement at a time, when your base runs out of resources move your entire base to a new settlement',
                :'No walls',
                :'No melee cavalry',
                :'No ranged cavalry',
                :'Do not upgrade your units',
                :'No Relics',
                :'Do not advance through the ages',
                :'You must build an equal amount of each type of available unit - Archers, Infantry, Cavalry, Seige',
                :'No non-transport boats',
                :'Only use boats on maps where it is absolutely required',
                :'No gates',
                :'No sentry towers',
                :'Do not upgrade your sentry towers'
            ]
        }
    }
}