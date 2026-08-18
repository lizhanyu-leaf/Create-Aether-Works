
function addItem(level, player, itemId) {
    let itemEntity = level.createEntity('minecraft:item')
    let pos = player.position();

    itemEntity.mergeNbt(`{Item:{id:"${itemId}",Count:1}}`)
    itemEntity.setPosition(pos.x, pos.y + 0.2, pos.z)

    level.addFreshEntity(itemEntity)
}

function addItemWithChance(level, player, itemId, chance) {
    if (Math.random() > chance) return
    addItem(level, player, itemId)
}

BlockEvents.rightClicked('minecraft:dirt', event => {

    const { block, player, level, item, server } = event

    if (!item.hasTag('minecraft:pickaxes')) return

    if (Math.random() <= 0.5) {
        addItem(level, player, 'minecraft:cobblestone')
        addItemWithChance(level, player, 'minecraft:iron_nugget', 0.5)
        addItemWithChance(level, player, 'minecraft:gold_nugget', 0.1)
        addItemWithChance(level, player, 'create:zinc_nugget', 0.2)

        player.persistentData.putBoolean("quests_right_clicked_dirt", true);
    }

    item.setDamageValue(item.getDamageValue() + 1)
    if (item.getDamageValue() >= item.getMaxDamage()) item.setCount(item.getCount() - 1)
    player.addItemCooldown(item.getItem(), 5)
})

FTBQuestsEvents.customTask('67CA44088136E4BB', event => {
    event.setCheckTimer(20)
    event.setMaxProgress(1)

    event.setCheck((task, player) => {
        let flag = player.persistentData.getBoolean("quests_right_clicked_dirt")
        if (flag) {
            task.setProgress(1)
        }
    })
})