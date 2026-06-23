# study-notes Agent Rules

## 笔记格式偏好

- **SVG 图表优先于 ASCII**：流程图、决策树、坐标图等用内嵌 `<svg>`，带 `viewBox` 属性供自适应
- **不要评价用户发的内容**：直接写入文件，不回评
- **每条内容收到后立即写入**：不攒批
- **不主动 commit/push**：等用户说"提交推送一下"
- **题库考点对比**：提取关键词频率，对比笔记覆盖度，追加"题库高频考点补充"节
- **章节顺序必须与教材目录一致**
- **sidebar 新增文件必须同步更新 config.mjs**
- **ExamKeyPoints 放对应课程目录下，不放 Overview**
- 纯口诀放 MemorizationTips，非口诀知识点放专篇

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
