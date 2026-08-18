let $AllPartialModels = Java.loadClass('com.simibubi.create.AllPartialModels')
let $Boolean = Java.loadClass("java.lang.Boolean")
let $BlockStateProperties = Java.loadClass("net.minecraft.world.level.block.state.properties.BlockStateProperties")
let $AllGuiTextures = Java.loadClass('com.simibubi.create.foundation.gui.AllGuiTextures')
let $DoubleItemIcon = Java.loadClass('com.simibubi.create.compat.jei.DoubleItemIcon')
let $GuiGameElement = Java.loadClass('net.createmod.catnip.gui.element.GuiGameElement')
let $CreateRecipeCategory = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory')
let $RecipeIngredientRole = Java.loadClass('mezz.jei.api.recipe.RecipeIngredientRole')
let $AnimationTickHolder = Java.loadClass('net.createmod.catnip.animation.AnimationTickHolder')
let $Axis = Java.loadClass('com.mojang.math.Axis')
let $Direction = Java.loadClass("net.minecraft.core.Direction")
let $Direction$Axis = Java.loadClass("net.minecraft.core.Direction$Axis")
let $DeployerBlock = Java.loadClass("com.simibubi.create.content.kinetics.deployer.DeployerBlock")

// ========== 从 global 获取配方数据并转换为 JEI 格式 ==========
function getBlockDeployingRecipes() {
    let recipes = [];
    let blockDeploying = global.recipes?.blockDeploying || {};
    
    for (let [blockId, config] of Object.entries(blockDeploying)) {
        let outputs = []

        for (let data of config.outputs) {
            outputs.push(CreateItem.of(Item.of(data.id, data.count), data.chance))
        }
        
        recipes.push({
            block: Item.of(blockId),
            heldItem: config.heldItem,
            outputs: outputs,
            baseChance: config.baseChance,
            consume: config.consume
        })
    }
    return recipes;
}

JEIAddedEvents.registerCategories(event => {
    const { data } = event;
    const jeiHelpers = data.getJeiHelpers();
    const guiHelper = jeiHelpers.getGuiHelper();

    event.custom('kubejs:block_deploying', category => {
        category.title(Component.translate('kubejs.recipe.block_deploying'));
        category.setWidth(177);
        category.setHeight(72);
        category.background(guiHelper.createBlankDrawable(178, 72));

        category.icon(new $DoubleItemIcon(
            () => Item.of('create:deployer'),
            () => Item.of('minecraft:cobblestone')
        ))

        category.handleLookup((layoutBuilder, recipe, focuses) => {
            layoutBuilder.addSlot($RecipeIngredientRole.INPUT, 21, 48)
                .setBackground($CreateRecipeCategory.getRenderedSlot(), -1, -1)
                .addItemStack(recipe.recipeData.block)
        
            layoutBuilder.addSlot($RecipeIngredientRole.INPUT, 21, 28)
                .setBackground($CreateRecipeCategory.getRenderedSlot(), -1, -1)
                .addItemStack(recipe.recipeData.heldItem)

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

            $AnimatedKinetics.defaultBlockElement(Block.getBlock('create:shaft').defaultBlockState()
                .setValue($BlockStateProperties.AXIS, $Direction$Axis.X))
                .rotateBlock($AnimatedKinetics.getCurrentAngle(), 0, 0)
                .scale(20)
                .render(graphics)

            $AnimatedKinetics.defaultBlockElement(Block.getBlock('create:deployer').defaultBlockState()
                .setValue($DeployerBlock.AXIS_ALONG_FIRST_COORDINATE, $Boolean.TRUE))
                .rotateBlock(0, 180, 0)
                .scale(20)
                .render(graphics)

            let cycle = $AnimationTickHolder.getRenderTime() % 30
            let offset = cycle < 10 ? cycle / 10 : cycle < 20 ? (20 - cycle) / 10 : 0

            ms.pushPose()
            ms.translate(0, 0, offset * 17)

            $AnimatedKinetics['defaultBlockElement(dev.engine_room.flywheel.lib.model.baked.PartialModel)']
                ($AllPartialModels.DEPLOYER_POLE)
                .rotateBlock(0, 0, 0)
                .scale(20)
                .render(graphics);

            $AnimatedKinetics['defaultBlockElement(dev.engine_room.flywheel.lib.model.baked.PartialModel)']
                ($AllPartialModels.DEPLOYER_HAND_HOLDING)
                .rotateBlock(0, 0, 0)
                .scale(20)
                .render(graphics);

            ms.popPose()

            let state = Block.getBlock(recipe.recipeData.block).defaultBlockState()

            $AnimatedKinetics.defaultBlockElement(state)
                .rotateBlock(0, 180, 0)
                .atLocal(0.0, 0.0, 2.0)
                .scale(24.0)
                .render(graphics)

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
    })
})

JEIAddedEvents.registerRecipes(event => {
    const { data } = event;
    
    let recipes = getBlockDeployingRecipes()

    for (let recipeData of recipes) {
        try {
            event.custom('kubejs:block_deploying').add(recipeData);
        } catch (e) {
            console.error(`添加配方失败: ${recipeData.input} -> ${recipeData.output}`, e);
        }
    }
})

JEIAddedEvents.registerRecipeCatalysts(event => {
    const { jeiHelpers } = event.data

    event.data["addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])"]
        (Item.of('create:deployer'), [jeiHelpers.getRecipeType('kubejs:block_deploying').get()])
})