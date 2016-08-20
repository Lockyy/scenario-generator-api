GAMES[:xcom] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/strategy/xcom-enemy-unknown/#b',
    site: 'gmg',
    title: 'X-Com: Enemy Unknown',
    generator_title: 'Challenge',
    background: 'xcom.jpg',
    columns: {
        difficulty: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                [:'Normal', 4],
                [:'Classic', 3],
                [:'Impossible', 2],
                [:'Ironman Normal', 3],
                [:'Ironman Classic', 2],
                :'Ironman Impossible'
            ]
        },
        second_wave_options: {
            help: 'Ignore any options you have not unlocked. If you get an Enemy Within option and you do not own Enemy Within, go buy it because it is awesome.',
            chance_of_multiple: 70,
            min: 0,
            max: 8,
            options: [
                :'Damage Roulette',
                :'New Economy',
                :'Not Created Equally',
                :'Hidden Potential',
                :'Red Fog',
                :'Absolutely Critical',
                :'The Greater Good',
                :'Marathon',
                :'Results Driven',
                :'High Stakes',
                :'Diminishing Returns',
                :'More Than Human',
                :'War Weariness',
                :'E-115',
                :'Total Loss',
                :'Alternate Sources',
                :'Aiming Angles',
                :'Save Scum',
                :'Training Roulette',
                :'Mind Hates Matter',
                :'Itchy Trigger Tentacle'
            ]
        },
        ideal_squad: {
            help: "Bring rookies if you don't have the classes required",
            chance_of_multiple: 0,
            min: 6,
            max: 6,
            allow_duplicate_options: true,
            options: [
                :Assault,
                :Heavy,
                :Support,
                :Sniper
            ]
        },
        starting_country: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Africa',
                :'Asia',
                :'Europe',
                :'North America',
                :'South America'
            ]
        }
    }
}