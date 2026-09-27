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
                ['kubejs:incomplete_bee_cage', Ingredient.of('#kubejs:glues')]
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
                ['kubejs:incomplete_honey_mechanism', Fluid.of('create:honey', 250)]
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
    .loops(3)

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

    Object.entries(global.recipes.combBlockDrops).forEach(entry => {
        let beeId = entry[0];
        let data = entry[1];

        create.compacting(
            data.drops.map(d => CreateItem.of(Item.of(d.id, d.count), d.chance)),
            Ingredient.of(
                `productivebees:configurable_comb[productivebees:bee_type="${beeId}"]`
            )
        ).superheated()

        create.compacting(
            Item.of(`productivebees:configurable_comb[productivebees:bee_type="${beeId}"]`),
            [
                Ingredient.of(
                    `productivebees:configurable_honeycomb[productivebees:bee_type="${beeId}"]`
                ),
                Ingredient.of(
                    `productivebees:configurable_honeycomb[productivebees:bee_type="${beeId}"]`
                ),
                Ingredient.of(
                    `productivebees:configurable_honeycomb[productivebees:bee_type="${beeId}"]`
                ),
                Ingredient.of(
                    `productivebees:configurable_honeycomb[productivebees:bee_type="${beeId}"]`
                ),
            ]
        )
    })

    let packs = [];

    function honeyPack(beeType, steps, loops) {
        let pack = Item.of(`kubejs:honey_pack[custom_data={BeeType:"${beeType}"}]`);
        pack.setItemName(pack.getDisplayName().copy().append(Component.literal(' - ')).append(Component.translate('entity.' + beeType.replace(':', '.') + '_bee').withColor(0xf3ae22)));

        create.sequenced_assembly(
            [CreateItem.of(pack)],
            [Ingredient.of('kubejs:honey_pack')],
            steps
        ).transitionalItem('kubejs:honey_pack_open')
        .loops(loops)

        packs.push(beeType)
    }

    create.deploying(
        ['minecraft:bee_spawn_egg'],
        [Item.of('kubejs:honey_pack'), Item.of('kubejs:honey_mechanism')]
    )

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

    honeyPack("productivebees:oak_log", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:wood_set']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:wood_set']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:wood_set']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:wood_set']
        )
    ], 1)

    honeyPack("productivebees:stone", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:stone_set']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:stone_set']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:stone_set']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'kubejs:stone_set']
        )
    ], 1)

    honeyPack("productivebees:slimy", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:slime_ball']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:slime_ball']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:slime_ball']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:slime_block']
        ).keepHeldItem()
    ], 16)

    honeyPack("productivebees:blazing", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:blaze_powder']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:blaze_powder']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:blaze_rod']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:blaze_rod']
        )
    ], 16)

    honeyPack("productivebees:redstone", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:redstone']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:redstone']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:redstone_block']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:redstone_block']
        )
    ], 16)

    honeyPack("productivebees:crystalline", [
        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:quartz']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:quartz']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:quartz_block']
        ),

        create.deploying(
            'kubejs:honey_pack_open',
            ['kubejs:honey_pack_open', 'minecraft:quartz_block']
        )
    ], 16)

    packs.forEach(type => {
        create.deploying(
            [Item.of(`productivebees:spawn_egg_configurable_bee[entity_data={id:"productivebees:configurable_bee",type:"${type}"}]`)],
            [Ingredient.of('kubejs:honey_mechanism'), Ingredient.of(`kubejs:honey_pack[custom_data={BeeType:"${type}"}]`)]
        )
    })

    // 'kubejs:honey_pack[custom_data={BeeType:"productivebees:andesite_alloy"},item_name='{"color":"white","extra":[" - ",{"color":"#F3AE22","translate":"entity.productivebees.andesite_alloy_bee"}],"hoverEvent":{"action":"show_item","contents":{"components":{"minecraft:custom_data":{"BeeType":"productivebees:andesite_alloy"}},"count":1,"id":"kubejs:honey_pack"}},"translate":"chat.square_brackets","with":[{"extra":[{"translate":"item.kubejs.honey_pack"}],"text":""}]}']'
})