let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
let $Direction = Java.loadClass("net.minecraft.core.Direction");
let $CustomData = Java.loadClass("net.minecraft.world.item.component.CustomData");
let $ListTag = Java.loadClass('net.minecraft.nbt.ListTag')

KJSCAutoEvents.basinOperation(event => {
    const { basin, block, level, outputs, recipe, recipeId } = event;
    
    // 1. 检查配方
    if (recipeId.toString() !== "kubejs:compacting/honeycomb_to_block_hidden" && recipeId.toString() !== "kubejs:compacting/comb_to_result_hidden") return;
    
    // 2. 获取 Basin 实体
    let basinEntity = block.entity;
    if (!basinEntity) return;
    
    // 3. 保存实体数据
    let tag = basinEntity.saveWithoutMetadata(level.registryAccess());
    
    // 4. 读取输入物品
    let inputItems = tag.getCompound('InputItems');
    if (!inputItems) return;
    
    let itemsList = inputItems.getList('Items', 10);
    if (itemsList.size() === 0) return;
    
    // 5. 遍历查找输入物品
    let beeType = null;
    let isComb = false;
    
    for (let i = 0; i < itemsList.size(); i++) {
        let itemCompound = itemsList.getCompound(i);
        let id = itemCompound.getString('id');
        
        if (id === 'productivebees:configurable_honeycomb') {
            let components = itemCompound.getCompound('components');
            if (components) {
                beeType = components.getString('productivebees:bee_type');
                isComb = false;
                if (beeType) break;
            }
        }
        
        if (id === 'productivebees:configurable_comb') {
            let components = itemCompound.getCompound('components');
            if (components) {
                beeType = components.getString('productivebees:bee_type');
                isComb = true;
                if (beeType) break;
            }
        }
    }
    
    if (!beeType) return;
    
    // ========== 情况A：蜜脾块 → 直接出产物 ==========
    if (isComb) {
        let dropRecipe = global.recipes.combBlockDrops?.[beeType];
        if (!dropRecipe) return;
        
        outputs.clear();
        
        // 用 CreateItem.of() + rollOutput() 处理概率
        for (let drop of dropRecipe.drops) {
            let createItem = CreateItem.of(
                Item.of(drop.id, drop.count || 1),
                drop.chance || 1.0
            );
            let result = createItem.rollOutput(level.getRandom());
            
            if (!result.isEmpty()) {
                outputs.add(result);
            }
        }
        
        return;
    }
    
    // ========== 情况B：蜜脾 → 正常合成蜜脾块 ==========
    if (outputs.size() > 0) {
        let output = outputs.get(0).copy();
        output.set('productivebees:bee_type', beeType);
        
        outputs.clear();
        outputs.add(output);
    }
});