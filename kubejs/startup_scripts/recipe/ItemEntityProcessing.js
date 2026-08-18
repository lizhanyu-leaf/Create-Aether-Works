global.recipes ??= {};
global.recipes.itemEntityProcessing ??= {};
global.recipes.itemEntityProcessing.result ??= {};
global.recipes.itemEntityProcessing.tool ??= {};

/**
 * 
 * @param {import("@package/net/minecraft/world/item/crafting").$Ingredient} tool 
 * @param {import("@package/net/minecraft/world/item").$ItemStack} item 
 * @param {import("@package/net/minecraft/world/item").$ItemStack} result 
 */

function addItemEntityProcessing(tool, item, result, chance) {
    global.recipes.itemEntityProcessing.result[item.id] = {
        id: result.id,
        count: result.getCount(),
        chance: chance
    };
    global.recipes.itemEntityProcessing.tool[item.id] = tool;
}

addItemEntityProcessing(Ingredient.of('#minecraft:pickaxes'), Item.of('minecraft:cobblestone'), Item.of('minecraft:gravel'), 1)
addItemEntityProcessing(Ingredient.of('minecraft:iron_nugget'), Item.of('minecraft:gravel'), Item.of('minecraft:andesite'), 0.9)