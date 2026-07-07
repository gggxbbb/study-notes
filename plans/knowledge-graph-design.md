---
title: 医学知识图谱系统 — 设计规划
created: 2026-07-07
status: 规划中
---

# 医学知识图谱系统

## 概述

将现有 VitePress 医学笔记升级为**多级图结构知识库**。核心思路：保持现有 markdown 写作流不变，在章节层级添加声明式图数据文件（`graph-data.json`），构建时自动合并跨章节节点，生成全局知识图谱，嵌入 VitePress 作为交互式浏览组件。

### 设计原则

- **写作和可视化分层**：markdown 仍然是知识输入的主要载体。图是索引层，不替代写作。
- **声明式分片 + 构建时合并**：每个章节维护自己的 `graph-data.json`，构建脚本负责去重和跨章节连线。单文件轻量、可迭代。
- **节点是多层信息的聚合体**：不仅是标签和边，还携带考点权重、推导链、口诀、输出偏好、版本来源等 extra data，支撑后续的"稳定生成文章"能力。
- **不改变现有部署**：最终产物是静态 JSON + Vue 组件，Cloudflare Pages 零成本托管。

---

## 数据结构

### Node（节点）

```typescript
interface Node {
  id: string;                    // 唯一标识，kebab-case
  title: string;                 // 中文显示名
  aliases: string[];             // 同义词（自动链接匹配用）
  type: NodeType;                // 节点类型
  tags: string[];                // 标签，用于多维度聚合
  priority: 'high' | 'medium' | 'low';  // 考点权重，决定生成时的篇幅分配
  sources: SourceRef[];          // 来源教材/笔记的引用
  derive_chain?: string;         // 推导链（发病机制到临床表现的逻辑）
  mnemonic?: string;             // 口诀
  output_preference?: 'comparison_table' | 'flowchart' | 'number_card' | 'plain';
  comparison_targets?: string[]; // 自动鉴别对比的疾病 ID 列表
  key_numbers?: KeyNumber[];     // 关键数字/时间
  avoid_flat_summary?: boolean;  // 禁止平铺直叙，保留推导节奏
}

type NodeType = '疾病' | '体征' | '手术' | '解剖' | '数字' | '口诀' | '概念' | '综合征';

interface SourceRef {
  source: string;     // 十版教材 / 戴春峰 / 小亮
  content: string;    // 该来源的特有补充内容
}

interface KeyNumber {
  value: string;      // "2~12h"
  description: string; // "血淀粉酶开始升高"
  importance: 'high' | 'medium' | 'low';
}
```

### Edge（边）

```typescript
interface Edge {
  from: string;       // 源节点 ID
  to: string;         // 目标节点 ID
  type: EdgeType;
  weight?: number;    // 关系强度（1~5），影响图布局和生成时的展开优先级
  note?: string;      // 关系注释
}

type EdgeType =
  | '病因' | '诱因' | '发病机制'
  | '临床表现' | '体征' | '影像'
  | '诊断' | '首选检查' | '金标准'
  | '治疗' | '手术' | '药物'
  | '并发症' | '预后'
  | '鉴别诊断' | '对比'
  | '属于' | '包含'          // 层级关系
  | '升级'                    // Charcot→Reynolds 这种递进
  | '版本差异';              // 十版 vs 戴春峰
```

### graph-data.json（章节级文件）

```json
{
  "chapter": "腹部外科",
  "nodes": [...],
  "edges": [
    {
      "from": "acute-cholecystitis",
      "to": "murphy-sign",
      "type": "体征"
    }
  ],
  "cross_refs": {
    "charcot-triad": "BiliaryDisease",
    "acute-pancreatitis": "AbdominalSurgery"
  }
}
```

- `cross_refs`：声明"我引用了一个不在本章节维护的节点"。构建脚本据此：
  - 合并时自动匹配
  - 目标节点不存在时报错提示
  - 同一节点出现在多个章节时，做属性合并而非覆盖

---

## 目录结构

```
study-notes/
  docs/
    .vitepress/
      theme/
        KnowledgeGraph.vue      # 交互式图浏览组件
        GraphNodeDetail.vue     # 点击节点后的详情面板
    public/
      graph-data-merged.json    # 构建脚本生成的全局图数据
    Surgery/
      Surgery2/
        AbdominalSurgery/
          graph-data.json       # ← 章节级图数据
          Hernia.md
          BiliaryDisease.md
          ...
        Orthopedics/
          graph-data.json
          ...
        NumbersAndTiming.md     # 汇总文件，跨章节引用
        PhysicalSigns.md
  scripts/
    merge-graph.ts              # 构建时合并脚本
    validate-graph.ts           # 校验完整性：断链检测、重复 ID 检测
    extract-from-md.ts          # 半自动从 markdown 抽节点（可选，后期）
  plans/
    knowledge-graph-design.md   # ← 本文件
```

---

## 构建流程

### Phase 1：收集

