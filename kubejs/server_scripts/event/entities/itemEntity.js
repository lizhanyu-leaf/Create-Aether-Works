let $Ingredient = Java.loadClass("net.minecraft.world.item.crafting.Ingredient");
let HitResult$Type = Java.loadClass('net.minecraft.world.phys.HitResult$Type');
let $EntityHitResult = Java.loadClass("net.minecraft.world.phys.EntityHitResult")

let $ItemEntity = Java.loadClass('net.minecraft.world.entity.item.ItemEntity');
let $AABB = Java.loadClass('net.minecraft.world.phys.AABB');
let $Vec3 = Java.loadClass('net.minecraft.world.phys.Vec3');
let $Minecraft = Java.loadClass('net.minecraft.client.Minecraft');
let $RecipeType = Java.loadClass('net.minecraft.world.item.crafting.RecipeType');
let $SmeltingRecipe = Java.loadClass('net.minecraft.world.item.crafting.SmeltingRecipe')

/**
 * 获取视线上的最近实体（包括 ItemEntity）
 * @param {Internal.Level_} level
 * @param {Internal.Entity_} viewer
 * @param {Internal.Vec3_} start
 * @param {Internal.Vec3_} end
 * @param {Function} filter - 实体过滤器，返回 boolean
 * @returns {$EntityHitResult}
 */
function rayTraceEntities(level, viewer, start, end, filter) {

    let closestDist = Number.MAX_VALUE;
    let closest = null;

    // 创建检测区域 AABB
    let area = new $AABB(start, end);

    // 获取范围内的所有实体
    let entities = level.getEntities(viewer, area, filter);

    for (let entity of entities) {
        // 获取实体的碰撞箱
        let box = entity.getBoundingBox();

        // ✅ 小实体扩大碰撞箱（物品、经验球等）
        if (box.getSize() < 0.3) {
            box = box.inflate(0.3);
        }

        // ✅ 起点在碰撞箱内 → 直接选中
        if (box.contains(start)) {
            closest = entity;
            break;
        }

        // ✅ 射线相交检测
        let hit = box.clip(start, end);
        if (hit.isPresent()) {
            let hitPoint = hit.get();
            let dist = start.distanceToSqr(hitPoint);
            if (dist < closestDist) {
                closestDist = dist;
                closest = entity;
            }
        }
    }

    // 返回 EntityHitResult 或 null
    if (closest === null) {
        return null;
    }

    // 用 Java 构造函数创建 EntityHitResult
    return new $EntityHitResult(closest);
}

function spawnParticles(level, pos, particleId, count, spread) {
    level.runCommandSilent(
        `particle ${particleId} ${pos.x} ${pos.y + 0.5} ${pos.z} ` +
        `${spread} ${spread} ${spread} 0 ${count}`
    );
}

ItemEvents.rightClicked(event => {
    const { item, level, player } = event

    if (level.isClientSide()) return

    let eye = player.getEyePosition();
    let look = player.getLookAngle();
    let distance = 10.0;
    let end = eye.add(look.x * distance, look.y * distance, look.z * distance);

    // 定义过滤器：只检测物品实体
    let filter = entity => {
        return entity.isItem() && entity !== player;
    };

    // 执行射线检测
    let hitResult = rayTraceEntities(level, player, eye, end, filter);
    let entity = hitResult?.entity

    if (!(entity instanceof $ItemEntity)) return
    if (!entity.isItem()) return
    
    let stack = entity.getItem();

    let result = global.recipes.itemEntityProcessing.result?.[stack.id] || global.recipes.itemEntityProcessing.smelting.result?.[stack.id]
    let tool   = global.recipes.itemEntityProcessing.tool?.[stack.id] || global.recipes.itemEntityProcessing.smelting.tool?.[stack.id]

    if (!tool || !(tool instanceof $Ingredient)) return
    if (!tool.test(item)) return
    if (!result) return

    // ========== 核心修改：计算实际执行次数 ==========
    let groundCount = stack.getCount() // 地面物品数量
    
    // 计算工具可用次数
    let toolUses = 0
    if (item.getMaxDamage() > 0) {
        // 有耐久的工具：剩余耐久 = 最大耐久 - 当前损耗
        toolUses = item.getMaxDamage() - item.getDamageValue()
    } else {
        // 无耐久的工具：可用次数 = 物品数量
        toolUses = item.getCount()
    }

    // 实际执行次数 = 取较小值（地面物品数量 vs 工具可用次数）
    let times = Math.min(groundCount, toolUses)
    
    if (times <= 0) {
        player.tell('§c工具或物品不足！')
        return
    }

    // ========== 批量执行 ==========
    let successCount = 0
    for (let i = 0; i < times; i++) {
        if (Math.random() < (result.chance || 1.0)) {
            successCount++
        }
    }

    // ========== 应用结果 ==========
    if (successCount > 0) {
        // 部分成功：生成产物
        let resultItem = Item.of(result.id, successCount * result.count)
        
        // 如果地面物品全部被消耗，直接替换
        if (times >= groundCount) {
            entity.setItem(resultItem)
        } else {
            // 否则：保留未处理的部分，生成新的物品实体放产物
            let remaining = groundCount - times
            entity.setItem(Item.of(stack.id, remaining))
            
            let newEntity = level.createEntity('minecraft:item')
            newEntity.setItem(resultItem)
            newEntity.setPosition(entity.x, entity.y, entity.z)
            newEntity.spawn()
        }
    } else {
        // 全部失败：物品消失
        entity.setItem(Item.empty())
    }

    spawnParticles(level, entity.position(), 'minecraft:poof', 20, 0.3)

    // ========== 消耗工具 ==========
    if (item.getMaxDamage() > 0) {
        // 有耐久的工具：增加损耗值
        let newDamage = item.getDamageValue() + times
        if (newDamage >= item.getMaxDamage()) {
            // 耐久耗尽，物品消失
            item.setCount(0)
        } else {
            item.setDamageValue(newDamage)
        }
    } else {
        // 无耐久的工具：直接减少数量
        item.setCount(item.getCount() - times)
    }

    // ========== 冷却 ==========
    player.addItemCooldown(item.item, 5 * times)
})

