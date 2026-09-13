ServerEvents.recipes(event => {
    const { create } = event.recipes

    /**
     * 
     * @param {import("@package/net/minecraft/world/item").$ItemStack_} setItem 
     * @param {import("@package/net/minecraft/world/item").$ItemStack_[]} cutted 
     */
    function setCutting(cutted, setItem) {
        cutted.forEach(item => {
            event.stonecutting(
                item, setItem
            )
        })
    }

    setCutting(
        [
            'kubejs:wood_set',
            'kubejs:stone_set',
            'kubejs:basic_mechine_set',
            'kubejs:gearbox_set',
            'kubejs:fluid_set',
            'kubejs:smart_mechine_set'
        ],
        'kubejs:creative_set'
    )
    
    create.compacting(
        [CreateItem.of('kubejs:wooden_mechanical_core')],
        [Item.of('kubejs:wooden_hand', 64)]
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

    setCutting(
        [
            Item.of('create:portable_storage_interface', 64),
            Item.of('create:chute', 64),
            Item.of('create:redstone_link', 64),
            Item.of('create:item_vault', 64),
            Item.of('create:andesite_tunnel', 64),
            Item.of('create:andesite_funnel', 64),
            Item.of('create:mechanical_roller', 64),
            Item.of('create:mechanical_plough', 64),
            Item.of('create:mechanical_harvester', 64),
            Item.of('create:mechanical_drill', 64),
            Item.of('create:mechanical_mixer', 64),
            Item.of('create:mechanical_saw', 64),
            Item.of('create:mechanical_press', 64),
            Item.of('create:deployer', 64),
            Item.of('create:millstone', 64),
            Item.of('create:hand_crank', 64),
            Item.of('create:nozzle', 64),
            Item.of('create:encased_fan', 64),
            Item.of('create:weighted_ejector', 64),
            Item.of('create:package_frogport', 64),
            Item.of('create:stock_link', 64),
            Item.of('create:stock_ticker', 64),
            Item.of('create:redstone_requester', 64),
            Item.of('create:basin', 64),
            Item.of('create:empty_blaze_burner', 64),
            Item.of('create:redstone_contact', 64),
            Item.of('create:contraption_controls', 64),
            Item.of('create:depot', 64),
            Item.of('create:repackager', 64),
            Item.of('create:packager', 64),
            Item.of('create:mechanical_bearing', 64),
            Item.of('create:factory_gauge', 64),
            Item.of('create:powered_latch', 64),
            Item.of('create:powered_latch', 64),
            Item.of('create:desk_bell', 64)
        ],
        'kubejs:basic_mechine_set'
    )

    create.sequenced_assembly(
        [
            CreateItem.of('kubejs:gearbox_set', 0.9),
            CreateItem.of('60x create:gearbox', 0.1)
        ],
        ['kubejs:wooden_mechanical_core'],
        [
            create.deploying(
                ['kubejs:incomplete_gearbox_set'],
                ['kubejs:incomplete_gearbox_set', 'create:large_cogwheel']
            ),

            create.deploying(
                ['kubejs:incomplete_gearbox_set'],
                ['kubejs:incomplete_gearbox_set', 'create:cogwheel']
            ),

            create.deploying(
                ['kubejs:incomplete_gearbox_set'],
                ['kubejs:incomplete_gearbox_set', 'create:super_glue']
            ),

            create.deploying(
                ['kubejs:incomplete_gearbox_set'],
                ['kubejs:incomplete_gearbox_set', 'create:belt_connector']
            )
        ],
        'kubejs:incomplete_gearbox_set', 1
    )

    setCutting(
        [
            Item.of('create_connected:cross_connector', 64),
            Item.of('create_connected:shear_pin', 64),
            Item.of('create:belt_connector', 64),
            Item.of('create:large_cogwheel', 64),
            Item.of('create:cogwheel', 64),
            Item.of('create:shaft', 64),
            Item.of('create_connected:six_way_gearbox', 64),
            Item.of('create_connected:parallel_gearbox', 64),
            Item.of('create:chain_conveyor', 64),
            Item.of('create:adjustable_chain_gearshift', 64),
            Item.of('create_connected:encased_chain_cogwheel', 64),
            Item.of('create_connected:inverted_clutch', 64),
            Item.of('create_connected:inverted_gearshift', 64),
            Item.of('create:clutch', 64),
            Item.of('create:gearbox', 64),
            Item.of('create:gearshift', 64),
            Item.of('create:encased_chain_drive', 64)
        ],
        'kubejs:gearbox_set'
    )

    // create.mechanical_crafting(
    //     'kubejs:copper_mechanical_core',
    //     [
    //         'aaaaaaaa',
    //         'abbbbbba',
    //         'abbbbbba',
    //         'abbccbba',
    //         'abbccbba',
    //         'abbbbbba',
    //         'abbbbbba',
    //         'aaaaaaaa'
    //     ],
    //     {
    //         a: 'create:copper_sheet',
    //         b: 'create:copper_casing',
    //         c: 'create:andesite_alloy'
    //     }
    // )

    create.compacting(
        [CreateItem.of('kubejs:copper_mechanical_core')],
        [
            Item.of('create:andesite_alloy', 4),
            Item.of('create:copper_casing', 32),
            Item.of('create:copper_sheet', 28),
        ]
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

    setCutting(
        [
            Item.of('create:fluid_tank', 64),
            Item.of('create:fluid_pipe', 64),
            Item.of('create:smart_fluid_pipe', 64),
            Item.of('create:mechanical_pump', 64),
            Item.of('create:copper_valve_handle', 64),
            Item.of('create:item_drain', 64),
            Item.of('create:spout', 64),
            Item.of('create:portable_fluid_interface', 64),
            Item.of('fluidlogistics:water_containing_copper_casing', 64),
            Item.of('fluidlogistics:fluid_pump', 64),
            Item.of('fluidlogistics:smart_hopper', 64),
            Item.of('fluidlogistics:copper_frogport', 64),
            Item.of('fluidlogistics:fluid_transporter', 64),
            Item.of('fluidlogistics:fluid_factory_gauge', 64),
            Item.of('fluidlogistics:fluid_hatch', 64),
            Item.of('fluidlogistics:mechanical_fluid_gun', 64),
            Item.of('fluidlogistics:copper_basin', 64),
            Item.of('fluidlogistics:fluid_inventory_access_port', 64),
            Item.of('fluidlogistics:fluid_packager', 64),
            Item.of('fluidlogistics:smart_faucet', 64),
            Item.of('fluidlogistics:faucet', 64)
        ],
        'kubejs:fluid_set'
    )

    create.compacting(
        [CreateItem.of('kubejs:brass_mechanical_core')],
        [Item.of('create:brass_hand', 64)]
    )

    create.sequenced_assembly(
        [
            CreateItem.of('kubejs:smart_mechine_set', 0.9),
            CreateItem.of('60x create:rotation_speed_controller', 0.1)
        ],
        ['kubejs:brass_mechanical_core'],
        [
            create.deploying(
                ['kubejs:incomplete_smart_mechine_set'],
                ['kubejs:incomplete_smart_mechine_set', 'create:precision_mechanism']
            ),

            create.deploying(
                ['kubejs:incomplete_smart_mechine_set'],
                ['kubejs:incomplete_smart_mechine_set', 'create:electron_tube']
            ),

            create.deploying(
                ['kubejs:incomplete_smart_mechine_set'],
                ['kubejs:incomplete_smart_mechine_set', 'create:super_glue']
            ),

            create.deploying(
                ['kubejs:incomplete_smart_mechine_set'],
                ['kubejs:incomplete_smart_mechine_set', 'create:brass_ingot']
            )
        ],
        'kubejs:incomplete_smart_mechine_set', 1
    )

    setCutting(
        [
            Item.of('create_connected:brass_gearbox', 64),
            Item.of('create_connected:empty_fan_catalyst', 64),
            Item.of('create_connected:brass_chute', 64),
            Item.of('create:content_observer', 64),
            Item.of('create:stockpile_switch', 64),
            Item.of('fluidlogistics:multi_fluid_tank', 64),
            Item.of('create_connected:inventory_access_port', 64),
            Item.of('create_connected:inventory_bridge', 64),
            Item.of('create:mechanical_crafter', 64),
            Item.of('create:smart_chute', 64),
            Item.of('create:rotation_speed_controller', 64),
            Item.of('create:sequenced_gearshift', 64),
            Item.of('create:mechanical_arm', 64),
            Item.of('create:brass_funnel', 64),
            Item.of('create:brass_tunnel', 64),
            Item.of('create_connected:sequenced_pulse_generator', 64)
        ],
        'kubejs:smart_mechine_set'
    )

    create.compacting(
        [CreateItem.of('kubejs:wood_set')],
        [Item.of('minecraft:stripped_oak_log', 64)]
    )

    setCutting(
        [
            Item.of('minecraft:stripped_oak_log', 64),
            Item.of('minecraft:oak_planks', 64),
            Item.of('minecraft:oak_slab', 64),
            Item.of('minecraft:oak_stairs', 64),
            Item.of('minecraft:oak_fence', 64),
            Item.of('minecraft:oak_fence_gate', 64),
            Item.of('minecraft:oak_door', 64),
            Item.of('minecraft:oak_trapdoor', 64),
            Item.of('minecraft:oak_pressure_plate', 64),
            Item.of('minecraft:oak_button', 64),
            Item.of('minecraft:chest', 64),
            Item.of('minecraft:barrel', 64),
            Item.of('minecraft:composter', 64),
            Item.of('minecraft:oak_boat', 1),
            Item.of('minecraft:stick', 64),
            Item.of('minecraft:bowl', 64),
            Item.of('minecraft:lectern', 64)
        ],
        'kubejs:wood_set'
    )

    // create.compacting(
    //     [CreateItem.of('kubejs:stone_set')],
    //     [
    //         Item.of('minecraft:stone', 16),
    //         Item.of('minecraft:deepslate', 16),
    //         Item.of('minecraft:netherrack', 16),
    //         Item.of('minecraft:andesite', 16)
    //     ]
    // )

    event.custom({
        "type": "fluidlogistics:cooling_mixing",
        "ingredients": [
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:stone",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:deepslate",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:netherrack",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },
            {
                "item": "minecraft:andesite",
            },

            {
                "item": "minecraft:andesite",
            },
            {
                "type": "fluid_stack",
                "fluid": "minecraft:lava",
                "amount": 2500
            }
        ],
        "results": [
            {
                "id": "kubejs:stone_set"
            }
        ],
        "supercooled": true
    })

    setCutting(
        [
            Item.of('minecraft:stone', 64),
            Item.of('minecraft:deepslate', 64),
            Item.of('minecraft:netherrack', 64),
            Item.of('minecraft:andesite', 64),
            Item.of('minecraft:granite', 64),
            Item.of('minecraft:diorite', 64),
            Item.of('minecraft:calcite', 64),
            Item.of('minecraft:tuff', 64),
            Item.of('minecraft:magma_block', 64),
            Item.of('minecraft:blackstone', 64),
            Item.of('minecraft:basalt', 64)
        ],
        'kubejs:stone_set'
    )
})