GAMES[:mass_effect_3] = {
    buy_link: 'http://www.amazon.com/gp/product/B0050SZ980/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B0050SZ980&linkCode=as2&tag=scen-gen-20&linkId=IXWXMZGTBKJZKSAB',
    site: 'amazon',
    title: 'Mass Effect 3',
    generator_title: 'Playthrough',
    background: 'masseffect3.jpg',
    previous_game: :mass_effect_2,
    columns: {
        morality: {
            help: 'General reaction in conversations, does not overrule story options from below',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Paragon,
                :Renegade,
                :Balanced
            ]
        },
        class: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Adept',
                :'Soldier',
                :'Engineer',
                :'Sentinel',
                :'Infiltrator',
                :'Vanguard'
            ]
        },
        gender: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                {
                    male: {
                        spoiler: true,
                        title: 'Love Interest',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'If Romanced in ME2, Miranda. Otherwise reroll',
                            :'If Romanced in ME2, Tali. Otherwise reroll',
                            :'If Romanced in ME2, Jack. Otherwise reroll',
                            :'If Romanced in ME2, Kelly. Otherwise reroll',
                            :Ashley,
                            :'Steve Cortez',
                            :Kaiden,
                            :Liara,
                            :None
                        ]
                    }
                },
                {
                    female: {
                        spoiler: true,
                        title: 'Love Interest',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'If Romanced in ME2, Thane. Otherwise reroll',
                            :'If Romanced in ME2, Garrus. Otherwise reroll',
                            :'If Romanced in ME2, Kelly. Otherwise reroll',
                            :Samantha,
                            :Kaiden,
                            :Liara,
                            :None
                        ]
                    }
                }
            ]
        },
        rachni_queen: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Save the Rachni Queen',
                :'Save the Krogan Squad'
            ]
        },
        samara: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Let Samara kill herself, kill Falere',
                :'Let Samara kill herself, do not kill Falere',
                [:'Stop Samara from killing herself', 0.5],
            ]
        },
        :'Omega: The Reactor' => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Slowly reroute the power',
                :'Kill the power'
            ]
        },
        :'Omega: General Petrovsky' => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Convince Aria to spare him',
                :'Let Aria kill him'
            ]
        },
        the_genophage: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Cure the genophage',
                :'Do not cure the genophage'
            ]
        },
        :'Quarians and the Geth' => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Give the Geth True Intelligence',
                :'Side with the Quarians',
                :'If possible, negotiate a ceasefire. If not, reroll'
            ]
        },
        party_theme: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Quiet,
                :Wild
            ]
        },
        ending: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Control,
                :Synthesize,
                :Destroy,
                :Refuse
            ]
        }
    }
}