// ServerEvents.loaded(event => {
//     let level = event.server.getLevel('minecraft:overworld');
//     if (!level) return;

//     let recipeManager = level.getRecipeManager();

//     global.recipes.itemEntityProcessing.smelting = {}

//     let allRecipes = recipeManager.getRecipes().forEach(holder => {
//         let recipe = holder.getRecipe()
//         if (recipe.type !== $RecipeType.SMELTING) return;

//         let input = recipe.getIngredients().get(0)
//         let result = recipe.getResultItem(level.registryAccess())

//         let inputItems = input.getItemIds()
//         for (let itemId of inputItems) {
//             global.recipes.itemEntityProcessing.smelting.result[itemId] =
//                 {id: result.id, count: 1, chance: 0.9}
//             global.recipes.itemEntityProcessing.smelting.tool[itemId] = Ingredient.of('minecraft:flint')
//         }
//     })
// })

ServerEvents.recipes(event => {
    global.recipes.itemEntityProcessing.smelting = {}
    global.recipes.itemEntityProcessing.smelting.result = {}
    global.recipes.itemEntityProcessing.smelting.tool = {}
    event.forEachRecipe({type: 'minecraft:smelting'}, recipe => {
        let input = recipe.originalRecipeIngredients.get(0)
        let result = recipe.originalRecipeResult

        let inputItems = input.getItemIds()
        for (let itemId of inputItems) {
            global.recipes.itemEntityProcessing.smelting.result[itemId] =
                {id: result.id, count: 1, chance: 0.9}
            global.recipes.itemEntityProcessing.smelting.tool[itemId] = Ingredient.of('minecraft:flint')
        }
    })
})

let itemFallList = {}
let fallItem = [
    {
        input: 'minecraft:dirt',
        outputs: [
            {id: 'minecraft:dirt', count: 1, chance: 0.95},
            {id: 'minecraft:kelp', count: 1, chance: 0.1},
            {id: 'minecraft:moss_block', count: 1, chance: 0.05},
            {id: 'minecraft:pointed_dripstone', count: 1, chance: 0.01},
            {id: 'minecraft:brown_mushroom', count: 1, chance: 0.02},
            {id: 'minecraft:bamboo', count: 1, chance: 0.05},
            {id: 'minecraft:sugar_cane', count: 1, chance: 0.05},
            {id: 'minecraft:iron_nugget', count: 1, chance: 0.05},
            {id: 'create:copper_nugget', count: 1, chance: 0.02},
            {id: 'create:zinc_nugget', count: 1, chance: 0.01}
        ],
        space: 10
    }
]

EntityEvents.spawned("minecraft:item", event => {
    let itemEntity = event.entity
    if (!itemEntity.isItem()) return

    fallItem.forEach(value => {
        if (itemEntity.item.id !== value.input) return;
        itemEntity.pickUpDelay = 32767
        let count = itemEntity.item.count
        itemFallList[itemEntity.uuid] = {
            y: itemEntity.getY(),
            outputs: value.outputs,
            count: count,
            space: value.space
        }
    })
})

LevelEvents.tick(event => {
    if (event.server.tickCount % 5 != 0) return
    let level = event.level
    if (level.isClientSide()) return
    
    level.getEntities().forEach(entity => {
        if (!entity.isItem()) return;
        for (let key in itemFallList) {
            let fallValue = itemFallList[key]
            if (entity.uuid == key) {
                if (entity.onGround()) {
                    let fallDistance = fallValue.y - entity.getY()
                    
                    if (fallDistance >= fallValue.space) {
                        // ✅ 触发转化
                        for (let output of fallValue.outputs) {
                            if (Math.random() > output.chance) continue;
                            let itemEntity = level.createEntity('minecraft:item')
                            itemEntity.setItem(Item.of(output.id, Math.min(64, output.count * fallValue.count)))
                            itemEntity.setPosition(
                                entity.getX(),
                                entity.getY() + 0.1,
                                entity.getZ()
                            )
                            itemEntity.spawn()
                        }
                        spawnParticles(level, entity.position(), 'minecraft:poof', 20, 0.3)
                        entity.kill()
                    } else {
                        // ✅ 掉落距离不足：恢复正常拾取
                        entity.pickUpDelay = 0  // 立即可以拾取
                    }
                    
                    // ✅ 无论成功还是失败，都停止追踪
                    delete itemFallList[key]
                }
            }
        }
    })
})