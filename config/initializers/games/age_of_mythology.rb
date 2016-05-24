GAMES[:age_of_mythology] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/simulation/age-mythology-extended-edition/',
    site: 'gmg',
    title: 'Age of Mythology',
    generator_title: 'Scenario',
    background: 'age_of_mythology.jpg',
    added: Date.strptime('20150305',"%Y%m%d"),
    last_updated: Date.strptime('20150305',"%Y%m%d"),
    columns: {
        race: {
            sub_trees: [
                :major_eygptian_god, :major_norse_god, :major_atlantean_god, :major_greek_god,
                :'first_minor_god_(zeus)', :'second_minor_god_(zeus)', :'third_minor_god_(zeus)',
                :'first_minor_god_(poseidon)', :'second_minor_god_(poseidon)', :'third_minor_god_(poseidon)',
                :'first_minor_god_(hades)', :'second_minor_god_(hades)', :'third_minor_god_(hades)',
                :'first_minor_god_(ra)', :'second_minor_god_(ra)', :'third_minor_god_(ra)',
                :'first_minor_god_(isis)', :'second_minor_god_(isis)', :'third_minor_god_(isis)',
                :'first_minor_god_(set)', :'second_minor_god_(set)', :'third_minor_god_(set)',
                :'first_minor_god_(odin)', :'second_minor_god_(odin)', :'third_minor_god_(odin)',
                :'first_minor_god_(thor)', :'second_minor_god_(thor)', :'third_minor_god_(thor)',
                :'first_minor_god_(loki)', :'second_minor_god_(loki)', :'third_minor_god_(loki)',
                :'first_minor_god_(kronos)', :'second_minor_god_(kronos)', :'third_minor_god_(kronos)',
                :'first_minor_god_(gaia)', :'second_minor_god_(gaia)', :'third_minor_god_(gaia)',
                :'first_minor_god_(oranos)', :'second_minor_god_(oranos)', :'third_minor_god_(oranos)'
            ],
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                {
                    greeks: {
                        sub_trees: [
                            :'first_minor_god_(zeus)', :'second_minor_god_(zeus)', :'third_minor_god_(zeus)',
                            :'first_minor_god_(poseidon)', :'second_minor_god_(poseidon)', :'third_minor_god_(poseidon)',
                            :'first_minor_god_(hades)', :'second_minor_god_(hades)', :'third_minor_god_(hades)'
                        ],
                        title: 'Major Greek God',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            {
                                zeus: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Hermes,
                                        :Athena
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Apollo,
                                        :Dionysus
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Hera,
                                        :Hephaestus
                                    ]
                                }
                            },
                            {
                                poseidon: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Ares,
                                        :Hermes
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Aphrodite,
                                        :Dionysus
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Artemis,
                                        :Hephaestus
                                    ]
                                }
                            },
                            {
                                hades: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Ares,
                                        :Athena
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Aphrodite,
                                        :Apollo
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Artemis,
                                        :Hephaestus
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    eygptians: {
                        sub_trees: [
                            :'first_minor_god_(ra)', :'second_minor_god_(ra)', :'third_minor_god_(ra)',
                            :'first_minor_god_(isis)', :'second_minor_god_(isis)', :'third_minor_god_(isis)',
                            :'first_minor_god_(set)', :'second_minor_god_(set)', :'third_minor_god_(set)'
                        ],
                        title: 'Major Eygptian God',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            {
                                ra: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Ptah,
                                        :Bast
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Hathor,
                                        :Sekhmet
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Osiris,
                                        :Horus
                                    ]
                                }
                            },
                            {
                                isis: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Anubis,
                                        :Bast
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Nephthys,
                                        :Hathor
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Osiris,
                                        :Thoth
                                    ]
                                }
                            },
                            {
                                set: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Ptah,
                                        :Anubis
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Sekhmet,
                                        :Nephthys
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Thoth,
                                        :Horus
                                    ]
                                }
                            },
                        ]
                    }
                },
                {
                    norse: {
                        sub_trees: [
                            :'first_minor_god_(odin)', :'second_minor_god_(odin)', :'third_minor_god_(odin)',
                            :'first_minor_god_(thor)', :'second_minor_god_(thor)', :'third_minor_god_(thor)',
                            :'first_minor_god_(loki)', :'second_minor_god_(loki)', :'third_minor_god_(loki)',
                        ],
                        title: 'Major Norse God',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            {
                                odin: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Freyja,
                                        :Heimdall
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Skadi,
                                        :Njord
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Tyr,
                                        :Baldr
                                    ]
                                }
                            },
                            {
                                thor: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Forseti,
                                        :Freyja
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Bragi,
                                        :Skaldi
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Tyr,
                                        :Baldr
                                    ]
                                }
                            },
                            {
                                loki: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Heimdall,
                                        :Forseti
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Njord,
                                        :Bragi
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Tyr,
                                        :Hel
                                    ]
                                }
                            },
                        ]
                    }
                },
                {
                    atlantean: {
                        sub_trees: [
                            :'first_minor_god_(kronos)', :'second_minor_god_(kronos)', :'third_minor_god_(kronos)',
                            :'first_minor_god_(gaia)', :'second_minor_god_(gaia)', :'third_minor_god_(gaia)',
                            :'first_minor_god_(oranos)', :'second_minor_god_(oranos)', :'third_minor_god_(oranos)'
                        ],
                        title: 'Major Atlantean God',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            {
                                kronos: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Prometheus,
                                        :Leto
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Hyperion,
                                        :Rheia
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Helios,
                                        :Atlas
                                    ]
                                }
                            },
                            {
                                gaia: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Leto,
                                        :Oceanus
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Rheia,
                                        :Theia
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Atlas,
                                        :Hekate
                                    ]
                                }
                            },
                            {
                                oranos: {
                                    title: 'First Minor God',
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Oceanus,
                                        :Prometheus
                                    ]
                                },
                                :'Second Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Theia,
                                        :Hyperion
                                    ]
                                },
                                :'Third Minor God' => {
                                    chance_of_multiple: 0,
                                    min: 1,
                                    max: 1,
                                    options: [
                                        :Hekate,
                                        :Helios
                                    ]
                                }
                            },
                        ]
                    }
                }
            ]
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
                [
                    :'No myth units',
                    :'No melee myth units',
                    :'No ranged myth units'
                ],
                [
                    :'Do not advance past the classical age',
                    :'Do not advance past the heroic age',
                    :'Do not advance past the mythic age'
                ],
                :'Only use your first hero unit',
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