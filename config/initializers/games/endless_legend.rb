GAMES[:endless_legend] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/strategy/endless-legend-classic-edition/#b',
    site: 'gmg',
    title: 'Endless Legend',
    background: 'endless_legend.jpg',
    added: Date.strptime('20150306',"%Y%m%d"),
    last_updated: Date.strptime('20150306',"%Y%m%d"),
    columns: {
        major_faction: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Wild Walkers',
                :'Broken Lords',
                :'Vaulters',
                :'Necrophages',
                :'Ardent Mages',
                :'Roving Clans',
                :'Drakken',
                :'Cultists',
                [:'Free Pick', 0.25],
                [:'Build your own faction, this cannot be identical to an existing faction. Be creative.', 0.25],
            ]
        },
        desired_minor_factions: {
            chance_of_multiple: 0,
            min: 3,
            max: 3,
            options: [
                :'Bos',
                :'Ceratan',
                :'Delvers',
                :'Erycis',
                :'Haunts',
                :'Sisters Of Mercy',
                :'Silics',
                :'Urces',
                :'Kazanji',
                :'Gauran',
                :'Hurnas',
                :'Nidya',
                :'Jotus',
                :'Geldirus',
                :'Eyeless Ones'
            ]
        },
        victory_type: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Wonder',
                :'Conquest',
                :'Supremacy',
                :'Elimination',
                :'Scientific',
                :'Economic',
                :'Diplomatic',
                :'Score'
            ]
        },
        difficulty: {
            help: 'If you get a difficulty way too high or low for you, you can always reroll',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Newbie',
                :'Easy',
                :'Normal',
                :'Hard',
                :'Serious',
                :'Impossible',
                :'Endless'
            ]
        },
        game_speed: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Free Pick',
                :'Slow',
                :'Normal',
                :'Fast',
                :Endless
            ]
        },
        map_size: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Free Pick',
                :'Random',
                :'Tiny',
                :'Small',
                :'Normal',
                :'Large',
                :Huge
            ]
        },
        map_type: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Free Pick',
                :'2 Continents',
                :'4 Continents',
                :'Few Continents',
                :'Many Continents',
                :'Pangea',
                :'Large Pangea',
                :'Large Islands',
                :'Islands',
                :'Random',
                :'No Ocean'
            ]
        }
    }
}