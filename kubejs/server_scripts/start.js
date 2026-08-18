ServerEvents.loaded(event => {
    const { server } = event

    server.runCommandSilent('gamerule lavaSourceConversion true')
    server.runCommandSilent('gamerule waterSourceConversion true')
    server.runCommandSilent('gamerule keepInventory true')

    server.runCommandSilent('gamerule fallDamage false')

    server.runCommandSilent('gamerule mobGriefing false')
    server.runCommandSilent('gamerule doFireTick false')
})