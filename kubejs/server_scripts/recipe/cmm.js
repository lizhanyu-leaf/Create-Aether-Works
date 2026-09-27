ServerEvents.recipes(event => {
    const { create, mekanism } = event.recipes;

    event.remove({mod: 'createmoremachines'})

    create.mixing(
        [Item.of('createmoremachines:beyond_alloy')],
        [
            'kubejs:essence_ingot',
            'kubejs:honey_mechanism',
            'kubejs:bedrock_mechanism'
        ]
    ).superheated()

    mekanism.combining(
        Item.of('createmoremachines:beyond_casing', 4),
        Item.of('create:brass_casing', 4),
        'createmoremachines:beyond_alloy'        
    )

    create.item_application(
        'createmoremachines:beyond_spout',
        ['create:spout', 'createmoremachines:beyond_casing']
    )

    create.item_application(
        'createmoremachines:beyond_basin',
        ['fluidlogistics:copper_basin', 'createmoremachines:beyond_casing']
    )

    create.item_application(
        'createmoremachines:beyond_depot',
        ['create:depot', 'createmoremachines:beyond_casing']
    )

    create.item_application(
        'createmoremachines:beyond_mechanical_press',
        ['create:mechanical_press', 'createmoremachines:beyond_casing']
    )

    create.item_application(
        'createmoremachines:beyond_mechanical_mixer',
        ['create:mechanical_mixer', 'createmoremachines:beyond_casing']
    )
})