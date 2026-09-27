ServerEvents.recipes(event => {
    const { create, mekanism } = event.recipes

    create.mixing(
        [Fluid.of('kubejs:cloud', 125)],
        [Item.of('kubejs:cloud', 2)]
    ).processingTime(90).heated()

    event.custom({
        "type": "fluidlogistics:cooling_compacting",
        "ingredients": [
            {
                "type": "fluid_stack",
                "fluid": "kubejs:cloud",
                "amount": 250
            }
        ],
        "results": [
            {
                "id": "kubejs:cloud_sheet"
            }
        ],
        "supercooled": true
    })

    event.shaped(
        Item.of('kubejs:cloud_ingot', 2),
        [
            'a',
            'a'
        ],
        {
            a: 'kubejs:cloud_sheet'
        }
    )

    event.shapeless(
        Item.of('kubejs:cloud_nugget', 4),
        [
            'kubejs:cloud_ingot'
        ]
    )

    event.shaped(
        Item.of('kubejs:cloud_ingot'),
        [
            'aa',
            'aa'
        ],
        {
            a: 'kubejs:cloud_nugget'
        }
    )

    create.pressing(
        Item.of('kubejs:cloud_sheet'),
        Item.of('kubejs:cloud_ingot')
    )

    event.custom({
        "type": "createaddition:rolling",
        "ingredients": [
            {
                "item": "kubejs:cloud_ingot"
            }
        ],
        "results": [
            {
                "count": 2,
                "id": "kubejs:cloud_rod"
            }
        ]
    })

    create.deploying(
        Item.of('kubejs:incomplete_cloud_glue'),
        [Item.of('kubejs:cloud_sheet'), Item.of('kubejs:cloud_nugget')]
    )

    create.filling(
        Item.of('kubejs:cloud_glue'),
        [Item.of('kubejs:incomplete_cloud_glue'), Fluid.of('kubejs:cloud', 250)]
    )

    create.sequenced_assembly(
        Item.of('kubejs:cloud_paxel'),
        Ingredient.of('kubejs:cloud_rod'),
        [
            create.deploying(
                'kubejs:incomplete_cloud_paxel',
                ['kubejs:incomplete_cloud_paxel', 'kubejs:cloud_glue']
            ),
            create.deploying(
                'kubejs:incomplete_cloud_paxel',
                ['kubejs:incomplete_cloud_paxel', 'kubejs:cloud_sheet']
            ),
            create.deploying(
                'kubejs:incomplete_cloud_paxel',
                ['kubejs:incomplete_cloud_paxel', 'kubejs:cloud_nugget']
            ),
            create.deploying(
                'kubejs:incomplete_cloud_paxel',
                ['kubejs:incomplete_cloud_paxel', 'kubejs:cloud_ingot']
            )
        ]
    ).transitionalItem('kubejs:incomplete_cloud_paxel')
    .loops(1)

    create.sequenced_assembly(
        [
            CreateItem.of('kubejs:incomplete_cloud_mechanism_2', .120),
            CreateItem.of('kubejs:cloud_sheet', .008),
            CreateItem.of('kubejs:cloud_ingot', .008),
            CreateItem.of('kubejs:cloud_nugget', .005),
            CreateItem.of('kubejs:cloud_rod', .003),
            CreateItem.of('kubejs:incomplete_cloud_glue', .002),
            CreateItem.of('kubejs:cloud', .002),
            CreateItem.of('kubejs:cloud_glue', .001),
            CreateItem.of('kubejs:small_cloud', .001),
        ],
        Ingredient.of('kubejs:cloud_sheet'),
        [
            create.deploying(
                'kubejs:incomplete_cloud_mechanism',
                ['kubejs:incomplete_cloud_mechanism', 'kubejs:cloud_nugget']
            ),
            create.deploying(
                'kubejs:incomplete_cloud_mechanism',
                ['kubejs:incomplete_cloud_mechanism', 'kubejs:cloud_glue']
            ),
            create.filling(
                'kubejs:incomplete_cloud_mechanism',
                ['kubejs:incomplete_cloud_mechanism', Fluid.of('kubejs:cloud', 250)]
            ),
            create.deploying(
                'kubejs:incomplete_cloud_mechanism',
                ['kubejs:incomplete_cloud_mechanism', 'kubejs:cloud_paxel']
            )
        ]
    ).transitionalItem('kubejs:incomplete_cloud_mechanism')
    .loops(3)

    mekanism.combining(
        Item.of('kubejs:cloud_essence'),
        Item.of('kubejs:cloud'),
        Item.of('kubejs:cloud_mechanism')
    )

})