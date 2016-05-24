genders = [
    :Male,
    :Female
]

hair_colours = [
    :Blonde,
    :Brown,
    :Brunette,
    :Black,
    :Red
]

eye_colours = [
    :Brown,
    :Blue,
    :Green,
    :Grey,
    :Yellow,
    :Red
]

styles = [
    :Smart,
    :Skater,
    :Goth,
    :Preppie,
    :Techie,
    :Serious,
    :Suited,
    :Minimalist,
    :Crazy,
    :Colorful,
    :Boring,
    :"Classic clothes",
    :"80s clothes",
    :Modern,
    :Unfashionable,
    :Fashionable,
    :"Always wears work clothes",
    :"As nude as feasibly possible"
]

traits = [
    :'Active',
    :'Cheerful',
    :'Creative',
    :'Genius',
    :'Gloomy',
    :'Goofball',
    :'Hot-Headed',
    :'Romantic',
    :'Self-Assured',
    :'Art Lover',
    :'Bookworm',
    :'Foodie',
    :'Geek',
    :'Music Lover',
    :'Perfectionist',
    :'Ambitious',
    :'Childish',
    :'Clumsy',
    :'Glutton',
    :'Insane',
    :'Lazy',
    :'Loves Outdoors',
    :'Materialistic',
    :'Neat',
    :'Slob',
    :'Snob',
    :'Squeamish',
    :'Bro',
    :'Evil',
    :'Family-Oriented',
    :'Good',
    :'Hates Children',
    :'Loner',
    :'Mean',
    :'Noncommittal',
    :'Outgoing'
]

aspirations = [
  :"Bodybuilder",
  :"Painter Extraordinaire",
  :"Musical Genius",
  :"Bestselling Author",
  :"Bonus Trait: Muser",
  :"Public Enemy",
  :"Chief of Mischief",
  :"Successful Lineage",
  :"Big Happy Family",
  :"Master Chef",
  :"Master Mixologist",
  :"Fabulously Wealthy",
  :"Mansion Baron",
  :"Renaissance Sim",
  :"Nerd Brain",
  :"Computer Whiz",
  :"Hopeful Romantic",
  :"Soulmate",
  :"Freelance Botantist",
  :"The Curator",
  :"Angling Ace",
  :"Outdoor Enthusiast",
  :"Joke Star",
  :"Party Animal",
  :"Friend to the World"
]

relationships = [
    :"Yes, this sim's parent",
    :"Yes, this sim's sibling",
    :"Yes, this sim's partner",
    :"Yes, this sim's child",
    :"Yes, this sim's friend",
    :"Yes, this sim's roommate",
    :"Yes, this sim's unrequited love",
    :"Yes, this sim's best friend",
    :"Yes, this sim's lover",
    :"Yes, this sim's bitter partner",
    :"Yes, this sim's mortal enemy"
]

jobs = [
    :"Astronaut (Space Ranger)",
    :"Astronaut (Interstellar Smuggler)",
    :"Athlete (Professional Athlete)",
    :"Athlete (Bodybuilder)",
    :"Business (Management)",
    :"Business (Investor)",
    :"Criminal (Boss)",
    :"Criminal (Oracle)",
    :"Culinary (Chef)",
    :"Culinary (Mixologist)",
    :"Entertainer (Musician)",
    :"Entertainer (Comedian)",
    :"Painter (Master of the Real)",
    :"Painter (Patron of the Arts)",
    :"Secret Agent (Diamond Agent)",
    :"Secret Agent (Villain)",
    :"Tech Guru (eSport Gamer)",
    :"Tech Guru (Start Up Entrepreneur)",
    :"Writer (Author)",
    :"Writer (Journalist)"
]

sim = {
    sim: {
        title: 'Gender',
        options: genders
    },
    hair_colour: {
        options: hair_colours
    },
    eye_colour: {
        options: eye_colours
    },
    style: {
        options: styles
    },
    traits: {
        min: 3,
        options: traits
    },
    aspiration: {
        options: aspirations
    },
    career_path: {
        help: 'This will probably conflict with your aspiration, complete that first before moving on to your assigned job',
        options: jobs
    },
    another_sim: {
        title: 'Another sim?',
        help: "Hit the big reroll button above to create your next sim, don't forget to create this one first!",
        options: [
            relationships,
            :"No, your family is complete"
        ]
    }
}

GAMES[:the_sims_4] = {
    buy_link: 'http://www.amazon.co.uk/gp/product/B00KHJLXN2/ref=as_li_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B00KHJLXN2&linkCode=as2&tag=talefromthefo-21&linkId=EEX5KZJ5GNFC3MB5',
    site: 'amazon',
    title: 'The Sims 4',
    generator_title: 'Sim',
    background: 'sims4.jpg',
    added: Date.strptime('20150424',"%Y%m%d"),
    last_updated: Date.strptime('20150424',"%Y%m%d"),
    columns: sim
}