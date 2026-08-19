
StartupEvents.registry('item', event => {

    event.create('wooden_hand')

    event.create('wood_set')

    event.create('compression_andesite_alloy')
    event.create('compression_andesite_alloy_tier_2')
    event.create('compression_andesite_alloy_tier_3')

    event.create('compression_iron_ingot')
    event.create('compression_iron_ingot_tier_2')
    event.create('compression_iron_ingot_tier_3')

    event.create('compression_gold_ingot')
    event.create('compression_gold_ingot_tier_2')
    event.create('compression_gold_ingot_tier_3')

    event.create('compression_copper_ingot')
    event.create('compression_copper_ingot_tier_2')
    event.create('compression_copper_ingot_tier_3')

    event.create('wooden_mechanical_core')
    event.create('basic_mechine_set')
    event.create('incomplete_basic_mechine_set')

    event.create('copper_mechanical_core')
    event.create('fluid_set')
    event.create('incomplete_fluid_set')

    event.create('mobile_beehive')
        .parentModel('minecraft:block/beehive')

    event.create('incomplete_wooden_hand')
    event.create('incomplete_chain')
    event.create('incomplete_bee_cage')
    event.create('incomplete_super_glue')

    event.create('natural_essence')
    event.create('slime_essence')
    event.create('sturdy_essence')
    event.create('tree_essence')
    event.create('water_essence')
    event.create('blaze_essence')
    event.create('smart_essence')
    event.create('precision_essence')

    event.create('essence_ingot')
    event.create('essence_sheet')

    event.create('creative_essence')
})