Ponder.tags(event => {
    event.createTag(
        'kubejs:construction_sticks',
        'constructionstick:iron_stick',
        "",
        "",
        [
            "constructionstick:wooden_stick",
            "constructionstick:copper_stick",
            "constructionstick:iron_stick",
            "constructionstick:diamond_stick",
            "constructionstick:netherite_stick"
        ]
    )
})

Ponder.registry(event => {
    event.create([
            "constructionstick:wooden_stick",
            "constructionstick:copper_stick",
            "constructionstick:iron_stick",
            "constructionstick:diamond_stick",
            "constructionstick:netherite_stick"
        ]).scene("scene_1", "", (scene, util) => {
            
            scene.showBasePlate()

            scene.world.setBlocks([2, 1, 1, 3, 1, 3], "create:andesite_casing", true);
            for (let x = 2; x < 4; x++) {
                for (let z = 1; z < 4; z++) {
                    scene.world.showSection([x, 1, z], Facing.DOWN);
                }
                // Idle can be used to create animations.
                scene.idle(3);
            }

            scene.idle(20);

            scene.text(30, "建筑棒可以批量放置方块。", [2.5, 2.5, 2.5]);

            scene.idle(40);

            scene.showControls(10, [1, 1, 2.5], "left")
                .rightClick()
                .withItem("constructionstick:iron_stick")

            scene.idle(25);

            scene.world.setBlocks([1, 1, 1, 1, 1, 3], "create:andesite_casing", true);
            for (let z = 1; z < 4; z++) {
                scene.world.showSection([1, 1, z], Facing.DOWN);
                scene.idle(2)
            }

            scene.idle(25);

            scene.text(30, "不同等级的建筑棒能够放置的方块上限不同。", [2.5, 2.5, 2.5]);

            scene.idle(50);

            scene.text(25, "木质建筑棒一次最多放置3个方块。", [2.5, 2.5, 2.5]);

            scene.idle(35);

            scene.showControls(10, [3.5, 2, 3.5], "down")
                .rightClick()
                .withItem("constructionstick:wooden_stick")

            scene.idle(20);

            scene.world.setBlocks([3, 2, 1, 3, 2, 3], "create:andesite_casing", true);
            for (let z = 1; z < 4; z++) {
                scene.world.showSection([3, 2, z], Facing.DOWN);
                scene.idle(2)
            }

            scene.text(25, "铜质建筑棒一次最多放置9个方块。", [2.5, 2.5, 2.5]);

            scene.idle(35);

            scene.showControls(10, [3.5, 2, 3.5], "down")
                .rightClick()
                .withItem("constructionstick:copper_stick")

            scene.idle(20);

            scene.world.setBlocks([1, 2, 1, 2, 2, 3], "create:andesite_casing", true);
            for (let x = 1; x < 3; x++) {
                for (let z = 1; z < 4; z++) {
                    scene.world.showSection([x, 2, z], Facing.DOWN);
                }
                scene.idle(2);
            }

            scene.text(25, "而铁质建筑棒一次最多放置27个方块。", [2.5, 2.5, 2.5]);

            scene.idle(35);

            scene.showControls(10, [2.5, 3, 2.5], "down")
                .rightClick()
                .withItem("constructionstick:iron_stick")

            scene.idle(20);

            scene.world.setBlocks([1, 3, 1, 3, 3, 3], "create:andesite_casing", true);
            for (let x = 1; x < 4; x++) {
                for (let z = 1; z < 4; z++) {
                    scene.world.showSection([x, 3, z], Facing.DOWN);
                }
                scene.idle(3);
            }

            scene.idle(10);
    })
})