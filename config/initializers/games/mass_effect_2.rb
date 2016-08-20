GAMES[:mass_effect_2] = {
    buy_link: 'http://www.amazon.com/gp/product/B0050SZ980/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B0050SZ980&linkCode=as2&tag=scen-gen-20&linkId=IXWXMZGTBKJZKSAB',
    site: 'amazon',
    title: 'Mass Effect 2',
    generator_title: 'Playthrough',
    background: 'masseffect2.jpg',
    previous_game: :mass_effect,
    next_game: :mass_effect_3,
    columns: {
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
                        title: 'Adept Specialization',
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
                        title: 'Soldier Specialization',
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
                        title: 'Engineer Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Mechanic,
                            :Demolisher
                        ]
                    }
                },
                {
                    vanguard: {
                        title: 'Vanguard Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Champion,
                            :Destroyer
                        ]
                    }
                },
                {
                    sentinel: {
                        title: 'Sentinel Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Guardian,
                            :Raider
                        ]
                    }
                },
                {
                    infiltrator: {
                        title: 'Infiltrator Specialization',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :Agent,
                            :Assassin
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
                            :Miranda,
                            :Tali,
                            :Jack,
                            :Kelly,
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
                            :Jacob,
                            :Garrus,
                            :Thane,
                            :Kelly,
                            :None
                        ]
                    }
                }
            ]
        },
        Veetor: {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Send to the Migrant Fleet',
                :'Send to Cerberus'
            ]
        },
        :"Mordin's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 100,
            min: 2,
            max: 2,
            options: [
                [
                    :'Let Mordin shoot Maelon',
                    :'Save Maelon'
                ],
                [
                    :'Destroy the data',
                    :'Save the data'
                ]
            ]
        },
        :"Jacob's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Leave his father',
                :'Take his father into custody'
            ]
        },
        :"Miranda's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Don't tell her sister",
                :'Tell her sister'
            ]
        },
        :"Jack's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Let Aresh go',
                :'Kill Aresh'
            ]
        },
        :"Garrus's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Kill Sidonis',
                :"Don't kill Sidonis"
            ]
        },
        :"Samara's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Side with Samara',
                :'Side with Morinth'
            ]
        },
        :"Tali's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Reveal the evidence",
                :"Don't reveal the evidence",
                :'Convince the Board to let Tali go free'
            ]
        },
        :"Legion's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Kill the traitors",
                :"Brainwash the traitors"
            ]
        },
        :"Zaeed's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Chase Vido",
                :"Let Vido go"
            ]
        },
        :"Kasumi's Loyalty Mission" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Destroy the Greybox",
                :"Keep the Greybox"
            ]
        },
        :"Project Overlord" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Save David",
                :"Leave David with Gavin"
            ]
        },
        :"Jack vs. Miranda" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Side with Jack",
                :"Side with Miranda",
                :'Convince both'
            ]
        },
        :"Legion vs. Tali" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Side with Legion",
                :"Side with Tali",
                :'Convince both'
            ]
        },
        :"The Normandy's Crew" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :"Rush to help",
                :"Rush to help",
                :"Rush to help",
                :"Don't rush to help"
            ]
        },
        :"Vent Specialist" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                [:'Kasumi', 3],
                [:'Legion', 3],
                [:'Tali', 3],
                :'Garrus',
                :'Grunt',
                :'Jack',
                :'Jacob',
                :'Miranda',
                :'Mordin',
                :'Samara/Morinth',
                :'Thane',
                :'Zaeed'
            ]
        },
        :"First Fire Team" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                [:'Garrus', 3],
                [:'Miranda', 3],
                [:'Jacob', 3],
                :'Kasumi',
                :'Legion',
                :'Tali',
                :'Grunt',
                :'Jack',
                :'Mordin',
                :'Samara/Morinth',
                :'Thane',
                :'Zaeed'
            ]
        },
        :"Biotic Specialist" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                [:'Samara/Morinth', 3],
                [:'Jack', 3],
                :'Miranda',
                :'Jacob',
                :'Thane'
            ]
        },
        :"Second Fire Team" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                [:'Garrus', 3],
                [:'Miranda', 3],
                [:'Jacob', 3],
                :'Kasumi',
                :'Legion',
                :'Tali',
                :'Grunt',
                :'Jack',
                :'Mordin',
                :'Samara/Morinth',
                :'Thane',
                :'Zaeed'
            ]
        },
        :"Escort" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                [:'Mordin', 2],
                [:'Tali', 2],
                [:'Kasumi', 2],
                [:'Jack', 2],
                :'Garrus',
                :'Miranda',
                :'Jacob',
                :'Legion',
                :'Grunt',
                :'Samara/Morinth',
                :'Thane',
                :'Zaeed',
            ]
        },
        :"Final Battle Squad" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 2,
            max: 2,
            options: [
                :'Mordin',
                :'Tali',
                :'Kasumi',
                :'Jack',
                :'Garrus',
                :'Miranda',
                :'Jacob',
                :'Legion',
                :'Grunt',
                :'Samara/Morinth',
                :'Thane',
                :'Zaeed'
            ]
        },
        :"Collector Base" => {
            spoiler: true,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Destroy it',
                :'Give it to Cerberus'
            ]
        }
    }
}