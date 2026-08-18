
// ========== 加载必要的 Java 类 ==========
let $AllGuiTextures = Java.loadClass('com.simibubi.create.foundation.gui.AllGuiTextures');
let $DoubleItemIcon = Java.loadClass('com.simibubi.create.compat.jei.DoubleItemIcon')
let $GuiGameElement = Java.loadClass('net.createmod.catnip.gui.element.GuiGameElement');
let $CreateRecipeCategory = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory');
let $RecipeIngredientRole = Java.loadClass('mezz.jei.api.recipe.RecipeIngredientRole');
let $ProcessingOutput = Java.loadClass('com.simibubi.create.content.processing.recipe.ProcessingOutput')
let $AnimationTickHolder = Java.loadClass('net.createmod.catnip.animation.AnimationTickHolder')
let $Axis = Java.loadClass('com.mojang.math.Axis')

let ItemEntityRecipeCategorys = [
    {id: 'kubejs:item_entity_processing', name: "item_entity_processing", getRecipes: () => getItemEntityRecipes(false)
        , icon: () => new $DoubleItemIcon(
                () => Item.of('minecraft:grass_block'),
                () => Item.of('minecraft:stone_pickaxe'))},
    {id: 'kubejs:item_entity_smelting', name: "item_entity_smelting", getRecipes: () => getItemEntityRecipes(true)
        , icon: () => new $DoubleItemIcon(
                () => Item.of('minecraft:grass_block'),
                () => Item.of('minecraft:furnace'))}
]

// ========== 从 global 获取配方数据并转换为 JEI 格式 ==========
function getItemEntityRecipes(isSmelting) {
    let recipes = [];
    let resultData
    let toolData
    if (isSmelting) {
        resultData = global.recipes?.itemEntityProcessing?.smelting?.result || {};
        toolData = global.recipes?.itemEntityProcessing?.smelting?.tool || {};
    } else {
        resultData = global.recipes?.itemEntityProcessing?.result || {};
        toolData = global.recipes?.itemEntityProcessing?.tool || {};
    }
    for (let [itemId, result] of Object.entries(resultData)) {
        let tool = toolData[itemId];
        if (tool) {
            recipes.push({
                input: itemId,
                output: new $ProcessingOutput(Item.of(result.id, result.count), result.chance),
                tool: tool
            });
        }
    }
    return recipes;
}

// ========== 注册 JEI 配方类别 ==========
JEIAddedEvents.registerCategories(event => {
    const { data } = event;
    const jeiHelpers = data.getJeiHelpers();
    const guiHelper = jeiHelpers.getGuiHelper();

    ItemEntityRecipeCategorys.forEach(c => event.custom(c.id, category => {
        console.log(`注册 ${c.id} JEI 类别`)
        category.title(Component.translate('kubejs.recipe.' + c.name));
        category.setWidth(177);
        category.setHeight(75);
        category.background(guiHelper.createBlankDrawable(178, 75));

        // 图标
        category.icon(c.icon());

        // ========== 配方布局 ==========
        
        category.handleLookup((layoutBuilder, recipe, focuses) => {
            let recipeData = recipe.recipeData;
            if (!recipeData) return;

            // 1. 工具槽 (锤子位置)
            layoutBuilder.addSlot($RecipeIngredientRole.INPUT, 27, 29)
                .setBackground($CreateRecipeCategory.getRenderedSlot(), -1, -1)
                .addIngredients(recipeData.tool)

            // 2. 被敲打的物品 (输入)
            layoutBuilder.addSlot($RecipeIngredientRole.INPUT, 27, 49)
                .setBackground($CreateRecipeCategory.getRenderedSlot(), -1, -1)
                .addItemStack(Item.of(recipeData.input));

            layoutBuilder.addSlot($RecipeIngredientRole.OUTPUT, 132, 49)
                .setBackground($CreateRecipeCategory.getRenderedSlot(recipeData.output), -1, -1)
                .addItemStack(recipeData.output.getStack())
                .addRichTooltipCallback($CreateRecipeCategory.addStochasticTooltip(recipeData.output))
        });

        // ========== 自定义绘制（打击动画） ==========
        category.setDrawHandler((recipe, recipeSlotsView, graphics, mouseX, mouseY) => {
            let recipeData = recipe.recipeData;
            if (!recipeData) return;

            // 1. 基础图形
            $AllGuiTextures.JEI_SHADOW.render(graphics, 61, 41);
            $AllGuiTextures.JEI_LONG_ARROW.render(graphics, 52, 52);

            // 2. 工具部分
            let time = (($AnimationTickHolder.getTicks() + $AnimationTickHolder.getPartialTicks()) % 10) / 10;
            time -= 0.5;

            let processingItem = recipeData.input
            let tool = recipeData.tool.getFirst()
            let x = 73
            let y = 20
            let scale = 2;
            
            let ms = graphics.pose()

            ms.pushPose()
            
            ms.translate(x, y, 0);
            ms.scale(scale, scale, 1);

            graphics.renderItem(processingItem, 0, 0)

            ms.pushPose()

            ms.translate(-0.15 * 16, -0.65 * 16, 0);  // 8, -3.2
            ms.scale(0.75, 0.75, 1.1);
            let angle = Math.abs(time * time * time) * 300
            ms.translate(0, 16, 0);
            ms.mulPose($Axis.ZP.rotationDegrees(angle));
            ms.translate(-0, -16, 0);

            graphics.renderItem(tool, 0, 0);
            ms.popPose();

            ms.popPose()
        })
    }))

    console.log('✅ 已注册物品实体处理 JEI 类别');
});

// ========== 注册配方 ==========
JEIAddedEvents.registerRecipes(event => {
    const { data } = event;

    ItemEntityRecipeCategorys.forEach(c => {
        let recipes = c.getRecipes();
        console.log(`添加 ${c.id} JEI 配方: ${recipes.length}`)

        for (let recipeData of recipes) {
            try {
                event.custom(c.id).add(recipeData);
            } catch (e) {
                console.error(`添加配方失败: ${recipeData.input} -> ${recipeData.output}`, e);
            }
        }
    })
});