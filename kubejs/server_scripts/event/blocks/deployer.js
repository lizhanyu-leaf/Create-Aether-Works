let $DeployerFakePlayer = Java.loadClass("com.simibubi.create.content.kinetics.deployer.DeployerFakePlayer");

let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
let $Direction = Java.loadClass("net.minecraft.core.Direction");
let $CustomData = Java.loadClass("net.minecraft.world.item.component.CustomData");
let $ListTag = Java.loadClass('net.minecraft.nbt.ListTag')

KJSCAutoEvents.deployerUse(event => {
    const { block, level, heldItem, outputs, transportedItem, server, remainder } = event
    if (transportedItem.id == 'kubejs:mobile_beehive') {
        if (heldItem.id == 'productivebees:bee_cage') {
            let data = heldItem.get('minecraft:custom_data')

            let tag = data.copyTag()

            let bee = tag.get('type')
            if (tag.get('entity') != 'productivebees:configurable_bee') {
                bee = tag.get('entity')
            }
            
            let output = transportedItem.copy()

            let cd = output.get('minecraft:custom_data')

            if (cd == null) {
                output.set('minecraft:custom_data', $CustomData.of(new $CompoundTag()))
            }

            output.set('minecraft:custom_data', output.get('minecraft:custom_data').update(
                tag => {
                    let lst = tag.getList("Bees", 8)

                    lst.addLast(bee)
                    tag.put("Bees", lst)
                }
            ))

            outputs.clear()
            outputs.add(output)
        } 
        else {
            let data = transportedItem.getOrDefault('minecraft:custom_data', $CustomData.EMPTY)

            let tag = data.copyTag()

            outputs.clear()
            outputs.add(transportedItem)

            let lst = tag.getList("Bees", 8)
            lst.forEach(t => {
                let beeId = t.getAsString()

                let recipe = global.recipes.mobileBeehive?.[beeId]
                if (recipe == null) return

                if (Ingredient.of(recipe.flower).test(heldItem)) {
                    if (Math.random() > recipe.chance) return
                    if (beeId == 'minecraft:bee') {
                        outputs.add(Item.of('minecraft:honeycomb'))
                        return
                    }
                    let output = Item.of('productivebees:configurable_honeycomb')
                    output.set('productivebees:bee_type', beeId)
                    outputs.add(output)
                }
            })
        }
    }
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
})

BlockEvents.rightClicked(event => {
    const { block, level, player, item, server } = event
    if (item.isEmpty()) return
    if (player instanceof $DeployerFakePlayer) {
        let recipe = global.recipes.blockDeploying?.[block.id]
        if (recipe == null) return

        if (!item.is(recipe.heldItem)) return
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