```
扫描 docs/**/graph-data.json
  → 收集所有 nodes 和 edges
  → 建立 { id → Node } 全局字典
  → 收集 cross_refs 声明
```

### Phase 2：校验

- 所有 `edges[].from / to` 必须在全局字典中存在，否则报错
- 重复 id 冲突检测（同 id 出现在多个文件 → 自动合并或报错需手动解决）
- `cross_refs` 目标章节存在性检查

### Phase 3：合并

```
for each edge:
  if edge.to in global_nodes:
    建立连接
  else if edge.to in cross_refs:
    记录为 pending（目标章节尚未提供该节点）
  else:
    报错

同 ID 节点多来源合并策略：
  - title: 保留第一个
  - aliases: 取并集
  - priority: 取最高
  - sources: 取并集
  - key_numbers: 取并集
  - derive_chain / mnemonic: 保留最长/最完整的版本
  - tags: 取并集
```

### Phase 4：输出

- 生成 `docs/public/graph-data-merged.json`
- 输出校验报告（未解决的 cross_refs、pending 边）

---

## 前端组件（KnowledgeGraph.vue）

### 交互模式

1. **进入页面**：默认显示全局概览，节点按章节集群着色
2. **缩放**：滚动缩放，不同缩放级别显示不同粒度的节点：
   - 远 → 章级聚合（"腹部外科""骨科""血管外科"）
   - 中 → 疾病级（"急性胆囊炎""腹股沟斜疝"）
   - 近 → 体征/数字/手术级
3. **点击节点**：右侧展开详情面板，显示：
   - 推导链（如有）
   - 口诀（如有，高亮卡片样式）
   - 关联节点和边类型标签
   - 来源版本
4. **拖拽**：自由拖拽节点，力导向布局自适应
5. **筛选**：按 tag、node type、edge type 筛选子图
6. **路径查找**：选两个节点，显示最短连接路径

### 技术栈

- **图渲染**：D3-force 或 vis.js（静态 JSON 驱动的力导向布局）
- **组件**：Vue 3 SFC（兼容 VitePress 主题系统）
- **无后端**：所有数据来自 `graph-data-merged.json`

---

## 从 markdown 抽取节点（extract-from-md，后期）

半自动辅助脚本，不追求 100% 自动化：

- 从 frontmatter 的 `title` 生成基础节点
- 识别文中 `| 疾病 | 体征 |` 这种对比表 → 拆成多个节点和边
- 识别 `> 口诀` 引用块 → 关联到最近的 `##` 标题节点
- 识别 `**xxx征**` 加粗术语 → 生成体征节点候选
- **人工 review** 是关键环节——自动抽取只做草稿，精度由人来保证

---

## 分步执行计划

### Step 1：数据结构定稿（1~2天）

- [ ] 确认 Node / Edge 的字段定义
- [ ] 确认 NodeType / EdgeType 的枚举值
- [ ] 确认多来源合并策略
- [ ] 写一个手动的示例：拿腹部外科 3~5 个疾病做完整的 graph-data.json

### Step 2：构建脚本（1天）

- [ ] `merge-graph.ts` 实现收集→校验→合并→输出
- [ ] 输出合并 JSON + 校验报告
- [ ] 集成到 VitePress 构建流程（`buildEnd` 钩子）

### Step 3：前端组件 MVP（2~3天）

- [ ] Vue 3 力导向图组件
- [ ] 基础交互：缩放、拖拽、点击
- [ ] 节点详情面板
- [ ] 注册为 VitePress 自定义主题组件

### Step 4：数据填充（持续）

- [ ] 腹部外科章节优先（18 个疾病，约 50~80 个节点）
- [ ] 骨科章节
- [ ] 颈部/乳腺
- [ ] 血管外科
- [ ] 跨章节边补充

### Step 5：高级功能（后期）

- [ ] 路径查找
- [ ] 按 tag 筛选子图
- [ ] `extract-from-md.ts` 半自动抽取
- [ ] "pick 节点生成文章"实验

---

## 风险与坑

1. **数据维护成本**：每写一个新知识点需要同时更新 markdown 和 graph-data.json。初始填充工作量大，但填充完成后日常增量很小
2. **跨章节 id 命名约定**：所有章节必须用统一的 id（如 `murphy-sign`），需要维护一个命名规范，否则合并时产生幽灵节点
3. **避免过度设计**：先做 50 个节点跑通全流程，不要一上来就想着覆盖所有科目。腹部外科是最适合的试验田——疾病种类密集、体征丰富、跨章节连线多
4. **VitePress 主题兼容**：自定义 Vue 组件需要注册到 `.vitepress/theme/index.ts`，需要处理 SSR/client-only 的问题（图组件只能 client 端渲染）

---

## 参考资料

- 现有笔记站点：`/vol1/1000/Hermes/study-notes/`
- 体征汇总：`docs/Surgery/Surgery2/PhysicalSigns.md`
- 数字与时间汇总：`docs/Surgery/Surgery2/NumbersAndTiming.md`
