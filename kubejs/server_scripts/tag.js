ServerEvents.tags('fluid', event => {
    event.add('create:bottomless/allow', 'create:honey')
})

ServerEvents.tags("item", event => {
    event.add('kubejs:burner_cakes', [
        'create:blaze_cake',
        'fluidlogistics:frost_cake'
    ])

    event.add('kubejs:glues', [
        'create:super_glue'
    ])

    event.add('kubejs:dirt/fast', [
        'kubejs:cloud_paxel'
    ])

    event.add('createoreexcavation:drills', [
        'kubejs:essence_mechanism'
    ])
})