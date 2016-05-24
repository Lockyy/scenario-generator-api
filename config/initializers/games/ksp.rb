GAMES[:kerbal_space_program] = {
    buy_link: 'http://www.greenmangaming.com/s/gb/en/pc/games/simulation/kerbal-space-program/',
    site: 'gmg',
    title: 'Kerbal Space Program',
    generator_title: 'Challenge',
    background: 'ksp.jpg',
    columns: {
        target_body: {
            sub_trees: [
                :goal_for_kerbol,
                :goal_for_moho,
                :goal_for_eve,
                :goal_for_gilly,
                :goal_for_kerbin,
                :goal_for_the_mun,
                :goal_for_minmus,
                :goal_for_duna,
                :goal_for_ike,
                :goal_for_dres,
                :goal_for_jool,
                :goal_for_laythe,
                :goal_for_vall,
                :goal_for_tylo,
                :goal_for_bop,
                :goal_for_pol,
                :goal_for_eeloo,
                :goal_for_an_asteroid
            ],
            chance_of_multiple: 5,
            min: 1,
            max: 8,
            options: [
                {
                    :'Kerbol' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Achieve a geosynchronous orbit above Kerbol',
                            :'Construct a Space Station in orbit of Kerbol',
                            :"Enter Kerbol's sphere of influence",
                            :'Kill a Kerbal on the surface of the sun',
                            :'Achieve orbit and return safely to Kerbin'
                        ]
                    }
                },
                {
                    :'Moho' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Construct a Multi-Part Ship on or above Moho',
                            :'Construct a Space Station in orbit',
                            :"Enter Moho's sphere of influence",
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Moho',
                            :'Visit and return',
                            :'Land on and return',
                            :'Plant a flag',
                            :'Construct a base',
                            :'Land a rover on the surface',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Moho in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Eve' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Achieve a geosynchronous orbit above Eve',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Construct a Multi-Part Ship on or above Eve',
                            :'Construct a Space Station in orbit',
                            :"Enter Eve's sphere of influence",
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Eve',
                            :'Visit and return',
                            :'Land on and return',
                            :'Plant a flag',
                            :'Construct a base',
                            :'Land a rover on the surface',
                            :'Send a plane to Eve',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Eve in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Gilly' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Construct a Space Station',
                            :"Enter Gilly's sphere of influence",
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Gilly',
                            :'Visit and return from Gilly',
                            :'Land on and return',
                            :'Plant a flag',
                            :'Construct a base',
                            :'Land a rover on the surface',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Gilly in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Kerbin' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous',
                            :'Perform a rendevous and dock two ships',
                            :'Achieve a geosynchronous orbit above Kerbin',
                            :'Put a satellite in orbit',
                            :'Send a capsule to the north pole',
                            :'Send a capsule to the south pole',
                            :'Land a plane on the island airstrip',
                            :'Discover an anomaly',
                            :'Construct a space station in orbit over multiple launches',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from orbit with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to the launchpad',
                            :'Construct a base at the north pole',
                            :'Send a rover to the north pole',
                            :'Construct a base at the south pole',
                            :'Send a rover to the south pole',
                            :"Leave Kerbin's sphere of influence"
                        ]
                    }
                },
                {
                    :'Mun' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Land a rover on the Mun',
                            :'Discover an anomaly',
                            :'Construct a space station in orbit',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from the Mun with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to the Mun in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Minmus' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve orbit with a jetpack',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Land a rover on Minmus',
                            :'Construct a space station in orbit',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from the Mun with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Minmus in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Duna' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous',
                            :'Perform a rendevous and dock two ships',
                            :'Achieve a geosynchronous orbit above Duna',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Send a plane to Duna',
                            :'Construct a space station in orbit over multiple launches',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from orbit with a different ship to the one that put him there',
                            :'Land a rover on Duna',
                            :'Construct a base',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Duna in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Ike' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Construct a space station in orbit over multiple launches',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from orbit with a different ship to the one that put him there',
                            :'Land a rover on Ike',
                            :'Construct a base',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Ike in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Dres' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Construct a space station in orbit over multiple launches',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from orbit with a different ship to the one that put him there',
                            :'Land a rover on Dres',
                            :'Construct a base',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Dres in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Jool' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous',
                            :'Perform a rendevous and dock two ships',
                            :'Achieve a geosynchronous orbit above Jool',
                            :'Put a satellite in orbit',
                            :'Construct a space station in orbit over multiple launches',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from orbit with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Jool in one trip'
                        ]
                    }
                },
                {
                    :'Laythe' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Send a capsule with a Kerbal to Laythe',
                            :'Construct a space station in orbit over multiple launches',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from orbit with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Construct a base',
                            :'Land a boat on Laythe',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Laythe in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Vall' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Land a rover on the Vall',
                            :'Construct a space station in orbit',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Vall with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin'
                        ]
                    }
                },
                {
                    :'Tylo' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Land a rover on the Tylo',
                            :'Construct a space station in orbit',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Tylo with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin'
                        ]
                    }
                },
                {
                    :'Bop' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Land a rover on Bop',
                            :'Construct a space station in orbit',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Bop with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin'
                        ]
                    }
                },
                {
                    :'Pol' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Land a rover on Pol',
                            :'Construct a space station in orbit',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Pol with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin'
                        ]
                    }
                },
                {
                    :'Eeloo' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Achieve orbit',
                            :'Achieve an equatorial orbit',
                            :'Achieve a polar orbit',
                            :'Perform a rendevous between two ships',
                            :'Perform a rendevous and dock two ships',
                            :'Put a satellite in orbit',
                            :'Land a capsule containing a Kerbal',
                            :'Land a rover on Eeloo',
                            :'Construct a space station in orbit',
                            :'Kill a Kerbal in style',
                            :'Rescue a Kerbal from Eeloo with a different ship to the one that put him there',
                            :'Achieve orbit and return safely to Kerbin',
                            :'Bring 10 Kerbals from Kerbin (orbit or ground) to Eeloo in one trip',
                            :'Establish a permanent ground base'
                        ]
                    }
                },
                {
                    :'Asteroid' => {
                        title: 'Goal',
                        chance_of_multiple: 25,
                        min: 1,
                        max: 5,
                        options: [
                            :'Perform a rendevous with an asteroid',
                            :'Land a capsule containing a Kerbal on an asteroid',
                            :'Land a rover on an asteroid',
                            :'Kill a Kerbal in style on an asteroid',
                            :'Perform a rendevous with an asteroid and return to Kerbin',
                            :'Crash an asteroid into a planet',
                            :'Bring an asteroid back to Kerbin',
                            :'Bring an asteroid back to Kerbin and put it in a stable orbit',
                            :'Bring an asteroid back to Kerbin and put it in a stable orbit, construct a space station around it',
                            :'Dock with an asteroid',
                            :'Destroy a building at the KSC using an asteroid'
                        ]
                    }
                }
            ]
        }
    }
}