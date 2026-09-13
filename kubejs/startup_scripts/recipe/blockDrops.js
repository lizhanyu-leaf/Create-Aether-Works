// 初始化 global 结构
global.recipes ??= {};
global.recipes.blockDrops ??= {};

// ========== 添加配方 ==========
/**
 * 
 * @param {import("@package/net/minecraft/world/item").$ItemStack_} blockId 
 * @param {*} drops 
 * @param {number} baseChance 
 * @param {boolean} consume 
 */
function addBlockDrop(blockId, drops, baseChance, consume) {
    global.recipes.blockDrops[blockId] = {
        drops: drops,
        baseChance: baseChance ?? 1.0,
        consume: consume
    };
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
        { id: 'minecraft:feather', chance: 0.05, count: 1 },
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

    addBlockDrop('minecraft:grass_block', [
        {id: 'minecraft:kelp', count: 1, chance: 0.5},
        {id: 'minecraft:moss_block', count: 1, chance: 0.25},
        {id: 'minecraft:pointed_dripstone', count: 1, chance: 0.05},
        {id: 'minecraft:brown_mushroom', count: 1, chance: 0.1},
        {id: 'minecraft:bamboo', count: 1, chance: 0.25},
        {id: 'minecraft:sugar_cane', count: 1, chance: 0.25},
        {id: 'minecraft:iron_nugget', count: 1, chance: 0.25},
        {id: 'create:copper_nugget', count: 1, chance: 0.1}
    ], 0.75, false)
    
    addBlockDrop('minecraft:obsidian', [
        { id: 'create:powdered_obsidian', chance: 0.35, count: 1 }
    ], 1.0, false)

    addBlockDrop('kubejs:fake_bedrock', [
        { id: 'kubejs:bedrock_powder', chance: 0.05, count: 1 }
    ], 1.0, false);

    addBlockDrop('minecraft:lapis_block', [
        { id: 'minecraft:lapis_lazuli', chance: 1, count: 9 },
        { id: 'minecraft:lapis_lazuli', chance: 0.5, count: 2 },
        { id: 'minecraft:lapis_lazuli', chance: 0.25, count: 4 },
    ], 1.0, true)
}

registerBlockDrops();