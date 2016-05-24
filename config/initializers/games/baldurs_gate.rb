GAMES[:baldurs_gate] = {
    buy_link: 'http://www.amazon.com/gp/product/B000FGA1US/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000FGA1US&linkCode=as2&tag=scen-gen-20&linkId=FDTOBCJBVRUSTVKX',
    site: 'amazon',
    title: 'Baldur\'s Gate',
    generator_title: 'Character',
    background: 'balders_gate.jpg',
    columns: {
        gender: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :Male,
                :Female
            ]
        },
        race: {
            sub_trees: [
                :'human_class/kit', :'elf_class/kit', :'half_elf_class/kit', :'gnome_class/kit',
                :'gnome_class/kit', :'halfling_class/kit', :'dwarf_class/kit', :'half_orc_class/kit'
            ],
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                {
                    human: {
                        help: 'If you only get a class, do not take a kit',
                        title: 'Human Class/Kit',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Fighter',
                            :'Berserker/fighter',
                            :'Wizard Slayer/fighter',
                            :'Kensai/fighter',
                            :'Ranger',
                            :'Archer/ranger',
                            :'Stalker/ranger',
                            :'Beast Master/ranger',
                            :'Paladin',
                            :'Cavalier/paladin',
                            :'Inquisitor/paladin',
                            :'Undead Hunter/paladin',
                            :'Blackguard/paladin',
                            :'Cleric',
                            :'Priest of Talos/cleric',
                            :'Priest of Helm/cleric',
                            :'Priest of Lathander/cleric',
                            :'Druid',
                            :'Totemic Druid/druid',
                            :'Shapeshifter/druid',
                            :'Avenger/druid',
                            :'Mage',
                            :'Abjurer/mage',
                            :'Conjurer/mage',
                            :'Diviner/mage',
                            :'Enchanter/mage',
                            :'Illusionist/mage',
                            :'Invoker/mage',
                            :'Necromancer/mage',
                            :'Transmuter/mage',
                            :'Wild Mage/mage',
                            :'Thief',
                            :'Assassin/thief',
                            :'Bounty Hunter/thief',
                            :'Swashbuckler/thief',
                            :'Shadowdancer/thief',
                            :'Bard',
                            :'Blade/bard',
                            :'Jester/bard',
                            :'Skald/bard',
                            :'Sorcerer',
                            :'Dragon Disciple/sorcerer',
                            :'Monk',
                            :'Dark Moon Monk',
                            :'Sun Soul Monk',
                            :'Barbarian'
                        ]
                    }
                },
                {
                    elf: {
                        help: 'If you only get a class, do not take a kit',
                        title: 'Elf Class/Kit',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Fighter',
                            :'Berserker/fighter',
                            :'Wizard Slayer/fighter',
                            :'Kensai/fighter',
                            :'Ranger',
                            :'Archer/ranger',
                            :'Stalker/ranger',
                            :'Beast Master/ranger',
                            :'Cleric',
                            :'Priest of Talos/cleric',
                            :'Priest of Helm/cleric',
                            :'Priest of Lathander/cleric',
                            :'Mage',
                            :'Diviner/mage',
                            :'Enchanter/mage',
                            :'Wild Mage/mage',
                            :'Thief',
                            :'Assassin/thief',
                            :'Bounty Hunter/thief',
                            :'Swashbuckler/thief',
                            :'Shadowdancer/thief',
                            :'Sorcerer',
                            :'Dragon Disciple/sorcerer',
                            :'Barbarian',
                            :'Fighter/thief',
                            :'Fighter/mage',
                            :'Mage/thief',
                            :'Fighter/mage/thief'
                        ]
                    }
                },
                {
                    half_elf: {
                        help: 'If you only get a class, do not take a kit',
                        title: 'Half Elf Class/Kit',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Fighter',
                            :'Berserker/fighter',
                            :'Wizard Slayer/fighter',
                            :'Kensai/fighter',
                            :'Ranger',
                            :'Archer/ranger',
                            :'Stalker/ranger',
                            :'Beast Master/ranger',
                            :'Cleric',
                            :'Priest of Talos/cleric',
                            :'Priest of Helm/cleric',
                            :'Priest of Lathander/cleric',
                            :'Druid',
                            :'Totemic Druid/druid',
                            :'Shapeshifter/druid',
                            :'Avenger/druid',
                            :'Mage',
                            :'Conjurer/mage',
                            :'Diviner/mage',
                            :'Enchanter/mage',
                            :'Transmuter/mage',
                            :'Wild Mage/mage',
                            :'Thief',
                            :'Assassin/thief',
                            :'Bounty Hunter/thief',
                            :'Swashbuckler/thief',
                            :'Shadowdancer/thief',
                            :'Bard',
                            :'Blade/bard',
                            :'Jester/bard',
                            :'Skald/bard',
                            :'Sorcerer',
                            :'Dragon Disciple/sorcerer',
                            :'Barbarian',
                            :'Fighter/thief',
                            :'Fighter/cleric',
                            :'Fighter/mage',
                            :'Mage/thief',
                            :'Cleric/mage',
                            :'Fighter/druid',
                            :'Cleric/ranger',
                            :'Fighter/mage/thief',
                            :'Fighter/mage/cleric'
                        ]
                    }
                },
                {
                    gnome: {
                        help: 'If you only get a class, do not take a kit',
                        title: 'Gnome Class/Kit',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Fighter',
                            :'Berserker/fighter',
                            :'Wizard Slayer/fighter',
                            :'Kensai/fighter',
                            :'Cleric',
                            :'Priest of Talos/cleric',
                            :'Priest of Helm/cleric',
                            :'Priest of Lathander/cleric',
                            :'Thief',
                            :'Assassin/thief',
                            :'Bounty Hunter/thief',
                            :'Swashbuckler/thief',
                            :'Shadowdancer/thief',
                            :'Barbarian',
                            :'Fighter/thief'
                        ]
                    }
                },
                {
                    halfling: {
                        help: 'If you only get a class, do not take a kit',
                        title: 'Halfling Class/Kit',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Fighter',
                            :'Berserker/fighter',
                            :'Wizard Slayer/fighter',
                            :'Kensai/fighter',
                            :'Cleric',
                            :'Priest of Talos/cleric',
                            :'Priest of Helm/cleric',
                            :'Priest of Lathander/cleric',
                            :'Thief',
                            :'Assassin/thief',
                            :'Bounty Hunter/thief',
                            :'Swashbuckler/thief',
                            :'Shadowdancer/thief',
                            :'Barbarian',
                            :'Fighter/thief'
                        ]
                    }
                },
                {
                    dwarf: {
                        help: 'If you only get a class, do not take a kit',
                        title: 'Dwarf Class/Kit',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Fighter',
                            :'Berserker/fighter',
                            :'Wizard Slayer/fighter',
                            :'Kensai/fighter',
                            :'Dwarven Defender/fighter',
                            :'Cleric',
                            :'Priest of Talos/cleric',
                            :'Priest of Helm/cleric',
                            :'Priest of Lathander/cleric',
                            :'Thief',
                            :'Assassin/thief',
                            :'Bounty Hunter/thief',
                            :'Swashbuckler/thief',
                            :'Shadowdancer/thief',
                            :'Barbarian',
                            :'Fighter/thief',
                            :'Fighter/cleric'
                        ]
                    }
                },
                {
                    :'Half Orc' => {
                        help: 'If you only get a class, do not take a kit',
                        title: 'Half Orc Class/Kit',
                        chance_of_multiple: 0,
                        min: 1,
                        max: 1,
                        options: [
                            :'Fighter',
                            :'Berserker/fighter',
                            :'Wizard Slayer/fighter',
                            :'Kensai/fighter',
                            :'Cleric',
                            :'Priest of Talos/cleric',
                            :'Priest of Helm/cleric',
                            :'Priest of Lathander/cleric',
                            :'Thief',
                            :'Assassin/thief',
                            :'Bounty Hunter/thief',
                            :'Swashbuckler/thief',
                            :'Shadowdancer/thief',
                            :'Barbarian',
                            :'Fighter/thief',
                            :'Fighter/cleric',
                            :'Cleric/thief'
                        ]
                    }
                }
            ]
        },
        alignment: {
            help: 'If this conflicts with your class/kit, reroll',
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: [
                :'Lawful Good',
                :'Neutral Good',
                :'Chaotic Good',
                :'Lawful Neutral',
                :'True Neutral',
                :'Chaotic Neutral',
                :'Lawful Evil',
                :'Neutral Evil',
                :'Chaotic Evil',
            ]
        }
    }
}