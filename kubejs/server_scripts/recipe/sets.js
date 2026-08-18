ServerEvents.recipes(event => {
    const { create } = event.recipes

    
    create.mechanical_crafting(
        'kubejs:wooden_mechanical_core',
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
            a: 'kubejs:wooden_hand'
        }
    )

    create.sequenced_assembly(
        [
            CreateItem.of('kubejs:basic_mechine_set', 0.9),
            CreateItem.of('60x create:deployer', 0.1)
        ],
        ['kubejs:wooden_mechanical_core'],
        [
            create.deploying(
                ['kubejs:incomplete_basic_mechine_set'],
                ['kubejs:incomplete_basic_mechine_set', 'create:andesite_alloy']
            ),

            create.deploying(
                ['kubejs:incomplete_basic_mechine_set'],
                ['kubejs:incomplete_basic_mechine_set', 'create:cogwheel']
            ),

            create.deploying(
                ['kubejs:incomplete_basic_mechine_set'],
                ['kubejs:incomplete_basic_mechine_set', 'create:super_glue']
            ),

            create.deploying(
                ['kubejs:incomplete_basic_mechine_set'],
                ['kubejs:incomplete_basic_mechine_set', 'create:iron_sheet']
            )
        ],
        'kubejs:incomplete_basic_mechine_set', 1
    )

    event.stonecutting(
        Item.of('create:deployer', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_press', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_saw', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_mixer', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_drill', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_harvester', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_plough', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_roller', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:andesite_funnel', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:andesite_tunnel', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:item_vault', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:redstone_link', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:chute', 64),
        'kubejs:basic_mechine_set'
    )

    event.stonecutting(
        Item.of('create:portable_storage_interface', 64),
        'kubejs:basic_mechine_set'
    )

    create.mechanical_crafting(
        'kubejs:copper_mechanical_core',
        [
            'aaaaaaaa',
            'abbbbbba',
            'abbbbbba',
            'abbccbba',
            'abbccbba',
            'abbbbbba',
            'abbbbbba',
            'aaaaaaaa'
        ],
        {
            a: 'create:copper_sheet',
            b: 'create:copper_casing',
            c: 'create:andesite_alloy'
        }
    )

    create.sequenced_assembly(
        [
            CreateItem.of('kubejs:fluid_set', 0.9),
            CreateItem.of('60x create:item_drain', 0.1)
        ],
        ['kubejs:copper_mechanical_core'],
        [
            create.deploying(
                ['kubejs:incomplete_fluid_set'],
                ['kubejs:incomplete_fluid_set', 'create:fluid_pipe']
            ),

            create.deploying(
                ['kubejs:incomplete_fluid_set'],
                ['kubejs:incomplete_fluid_set', 'create:cogwheel']
            ),

            create.deploying(
                ['kubejs:incomplete_fluid_set'],
                ['kubejs:incomplete_fluid_set', 'create:super_glue']
            ),

            create.deploying(
                ['kubejs:incomplete_fluid_set'],
                ['kubejs:incomplete_fluid_set', 'create:spout']
            )
        ],
        'kubejs:incomplete_fluid_set', 1
    )

    event.stonecutting(
        Item.of('create:fluid_tank', 64),
        'kubejs:fluid_set'
    )

    event.stonecutting(
        Item.of('create:fluid_pipe', 64),
        'kubejs:fluid_set'
    )

    event.stonecutting(
        Item.of('create:smart_fluid_pipe', 64),
        'kubejs:fluid_set'
    )

    event.stonecutting(
        Item.of('create:mechanical_pump', 64),
        'kubejs:fluid_set'
    )

    event.stonecutting(
        Item.of('create:copper_valve_handle', 64),
        'kubejs:fluid_set'
    )

    event.stonecutting(
        Item.of('create:item_drain', 64),
        'kubejs:fluid_set'
    )

    event.stonecutting(
        Item.of('create:spout', 64),
        'kubejs:fluid_set'
    )

    event.stonecutting(
        Item.of('create:portable_fluid_interface', 64),
        'kubejs:fluid_set'
    )

    create.mechanical_crafting(
        'kubejs:wood_set',
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
            a: 'minecraft:stripped_oak_log'
        }
    )

    event.stonecutting(
        Item.of('minecraft:stripped_oak_log', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_planks', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_slab', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_stairs', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_fence', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_fence_gate', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_door', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_trapdoor', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_pressure_plate', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_button', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:chest', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:barrel', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:composter', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:oak_boat', 1),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:stick', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:bowl', 64),
        'kubejs:wood_set'
    )

    event.stonecutting(
        Item.of('minecraft:lectern', 64),
        'kubejs:wood_set'
    )
})