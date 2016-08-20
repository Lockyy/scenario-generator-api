GAMES[:xrebirth] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/strategy/x-rebirth/#b',
    site: 'gmg',
    title: 'X-Rebirth',
    background: 'x_rebirth.png',
    columns: {
        game_starts: {
            title: 'Game Starts',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Campaign',
                :'Free-play',
                :'Aspiring Merchant',
                :'Argon Mercenary',
                :'Empire Builder',
                :'The Teladi Outpost'
            ]
        },
        restrictions: {
            title: 'Restrictions',
            sub_trees: [:primary_weapon],
            chance_of_multiple: 15,
            min: 1,
            max: 3,
            options: [
                :'Never use any drones',
                :'Never upgrade the Albion Skunk',
                :'Never use the long range scanner',
                :'Never use boost',
                :'Never use local highways',
                :'Never use highways',
                :'Never land at stations',
                :'Only build stations in temporary or player-owned zones',
                :'Only use missiles; no other weapons',
                :'You may only stock 20 missiles at one time',
                :'You may only stock 10 missiles at one time',
                :'Do not upgrade beyond Mk1 weapons',
                :'Do not upgrade beyond Mk1 shields',
                :'Do not upgrade beyond Mk1 engines',
                :'Do not buy any ships',
                :'Trade only with inventory items',
                :'Dead is dead - if you die; game over',
                {
                    primary_weapon: {
                        title: 'Use as primary weapon:',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Pulsed Maser',
                            :'Inertial Hammer',
                            :'Plasma Cannon',
                            :'Partical Repeater',
                            :'Mining Laser'
                        ]
                    }
                }
            ]
        },
        trade_goals: {
            title: 'Trade Goals',
            chance_of_multiple: 5,
            min: 1,
            max: 2,
            options: [
                :'Sell 20 Million Credits worth of wares in one trade',
                :'Trade one of every ware in the game at least once',
                :'Have 20 Million Credits worth of items in your inventory',
                :'Have at least 10 Million Credits in your own account',
                :'Have at least 50 Million Credits in your own account',
                :'Have at least 100 Million Credits in your own account',
                :'Have a trade agent at every possible station',
                :'Have at least 20 stations that only depend on your other stations',
                :'Have at least 50 statinos that only depend on your other stations',
                :'Find and hire one of every specialist type',
                :'Have at least one pilot, one captain and one engineer who all have 5 stars in their primary skills'
            ]
        },
        fight_goals: {
            title: 'Fight Goals',
            chance_of_multiple: 5,
            min: 1,
            max: 2,
            options: [
                :'Kill the Xenon I',
                :'Destroy an Arawn while docked at a player-owned capital ship',
                :'Become the Xenon Slayer - kill 1000 Xenon',
                :'Get 100 pilots to bail from small ships',
                :'Have a fleet of at least 100 ships',
                :'Capture a ship without using your main weapon',
                :'Capture a ship with freight worth at least 10 Million credits',
                :'Successfully board 50 ships',
                :'Successfully board 100 ships',
                :'Successfully board 200 ships',
                :'Successfully board 1 ship without losing any marines',
                :'Successfully board 20 ships without losing any marines',
                :'Successfully board 100 ships without losing any marines',
                :'Successfully board a Taranis, an Arawn and a Fulmekron',
                :'Successfully board at least one of every possible ship'
            ]
        },
        build_goals: {
            title: 'Build Goals',
            sub_trees: [:specific_zone_build],
            chance_of_multiple: 5,
            min: 1,
            max: 2,
            options: [
                :'Build 3 stations in one zone',
                :'Build 7 stations in one zone',
                :'Fully upgrade 10 stations',
                :'Fully upgrade 50 stations',
                :'Build at least one station for any ware at every tech level',
                :'Build at least one of every possible station',
                :'Build 25 trading ships',
                :'Build 50 trading ships',
                :'Build 100 trading ships',
                :'Build 25 capital ships',
                :'Build 50 capital ships',
                :'Build 100 capital ships',
                {
                    specific_zone_build: {
                        title: "Build a station in...",
                        chance_of_multiple: 5,
                        min: 1,
                        max: 2,
                        options: [
                            :'Shattered Singularity',
                            :'Venturous Profit',
                            :'Schödinger\'s Drift',
                            :'Time Distortion',
                            :'Gravity Anomaly',
                            :'Cryptic Heart',
                            :'Last Resort',
                            :'Biting Steel',
                        ]
                    }
                }
            ]
        },
        discovery_goals: {
            title: 'Discovery Goals',
            chance_of_multiple: 5,
            min: 1,
            max: 3,
            options: [
                :'Walk a marathon',
                :'Find Jebediah Kerman in five different locations',
                :'Discover every zone in the universe',
                :'Fly for over 100,000Km in the Albion Skunk',
                :'Fly for over 100,000Km in a remote-controlled drone',
                :'Successfully unlock 500 lockboxes',
                :'Successfully unlock 1000 lockboxes',
                :'Survive the Serpentine Haze with less than 5% hull'
            ]
        },
        faction_relations: {
            title: 'Faction Relationships',
            help: 'Defines which relationships you are allowed to build with which factions',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Become an ally of every economic faction',
                :'Become the nemisis of every economic faction',
                :'Reach the Ally relationship with every economic Albion faction',
                :'Reach the Friend relationship with every economic Albion faction',
                :'Reach the Enemy relationship with every economic Albion faction',
                :'Reach the Ally relationship with every economic Omicron Lyrae faction',
                :'Reach the Friend relationship with every economic Omicron Lyrae faction',
                :'Reach the Enemy relationship with every economic Omicron Lyrae faction',
                :'Go from Enemy to Ally and back again with one faction'
            ]
        },
        main_source_of_income: {
            title: 'Main Source of Income',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Trading',
                :'Fighting',
                :'Building',
                :'Thinking',
                :'Plundering ships',
                :'Boarding ships',
                :'Stealing from stations',
            ]
        },
        criminal_activity: {
            title: 'Criminal Activity',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Never',
                :'Occasional',
                :'Frequent',
                :'Habitual',
                :'The only way you can function'
            ]
        },
        hard_difficulty: {
            title: 'Hard Difficulty',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'On',
                [:'Off', 2]
            ]
        }
    }
}