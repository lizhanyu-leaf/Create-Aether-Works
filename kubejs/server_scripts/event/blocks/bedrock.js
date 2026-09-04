BlockEvents.placed('minecraft:bedrock', event => {
    event.block.set('kubejs:fake_bedrock')
})