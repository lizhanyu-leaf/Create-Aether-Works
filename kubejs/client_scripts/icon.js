// client_scripts/item_decorator.js
const $RegisterItemDecorationsEvent = Java.loadClass('net.neoforged.neoforge.client.event.RegisterItemDecorationsEvent');
// IItemDecorator 是接口，我们需要实现它
const $IItemDecorator = Java.loadClass('net.neoforged.neoforge.client.IItemDecorator');

const myDecorator = new $IItemDecorator({
    /**
     * 
     * @param {*} guiGraphics 
     * @param {*} font 
     * @param {$ItemStack} stack 
     * @param {number} x 
     * @param {number} y 
     * @returns 
     */
    render: function(guiGraphics, font, stack, x, y) {
        if (stack.id === 'kubejs:honey_pack') {
            let data = stack.get('minecraft:custom_data');
            if (data == null) return true;
            let tag = data.copyTag();

            if (!tag.contains("BeeType")) return true;

            let beeId = tag.getString("Icon");
            let smallItem = Item.of(`productivebees:spawn_egg_configurable_bee[entity_data={id:"productivebees:configurable_bee",type:"${beeId}"}]`);
            
            let poseStack = guiGraphics.pose();
            poseStack.pushPose();
            
            poseStack.translate(x + 10, y + 10, 0);
            poseStack.scale(0.5, 0.5, 1);
            
            guiGraphics.renderItem(smallItem, 0, 0);
            
            poseStack.popPose();
        }
        return true;
    }
});

// 监听 RegisterItemDecorationsEvent 事件
NativeEvents.onEvent($RegisterItemDecorationsEvent, event => {
    // 将装饰器注册到 'kubejs:honey_pack' 这个物品上
    event.register(Item.of('kubejs:honey_pack').item, myDecorator);
});