let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
let $Direction = Java.loadClass("net.minecraft.core.Direction");
let $CustomData = Java.loadClass("net.minecraft.world.item.component.CustomData");
let $ListTag = Java.loadClass('net.minecraft.nbt.ListTag')

KJSCAutoEvents.basinOperation(event => {
    const { basin, block, level, outputs, recipe, recipeId } = event;
    
    // 1. 检查配方
    if (recipeId.toString() !== "kubejs:compacting/honeycomb_to_block_hidden") return;
    // level.players.forEach(p => p.sendSystemMessage(1))
    
    // 2. 获取 Basin 实体
    let basinEntity = block.entity;
    if (!basinEntity) return;
    
    // 3. 创建 CompoundTag 并保存实体数据到其中
    let tag = basinEntity.saveWithoutMetadata(level.registryAccess());
    
    // 4. 从 tag 中读取数据
    let inputItems = tag.getCompound('InputItems');
    if (!inputItems) {
        return;
    }
    
    let itemsList = inputItems.getList('Items', 10);
    if (itemsList.size() === 0) return;
    
    // 5. 查找 configurable_honeycomb 并提取 bee_type
    let beeType = null;
    for (let i = 0; i < itemsList.size(); i++) {
        let itemCompound = itemsList.getCompound(i);
        let id = itemCompound.getString('id');
        
        if (id ==='productivebees:configurable_honeycomb') {
            let components = itemCompound.getCompound('components');
            if (components) {
                beeType = components.getString('productivebees:bee_type');
                if (beeType) break;
            }
        }
    }
    
    if (!beeType) return;
    
    // 6. 应用到输出
    if (outputs.size() > 0) {
        let output = outputs.get(0).copy();
        output.set('productivebees:bee_type', beeType)
        
        // 重新设置输出
        outputs.clear()
        outputs.add(output)
    }
});