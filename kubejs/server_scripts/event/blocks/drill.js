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
            
            var item = CreateItem.of(Item.of(itemId, count), chance).rollOutput(level.getRandom())
            if (!item.isEmpty()) targetBlock.popItemFromFace(item, $Direction.UP)
        }
    }
    
    if (recipe.consume) level.destroyBlock(targetPos, false)
    // 取消原版掉落
    if (recipe.consume || !flag) event.cancel();
});