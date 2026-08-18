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

    create.mixing(
        [
            Fluid.of('create:honey', 50)
        ],
        [
            'minecraft:honeycomb'
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

})