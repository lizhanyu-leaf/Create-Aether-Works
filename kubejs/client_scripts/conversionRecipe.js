let conversonRecipeLoaded = false;
JEIAddedEvents.registerCategories(event => {
    if (conversonRecipeLoaded) return;
    const $MysteriousItemConversionCategory = Java.loadClass('com.simibubi.create.compat.jei.category.MysteriousItemConversionCategory')
    const $ConversionRecipe = Java.loadClass('com.simibubi.create.compat.jei.ConversionRecipe')

    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('kubejs:small_cloud'), Item.of('kubejs:cloud')))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('kubejs:incomplete_cloud_mechanism_2'), Item.of('kubejs:cloud_mechanism')))
    conversonRecipeLoaded = true
})