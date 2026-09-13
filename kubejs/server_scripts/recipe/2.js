ServerEvents.recipes(event => {

    const { create } = event.recipes

    event.remove({mod: 'productivebees'})

    create.sequenced_assembly(
        [CreateItem.of('productivebees:bee_cage', 1.0)],
        [Ingredient.of('#minecraft:wooden_slabs')],
        [
            create.cutting(
                ['kubejs:incomplete_bee_cage'],
                ['kubejs:incomplete_bee_cage']
            ),

            create.deploying(
                ['kubejs:incomplete_bee_cage'],
                ['kubejs:incomplete_bee_cage', 'minecraft:honeycomb']
            ),

            create.deploying(
                ['kubejs:incomplete_bee_cage'],
                ['kubejs:incomplete_bee_cage', 'create:super_glue']
            ),

            create.deploying(
                ['kubejs:incomplete_bee_cage'],
                ['kubejs:incomplete_bee_cage', Ingredient.of('#minecraft:wooden_slabs')]
            )
        ],
        'kubejs:incomplete_bee_cage', 1
    )

    create.sequenced_assembly(
        [
            CreateItem.of('kubejs:honey_mechanism', .120),
            CreateItem.of('createaddition:honey_cake', .008),
            CreateItem.of('createaddition:cake_base_baked', .008),
            CreateItem.of('minecraft:honey_block', .005),
            CreateItem.of('productivebees:wax', .003),
            CreateItem.of('minecraft:honeycomb', .002),
            CreateItem.of('minecraft:honeycomb_block', .002),
            CreateItem.of('minecraft:sugar', .001),
            CreateItem.of('create:dough', .001),
        ],
        'create:dough',
        [
            create.filling(
                'kubejs:incomplete_honey_mechanism',
                ['kubejs:incomplete_honey_mechanism', Fluid.of('create:honey', 750)]
            ),

            create.deploying(
                'kubejs:incomplete_honey_mechanism',
                ['kubejs:incomplete_honey_mechanism', 'minecraft:sugar']
            ),

            create.deploying(
                'kubejs:incomplete_honey_mechanism',
                ['kubejs:incomplete_honey_mechanism', 'minecraft:honey_block']
            ).keepHeldItem(),
        ],
    ).transitionalItem('kubejs:incomplete_honey_mechanism')
    .loops(5)

    create.mixing(
        [
            Fluid.of('create:honey', 50)
        ],
        [
            'minecraft:honeycomb'
        ]
    ).heated().processingTime(45)

    create.mixing(
        [
            Fluid.of('create:honey', 200)
        ],
        [
            'minecraft:honeycomb_block'
        ]
    ).heated().processingTime(45)

    create.pressing(
        ['kubejs:mobile_beehive'],
        ['minecraft:beehive']
    )

    create.deploying(
        ['kubejs:mobile_beehive'],
        ['kubejs:mobile_beehive', 'productivebees:bee_cage']
    )

    create.compacting(
        ['productivebees:configurable_comb'],
        ['4x productivebees:configurable_honeycomb']
    ).id('kubejs:compacting/honeycomb_to_block_hidden')

    create.compacting(
        ['productivebees:configurable_comb'],
        ['productivebees:configurable_comb']
    ).superheated().id('kubejs:compacting/comb_to_result_hidden')

    function honeyPack(beeType, steps, loops) {
        let pack = Item.of(`kubejs:honey_pack[custom_data={BeeType:"${beeType}"}]`);
        pack.setItemName(pack.getDisplayName().copy().append(Component.literal(' - ')).append(Component.translate('entity.' + beeType.replace(':', '.') + '_bee').withColor(0xf3ae22)));

        create.sequenced_assembly(
            [CreateItem.of(pack)],
            [Ingredient.of('kubejs:honey_pack')],
            steps
        ).transitionalItem('kubejs:honey_pack_open')
        .loops(loops)
    }

    create.cutting(
        [Item.of('kubejs:honey_pack', 4)],
        [Item.of('kubejs:honey_mechanism')]
    )

    honeyPack("productivebees:iron", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:iron_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:iron_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:iron_sheet']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:iron_sheet']
        )
    ], 16)

    honeyPack("productivebees:gold", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:gold_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:gold_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:golden_sheet']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:golden_sheet']
        )
    ], 16)

    honeyPack("productivebees:copper", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:copper_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:copper_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:copper_sheet']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:copper_sheet']
        )
    ], 16)

    honeyPack("productivebees:zinc", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:zinc_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:zinc_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'createaddition:zinc_sheet']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'createaddition:zinc_sheet']
        )
    ], 16)

    honeyPack("productivebees:brass", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:brass_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:brass_ingot']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:brass_sheet']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:brass_sheet']
        )
    ], 16)

    honeyPack("productivebees:andesite_alloy", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:andesite_alloy']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:andesite_alloy']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:andesite_alloy']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'create:andesite_alloy']
        )
    ], 16)

})