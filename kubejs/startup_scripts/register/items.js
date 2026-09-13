
StartupEvents.registry('item', event => {

    event.create('wooden_hand')

    event.create('wood_set')
    event.create('stone_set')

    event.create('creative_set')

    event.create('sturdy_sheet_base')
    event.create('bedrock_powder')
    event.create('bedrock_sheet')

    event.create('incomplete_basic_control_circuit')

    // event.create('compression_andesite_alloy')
    // event.create('compression_andesite_alloy_tier_2')
    // event.create('compression_andesite_alloy_tier_3')

    // event.create('compression_iron_ingot')
    // event.create('compression_iron_ingot_tier_2')
    // event.create('compression_iron_ingot_tier_3')

    // event.create('compression_gold_ingot')
    // event.create('compression_gold_ingot_tier_2')
    // event.create('compression_gold_ingot_tier_3')

    // event.create('compression_copper_ingot')
    // event.create('compression_copper_ingot_tier_2')
    // event.create('compression_copper_ingot_tier_3')

    event.create('wooden_mechanical_core')
    event.create('basic_mechine_set')
    event.create('incomplete_basic_mechine_set')

    event.create('copper_mechanical_core')
    event.create('fluid_set')
    event.create('incomplete_fluid_set')
    
    event.create('brass_mechanical_core')
    event.create('smart_mechine_set')
    event.create('incomplete_smart_mechine_set')
        .parentModel('kubejs:item/smart_mechine_set')

    event.create('gearbox_set')
    event.create('incomplete_gearbox_set')

    event.create('mobile_beehive')
        .parentModel('minecraft:block/beehive')

    event.create('incomplete_wooden_hand')
    event.create('incomplete_chain')
    event.create('incomplete_bee_cage')
    event.create('incomplete_super_glue')

    event.create('incomplete_bedrock_mechanism', "create:sequenced_assembly")
    event.create('bedrock_mechanism')

    event.create('incomplete_honey_mechanism', 'create:sequenced_assembly')
        .food(builder => builder.nutrition(1).saturation(2.5).effect('minecraft:saturation', 6000, 0, 1))
    event.create('honey_mechanism')
        .food(builder => builder.nutrition(1).saturation(5).effect('minecraft:saturation', 72000, 0, 1))

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

    event.create('honey_pack')
    event.create('honey_pack_open')
})