GAMES[:ftl] = {
    buy_link: 'http://www.ftlgame.com/',
    site: 'ftlgame',
    title: 'FTL: Faster Than Light',
    background: 'ftl.png',
    added: Date.strptime('20150323',"%Y%m%d"),
    last_updated: Date.strptime('20150323',"%Y%m%d"),
    columns: {
        advanced_edition?: {
            sub_trees: [ :'ship_(ae)', :'ship_layout_(ae)', :ship, :ship_layout ],
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                {
                    On: {
                        title: 'Ship',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Kestrel',
                            :'Engi',
                            :'Federation',
                            :'Zoltan',
                            :'Mantis',
                            :'Slug',
                            :'Rock',
                            :'Stealth',
                            :'Lanius',
                            :'Crystal'
                        ]
                    },
                    :'Ship Layout' => {
                        help: 'If your ship does not have this layout, reroll',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: (:A..:C).to_a
                    }
                },
                {
                    Off: {
                        title: 'Ship',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Kestrel',
                            :'Engi',
                            :'Federation',
                            :'Zoltan',
                            :'Mantis',
                            :'Slug',
                            :'Rock',
                            :'Stealth',
                            :'Crystal'
                        ]
                    },
                    ship_layout: {
                        help: 'If your ship does not have this layout, reroll',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: (:A..:B).to_a
                    }
                }
            ]
        },
        primary_combat_style: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Drones,
                :Boarding,
                :Missiles,
                :Lasers,
                :Beams,
                :Bombs,
                :Flak
            ]
        },
        challenges: {
            help: 'These are optional and can be done across multiple runs',
            chance_of_multiple: 33,
            min: 1,
            max: 3,
            options: [
                :'Unlock all ships',
                :'Unlock a ship',
                :'Unlock all layouts of your current ship',
                :'Unlock all layouts of all ships, swap ship once you unlock all of your current ships layouts',
                :'Defeat the flagship',
                :'Unlock the Engi cruiser',
                :'Unlock the Federation cruiser',
                :'Unlock the Zoltan cruiser',
                :'Unlock the Mantis cruiser',
                :'Unlock the Slug cruiser',
                :'Unlock the Rock cruiser',
                :'Unlock the Stealth cruiser',
                :'Unlock the Lanius cruiser',
                :'Unlock the Crystal cruiser',
                :'No backtracking unless you hit a dead end',
                [
                    :'Max 1 weapon',
                    :'Max 2 weapons',
                    :'Max 3 weapons'
                ],
                [
                    :'Max 1 drone',
                    :'Max 2 drones'
                ],
                [
                    :'Max 1 crew member',
                    :'Max 2 crew members',
                    :'Max 3 crew members',
                    :'Max 4 crew members',
                    :'Max 5 crew members',
                    :'Max 6 crew members',
                    :'Max 7 crew members'
                ],
                :'You are only allowed your primary combat style. I.E. If you got Beams, you can only use beam weapons',
                :'No more than one of each race',
                :'Do not upgrade your doors',
                :'Do not upgrade your sensors',
                :'Do not upgrade your shields',
                :'Do not upgrade your engines',
                :'Do not upgrade your cockpit',
                :'Never open the airlocks',
                :'Keep all but your occupied rooms open to space. Open and close rooms from the outside as occupation changes',
                :'Never buy slaves',
                :'Do not tolerate slavers',
                :'Never take blue options',
                [
                    :'Never help people in distress',
                    :'Always help people in distress'
                ],
                :'Turn off your medibay and oxygen at the beginning of battle, only turn them on once you have won',
                :'No shields',
                :'Hoard challenge: Try to collect and stockpile as much scrap as possible',
                :'Never repair your hull',
                [
                    :'Never take on extra crew',
                    :'Remove all crew obtained via events, you may only replenish buy purchasing new crew',
                    :'You can only get new crew via events'
                ],
                :'No pausing',
                :'No healing your crew',
                :'No pilot during battle',
                :'Do not buy additional systems',
                :'Only obtain new equipment via events, do not buy from shops',
                :'Avoid shops',
                :'Turn off your engines at the start of each fight',
                :'Get to sector 5 without firing a shot, using an offensive drone, or teleporting',
                :'Get to sector 5 with no system/reactor upgrades',
                :'Get to sector 5 without repairing at a store',
                :'Get to sector 8 without using missiles/bombs',
                :'Get to sector 8 without using drones',
                :'Get to sector 8 without buying at a store (Repairs are ok)',
                :'Get to sector 8 without losing a crewmember',
                :'Have every square of an enemy ship on fire simultaneously',
                :'Fail to evade 5 shots in a row with a full powered and upgraded engine',
                :'Have a single boarding drone kill 4 crewmembers on one ship',
                :'Use the Weapon Pre-Igniter augmentation to destroy an enemy ship in one volley before the enemy can get a single shot off',
                :'Defeat an enemy ship with all of your crew aboard it',
                :'Hit every room of a ship with at least one beam in under 5 seconds',
                :'Empty the oxygen (Net level less than 5 percent) of a non-automated, hostile enemy ship'
            ]
        },
        difficulty: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Easy,
                :Normal,
                :Hard
            ]
        }
    }
}