RecipeViewerEvents.removeCategories(event => {
    event.remove('productivebees:advanced_beehive')
    event.remove('productivebees:bee_breeding')
    event.remove('productivebees:bee_conversion')
    event.remove('productivebees:bee_fishing')
    event.remove('productivebees:bee_flowering')
    event.remove('productivebees:bee_spawning')
    event.remove('productivebees:block_centrifuge')
    event.remove('productivebees:block_conversion')
    event.remove('productivebees:bottler')
    event.remove('productivebees:centrifuge')
    event.remove('productivebees:incubation')
    event.remove('productivebees:item_conversion')

    event.remove('createoreexcavation:drilling')
    event.remove('createoreexcavation:extracting')
    event.remove('createoreexcavation:vein')
})

RecipeViewerEvents.removeRecipes(event => {
    event.remove([
        'kubejs:compaction/honeycomb_to_block_hidden'
    ])
})