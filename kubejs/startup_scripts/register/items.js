
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
        .tag('kubejs:mechanical_cores')
    event.create('basic_mechine_set')
    event.create('incomplete_basic_mechine_set')

    event.create('copper_mechanical_core')
        .tag('kubejs:mechanical_cores')
    event.create('fluid_set')
    event.create('incomplete_fluid_set')
    
    event.create('brass_mechanical_core')
        .tag('kubejs:mechanical_cores')
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
        .tag('kubejs:essences')
    event.create('slime_essence')
        .tag('kubejs:essences')
    event.create('sturdy_essence')
        .tag('kubejs:essences')
    event.create('tree_essence')
        .tag('kubejs:essences')
    event.create('water_essence')
        .tag('kubejs:essences')
    event.create('blaze_essence')
        .tag('kubejs:essences')
    event.create('smart_essence')
        .tag('kubejs:essences')
    event.create('precision_essence')
        .tag('kubejs:essences')
    event.create('iron_essence')
        .tag('kubejs:essences')

    event.create('essence_ingot')
    event.create('essence_sheet')

    event.create('incomplete_essence_mechanism', "create:sequenced_assembly")
    event.create('incomplete_essence_mechanism_2')
    event.create('incomplete_essence_mechanism_3', "create:sequenced_assembly").texture('kubejs:item/incomplete_essence_mechanism_2')
    event.create('essence_mechanism')

    event.create('creative_essence')

    event.create('honey_pack')
    event.create('honey_pack_open')

    event.create('cloud')
    event.create('small_cloud')

    event.create('cloud_ingot')
    event.create('cloud_nugget')
    event.create('cloud_sheet')
    event.create('cloud_rod')
    
    event.create('incomplete_cloud_glue')
    event.create('cloud_glue')
        .tag('kubejs:glues')
        .maxDamage(1000)

    event.create('incomplete_cloud_paxel')
    event.create('cloud_paxel', 'minecraft:paxel')
        .tier('cloud')
        .tag('minecraft:axes')
        .tag('minecraft:pickaxes')
        .tag('minecraft:shovels')

    event.create('incomplete_cloud_mechanism', "create:sequenced_assembly")
    event.create('incomplete_cloud_mechanism_2')
    event.create('cloud_mechanism')

    event.create('cloud_essence')
})

ItemEvents.toolTierRegistry(event => {
    event.add('cloud', tier => {
        tier.setUses(2000)
        tier.setSpeed(100)
        tier.setAttackDamageBonus(2)
        tier.setEnchantmentValue(14)
        tier.setIncorrectBlocksForDropsTag('minecraft:incorrect_for_diamond_tool')
    })
})