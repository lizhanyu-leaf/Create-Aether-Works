ServerEvents.recipes(event => {
    const { create, mekanism, createoreexcavation } = event.recipes

    event.remove({mod: 'createoreexcavation'})

    event.shaped(
        'createoreexcavation:drilling_machine',
        [
            'aba',
            'cdc',
            'eee'
        ],
        {
            a: 'mekanism:ultimate_control_circuit',
            b: 'create:precision_mechanism',
            c: 'kubejs:essence_mechanism',
            d: 'create:mechanical_drill',
            e: 'kubejs:bedrock_mechanism'
        }
    )

    createoreexcavation.vein('{"text": "残云"}', 'kubejs:small_cloud')
        .placement(32, 16, 64825185)
        .id('kubejs:small_cloud')

    createoreexcavation.drilling(
        [
            CreateItem.of(Item.of('kubejs:small_cloud', 2)),
            CreateItem.of(Item.of('kubejs:small_cloud', 5), 0.2),
            CreateItem.of(Item.of('kubejs:small_cloud', 3), 0.1),
        ], 'kubejs:small_cloud', 200 
    ).drill('kubejs:essence_mechanism')
})