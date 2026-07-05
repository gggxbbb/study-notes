# study-notes Agent Rules

## 核心规则

- **严格按指令行事**：用户说一句做一句。任何不是笔记内容的指令性操作，没有明确指令的事情一概不做。不推测用户意图，不自作主张加额外内容（流程图、教材引用、格式调整等均需用户明确要求才做）
- **笔记定位：考点整理，不是教材复刻**：只整理常考内容和高频要点。不要书上有什么就搬什么——如果完全照着书写，那和书有什么区别。筛选关键鉴别点、口诀、对比表等紧凑形式，省略教材中的冗长描述和冷门细节
- **不要评价用户发的内容**：直接写入文件，不回评
- **每条内容收到后立即写入**：不攒批
- **不主动 commit/push**：等用户说"提交推送一下"
- **题库考点对比**：提取关键词频率，对比笔记覆盖度，追加"题库高频考点补充"节
- **章节顺序必须与教材目录一致**
- **sidebar 新增文件必须同步更新 config.mjs**
- **ExamKeyPoints 放对应课程目录下，不放 Overview**

## 思维导图（Markmap）

使用 `@vitepress-plugin/markmap` 渲染交互式思维导图。

安装：`npm install @vitepress-plugin/markmap`

配置（`config.mjs`）：
```js
import markmapPlugin from '@vitepress-plugin/markmap'
vite: { plugins: [markmapPlugin()] }
```

在 md 中使用：
```markdown
:::markmap
---
containerHeight: 700
maxInitialScale: 1.2
spacingHorizontal: 80
---
# 根节点
## 二级
### 三级
#### 四级
* 具体内容
:::
```

层级设计原则：
- 用 `#`/`##`/`###`/`####` 实现 4~5 级嵌套，用户偏好层层细化
- 各型疾病作为分类的子层级展开
- 每个节点放核心关键词，不需要完整句子
- `containerHeight` 按内容量调整（400~700）
