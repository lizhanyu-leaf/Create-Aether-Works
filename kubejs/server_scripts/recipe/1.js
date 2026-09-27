ServerEvents.recipes(event => {

    const { create } = event.recipes

    event.remove({id: 'create:crafting/materials/andesite_alloy'})
    event.remove({id: 'create:mixing/andesite_alloy'})

    create.deploying(
        ['minecraft:andesite'],
        [
            'minecraft:gravel',
            'minecraft:iron_nugget'
        ]
    )

    create.sequenced_assembly(
        ['minecraft:lava_bucket'],
        ['minecraft:bucket'],
        [
            create.deploying(
                ['minecraft:bucket'],
                ['minecraft:bucket', 'minecraft:cobblestone']
            ),

            create.deploying(
                ['minecraft:bucket'],
                ['minecraft:bucket', 'minecraft:flint_and_steel']
            ),

            create.deploying(
                ['minecraft:bucket'],
                ['minecraft:bucket', 'minecraft:flint_and_steel']
            )
        ],
        'minecraft:bucket', 16
    )

        create.sequenced_assembly(
        ['minecraft:water_bucket'],
        ['minecraft:bucket'],
        [
            create.deploying(
                ['minecraft:bucket'],
                ['minecraft:bucket', 'minecraft:oak_sapling']
            ),

            create.pressing(
                ['minecraft:bucket'],
                ['minecraft:bucket']
            ),

            create.pressing(
                ['minecraft:bucket'],
                ['minecraft:bucket']
            )
        ],
        'minecraft:bucket', 16
    )

    create.pressing(
        ['createaddition:straw'],
        ['createaddition:iron_rod']
    )

    create.filling(
        ['minecraft:blaze_rod'],
        [
            'minecraft:stick',
            Fluid.of('minecraft:lava', 125)
        ]
    )

    create.sequenced_assembly(
        ['minecraft:netherrack'],
        ['minecraft:stone'],
        [
            create.filling(
                ['minecraft:stone'],
                ['minecraft:stone', Fluid.of('minecraft:lava', 25)]
            ),

            create.deploying(
                ['minecraft:stone'],
                ['minecraft:stone', 'minecraft:blaze_powder']
            )
        ],
        'minecraft:stone', 2
    )

    create.sequenced_assembly(
        ['create:blaze_burner'],
        ['create:empty_blaze_burner'],
        [
            create.filling(
                ['create:empty_blaze_burner'],
                ['create:empty_blaze_burner', Fluid.of('minecraft:lava', 125)]
            ),

            create.deploying(
                ['create:empty_blaze_burner'],
                ['create:empty_blaze_burner', 'minecraft:blaze_powder']
            ),

            create.deploying(
                ['create:empty_blaze_burner'],
                ['create:empty_blaze_burner', 'minecraft:blaze_powder']
            ),

            create.deploying(
                ['create:empty_blaze_burner'],
                ['create:empty_blaze_burner', 'minecraft:blaze_rod']
            )
        ],
        'create:empty_blaze_burner', 2
    )

    event.shapeless(
        '2x minecraft:coarse_dirt',
        [
            'minecraft:dirt',
            'minecraft:gravel'
        ]
    )

    create.mixing(
        [
            'minecraft:brown_dye',
            Item.of('minecraft:lime_dye', 2)
        ],
        [
            'minecraft:oak_sapling',
            Fluid.of('minecraft:water', 25)
        ]
    ).heated()

    event.remove({id: 'create:sequenced_assembly/precision_mechanism'})

    create.sequenced_assembly(
        [
            CreateItem.of('create:precision_mechanism', .120),
            CreateItem.of('create:andesite_alloy', .008),
            CreateItem.of('create:golden_sheet', .008),
            CreateItem.of('create:cogwheel', .005),
            CreateItem.of('create:large_cogwheel', .003),
            CreateItem.of('minecraft:slime_ball', .002),
            CreateItem.of('create:zinc_nugget', .002),
            CreateItem.of('minecraft:clock', .001),
            CreateItem.of('create:brass_sheet', .001),
        ],
        ['create:golden_sheet'],
        [
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'create:andesite_alloy']
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'create:zinc_nugget']
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', Ingredient.of('#kubejs:glues')]
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'create:cogwheel']
            )
        ],
        'create:incomplete_precision_mechanism', 3
    )

    event.remove({id: 'create:crafting/kinetics/brass_hand'})

    create.sequenced_assembly(
        [Item.of('create:brass_hand')],
        Ingredient.of('createaddition:zinc_sheet'),
        [
            create.deploying(
                'createaddition:zinc_sheet',
                ['createaddition:zinc_sheet', 'create:brass_ingot']
            ),

            create.deploying(
                'createaddition:zinc_sheet',
                ['createaddition:zinc_sheet', 'createaddition:brass_rod']
            ),

            create.deploying(
                'createaddition:zinc_sheet',
                ['createaddition:zinc_sheet', 'create:brass_nugget']
            ),

            create.deploying(
                'createaddition:zinc_sheet',
                ['createaddition:zinc_sheet', ['createdieselgenerators:hammer', 'kubejs:cloud_paxel']]
            )
        ]
    ).transitionalItem(Item.of('createaddition:zinc_sheet'))
    .loops(1)

    event.remove({id: 'create:crafting/kinetics/deployer'})

    event.shaped(
        'create:deployer',
        [
            'a',
            'b',
            'c'
        ],
        {
            a: 'create:shaft',
            b: 'create:andesite_casing',
            c: 'kubejs:wooden_hand'
        }
    )

    create.sequenced_assembly(
        ['kubejs:wooden_hand'],
        ['create:andesite_alloy'],
        [
            create.deploying(
                ['kubejs:incomplete_wooden_hand'],
                ['kubejs:incomplete_wooden_hand', 'minecraft:stripped_oak_log']
            ),

            create.deploying(
                ['kubejs:incomplete_wooden_hand'],
                ['kubejs:incomplete_wooden_hand', Ingredient.of('#minecraft:axes')]
            ),

            create.deploying(
                ['kubejs:incomplete_wooden_hand'],
                ['kubejs:incomplete_wooden_hand', 'minecraft:oak_slab']
            ),

            create.deploying(
                ['kubejs:incomplete_wooden_hand'],
                ['kubejs:incomplete_wooden_hand', 'minecraft:stick']
            )
        ],
        'kubejs:incomplete_wooden_hand', 1
    )

    event.shaped(
        'kubejs:wooden_hand',
        [
            ' bc',
            'aeb',
            'da '
        ],
        {
            b: 'minecraft:oak_slab',
            e: 'minecraft:oak_button',
            c: 'minecraft:stick',
            d: 'create:andesite_alloy',
            a: 'minecraft:stripped_oak_log'
        }
    )

    event.remove({output: 'minecraft:chain'})

    create.sequenced_assembly(
        ['minecraft:chain'],
        ['minecraft:iron_ingot'],
        [
            create.deploying(
                ['kubejs:incomplete_chain'],
                ['kubejs:incomplete_chain', ['createdieselgenerators:hammer', 'kubejs:cloud_paxel']]
            ),

            create.deploying(
                ['kubejs:incomplete_chain'],
                ['kubejs:incomplete_chain', Ingredient.of('#kubejs:glues')]
            ),

            create.deploying(
                ['kubejs:incomplete_chain'],
                ['kubejs:incomplete_chain', 'minecraft:iron_nugget']
            ),

            create.deploying(
                ['kubejs:incomplete_chain'],
                ['kubejs:incomplete_chain', 'minecraft:iron_nugget']
            )
        ],
        'kubejs:incomplete_chain', 1
    )

    create.pressing(
        [
            'kubejs:wooden_hand',
            CreateItem.of('create:andesite_casing', 0.9)
        ],
        [
            'create:deployer'
        ]
    )

    create.pressing(
        [
            'minecraft:copper_ingot',
            CreateItem.of('create:copper_casing', 0.9)
        ],
        [
            'create:item_drain'
        ]
    )

    create.pressing(
        [
            'kubejs:incomplete_super_glue',
            CreateItem.of(Item.of('minecraft:slime_ball', 2), 0.9)
        ],
        [
            'create:super_glue'
        ]
    )

    event.remove({id: "create:sequenced_assembly/sturdy_sheet"})
    create.compacting(
        [
            Item.of("kubejs:sturdy_sheet_base")
        ],
        [
            Item.of("create:powdered_obsidian"),
            Fluid.of("minecraft:lava", 250)
        ]
    ).heated()

    event.custom({
        "type": "fluidlogistics:cooling_compacting",
        "ingredients": [
            {
                "item": "kubejs:sturdy_sheet_base"
            }
        ],
        "results": [
            {
                "id": "create:sturdy_sheet"
            }
        ],
        "supercooled": false
    })

    event.custom({
        "type": "fluidlogistics:cooling_compacting",
        "ingredients": [
            {
                "type": "fluid_stack",
                "fluid": "fluidlogistics:powder_snow",
                "amount": 250
            },
            {
                "item": "minecraft:slime_ball"
            },
            {
                "item": "minecraft:sugar"
            },
            {
                "item": "minecraft:snowball"
            },
        ],
        "results": [
            {
                "id": "fluidlogistics:frost_cake"
            }
        ],
        "supercooled": false
    })

    create.mixing(
        [
            Item.of("kubejs:bedrock_sheet")
        ],
        [
            Item.of("create:sturdy_sheet"),
            Item.of("kubejs:bedrock_powder", 2),
            Fluid.of("minecraft:lava")
        ]
    ).superheated()

    create.deploying(
        ['kubejs:incomplete_super_glue'],
        ['create:iron_sheet', 'minecraft:iron_nugget']
    )

    create.compacting(
        ['create:blaze_cake_base'],
        [
            'minecraft:slime_ball',
            'minecraft:sugar',
            Item.of('create:cinder_flour', 4)
        ]
    )

    event.remove({id: 'create:crafting/kinetics/metal_girder'})
    create.sequenced_assembly(
        [Item.of('create:metal_girder', 8)],
        Item.of('create:andesite_alloy'),
        [
            create.deploying(
                'create:metal_girder',
                ['create:metal_girder', ['create:andesite_alloy', 'create:metal_girder']]
            ),

            create.deploying(
                'create:metal_girder',
                ['create:metal_girder', ['create:andesite_alloy', 'create:metal_girder']]
            ),

            create.deploying(
                'create:metal_girder',
                ['create:metal_girder', 'create:iron_sheet']
            ),

            create.deploying(
                'create:metal_girder',
                ['create:metal_girder', 'create:iron_sheet']
            )
        ]
    ).transitionalItem('create:metal_girder')
    .loops(1)

    create.crushing(
        [CreateItem.of('kubejs:blaze_essence', 0.1)],
        [Item.of('minecraft:blaze_powder')]
    )

    create.crushing(
        [CreateItem.of('kubejs:natural_essence', 0.1)],
        [Item.of('minecraft:moss_block')]
    )

    create.crushing(
        [CreateItem.of('kubejs:precision_essence', 0.1)],
        [Item.of('create:precision_mechanism')]
    )

    create.crushing(
        [CreateItem.of('kubejs:slime_essence', 0.1)],
        [Item.of('minecraft:slime_ball')]
    )

    create.crushing(
        [CreateItem.of('kubejs:smart_essence', 0.1)],
        [Item.of('create:brass_hand')]
    )

    create.crushing(
        [CreateItem.of('kubejs:sturdy_essence', 0.1)],
        [Item.of('create:powdered_obsidian')]
    )

    create.crushing(
        [CreateItem.of('kubejs:iron_essence', 0.1)],
        [Item.of('create:metal_girder')]
    )

    create.sequenced_assembly(
        ['4x kubejs:water_essence'],
        '#kubejs:essences',
        [
            create.filling(
                'kubejs:water_essence',
                ['kubejs:water_essence', Fluid.of('minecraft:water', 250)]
            ),
            create.filling(
                'kubejs:water_essence',
                ['kubejs:water_essence', Fluid.of('minecraft:water', 250)]
            ),
            create.filling(
                'kubejs:water_essence',
                ['kubejs:water_essence', Fluid.of('minecraft:water', 250)]
            ),
            create.filling(
                'kubejs:water_essence',
                ['kubejs:water_essence', Fluid.of('minecraft:water', 250)]
            )
        ],
    ).transitionalItem('kubejs:water_essence')
    .loops(1)

    create.sequenced_assembly(
        ['fluidlogistics:blaze_cooler'],
        ['create:blaze_burner'],
        [
            create.filling(
                'create:empty_blaze_burner',
                ['create:empty_blaze_burner', Fluid.of('minecraft:water', 250)]
            ),
            create.filling(
                'create:empty_blaze_burner',
                ['create:empty_blaze_burner', Fluid.of('minecraft:water', 250)]
            ),
            create.filling(
                'create:empty_blaze_burner',
                ['create:empty_blaze_burner', Fluid.of('minecraft:water', 250)]
            ),
            create.filling(
                'create:empty_blaze_burner',
                ['create:empty_blaze_burner', Fluid.of('minecraft:water', 250)]
            )
        ],
    ).transitionalItem('create:empty_blaze_burner')
    .loops(1)

    // create.mechanical_crafting(
    //     'kubejs:essence_ingot',
    //     [
    //         'aaaabbbb',
    //         'ccgggidd',
    //         'ccgiiidd',
    //         'eeeeffff'
    //     ],
    //     {
    //         a: 'kubejs:blaze_essence',
    //         b: 'kubejs:natural_essence',
    //         c: 'kubejs:precision_essence',
    //         d: 'kubejs:slime_essence',
    //         e: 'kubejs:smart_essence',
    //         f: 'kubejs:sturdy_essence',
    //         g: 'create:andesite_alloy',
    //         i: 'minecraft:gold_ingot'
    //     }
    // )

    create.mixing(
        [Item.of('kubejs:essence_ingot')],
        [
            Item.of('kubejs:blaze_essence'),
            Item.of('kubejs:natural_essence'),
            Item.of('kubejs:precision_essence'),
            Item.of('kubejs:slime_essence'),
            Item.of('kubejs:smart_essence'),
            Item.of('kubejs:sturdy_essence'),
            Item.of('kubejs:water_essence'),
            Item.of('kubejs:iron_essence'),
            Ingredient.of([
                Item.of('kubejs:wood_set'),
                Item.of('kubejs:stone_set'),
            ])
        ]
    ).heated().processingTime(180)

    create.pressing(
        'kubejs:essence_sheet',
        'kubejs:essence_ingot'
    )

    create.sequenced_assembly(
        [Item.of('kubejs:incomplete_essence_mechanism_2')],
        Ingredient.of('kubejs:essence_sheet'),
        [
            create.deploying(
                'kubejs:incomplete_essence_mechanism',
                ['kubejs:incomplete_essence_mechanism', Item.of('mekanism:basic_tier_installer')]
            ),
            create.deploying(
                'kubejs:incomplete_essence_mechanism',
                ['kubejs:incomplete_essence_mechanism', Item.of('mekanism:advanced_tier_installer')]
            ),
            create.deploying(
                'kubejs:incomplete_essence_mechanism',
                ['kubejs:incomplete_essence_mechanism', Item.of('mekanism:elite_tier_installer')]
            ),
            create.deploying(
                'kubejs:incomplete_essence_mechanism',
                ['kubejs:incomplete_essence_mechanism', Item.of('mekanism:ultimate_tier_installer')]
            )
        ]
    ).transitionalItem(Item.of('kubejs:incomplete_essence_mechanism'))
    .loops(1)

    create.sequenced_assembly(
        [
            CreateItem.of('kubejs:essence_mechanism', .120),
            CreateItem.of('kubejs:incomplete_essence_mechanism_2', .008),
            CreateItem.of('kubejs:essence_sheet', .008),
            CreateItem.of('create_connected:control_chip', .005),
            CreateItem.of('create:transmitter', .003),
            CreateItem.of('kubejs:essence_ingot', .002),
            CreateItem.of('create:copper_sheet', .002),
            CreateItem.of('minecraft:sugar', .001),
            CreateItem.of('create:brass_sheet', .001),
        ],
        Ingredient.of('kubejs:incomplete_essence_mechanism_2'),
        [
            create.deploying(
                'kubejs:incomplete_essence_mechanism_3',
                ['kubejs:incomplete_essence_mechanism_3', Ingredient.of('#kubejs:mechanical_cores')]
            ),
            create.deploying(
                'kubejs:incomplete_essence_mechanism_3',
                ['kubejs:incomplete_essence_mechanism_3', Ingredient.of('#kubejs:burner_cakes')]
            ),
            create.deploying(
                'kubejs:incomplete_essence_mechanism_3',
                ['kubejs:incomplete_essence_mechanism_3', Item.of('create_connected:control_chip')]
            ),
            create.deploying(
                'kubejs:incomplete_essence_mechanism_3',
                ['kubejs:incomplete_essence_mechanism_3', Item.of('create:transmitter')]
            )
        ]
    ).transitionalItem(Item.of('kubejs:incomplete_essence_mechanism_3'))
    .loops(3)

    create.filling(
        [Item.of('create:dough')],
        [Item.of('create:wheat_flour'), Fluid.of('minecraft:water', 250)]
    )

    create.deploying(
        'create:electron_tube',
        ['create:iron_sheet', 'create:polished_rose_quartz']
    )

    event.remove({id: 'create:crushing/obsidian'})
})