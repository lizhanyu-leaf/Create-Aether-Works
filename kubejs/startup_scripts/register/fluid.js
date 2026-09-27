StartupEvents.registry("fluid", event => {

    event.create('cloud')
        .noBlock()
        .tint(0xffffff)
        .type(type => type
            .renderType(3)
            .stillTexture('kubejs:block/thick_fluid_still')
            .flowingTexture('kubejs:block/thick_fluid_flow')
        )

})

StartupEvents.registry("mekanism:chemical", event => {

    event.create("bedrock").tint(0x232323)
    event.create("slime").tint(0x76be6d)
})