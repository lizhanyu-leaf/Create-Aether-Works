ServerEvents.recipes(event => {

    const { create, mekanism } = event.recipes

    event.remove({ mod: "mekanism" })
    event.remove({ mod: "mekmm" })
    event.remove({ type: "mekanism:enriching" })
    event.remove({ type: "mekanism:metallurgic_infusing" })

    create.mechanical_crafting(
        "mekanism:metallurgic_infuser",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: "#c:ingots/iron",
            b: "minecraft:reinforced_deepslate",
            c: "#c:dusts/redstone",
            d: "kubejs:bedrock_mechanism"
        }
    )

    create.mechanical_crafting(
        "mekmm:cnc_stamper",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: "kubejs:bedrock_sheet",
            b: "mekanism:basic_control_circuit",
            c: "create:mechanical_press",
            d: "kubejs:bedrock_mechanism"
        }
    )

    create.mechanical_crafting(
        "mekanism:chemical_injection_chamber",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: "kubejs:bedrock_sheet",
            b: "mekanism:basic_control_circuit",
            c: "create:spout",
            d: "kubejs:bedrock_mechanism"
        }
    )

    create.mechanical_crafting(
        "mekmm:planting_station",
        [
            'aba',
            'ded',
            'aba',
            'dcd',
            'aba'
        ],
        {
            a: "kubejs:bedrock_sheet",
            b: "mekanism:basic_control_circuit",
            c: "minecraft:dirt",
            d: "kubejs:bedrock_mechanism",
            e: "create:spout"
        }
    )
    
    create.mechanical_crafting(
        "mekanism:crusher",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: "kubejs:bedrock_sheet",
            b: "mekanism:basic_control_circuit",
            c: "create:crushing_wheel",
            d: "kubejs:bedrock_mechanism"
        }
    )

    create.mechanical_crafting(
        "mekanism:combiner",
        [
            'aba',
            'cde',
            'aba'
        ],
        {
            a: "kubejs:bedrock_sheet",
            b: "mekanism:basic_control_circuit",
            c: "create:electron_tube",
            d: "kubejs:bedrock_mechanism",
            e: "create:deployer"
        }
    )

    create.mechanical_crafting(
        "mekanism:enrichment_chamber",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: "kubejs:bedrock_sheet",
            b: "mekanism:basic_control_circuit",
            c: "create:electron_tube",
            d: "kubejs:bedrock_mechanism"
        }
    )

    create.mechanical_crafting(
        "mekanism:energized_smelter",
        [
            'aba',
            'cde',
            'aba'
        ],
        {
            a: "kubejs:bedrock_sheet",
            b: "mekanism:basic_control_circuit",
            c: "create:encased_fan",
            d: "kubejs:bedrock_mechanism",
            e: "minecraft:lava_bucket"
        }
    )

    create.mechanical_crafting(
        "mekmm:presser",
        [
            'aca',
            'bdb',
            'aca'
        ],
        {
            a: "create:precision_mechanism",
            b: "kubejs:bedrock_sheet",
            c: "create:mechanical_press",
            d: "mekmm:cnc_stamper"
        }
    )

    create.mechanical_crafting(
        "mekanism:osmium_compressor",
        [
            'aca',
            'cdc',
            'aca'
        ],
        {
            a: "create:precision_mechanism",
            c: "create:mechanical_press",
            d: "mekmm:presser"
        }
    )

    event.custom({
        "type": "mekmm:stamper",
        "input": {
            "count": 2,
            "item": "create:powdered_obsidian"
        },
        "mold": {
            "count": 1,
            "item": "create:mechanical_press"
        },
        "output": {
            "count": 1,
            "id": "create:sturdy_sheet"
        }
    })

    mekanism.metallurgic_infusing(
        "kubejs:bedrock_sheet",
        "create:sturdy_sheet",
        "80x kubejs:bedrock", false
    )

    event.findRecipes({type: "create:pressing"}).forEach(kubeRecipe => {
        let inputs = kubeRecipe.getOriginalRecipeIngredients()
        let output = kubeRecipe.getOriginalRecipeResult()

        event.custom({
            "type": "mekmm:stamper",
            "input": {
                "count": 1,
                "item": inputs.getFirst().getFirst().getId()
            },
            "mold": {
                "count": 1,
                "item": "create:mechanical_press"
            },
            "output": {
                "count": output.getCount(),
                "id": output.getId()
            }
        })
    })

    mekanism.chemical_conversion(
        "80x mekanism:redstone",
        "minecraft:redstone"
    )

    mekanism.chemical_conversion(
        "1000x kubejs:bedrock",
        "minecraft:bedrock"
    )

    mekanism.chemical_conversion(
        "400x kubejs:bedrock",
        "kubejs:bedrock_powder"
    )

    mekanism.chemical_conversion(
        "20x kubejs:slime",
        "minecraft:slime_ball"
    )

    mekanism.chemical_conversion(
        "200x kubejs:slime",
        "minecraft:slime_block"
    )

    event.findRecipes({type: "createaddition:rolling"}).forEach(kubeRecipe => {
        let inputs = kubeRecipe.getOriginalRecipeIngredients()
        let output = kubeRecipe.getOriginalRecipeResult()

        event.custom({
            "type": "mekmm:stamper",
            "input": {
                "count": inputs.getFirst().getFirst().getCount(),
                "item": inputs.getFirst().getFirst().getId()
            },
            "mold": {
                "count": 1,
                "item": "createaddition:rolling_mill"
            },
            "output": {
                "count": output.getCount(),
                "id": output.getId()
            }
        })
    })

    // '#create:sandpaper'

    event.findRecipes({type: 'create:sandpaper_polishing'}).forEach(kubeRecipe => {
        let inputs = kubeRecipe.getOriginalRecipeIngredients()
        let output = kubeRecipe.getOriginalRecipeResult()

        event.custom({
            "type": "mekmm:stamper",
            "input": {
                "count": inputs.getFirst().getFirst().getCount(),
                "item": inputs.getFirst().getFirst().getId()
            },
            "mold": {
                "count": 1,
                "tag": 'create:sandpaper'
            },
            "output": {
                "count": output.getCount(),
                "id": output.getId()
            }
        })
    })

    event.custom({
        "type": "mekmm:pressing",
        "primary_input": {
            "count": 3,
            "tag": "c:plates/brass"
        },
        "secondary_input": {
            "count": 3,
            "tag": "c:plates/gold"
        },
        "tertiary_input": {
            "count": 5,
            "item": "create:cogwheel"
        },
        "output": {
            "count": 1,
            "id": "create:precision_mechanism"
        }
    })

    event.custom({
        "type": "mekmm:pressing",
        "primary_input": {
            "count": 3,
            "tag": "c:nuggets/brass"
        },
        "secondary_input": {
            "count": 3,
            "tag": "c:ingots/brass"
        },
        "tertiary_input": {
            "count": 5,
            "tag": "c:plates/zinc"
        },
        "output": {
            "count": 2,
            "id": "create:brass_hand"
        }
    })

    event.custom({
        "type": "mekmm:pressing",
        "primary_input": {
            "count": 3,
            "item": "create:powdered_obsidian"
        },
        "secondary_input": {
            "count": 3,
            "item": "kubejs:bedrock_sheet"
        },
        "tertiary_input": {
            "count": 5,
            "item": "minecraft:reinforced_deepslate"
        },
        "output": {
            "count": 1,
            "id": "kubejs:bedrock_mechanism"
        }
    })

    event.custom({
        "type": "mekmm:pressing",
        "primary_input": {
            "count": 3,
            "item": "minecraft:lightning_rod"
        },
        "secondary_input": {
            "count": 5,
            "item": "create:copper_sheet"
        },
        "tertiary_input": {
            "count": 3,
            "item": "minecraft:redstone"
        },
        "output": {
            "count": 1,
            "id": "create:transmitter"
        }
    })

    mekanism.chemical_conversion(
        "256x mekanism:light_blue",
        "minecraft:light_blue_dye"
    )

    mekanism.metallurgic_infusing(
        Item.of("mekanism:alloy_reinforced"),
        Item.of("mekanism:alloy_infused"),
        "32x mekanism:light_blue", false
    )

    mekanism.metallurgic_infusing(
        Item.of("mekanism:alloy_atomic"),
        Item.of("mekanism:alloy_reinforced"),
        "320x kubejs:bedrock"
    )

    create.sequenced_assembly(
        [CreateItem.of("kubejs:incomplete_basic_control_circuit")],
        "create:iron_sheet",
        [
            create.deploying(
                "create:iron_sheet",
                ["create:iron_sheet", "create:electron_tube"]
            ),

            create.deploying(
                "create:iron_sheet",
                ["create:iron_sheet", "create:super_glue"]
            )
        ]
    ).transitionalItem("create:iron_sheet")
    .loops(1)

    mekanism.metallurgic_infusing(
        Item.of("mekanism:basic_control_circuit"),
        Item.of("kubejs:incomplete_basic_control_circuit"),
        "240x mekanism:redstone", false
    )

    mekanism.combining(
        Item.of('create:rose_quartz', 1),
        Item.of('minecraft:quartz', 12),
        Item.of('minecraft:redstone', 6)
    )

    mekanism.combining(
        Item.of('kubejs:incomplete_super_glue', 2),
        Item.of('minecraft:iron_nugget', 2),
        Item.of('create:iron_sheet', 3)
    )

    mekanism.combining(
        Item.of('create:electron_tube', 2),
        Item.of('create:polished_rose_quartz', 2),
        Item.of('create:iron_sheet', 3)
    )

    mekanism.metallurgic_infusing(
        Item.of('create:super_glue'),
        Item.of('kubejs:incomplete_super_glue'),
        "100x kubejs:slime", false
    )

    mekanism.metallurgic_infusing(
        Item.of("mekanism:alloy_infused"),
        Item.of("create:andesite_alloy"),
        "240x mekanism:redstone", false
    )

    /**
     * 
     * @param {import("@package/net/minecraft/world/item").$ItemStack_} alloy 
     * @param {import("@package/net/minecraft/world/item").$ItemStack_} input 
     * @param {import("@package/net/minecraft/world/item").$ItemStack_} output 
     */
    function lvlUp(alloy, input, output) {
        create.sequenced_assembly(
            output,
            input,
            [
                create.deploying(input, [input, alloy]),
                create.deploying(input, [input, alloy])
            ]
        ).transitionalItem(input).loops(1)
    }

    lvlUp('mekanism:alloy_infused', 'mekanism:basic_control_circuit', 'mekanism:advanced_control_circuit')
    lvlUp('mekanism:alloy_reinforced', 'mekanism:advanced_control_circuit', 'mekanism:elite_control_circuit')
    lvlUp('mekanism:alloy_atomic', 'mekanism:elite_control_circuit', 'mekanism:ultimate_control_circuit')

    create.deploying(
        Item.of('mekanism:upgrade_speed'),
        [Item.of('mekanism:advanced_control_circuit'), Item.of('minecraft:feather')],
    )

    create.deploying(
        Item.of('mekanism:upgrade_energy'),
        [Item.of('mekanism:advanced_control_circuit'), Item.of('createaddition:capacitor')],
    )

    event.shaped(
        "mekanism:basic_tier_installer",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: '#c:nuggets/iron',
            b: "mekanism:basic_control_circuit",
            c: "kubejs:bedrock_sheet",
            d: "#c:storage_blocks/iron"
        }
    )

    event.shaped(
        "mekanism:advanced_tier_installer",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: '#c:nuggets/brass',
            b: "mekanism:advanced_control_circuit",
            c: "kubejs:bedrock_sheet",
            d: "#c:storage_blocks/iron"
        }
    )

    event.shaped(
        "mekanism:elite_tier_installer",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: "create:precision_mechanism",
            b: "mekanism:elite_control_circuit",
            c: "kubejs:bedrock_sheet",
            d: "#c:storage_blocks/iron"
        }
    )

    event.shaped(
        "mekanism:ultimate_tier_installer",
        [
            'aba',
            'cdc',
            'aba'
        ],
        {
            a: 'kubejs:essence_ingot',
            b: "mekanism:ultimate_control_circuit",
            c: "kubejs:bedrock_sheet",
            d: "#c:storage_blocks/iron"
        }
    )

})