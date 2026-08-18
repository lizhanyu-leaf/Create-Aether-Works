ServerEvents.recipes(event => {
    const { create } = event.recipes

    /**
     * 
     * @param {import("@package/net/minecraft/world/item").$ItemStack_} input 
     * @param {import("@package/net/minecraft/world/item").$ItemStack_} output 
     */
    function compression(input, output) {
        create.mechanical_crafting(
            output,
            [
                'aaaaaaaa',
                'aaaaaaaa',
                'aaaaaaaa',
                'aaaaaaaa'
            ],
            {
                a: input
            }
        )
    }

    compression('minecraft:iron_ingot', 'kubejs:compression_iron_ingot')
    compression('kubejs:compression_iron_ingot', 'kubejs:compression_iron_ingot_tier_2')
    compression('kubejs:compression_iron_ingot_tier_2', 'kubejs:compression_iron_ingot_tier_3')

    compression('minecraft:gold_ingot', 'kubejs:compression_gold_ingot')
    compression('kubejs:compression_gold_ingot', 'kubejs:compression_gold_ingot_tier_2')
    compression('kubejs:compression_gold_ingot_tier_2', 'kubejs:compression_gold_ingot_tier_3')

    compression('minecraft:copper_ingot', 'kubejs:compression_copper_ingot')
    compression('kubejs:compression_copper_ingot', 'kubejs:compression_copper_ingot_tier_2')
    compression('kubejs:compression_copper_ingot_tier_2', 'kubejs:compression_copper_ingot_tier_3')

    compression('create:andesite_alloy', 'kubejs:compression_andesite_alloy')
    compression('kubejs:compression_andesite_alloy', 'kubejs:compression_andesite_alloy_tier_2')
    compression('kubejs:compression_andesite_alloy_tier_2', 'kubejs:compression_andesite_alloy_tier_3')
})