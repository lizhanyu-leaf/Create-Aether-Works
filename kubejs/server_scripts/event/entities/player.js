
function check(entity, stack) {
    if (stack.id == 'kubejs:cloud_paxel') {
        stack.setDamageValue(Math.max(0, stack.getDamageValue() - entity.getY()))
    }

    if (stack.id == 'kubejs:cloud_glue') {
        stack.setDamageValue(Math.max(0, stack.getDamageValue() - entity.getY() / 10))
    }
}

PlayerEvents.tick(event => {
    if (event.server.tickCount % 5 != 0) return;

    const { entity } = event
    
    let stack = entity.getMainHandItem()
    let offHand = entity.getOffHandItem()
    
    check(entity, stack)
    check(entity, offHand)
})

PlayerEvents.tick(event => {
    const { player, level } = event
    
    // 每 5 tick 执行一次
    if (player.tickCount % 5 != 0) return
    
    let offHand = player.offHandItem
    let stack = player.mainHandItem
    
    // 检查副手是否是云胶
    if (offHand.id != 'kubejs:cloud_glue') return
    
    // 检查主手物品是否有耐久且已损耗
    if (stack.getMaxDamage() <= 0) return
    if (stack.getDamageValue() <= 0) return
    
    // 云胶必须还有至少 1 点耐久可用
    if (offHand.getDamageValue() >= offHand.getMaxDamage() - 1) return
    
    // 本次最多修复 20 点耐久
    let needRepair = Math.min(stack.getDamageValue(), 20)
    
    // 云胶剩余可用耐久
    let glueRemaining = offHand.getMaxDamage() - offHand.getDamageValue()
    
    // 实际能修复的量 = 取 (需要修复量, 云胶剩余量) 的较小值
    let actualRepair = Math.min(needRepair, glueRemaining)
    
    // 消耗云胶耐久
    offHand.setDamageValue(offHand.getDamageValue() + actualRepair)
    
    // 修复物品
    stack.setDamageValue(stack.getDamageValue() - actualRepair)
})