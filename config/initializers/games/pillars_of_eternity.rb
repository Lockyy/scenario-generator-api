# Races

# Info that'll be used in the hash used in the generator
races = {
    :Human => [
        :Meadow,
        :Ocean,
        :Savannah
    ],
    :Aumaua => [
        :Coastal,
        :Island
    ],
    :Dwarf => [
        :Boreal,
        :Mountain
    ],
    :Elf => [
        :Pale,
        :Wood
    ],
    :Orland => [
        :Hearth,
        :Wild
    ],
    :Godlike => [
        :Death,
        :Fire,
        :Moon,
        :Nature
    ]
}

# This holds the actual options
race_options = []

# Generate and push the columns and subcolumns
races.each do |race, subraces|
    subraces.each do |subrace|
        race_options << "#{subrace} #{race}"
    end
end

# Classes

# This holds the names of subtrees that'll help with column rerolls
class_subtrees = [
    :phrases, :powers, :invocations, :shapeshift_form,
    :order, :diety, :spells
]

# Classes and their subtrees
classes = [
    :Barbarian,
    :Fighter,
    :Monk,
    :Ranger,
    :Rogue,
    {
        :Chanter => {
            title: 'Phrases',
            min: 2,
            options: [
                :"Aefyllath Ues Mith Fyr",
                :"Blessed Was Wengridh, Quickest of His Tribe",
                :"Dull the Edge, Blunt the Point",
                :"Thick Grew Their Tongues, Stumbling O'er Words",
                :"Come, Come Soft Winds of Death"
            ]
        },
        :Invocations => {
            min: 2,
            options: [
                :"But Reny Daret's Ghost, He would not Rest",
                :"And Hel-Hyraf Crashed upon the Shield",
                :"Not Felled by Axe, Nor Broken by Storm",
                :"The Thunder Rolled like Waves on Black Seas",
                :"Thrice Was She Wronged, and Thrice Justly Avenged",
                :"If their Bones Sleep Still Under that Hill, None Can Say",
                :"White Worms Writhed in the Bellies of the Dead"
            ]
        }
    },
    {
        :Cipher => {
            title: 'Powers',
            min: 2,
            options: [
                :"Eyestrike",
                :"Tenuous Grasp",
                :"Whisper of Treason",
                :"Antipathetic Field",
                :"Mind Wave",
                :"Soul Shock"
            ]
        }
    },
    {
        :Druid => {
            title: 'Shapeshift Form',
            options: [
                :Bear,
                :Boar,
                :Cat,
                :Stag,
                :Wolf
            ]
        }
    },
    {
        :Paladin => {
            title: 'Order',
            options: [
                :"Bleak Walkers",
                :"Darcozzi",
                :"Goldpact",
                :"Kind Wayfarers",
                :"Shieldbearers of St. Elcga"
            ]
        }
    },
    {
        :Priest => {
            title: 'Diety',
            options: [
                :Berath,
                :Eothas,
                :Magran,
                :Skaen,
                :Wael
            ]
        }
    },
    {
        :Wizard => {
            title: 'Spells',
            min: 4,
            options: [
                :"Arkemyr's Dazzling Lights",
                :"Chill Fog",
                :"Concelhaut's Parasitic Staff",
                :"Eldritch Aim ",
                :"Fan of Flames ",
                :"Fleet Feet",
                :"Ghost Blades",
                :"Jolting Touch",
                :"Kalakoth's Sunless Grasp",
                :"Minoletta's Minor Missiles",
                :"Slicken Coats",
                :"Spirit Shield",
                :"Thrust of Tattered Veils",
                :"Wizard's Double"
            ]
        }
    }
]

# Attributes

attributes = [
    :Might,
    :Constitution,
    :Dexterity,
    :Perception,
    :Intellect,
    :Resolve
]

# Backgrounds

# Generic backgrounds to be added to all cultures
generic_backgrounds = [
    :Drifter,
    :Hunter,
    :Laborer,
    :Merchant
]

# Info to be used for generating culture columns and the background subcolumns
cultures = {
    :"Aedyr" => [
        :Aristocrat,
        :Clergyman,
        :Colonist,
        :Dissident,
        :Mercenary,
        :Slave
    ],
    :"Deadfire Archipelago" => [
        :Aristocrat,
        :Explorer,
        :Mercenary,
        :Raider,
        :Slave
    ],
    :"Ixamitl Plains" => [
        :Aristocrat,
        :Dissident,
        :Philosopher,
        :Scholar,
        :Mercenary
    ],
    :"Old Vailia" => [
        :Aristocrat,
        :Artist,
        :Colonist,
        :Dissident,
        :Mercenary,
        :Slave
    ],
    :"Rauatai" => [
        :Aristocrat,
        :Mercenary,
        :Slave
    ],
    :"The Living Lands" => [
        :Scientist,
        :Explorer,
        :Colonist
    ],
    :"The White that Wends" => [
        :Aristocrat,
        :Explorer,
        :Mystic
    ]
}

# This holds the actual options
cultures_array = []
# This holds the names of subtrees that'll help with column rerolls
cultures_sub_trees = []

# Generate and push the columns and subcolumns
cultures.each do |culture, backgrounds|
    culture_hash = {}

    culture_hash[culture] = {
        title: 'Background',
        options: backgrounds + generic_backgrounds
    }

    cultures_array.push culture_hash
end

voices = [
    :"Mystic (male)",
    :"Feisty (male)",
    :"Noble (male)",
    :"Stoic (male)",
    :"Sinister (male)",
    :"Mystic (female)",
    :"Feisty (female)",
    :"Noble (female)",
    :"Stoic (female)",
    :"Sinister (female)",
    :None
]

GAMES[:pillars_of_eternity] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/rpgs/pillars-eternity-hero-edition/',
    site: 'gmg',
    title: 'Pillars of Eternity',
    generator_title: 'Character',
    background: 'pillars_of_eternity.jpg',
    added: Date.strptime('20150404',"%Y%m%d"),
    last_updated: Date.strptime('20150404',"%Y%m%d"),
    columns: {
        sex: {
            options: [
                :Male,
                :Female
            ]
        },
        race: {
            options: race_options
        },
        class: {
            sub_trees: class_subtrees,
            options: classes
        },
        primary_attribute: {
            options: attributes
        },
        culture: {
            sub_trees: cultures_sub_trees,
            options: cultures_array
        },
        voice: {
            options: voices
        }
    }
}