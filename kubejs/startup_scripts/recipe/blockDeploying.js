// 初始化 global 结构
global.recipes ??= {};
global.recipes.blockDeploying ??= {};

// ========== 添加配方 ==========
/**
 * 
 * @param {import("@package/net/minecraft/world/item").$ItemStack_} blockId 
 * @param {import("@package/net/minecraft/world/item").$ItemStack_} heldItem 
 * @param {*} outputs 
 * @param {number} baseChance 
 * @param {boolean} consume 
 */
function addBlockDeploying(blockId, heldItem, outputs, baseChance, consume) {
    global.recipes.blockDeploying[blockId] = {
        heldItem: heldItem,
        outputs: outputs,
        baseChance: baseChance ?? 1.0,
        consume: consume
    };
}

addBlockDeploying('minecraft:slime_block', 'kubejs:incomplete_super_glue', [
    {id: 'create:super_glue', count: 1, chance: 1.0}
], 1.0, false)