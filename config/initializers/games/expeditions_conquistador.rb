followers_array = [
    :Doctor,
    :Scout,
    :Soldier,
    :Hunter,
    :Scholar
]

GAMES[:expeditions_conquistador] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/indie/expeditions-conquistador/',
    site: 'gmg',
    title: 'Expeditions: Conquistador',
    generator_title: 'Scenario',
    background: 'expeditions_conquistador.jpg',
    added: Date.strptime('20150420',"%Y%m%d"),
    last_updated: Date.strptime('20150420',"%Y%m%d"),
    columns: {
        difficulty: {
            options: [
                :Ironman,
                :Normal
            ]
        },
        stats: {
            min: 5,
            max: 8,
            max_per: 13,
            type: 'Column::Stats',
            options: [
                :tactics,
                :diplomacy,
                :healing,
                :survival,
                :scouting,
                :leadership,
            ]
        },
        attitude_towards_natives: {
            help: "Whilst mostly self-explanatory, the interpretation of this is up to you",
            options: [
                :Hostile,
                :Passive,
                :Accepting,
                :Cautious,
                :Rude,
                :"Reasonable when they have something to offer",
                :"Reasonable",
                :"Unreasonable",
                :Harsh,
                :Pious
            ]
        },
        attitude_towards_europeans: {
            help: "Whilst mostly self-explanatory, the interpretation of this is up to you",
            options: [
                :Hostile,
                :Passive,
                :Friendly,
                :Cautious,
                :Rude,
                :"Reasonable",
                :"Unreasonable"
            ]
        },
        attitude_towards_followers: {
            help: "Whilst mostly self-explanatory, the interpretation of this is up to you",
            options: [
                :Harsh,
                :Fair,
                :"Cruel but fair",
                :Friendly,
                :Reasonable,
                :Unreasonable,
                :Just,
                :Pushover
            ]
        },
        starting_followers: {
            min: 10,
            allow_duplicate_options: true,
            options: followers_array
        }
    }
}