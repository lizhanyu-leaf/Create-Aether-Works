let $LightTexture = Java.loadClass("net.minecraft.client.renderer.LightTexture")
let $OverlayTexture = Java.loadClass("net.minecraft.client.renderer.texture.OverlayTexture")

let $ModelResourceLocation = Java.loadClass("net.minecraft.client.resources.model.ModelResourceLocation")
let $RenderType = Java.loadClass("net.minecraft.client.renderer.RenderType")
let $ProcessingOutput = Java.loadClass('com.simibubi.create.content.processing.recipe.ProcessingOutput')
let $DoubleItemIcon = Java.loadClass('com.simibubi.create.compat.jei.DoubleItemIcon')
let $AllGuiTextures = Java.loadClass('com.simibubi.create.foundation.gui.AllGuiTextures')
let $AnimatedKinetics = Java.loadClass('com.simibubi.create.compat.jei.category.animations.AnimatedKinetics')
let $AllPartialModels = Java.loadClass('com.simibubi.create.AllPartialModels')
let $CreateRecipeCategory = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory');
let $RecipeIngredientRole = Java.loadClass('mezz.jei.api.recipe.RecipeIngredientRole');
let $Minecraft = Java.loadClass('net.minecraft.client.Minecraft')
let $BeeReloadListener = Java.loadClass('cy.jdkdigital.productivebees.setup.BeeReloadListener')
let $PartialModel = Java.loadClass('dev.engine_room.flywheel.lib.model.baked.PartialModel')

// ========== 从 global 获取配方数据并转换为 JEI 格式 ==========
function getBlockDropRecipes() {
    let recipes = [];
    let blockDrops = global.recipes?.blockDrops || {};
    
    for (let [blockId, config] of Object.entries(blockDrops)) {
        let baseChance = config.baseChance || 1.0;
        let consume = config.consume

        let drops = []

        for (let data of config.drops) {
            drops.push(new $ProcessingOutput(Item.of(data.id, data.count), data.chance))
        }
        
        recipes.push({
            block: Item.of(blockId),
            outputs: drops,
            baseChance: baseChance,
            consume: consume
        });
    }
    return recipes;
}

function getCombBlockDropRecipes() {
    let recipes = [];
    let blockDrops = global.recipes?.combBlockDrops || {};
    
    for (let [type, config] of Object.entries(blockDrops)) {
        let baseChance = config.baseChance || 1.0;
        let consume = config.consume

        let drops = []

        for (let data of config.drops) {
            drops.push(new $ProcessingOutput(Item.of(data.id, data.count), data.chance))
        }
        
        recipes.push({
            type: type,
            outputs: drops,
            baseChance: baseChance,
            consume: consume
        });
    }
    return recipes;
}

