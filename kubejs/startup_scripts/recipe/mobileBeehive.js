// 初始化 global 结构
global.recipes ??= {};
global.recipes.mobileBeehive ??= {};
global.recipes.combBlockDrops ??= {};

// ========== 添加钻头配方 ==========
function addCombBlockDrop(blockType, drops, baseChance, consume) {
    global.recipes.combBlockDrops[blockType] = {
        drops: drops,
        baseChance: baseChance ?? 1.0,
        consume: consume
    };
}

// ========== 添加蜜蜂和花朵 ==========
function addMobileBeehive(flower, beeId, chance) {
    console.log("机械养蜂配方添加到 global : " + beeId)
    global.recipes.mobileBeehive[beeId] = {
        flower: flower,
        chance: chance
    };
}

addMobileBeehive('create:brass_block', 'productivebees:brass', 1.0)
addMobileBeehive('create:zinc_block', 'productivebees:zinc', 1.0)
addMobileBeehive('minecraft:iron_block', 'productivebees:iron', 1.0)
addMobileBeehive('minecraft:gold_block', 'productivebees:gold', 1.0)
addMobileBeehive('minecraft:copper_block', 'productivebees:copper', 1.0)
addMobileBeehive('minecraft:oak_log', 'productivebees:oak_log', 1.0)
addMobileBeehive('minecraft:stone', 'productivebees:stone', 1.0)
addMobileBeehive('minecraft:slime_block', 'productivebees:slimy', 1.0)
addMobileBeehive('minecraft:blaze_powder', 'productivebees:blazing', 1.0)
addMobileBeehive('#minecraft:flowers', 'minecraft:bee', 1.0)

addCombBlockDrop('productivebees:brass', [
    { id: 'create:brass_ingot', count: 2, chance: 1.0 },
    { id: 'create:brass_ingot', count: 1, chance: 0.2 },
    { id: 'create:brass_ingot', count: 1, chance: 0.2 },
    { id: 'create:brass_nugget', count: 1, chance: 0.5 },
    { id: 'create:brass_nugget', count: 1, chance: 0.5 },
    { id: 'create:brass_nugget', count: 1, chance: 0.5 },
    { id: 'create:brass_nugget', count: 1, chance: 0.5 },
    { id: 'create:brass_nugget', count: 1, chance: 0.5 },
    { id: 'create:brass_nugget', count: 1, chance: 0.5 },
], 1.0, true)
addCombBlockDrop('productivebees:zinc', [
    { id: 'create:zinc_ingot', count: 2, chance: 1.0 },
    { id: 'create:zinc_ingot', count: 1, chance: 0.2 },
    { id: 'create:zinc_ingot', count: 1, chance: 0.2 },
    { id: 'create:zinc_nugget', count: 1, chance: 0.5 },
    { id: 'create:zinc_nugget', count: 1, chance: 0.5 },
    { id: 'create:zinc_nugget', count: 1, chance: 0.5 },
    { id: 'create:zinc_nugget', count: 1, chance: 0.5 },
    { id: 'create:zinc_nugget', count: 1, chance: 0.5 },
    { id: 'create:zinc_nugget', count: 1, chance: 0.5 },
], 1.0, true)
addCombBlockDrop('productivebees:iron', [
    { id: 'minecraft:iron_ingot', count: 2, chance: 1.0 },
    { id: 'minecraft:iron_ingot', count: 1, chance: 0.2 },
    { id: 'minecraft:iron_ingot', count: 1, chance: 0.2 },
    { id: 'minecraft:iron_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:iron_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:iron_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:iron_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:iron_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:iron_nugget', count: 1, chance: 0.5 },
], 1.0, true)
addCombBlockDrop('productivebees:gold', [
    { id: 'minecraft:gold_ingot', count: 2, chance: 1.0 },
    { id: 'minecraft:gold_ingot', count: 1, chance: 0.2 },
    { id: 'minecraft:gold_ingot', count: 1, chance: 0.2 },
    { id: 'minecraft:gold_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:gold_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:gold_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:gold_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:gold_nugget', count: 1, chance: 0.5 },
    { id: 'minecraft:gold_nugget', count: 1, chance: 0.5 },
], 1.0, true)
addCombBlockDrop('productivebees:copper', [
    { id: 'minecraft:copper_ingot', count: 2, chance: 1.0 },
    { id: 'minecraft:copper_ingot', count: 1, chance: 0.2 },
    { id: 'minecraft:copper_ingot', count: 1, chance: 0.2 },
    { id: 'create:copper_nugget', count: 1, chance: 0.5 },
    { id: 'create:copper_nugget', count: 1, chance: 0.5 },
    { id: 'create:copper_nugget', count: 1, chance: 0.5 },
    { id: 'create:copper_nugget', count: 1, chance: 0.5 },
    { id: 'create:copper_nugget', count: 1, chance: 0.5 },
    { id: 'create:copper_nugget', count: 1, chance: 0.5 },
], 1.0, true)
addCombBlockDrop('productivebees:oak_log', [
    { id: 'minecraft:oak_log', count: 3, chance: 1.0 },
    { id: 'minecraft:stripped_oak_log', count: 2, chance: 0.2 },
    { id: 'minecraft:oak_log', count: 2, chance: 0.2 },
    { id: 'minecraft:oak_log', count: 1, chance: 0.2 },
    { id: 'minecraft:stripped_oak_log', count: 1, chance: 0.1 },
    { id: 'minecraft:stripped_oak_log', count: 1, chance: 0.1 }
], 1.0, true)
addCombBlockDrop('productivebees:stone', [
    { id: 'minecraft:stone', count: 3, chance: 1.0 },
    { id: 'minecraft:cobblestone', count: 2, chance: 0.2 },
    { id: 'minecraft:stone', count: 2, chance: 0.2 },
    { id: 'minecraft:stone', count: 1, chance: 0.2 },
    { id: 'minecraft:cobblestone', count: 1, chance: 0.1 },
    { id: 'minecraft:cobblestone', count: 1, chance: 0.1 }
], 1.0, true)
addCombBlockDrop('productivebees:slimy', [
    { id: 'minecraft:slime_ball', count: 3, chance: 1.0 },
    { id: 'minecraft:slime_ball', count: 2, chance: 0.2 },
    { id: 'minecraft:slime_ball', count: 2, chance: 0.2 },
    { id: 'minecraft:slime_ball', count: 1, chance: 0.2 },
    { id: 'minecraft:slime_block', count: 1, chance: 0.1 },
    { id: 'minecraft:slime_ball', count: 1, chance: 0.1 }
], 1.0, true)
addCombBlockDrop('productivebees:blazing', [
    { id: 'minecraft:blaze_rod', count: 3, chance: 1.0 },
    { id: 'minecraft:blaze_powder', count: 2, chance: 0.2 },
    { id: 'minecraft:blaze_rod', count: 2, chance: 0.2 },
    { id: 'minecraft:blaze_rod', count: 1, chance: 0.2 },
    { id: 'minecraft:blaze_powder', count: 1, chance: 0.1 },
    { id: 'minecraft:blaze_powder', count: 1, chance: 0.1 }
], 1.0, true)