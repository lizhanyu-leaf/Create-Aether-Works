BlockEvents.modification(event => {
    event.modify('create:brass_casing', modifications => {
        modifications.setLightEmission(8)
    })
})