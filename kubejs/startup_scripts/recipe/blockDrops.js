// 初始化 global 结构
global.recipes ??= {};
global.recipes.blockDrops ??= {};

// ========== 添加配方 ==========
function addBlockDrop(blockId, drops, baseChance, consume) {
    global.recipes.blockDrops[blockId] = {
        drops: drops,
        baseChance: baseChance ?? 1.0,
        consume: consume
    };
}

// ========== 批量添加配方 ==========
function addBlockDrops(recipes) {
    for (let [blockId, config] of Object.entries(recipes)) {
        addBlockDrop(blockId, config.drops, config.baseChance);
    }
}

// ========== 注册所有掉落配方 ==========
function registerBlockDrops() {
    // 泥土的掉落
    addBlockDrop('minecraft:dirt', [
        { id: 'minecraft:cobblestone', chance: 1.0, count: 1 },
        { id: 'minecraft:iron_nugget', chance: 0.5, count: 1 },
        { id: 'create:copper_nugget', chance: 0.3, count: 1 },
        { id: 'create:zinc_nugget', chance: 0.2, count: 1 },
        { id: 'minecraft:gold_nugget', chance: 0.1, count: 1 },
        { id: 'minecraft:string', chance: 0.6, count: 1 },
        { id: 'minecraft:feather', chance: 0.5, count: 1 },
        { id: 'minecraft:clay_ball', chance: 0.5, count: 1 },
    ], 0.75, false);

    addBlockDrop('minecraft:netherrack', [
        { id: 'create:cinder_flour', chance: 1.0, count: 1 },
        { id: 'minecraft:gold_nugget', chance: 0.5, count: 1 },
        { id: 'minecraft:redstone', chance: 0.2, count: 1 },
        { id: 'minecraft:quartz', chance: 0.6, count: 1 },
        { id: 'minecraft:bone', chance: 0.1, count: 1 },
        { id: 'minecraft:crimson_fungus', chance: 0.4, count: 1 },
        { id: 'minecraft:nether_wart', chance: 0.5, count: 1 },
        { id: 'minecraft:blaze_powder', chance: 0.2, count: 1 },
    ], 0.75, false);
}

registerBlockDrops();