JEIAddedEvents.registerCategories(event => {
    const { data } = event;
    const jeiHelpers = data.getJeiHelpers();
    const guiHelper = jeiHelpers.getGuiHelper();

    [{id: 'kubejs:block_drops', name: 'block_drops', type: 1}, {id: 'kubejs:comb_block_drops', name: 'comb_block_drops', type: 2}]
    .forEach(d => event.custom(d.id, category => {
        category.title(Component.translate('kubejs.recipe.' + d.name));
        category.setWidth(177);
        category.setHeight(72);
        category.background(guiHelper.createBlankDrawable(178, 72));

        category.icon(new $DoubleItemIcon(
            () => Item.of('createoreexcavation:drill'),
            () => (d.type == 1 ? Item.of('minecraft:dirt') : Item.of('minecraft:honeycomb_block'))
        ))

        category.handleLookup((layoutBuilder, recipe, focuses) => {
            let slot = layoutBuilder.addSlot($RecipeIngredientRole.INPUT, 21, 48)
                .setBackground($CreateRecipeCategory.getRenderedSlot(), -1, -1)
            
            if (d.type == 1) {
                slot.addItemStack(recipe.recipeData.block)
            } else {
                slot.addItemStack(Item.of(`productivebees:configurable_comb[productivebees:bee_type="${recipe.getRecipeData().type}"]`))
            }

            let outputs = recipe.recipeData.outputs;
            let size = outputs.length
            for (let i = 0; i < size; i++) {
                let x = 142 - (size % 2 != 0 && i == size - 1 ? 0 : i % 2 == 0 ? 10 : -9)
                let y =  -19 * Math.floor(i / 2) + 48;
                let output = outputs[i]

                layoutBuilder.addSlot($RecipeIngredientRole.OUTPUT, Math.round(x), Math.round(y))
                    .setBackground($CreateRecipeCategory.getRenderedSlot(output), -1, -1)
                    .addItemStack(output.getStack())
                    .addRichTooltipCallback($CreateRecipeCategory.addStochasticTooltip(output));
            }
        })

        category.setDrawHandler((recipe, recipeSlotsView, graphics, mouseX, mouseY) => {
            $AllGuiTextures.JEI_SHADOW.render(graphics, 46, 29)
            $AllGuiTextures.JEI_SHADOW.render(graphics, 65, 39)
            $AllGuiTextures.JEI_LONG_ARROW.render(graphics, 54, 51)

            let ms = graphics.pose()

            ms.pushPose()
            ms.translate(56, 33, 0)
            ms.mulPose($Axis.XP.rotationDegrees(-12.5))
            ms.mulPose($Axis.YP.rotationDegrees(22.5))

            $AnimatedKinetics["defaultBlockElement(dev.engine_room.flywheel.lib.model.baked.PartialModel)"]
                ($AllPartialModels.DRILL_HEAD)
                    .rotateBlock(0, 0, $AnimatedKinetics.getCurrentAngle() * 8)
                    .scale(24.0)
                    .render(graphics)

            $AnimatedKinetics.defaultBlockElement(Block.getBlock('create:mechanical_drill').defaultBlockState())
                .rotateBlock(0, 180, 0)
                .atLocal(0.0, 0.0, 0.0)
                .scale(24.0)
                .render(graphics)

            // let state = Block.getBlock('minecraft:dirt').defaultBlockState()
            if (d.type === 1) {
                let state = Block.getBlock(recipe.getRecipeData().block).defaultBlockState()

                $AnimatedKinetics.defaultBlockElement(state)
                    .rotateBlock(0, 180, 0)
                    .atLocal(0.0, 0.0, 2.0)
                    .scale(24.0)
                    .render(graphics)
            } else {
                let mc = $Minecraft.getInstance();

                let primaryColor = $BeeReloadListener.INSTANCE.getData(recipe.getRecipeData().type).getInt("primaryColor");

                $AnimatedKinetics.defaultBlockElement('productivebees:configurable_comb')
                    .color(primaryColor)
                    .atLocal(0, 0, 0)
                    .atLocal(0.0, 0.0, 2.0)
                    .scale(24.0)
                    .render(graphics)
            }

            ms.popPose()

            let font = $Minecraft.getInstance().font
            let chanceString = Component.literal(String(recipe.recipeData.baseChance * 100) + '%')
            let width = font.width(chanceString)
            graphics['drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)']
                (font, chanceString, Math.floor((178 - width) / 2), 62, -7829368, false)

            let consumeString
            if (recipe.recipeData.consume) {
                consumeString = Component.translate('kubejs.recipe.consume')
            } else {
                consumeString = Component.translate('kubejs.recipe.not_consume')
            }
            
            graphics['drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)']
                (font, consumeString, 2, 5, -7829368, false)
            
        })
    }))
})

// ========== 注册配方 ==========
JEIAddedEvents.registerRecipes(event => {
    const { data } = event;

    let recipes = getBlockDropRecipes()
    console.log(`添加 kubejs:block_drops JEI 配方: ${recipes.length}`)

    for (let recipeData of recipes) {
        try {
            event.custom('kubejs:block_drops').add(recipeData);
        } catch (e) {
            console.error(`添加配方失败: ${recipeData.input} -> ${recipeData.output}`, e);
        }
    }

    recipes = getCombBlockDropRecipes()
    console.log(`添加 kubejs:comb_block_drops JEI 配方: ${recipes.length}`)

    for (let recipeData of recipes) {
        try {
            event.custom('kubejs:comb_block_drops').add(recipeData);
        } catch (e) {
            console.error(`添加配方失败: ${recipeData.input} -> ${recipeData.output}`, e);
        }
    }
});

JEIAddedEvents.registerRecipeCatalysts(event => {
    const { jeiHelpers } = event.data

    event.data["addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])"]
        (Item.of('create:mechanical_drill'), [
            jeiHelpers.getRecipeType('kubejs:block_drops').get(),
            jeiHelpers.getRecipeType('kubejs:comb_block_drops').get()])
})