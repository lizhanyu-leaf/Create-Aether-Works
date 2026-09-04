ServerEvents.recipes(event => {

    const { create } = event.recipes

    event.remove({ output: 'minecraft:reinforced_deepslate' })

    create.mechanical_crafting(
        'minecraft:deepslate',
        [
            'aaaaaa',
            'aaaaaa',
            'aaaaaa',
            'aaaaaa',
            'aaaaaa',
            'aaaaaa'
        ],
        {
            a: 'minecraft:stone'
        }
    )

    create.mechanical_crafting(
        'minecraft:bedrock',
        [
            'aaaaaaaa',
            'aaaaaaaa',
            'aaaaaaaa',
            'aaaaaaaa',
            'aaaaaaaa',
            'aaaaaaaa',
            'aaaaaaaa',
            'aaaaaaaa'
        ],
        {
            a: 'minecraft:reinforced_deepslate'
        }
    )

})