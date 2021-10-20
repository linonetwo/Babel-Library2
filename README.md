# 巴别塔图书馆 2 Babel-Library 2

目前市面上文本生成器虽多，但缺乏一个集合了所有文本生成器的展览馆，我们使用博尔赫斯的巴别塔图书馆这个意象，为自动生成的文本提供一个文本展览馆，并允许游客使用特殊的技能在自动生成的地图里面快速找到自己感兴趣的内容。

为什么叫《巴别塔图书馆 2》？主要是致敬博尔赫斯所作的《巴别塔图书馆》，同时保持搜索引擎优化不产生搜索歧义。

## 需求目标

[详细需求文档（飞书文档）](https://bytedance.feishu.cn/docs/doccn0tJ9KyZybGRhb4eWcYsmHh?from=from_copylink)，以 ← 为准。

### 需求

制作一款可在浏览器快速打开的步行模拟器，有自动生成的地图，地图上遍布书籍等物品，书籍交互后展示自动生成的文本内容，并提供技能让用户能快速检索和体验自动生成的文本内容。

### 衡量标准

- 网页能在 2S 内打开并异步加载数据；
- 能利用二十个以上的地图模板生成可体验的步行地图内容；
- 包括书籍、门在内的四种物品可交互；
- 书籍中能生成十种以上的文案；
- 用户拥有两种以上的旅行类技能；

### 文案书写

#### 娱乐性

搞一点群众喜闻乐见的比如嘉心糖小作文什么的
或者糊弄型的比如搁着搁着呢废话生成器

### 可重复体验性

需要把文案拆细一点，这样才能让每次随机到的内容都尽可能不一样。
但是也不能太细，以免牛头不对马嘴。

### 图书馆地图

大部分六边形通过裁剪 CDDA 开源的 24x24 mapgen 地图文件创建，小部分为原创手写。
本次忽略地图文件里大部分的知识图谱链接（不引用别的物品、怪物等定义文件），只关注地图生成。
在书柜上生成书籍物品。

地图为三维地图，一次只展示一层，可以通过楼梯上下行走。

### 贴图包

贴图包使用 https://github.com/I-am-Erk/CDDA-Tilesets ，遵守 https://creativecommons.org/licenses/by-sa/3.0/deed.zh 以获得使用和发行权。

### 地图定义

使用 CDDA 的地图库，类似 CDDA-Kenan-Modpack-Chinese/mapgen_lab_arcane.json at master · linonetwo/CDDA-Kenan-Modpack-Chinese
相关的解析逻辑已经写在了 https://github.com/linonetwo/DarkDaysArch/tree/master/src/components/Canvas/sprites/tile 等处

我们本次将把这些 24x24 （有的地图宽高是 24 的整倍数，将无视这类地图）的地图裁剪成六边形，作为图书馆 cell 的地图，模拟巴别塔图书馆的设定。
同时也可以手写一些地图，用作特殊主题场景使用。

### 核心循环

后期 TODO：纯步行模拟器缺乏资源壁垒和核心循环，内容消耗完后玩家将很快流失，需要想办法做一些长线的任务故事线和资源积累机制，减少经历单调生成内容的高刺激后很快进入体验低谷。
关于巴别塔图书馆的背景设定探索的主线故事？寻找某种真相的主线故事？
