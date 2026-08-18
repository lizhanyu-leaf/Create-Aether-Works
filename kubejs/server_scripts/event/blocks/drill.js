let $Direction = Java.loadClass("net.minecraft.core.Direction");

KJSCAutoEvents.blockDestroy(event => {
    let { level, targetPos, targetBlock, server } = event;
    let blockId = targetBlock.id;
    
    // 查找配方
    let recipe;

    if (blockId == 'productivebees:configurable_comb') {
        let type = targetBlock.entity.components().get('productivebees:bee_type')
        recipe = global.recipes?.combBlockDrops[type]
    } else {
        recipe = global.recipes?.blockDrops?.[blockId]
    }

    if (!recipe) return;
    
    // 整体概率判定
    let baseChance = recipe.baseChance ?? 1.0;
    let flag = Math.random() > baseChance
    
    // 遍历所有掉落物
    if (!flag) {
        let drops = recipe.drops || [];
        for (let drop of drops) {
            let chance = drop.chance ?? 1.0;
            let count = drop.count ?? 1;
            let itemId = drop.id;
            
            // 如果概率命中，生成物品
            if (Math.random() <= chance) {
                // 支持多个数量
                for (let i = 0; i < count; i++) {
                    targetBlock.popItemFromFace(itemId, $Direction.UP);
                }
            }
        }
    }
    
    if (recipe.consume) level.destroyBlock(targetPos, false)
    // 取消原版掉落
    if (recipe.consume || !flag) event.cancel();
});