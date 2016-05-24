GAMES[:mass_effect] = {
    buy_link: 'http://www.amazon.com/gp/product/B0050SZ980/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B0050SZ980&linkCode=as2&tag=scen-gen-20&linkId=IXWXMZGTBKJZKSAB',
    site: 'amazon',
    title: 'Mass Effect',
    generator_title: 'Playthrough',
    background: 'masseffect1.jpg',
    next_game: :mass_effect_2,
    columns: {
        background: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Spacer',
                :'Colonist',
                :'Earthborn'
            ]
        },
        psychological_profile: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'War Hero',
                :'Sole Survivor',
                :'Ruthless'
            ]
        },
        morality: {
            help: 'General reaction in conversations, does not overrule story options from below',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Paragon',
                :'Renegade',
                :'Balanced'
            ]
        },
        class: {
            sub_trees: [
                :vanguard_specialization, :adept_specialization, :soldier_specialization,
                :engineer_specialization, :sentinel_specialization, :infiltrator_specialization
            ],
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                {
                    adept: {
                        title: 'Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Bastion,
                            :Nemesis
                        ]
                    }
                },
                {
                    soldier: {
                        title: 'Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Commando,
                            :'Shock Trooper'
                        ]
                    }
                },
                {
                    engineer: {
                        title: 'Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Medic,
                            :Operative
                        ]
                    }
                },
                {
                    vanguard: {
                        title: 'Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Nemesis,
                            :'Shock Trooper'
                        ]
                    }
                },
                {
                    sentinel: {
                        title: 'Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Medic,
                            :Bastion
                        ]
                    }
                },
                {
                    infiltrator: {
                        title: 'Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Commando,
                            :Operative
                        ]
                    }
                }
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
                            :Ashley,
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
                            :Kaidan,
                            :Liara,
                            :None
                        ]
                    }
                }
            ]
        },
        :"garrus's morality" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Push towards Paragon',
                :'Push towards Renegade'
            ]
        },
        rachni_queen: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Kill',
                :'Release'
            ]
        },
        bring_down_the_sky: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Let Balek go and save the hostages',
                :'Kill Balek and let the hostages die'
            ]
        },
        wrex_on_virmire: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Talk Wrex down',
                :'Kill Wrex'
            ]
        },
        virmire: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Ashley is left behind',
                :'Kaidan is left behind'
            ]
        },
        the_council: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Save them',
                :'Let them die'
            ]
        },
        human_council_member: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Anderson,
                :Udina
            ]
        }
    }
}