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
        ['create:precision_mechanism'],
        ['create:golden_sheet'],
        [
            create.pressing(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism']
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'create:andesite_alloy']
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'create:brass_nugget']
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'create:super_glue']
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'create:cogwheel']
            ),
            create.deploying(
                ['create:incomplete_precision_mechanism'],
                ['create:incomplete_precision_mechanism', 'createaddition:gold_wire']
            ),
        ],
        'create:incomplete_precision_mechanism', 1
    )

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
                ['kubejs:incomplete_chain', 'createdieselgenerators:hammer']
            ),

            create.deploying(
                ['kubejs:incomplete_chain'],
                ['kubejs:incomplete_chain', 'create:super_glue']
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

    create.sequenced_assembly(
        [
            CreateItem.of('fluidlogistics:waterproof_cardboard_block', 0.05),
            CreateItem.of('create:cardboard_block', 0.95)
        ],
        ['create:cardboard_block'],
        [
            create.deploying(
                ['create:cardboard_block'],
                ['create:cardboard_block', 'create:cardboard']
            )
        ],
        'create:cardboard_block', 1
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

    create.deploying(
        ['kubejs:incomplete_super_glue'],
        ['create:iron_sheet', 'minecraft:iron_nugget']
    )
})