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

    create.sequenced_assembly(
        [
            CreateItem.of("kubejs:bedrock_mechanism", .120),
            CreateItem.of("kubejs:bedrock_sheet", .008),
            CreateItem.of("kubejs:bedrock_powder", .008),
            CreateItem.of("create:sturdy_sheet", .005),
            CreateItem.of("minecraft:reinforced_deepslate", .003),
            CreateItem.of("create:powdered_obsidian", .002),
            CreateItem.of("minecraft:deepslate", .002),
            CreateItem.of(Item.of("minecraft:stone", 36), .001),
            CreateItem.of("minecraft:bedrock", .001)
        ],
        "kubejs:bedrock_sheet",
        [
            create.deploying(
                "kubejs:incomplete_bedrock_mechanism",
                ["kubejs:incomplete_bedrock_mechanism", "kubejs:bedrock_powder"]
            ),

            create.deploying(
                "kubejs:incomplete_bedrock_mechanism",
                ["kubejs:incomplete_bedrock_mechanism", "create:powdered_obsidian"]
            ),

            create.deploying(
                "kubejs:incomplete_bedrock_mechanism",
                ["kubejs:incomplete_bedrock_mechanism", "minecraft:reinforced_deepslate"]
            ),

            create.deploying(
                "kubejs:incomplete_bedrock_mechanism",
                ["kubejs:incomplete_bedrock_mechanism", "minecraft:bedrock"]
            ).keepHeldItem(),
        ]
    ).transitionalItem(CreateItem.of("kubejs:incomplete_bedrock_mechanism"))
    .loops(3)

})