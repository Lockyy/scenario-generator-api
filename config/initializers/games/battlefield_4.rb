classes = [:assault, :engineer, :recon, :support]

primaries = {}

primaries[:all] = [
    :'AK 5C (Carbine)',
    :'ACW-R (Carbine)',
    :'SG553 (Carbine)',
    :'AKU-12 (Carbine)',
    :'A-91 (Carbine)',
    :'ACE 52 CQB (Carbine)',
    :'G36C (Carbine)',
    :'M4 (Carbine)',
    :'ACE 21 CQB (Carbine)',
    :'Type-95B-1 (Carbine)',
    :'MTAR-21 (Carbine)',
    :'RFB (Designated Marksman Rifle)',
    :'Mk 11 Mod (Designated Marksman Rifle)',
    :'SKS (Designated Marksman Rifle)',
    :'SVD-12 (Designated Marksman Rifle)',
    :'QBU-88 (Designated Marksman Rifle)',
    :'M39 EMR (Designated Marksman Rifle)',
    :'ACE 53 SV (Designated Marksman Rifle)',
    :'SCAR-H SV (Designated Marksman Rifle)',
    :'QBS-09 (Shotgun)',
    :'870MCS (Shotgun)',
    :'M1014 (Shotgun)',
    :'Hawk 12G (Shotgun)',
    :'Saiga 12K (Shotgun)',
    :'SPAS-12 (Shotgun)',
    :'UTS-15 (Shotgun)',
    :'DBV-12 (Shotgun)',
    :'DAO-12 (Shotgun)'
]

primaries[:assault] = primaries[:all] + [
    :'ACE 23',
    :'AEK-971',
    :'AK-12',
    :'AUG A3',
    :'CZ-805',
    :'FAMAS',
    :'M16A4',
    :'M416',
    :'QBZ-95-1',
    :'SAR-21',
    :'SCAR-H',
    :'L85A2 (CR)',
    :'F2000 (SA)',
    :'AR-160 (NS)',
    :'Bulldog'
]

primaries[:support] = primaries[:all] + [
    :'U-100 MK5',
    :'Type 88 LMG',
    :'LSAT',
    :'PKP Pecheneg',
    :'QBB-95-1',
    :'M240B',
    :'MG4',
    :'M249',
    :'RPK-12',
    :'RPK-74M',
    :'M60-E4'
]

primaries[:recon] = primaries[:all] + [
    :'CS-LR4',
    :'M40A5',
    :'Scout Elite',
    :'SV-98',
    :'JNG-90',
    :'338-Recon',
    :'M98B',
    :'SRR-61',
    :'FY-JS',
    :'L96A1',
    :'GOL Magnum',
    :'SR338'
]

primaries[:engineer] = primaries[:all] + [
    :'MX4',
    :'PP-2000',
    :'UMP-45',
    :'CBJ-MS',
    :'PDW-R',
    :'CZ-3A1',
    :'JS2',
    :'P90',
    :'UMP-9',
    :'MP7',
    :'AS VAL',
    :'MPX'
]

gadgets = {}

gadgets[:engineer] = [
    [
        :'MBT LAW',
        :'FIM-92 Stinger',
        :'RPG-7V2',
        :'SA-18 Igla',
        :'Mk153 SMAW',
        :'FGM-148 Javelin',
        :'FGM-172 SRAW',
    ],
    :'AA Mine',
    :'Repair Tool',
    :'M15 AT Mine',
    :'EOD Bot',
    :'M2 SLAM'
]

gadgets[:assault] = [
    :'First Aid Pack',
    :'Defibrillator',
    :'Medic Kit',
    [
        :'M320/GP-30',
        :'M26 MASS'
    ]
]

gadgets[:recon] = [
    :'C4 Explosive',
    :'M18 Claymore',
    :'Micro Air Vehicle',
    :'Motion Sensor',
    :'PLD',
    :'Radio Beacon',
    :'SOFLAM',
    :'T-UGS',
    :'SUAV'
]

gadgets[:support] = [
    :'Ammo Box',
    :'Ammo Pack',
    :'C4 Explosive',
    :'M18 Claymore',
    :'M224 Mortar',
    :'MP-APS',
    :'XM25',
    :'UCAV (CR)',
    :'Ballistic Shield'
]

knives = [
    :'Bayonet',
    :'ACB-90',
    :'Shank',
    :'Machete',
    :'Bowie',
    :'Carbon Fiber',
    :'Scout',
    :'Survival',
    :'Trench',
    :'Boot',
    :'SEAL',
    :'Dive',
    :'Tactical',
    :'BJ-2',
    :'Precision'
]

upgrades = {}

upgrades[:all_kit] = [
    :Offensive,
    :Defensive,
    :Shadow
]

upgrades[:assault] = upgrades[:all_kit] + [
    :'Combat Medic',
    :'Grenedier'
]

upgrades[:support] = upgrades[:all_kit] + [
    :'Indirect Fire',
    :'Perimeter Defense'
]

upgrades[:recon] = upgrades[:all_kit] + [
    :'Spec Ops',
    :'Sniper'
]

upgrades[:engineer] = upgrades[:all_kit] + [
    :'Mechanic',
    :'Anti-tank'
]

grenades = [
    :'M67 Frag',
    :'V40 Mini',
    :'RGO Impact',
    :'M34 Incendiary',
    :'M18 Smoke',
    :'M84 Flashbang',
    :'Hand Flare'
]

secondary_weapons = [
    :'QSZ-92',
    :'M9',
    :'MP443',
    :'Compact 45',
    :'CZ-75',
    :'FN57',
    :'P226',
    :'M1911',
    :'Shorty 12G',
    :'G18',
    :'93R',
    :'.44 Magnum',
    :'M412 REX',
    :'Unica 6',
    :'Desert Eagle'
]

class_kits = []
class_kit_subtrees = []

classes.each do |class_name|

    class_kit_hash = {
        "#{class_name}" => {
            title: "Primary Weapon",
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: primaries[class_name]
        },
        "gadgets" => {
            chance_of_multiple: 0,
            min: 2,
            max: 2,
            options: gadgets[class_name]
        },
        "field_upgrades" => {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: upgrades[class_name]
        }
    }

    class_kits.append class_kit_hash
end


GAMES[:battlefield_4] = {
    buy_link: 'http://www.amazon.com/gp/product/B00DS0MQUQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00DS0MQUQ&linkCode=as2&tag=scen-gen-20&linkId=Y4ERT6H7D6E6KCUC',
    site: 'amazon',
    title: 'Battlefield 4',
    generator_title: 'Loadout',
    background: 'bf4.jpg',
    added: Date.strptime('20150323',"%Y%m%d"),
    last_updated: Date.strptime('20150323',"%Y%m%d"),
    columns: {
        character: {
            sub_trees: class_kit_subtrees,
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: class_kits
        },
        secondary_weapon: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: secondary_weapons
        },
        grenades: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: grenades
        },
        knife: {
            chance_of_multiple: 0,
            min: 1,
            max: 1,
            options: knives
        }
    }
}