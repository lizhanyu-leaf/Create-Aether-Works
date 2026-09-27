let $ItemTooltipEvent = Java.loadClass('net.neoforged.neoforge.event.entity.player.ItemTooltipEvent')
let $ItemDescription = Java.loadClass('com.simibubi.create.foundation.item.ItemDescription')
let $Palette = Java.loadClass('net.createmod.catnip.lang.FontHelper$Palette')

// ========== 条目数据 ==========
let entries = []

function addTooltip(targetId, isTag, summaryEn, summaryZh, behaviours) {
    entries.push({
        targetId: targetId,
        tag: isTag,
        summaryEn: summaryEn,
        summaryZh: summaryZh,
        behaviours: behaviours || []
    })
}

// ========== 注册条目 ==========
addTooltip('kubejs:incomplete_honey_mechanism', false,
    'A half-finished delicacy made by _hardworking bees_. Though incomplete, it is still quite tasty.',
    '由_辛勤劳作的蜜蜂_制成的半成品美食，虽未完成，但已足够美味。',
    []
)

addTooltip('kubejs:honey_mechanism', false,
    'A delicacy made by _hardworking bees_. Eating it grants _1 hour of Saturation_.',
    '由_辛勤劳作的蜜蜂_制成的美食。食用后可获得_1小时的饱和效果_。',
    []
)

addTooltip('kubejs:honey_pack', false,
    'Use a Deployer to assemble it onto a _Honey Mechanism_ to obtain the _bee_ contained inside.',
    '用机械手将其装配到_蜂蜜构件_上，即可获得包裹中的_蜜蜂_。',
    [
        {
            conditionZh: '装配到蜂蜜构件时',
            behaviourZh: '产出对应蜜蜂的刷怪蛋',
            conditionEn: 'When assembled onto a Honey Mechanism',
            behaviourEn: 'Produces the corresponding bee spawn egg',
        }
    ]
)

addTooltip('kubejs:small_cloud', false,
    'A wisp of cloud from high above. Let it soar into the sky once more!',
    '来自高空的残云碎片。让它再次飞向天空吧！',
    [
        {
            conditionZh: '掉落物悬空时',
            behaviourZh: '当掉落物 Y 坐标高于 200 时，有概率转化为_云_',
            conditionEn: 'When the dropped item is airborne',
            behaviourEn: 'If the item\'s Y level is above 200, it has a chance to turn into _Cloud_',
        }
    ]
)

addTooltip('kubejs:incomplete_cloud_mechanism_2', false,
    'Cloud layers folded with precision! Let it soar into the sky once more!',
    '精妙折叠的云层！让它再次飞向天空吧！',
    [
        {
            conditionZh: '掉落物悬空时',
            behaviourZh: '当掉落物 Y 坐标高于 200 时，有概率转化为_云层构件_',
            conditionEn: 'When the dropped item is airborne',
            behaviourEn: 'If the item\'s Y level is above 200, it has a chance to turn into _Cloud Mechanism_',
        }
    ]
)

addTooltip('kubejs:cloud_glue', false,
    'The essence of clouds, ever-changing and formless.',
    '云层之精华，千变万化。',
    [
        {
            conditionZh: '在副手时',
            behaviourZh: '每 5 tick 消耗自身耐久，_修复主手工具_的耐久',
            conditionEn: 'When held in the offhand',
            behaviourEn: 'Every 5 ticks, consumes its own durability to _repair the main-hand tool_',
        },
        {
            conditionZh: '在主手或副手时',
            behaviourZh: '每 5 tick 增加 玩家 Y 坐标 / 10 点_耐久_',
            conditionEn: 'When held in either hand',
            behaviourEn: 'Every 5 ticks, gains _durability_ equal to the player\'s Y level / 10',
        }
    ]
)

addTooltip('kubejs:cloud_paxel', false,
    'A tool forged from cloud essence, capable of any mining task.',
    '以云层精华锻造的工具，能胜任各种挖掘任务。',
    [
        {
            conditionZh: '在主手或副手时',
            behaviourZh: '每 5 tick 增加 玩家 Y 坐标 点_耐久_',
            conditionEn: 'When held in either hand',
            behaviourEn: 'Every 5 ticks, gains _durability_ equal to the player\'s Y level',
        },
        {
            conditionZh: '被机械手使用时',
            behaviourZh: '耐久值_永远保持满值_',
            conditionEn: 'When used by a Deployer',
            behaviourEn: 'Durability is _always kept full_',
        }
    ]
)

addTooltip('minecraft:dirt', false,
    'Dirt rich in all kinds of materials — you might dig up something good.',
    '富含各种物质的泥土，或许能挖出些好东西。',
    [
        {
            conditionZh: '掉落物掉落时',
            behaviourZh: '若摔落高度 ≥ 10 格，则在掉落物位置额外生成更多掉落物',
            conditionEn: 'When the item falls',
            behaviourEn: 'If the fall height is ≥ 10 blocks, extra drops appear at the item\'s location',
        }
    ]
)

function registerLang(locale, isZh) {
    ClientEvents.lang(locale, event => {
        entries.forEach(entry => {
            let parts = entry.targetId.split(':')
            let prefix = entry.tag ? 'tag' : 'item'
            let baseKey = `${prefix}.${parts[0]}.${parts[1]}.tooltip`
            
            // summary
            event.add(baseKey + '.summary', isZh ? entry.summaryZh : entry.summaryEn)
            
            // condition / behaviour
            entry.behaviours.forEach((b, i) => {
                event.add(baseKey + '.condition' + (i + 1), isZh ? b.conditionZh : b.conditionEn)
                event.add(baseKey + '.behaviour' + (i + 1), isZh ? b.behaviourZh : b.behaviourEn)
            })
        })
    })
}

registerLang('en_us', false)
registerLang('zh_cn', true)

// ========== 监听 ItemTooltipEvent ==========
NativeEvents.onEvent($ItemTooltipEvent, event => {
    let stack = event.getItemStack()
    let tooltip = event.getToolTip()

    for (let entry of entries) {
        // 标签判定
        let matched = entry.tag
            ? stack['is(net.minecraft.core.HolderSet)'](`#${entry.targetId}`)
            : stack.id == entry.targetId

        if (!matched) continue

        // 计算 baseKey
        let parts = entry.targetId.split(':')
        let prefix = entry.tag ? 'tag' : 'item'
        let baseKey = `${prefix}.${parts[0]}.${parts[1]}.tooltip`

        // 直接调用 create
        let description = $ItemDescription
            ['create(java.lang.String,net.createmod.catnip.lang.FontHelper$Palette)'](baseKey, $Palette.STANDARD_CREATE)

        if (description) {
            tooltip.addAll(1, description.getCurrentLines())
        }
    }
})