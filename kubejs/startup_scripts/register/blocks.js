StartupEvents.registry("block", event => {
    event.create("fake_bedrock")
        .hardness(50)
        .parentModel("minecraft:block/bedrock")
        .translationKey('block.minecraft.bedrock')
})