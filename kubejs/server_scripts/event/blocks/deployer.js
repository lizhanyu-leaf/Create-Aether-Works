let $DeployerFakePlayer = Java.loadClass("com.simibubi.create.content.kinetics.deployer.DeployerFakePlayer");

let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
let $Direction = Java.loadClass("net.minecraft.core.Direction");
let $CustomData = Java.loadClass("net.minecraft.world.item.component.CustomData");
let $ListTag = Java.loadClass('net.minecraft.nbt.ListTag')

KJSCAutoEvents.deployerUse(event => {
    const { block, level, heldItem, outputs, transportedItem, server, remainder } = event
    
    if (transportedItem.id != 'kubejs:mobile_beehive') return
    if (heldItem.id != 'productivebees:bee_cage') return
    
    // 1. 获取蜜蜂类型
    let data = heldItem.get('minecraft:custom_data')
    let tag = data.copyTag()
    let bee = tag.get('type')
    if (tag.get('entity') != 'productivebees:configurable_bee') {
        bee = tag.get('entity')
    }
    
    // 2. 获取目标物品
    let output = transportedItem.copy()
    let cd = output.get('minecraft:custom_data')
    
    if (cd == null) {
        output.set('minecraft:custom_data', $CustomData.of(new $CompoundTag()))
        cd = output.get('minecraft:custom_data')
    }
    
    // 3. 读取现有蜜蜂 Map
    let beeMap = cd.copyTag().getCompound('Bees')
    
    // 4. 获取蜜蜂数量
    let currentCount = beeMap.getInt(bee)
    
    // 5. 添加蜜蜂（数量 +1）
    beeMap.putInt(bee, currentCount + 1)
    
    // 6. 写回 custom_data，同时更新 lore
    output.set('minecraft:custom_data', output.get('minecraft:custom_data').update(
        tag => {
            tag.put('Bees', beeMap)
        }
    ))
    
    // ========== 7. 更新 lore ==========
    // 先清空旧的 lore
    output.set('minecraft:lore', [])
    
    // 添加标题
    output.update('minecraft:lore', [], c => 
        c.withLineAdded(Component.translate('tooltip.mobile_beehive.contains'))
    )
    
    // 遍历蜜蜂 Map，添加每一行
    for (let beeId of beeMap.getAllKeys()) {
        let count = beeMap.getInt(beeId)
        
        // ✅ 去掉引号并替换冒号
        let cleanId = beeId.replace(/"/g, '').replace(':', '.')
        let beeKey = 'entity.' + cleanId
        if (beeId !== 'minecraft:bee') beeKey += '_bee'
        
        output.update('minecraft:lore', [], c => 
            c.withLineAdded(
                Component.literal(' §7- §f')
                    .append(Component.translate(beeKey))
                    .append(Component.literal(' §7x§e' + count))
            )
        )
    }
    
    outputs.clear()
    outputs.add(output)
})

KJSCAutoEvents.deployerUse(event => {
    const { block, level, heldItem, outputs, transportedItem, server } = event
    
    if (transportedItem.id != 'kubejs:mobile_beehive') return
    if (heldItem.id == 'productivebees:bee_cage') return
    
    // 1. 读取蜜蜂 Map
    let data = transportedItem.getOrDefault('minecraft:custom_data', $CustomData.EMPTY)
    let tag = data.copyTag()
    let beeMap = tag.getCompound('Bees')
    
    // 2. 直接清空 outputs，只保留 transportedItem 本身
    outputs.clear()
    outputs.add(transportedItem)
    
    if (beeMap.isEmpty()) return
    
    // ========== 辅助函数：按 64 拆分添加物品 ==========
    function addStacked(outputs, itemId, totalCount, configureCallback) {
        let remaining = totalCount
        while (remaining > 0) {
            let stackSize = Math.min(remaining, 64)
            let item = Item.of(itemId, stackSize)
            
            if (configureCallback) configureCallback(item)
            
            outputs.add(item)
            remaining -= stackSize
        }
    }
    
    // 3. 遍历每种蜜蜂
    for (let beeId of beeMap.getAllKeys()) {
        let clearId = beeId.replace(/"/g, '')
        let count = beeMap.getInt(beeId)

        console.log("蜜蜂：" + clearId + " 有 " + count + " 个")
        
        let recipe = global.recipes.mobileBeehive?.[clearId]
        if (recipe == null) continue

        console.log("找到配方")
        
        // 检查手持物品是否是需要的花朵
        if (!Ingredient.of(recipe.flower).test(heldItem)) continue
        
        // 概率判定
        if (Math.random() > recipe.chance) continue
        
        // 4. 计算产出：每 4 只蜜蜂 = 1 个蜜脾块，剩余 = 蜜脾
        let blocks = Math.floor(count / 4)
        let combs = count % 4

        console.log("产出方块：" + blocks + "个")
        console.log("产出蜜脾：" + combs + "个")
        
        // ========== 原版蜜蜂特判 ==========
        if (clearId == 'minecraft:bee') {
            // 原版蜜蜂：蜜脾块用 minecraft:honeycomb_block
            if (blocks > 0) {
                addStacked(outputs, 'minecraft:honeycomb_block', blocks)
            }
            if (combs > 0) {
                addStacked(outputs, 'minecraft:honeycomb', combs)
            }
            continue
        }
        
        // ========== 资源蜜蜂 ==========
        // 生成蜜脾块（按 64 拆分）
        if (blocks > 0) {
            addStacked(outputs, 'productivebees:configurable_comb', blocks, item => {
                item.set('productivebees:bee_type', clearId)
            })
        }
        
        // 生成剩余蜜脾（按 64 拆分）
        if (combs > 0) {
            addStacked(outputs, 'productivebees:configurable_honeycomb', combs, item => {
                item.set('productivebees:bee_type', clearId)
            })
        }
    }
})

KJSCAutoEvents.deployerUse(event => {
    const { block, level, heldItem, outputs, transportedItem, server } = event
    
    // 1. 检查被装配的物品是否是蜂蜜机械装置
    if (transportedItem.id != 'kubejs:honey_mechanism') return;
    
    // 2. 检查手持物品是否是蜂蜜包
    if (heldItem.id != 'kubejs:honey_pack') return;

    outputs.clear()
    
    // 3. 获取蜂蜜包的 BeeType
    let data = heldItem.get('minecraft:custom_data')
    if (data == null) {
        outputs.add(Item.of('minecraft:bee_spawn_egg'));
        return;
    }
    
    let tag = data.copyTag()
    let beeType = tag.getString('BeeType')
    
    if (!beeType || beeType.isEmpty()) {
        outputs.add(Item.of('minecraft:bee_spawn_egg'));
        return;
    }
    
    // 4. 生成刷怪蛋
    let spawnEgg = Item.of('productivebees:spawn_egg_configurable_bee')
    spawnEgg.set('entity_data', {
        id: 'productivebees:configurable_bee',
        type: beeType
    })
    
    // 5. 设置输出
    outputs.add(spawnEgg)
    
    console.log(`✅ 蜂蜜机械装配: ${beeType} -> 刷怪蛋`)
})

ServerEvents.recipes(event => {
    let recipes = global.recipes.mobileBeehive
    for (let beeId in recipes) {
        console.log("添加机械养蜂JEI: " + beeId)
        let recipe = recipes[beeId]
        let beeIds = beeId.split(":")
        let id = `productivebees:configurable_honeycomb[productivebees:bee_type="${beeId}"]`
        if (beeId == 'minecraft:bee') id = 'minecraft:honeycomb'
        else {
            beeIds[1] += '_bee'
        }
        

        let beehive = Item.of('kubejs:mobile_beehive')

        beehive.update(
            'minecraft:lore',
            Component.empty(),
            c => c.withLineAdded(Component.translate('tooltip.need_bee'))
                .withLineAdded(Component.translate("entity." + beeIds[0] + "." + beeIds[1]))
        )

        event.recipes.create.deploying(
            [beehive, CreateItem.of(Item.of(id), recipe.chance)],
            [beehive, Ingredient.of(recipe.flower)]
        ).keepHeldItem()
    }
    let item = Item.of('productivebees:spawn_egg_configurable_bee');
    item.setItemName(Component.literal("对应种类蜜蜂,空包则出原版蜜蜂"));
    event.recipes.create.deploying(
        [item],
        [Item.of('kubejs:honey_mechanism'), Item.of('kubejs:honey_pack')]
    )
})

BlockEvents.rightClicked(event => {
    const { block, level, player, item, server } = event
    if (item.isEmpty()) return
    if (player instanceof $DeployerFakePlayer) {
        let recipe = global.recipes.blockDeploying?.[block.id]
        if (recipe == null) return

        if (!item["is(net.minecraft.world.item.Item)"](recipe.heldItem)) return
        item.consume(1, null)
        if (Math.random() > recipe.baseChance) {
            if (recipe.consume) level.destroyBlock(block.pos, false)
            return
        }
        let outputs = []
        recipe.outputs.forEach(d => outputs.push(CreateItem.of(Item.of(d.id, d.count), d.chance)))

        outputs.forEach(output => player.addItem(output.rollOutput(level.getRandom())))

        if (recipe.consume) level.destroyBlock(block.pos, false)
    }
})