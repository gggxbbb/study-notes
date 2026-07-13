# AGENTS.md

> 本文件面向 AI 编程助手。阅读前请假设你对本项目一无所知。文件内容基于当前仓库的实际结构生成，请在修改项目配置、内容约定或工作流时同步更新本文件。

## 项目概述

本项目是一个基于 **VitePress** 构建的静态文档站点，用于整理和展示麻醉学专业及相关医学课程的学习笔记。站点语言为简体中文，目标读者是作者本人及有相同学习需求的人。

- **仓库根目录**：`D:/学习资料/study-notes`
- **站点标题**：医学笔记
- **副标题**：麻醉学专业课程笔记
- **内容性质**：个人学习笔记，由 AI 辅助生成及网络资料整理而成，仅供学习参考，不保证医学准确性和完整性。

## 技术栈

| 层级 | 技术/工具 | 说明 |
|------|-----------|------|
| 静态站点生成器 | [VitePress](https://vitepress.dev/) `^1.6.4` | 基于 Vite + Vue 3 的文档站点框架 |
| 包管理器 | [pnpm](https://pnpm.io/) | 当前环境版本 `11.3.0`，使用 `pnpm-workspace.yaml`（单包工作区） |
| 前端框架 | Vue `^3.5.16` | VitePress 底层依赖，主题扩展使用 Vue SFC |
| 数学公式 | KaTeX `^0.17.0` | 通过自定义 `markdown-it-katex-custom.js` 插件渲染 `$...$` 和 `$$...$$` |
| 化学方程式 | KaTeX mhchen | 在 `config.mjs` 中 `import 'katex/dist/contrib/mhchem.mjs'` |
| 图表 | Mermaid、PlantUML | 分别通过 `vitepress-plugin-mermaid` 和 `markdown-it-plantuml` 支持 |
| 思维导图 | `@vitepress-plugin/markmap` | 使用 `:::markmap` 容器渲染交互式 Markmap |
| 字体 | MiSans | 主题中引入 MiSans 常规/半粗/拉丁字体，CSS 变量覆盖默认字体栈 |
| 样式 | Sass `^1.89.1` | 用于主题自定义样式 |

## 目录结构

```
study-notes/
├── docs/                          # VitePress 内容根目录（srcDir）
│   ├── .vitepress/
│   │   ├── cache/                 # Vite 构建缓存
│   │   ├── dist/                  # 生产构建产物（静态 HTML，已加入 .gitignore）
│   │   ├── theme/
│   │   │   ├── custom.css         # 字体与全局样式覆盖
│   │   │   └── index.js           # 主题入口，引入 MiSans 并继承 DefaultTheme
│   │   ├── config.mjs             # VitePress 主配置（侧边栏、导航、Markdown 插件、head 脚本）
│   │   └── markdown-it-katex-custom.js  # 自定义 KaTeX markdown-it 插件
│   ├── public/                    # 静态资源（favicon.svg 等）
│   ├── index.md                   # 首页（hero + action 按钮）
│   ├── General/                   # 总论
│   ├── SystematicAnatomy/         # 人体系统解剖学
│   ├── Biochemistry/              # 生物化学
│   ├── Pathophysiology/           # 病理生理学
│   ├── Diagnostics/               # 诊断学
│   ├── AnestheticEquipment/       # 麻醉设备学
│   ├── AnestheticPharmacology/    # 麻醉药理学
│   ├── InternalMedicine/          # 内科学
│   ├── Surgery/                   # 外科学
│   ├── ObstetricsGynecology/      # 妇产科学
│   └── ...                        # 其他学科目录（多数仍在建设中）
├── plans/                         # 设计规划文档
│   └── knowledge-graph-design.md  # 医学知识图谱系统设计（进行中）
├── add-frontmatter.js             # 遗留脚本：路径指向不存在的 src/content/docs，当前未使用
├── package.json                   # 项目脚本与依赖
├── pnpm-workspace.yaml            # pnpm 工作区配置
├── .npmrc                         # pnpm 仅构建依赖配置
├── .gitignore                     # 忽略 node_modules、构建产物等
└── README.md                      # 项目说明与内容概览
```

## 构建与运行命令

所有命令均在仓库根目录执行：

```bash
# 安装依赖
pnpm install

# 本地开发服务器
pnpm dev          # 等价于 vitepress dev docs

# 生产构建
pnpm build        # 等价于 vitepress build docs，产物输出到 docs/.vitepress/dist

# 预览生产构建
pnpm preview      # 等价于 vitepress preview docs
```

当前没有单元测试、E2E 测试或 lint 脚本。构建成功的主要验证方式即 `pnpm build` 无错误退出。

## 运行时架构

- **构建时**：VitePress 读取 `docs/` 下的 Markdown 文件，经由 Vue/Vite 打包为 SSR + 客户端 hydration 的静态站点。
- **输出产物**：`docs/.vitepress/dist/` 为纯静态文件，可直接部署到任意静态托管服务（如 Cloudflare Pages、GitHub Pages、Vercel 等）。项目规划中提及目标托管平台为 Cloudflare Pages。
- **交互组件**：
  - Markmap 思维导图仅在客户端渲染。
  - Mermaid / PlantUML 图表在构建时处理。
  - 本地搜索使用 VitePress 内置 `local` 搜索提供方。

## 内容组织约定

### 文件与目录命名

- **目录名**：PascalCase，例如 `Pathophysiology/`、`InternalMedicine/Medicine1/Respiratory/`。
- **文件名**：PascalCase，例如 `Hernia.md`、`AcutePancreatitis.md`。
- **侧边栏标题**：纯中文，不含序号（序号放在文件内容或 frontmatter 中）。

### Markdown 文件规范

1. **Frontmatter**：每个内容文件顶部必须包含 YAML frontmatter，至少提供 `title`。
   ```markdown
   ---
   title: 6. 腹外疝
   ---
   ```
2. **禁止图片**：站点不使用本地图片或外部图片。
3. **禁止 Obsidian 语法**：使用标准 Markdown + VitePress 扩展语法。
4. **章节顺序**：内容顺序必须与教材目录保持一致。
5. **新增页面必须同步更新 `docs/.vitepress/config.mjs` 中的 `sidebar`**，否则页面不会出现在导航中。

### 思维导图（Markmap）

使用 `:::markmap` 容器包裹 Markdown 标题层级，实现交互式思维导图：

```markdown
:::markmap
---
containerHeight: 700
maxInitialScale: 1.2
spacingHorizontal: 80
---
# 根节点
## 二级节点
### 三级节点
#### 四级节点
* 具体内容
:::
```

层级设计原则：

- 使用 `#` / `##` / `###` / `####` 实现 4~5 级嵌套。
- 疾病分型、解剖结构等作为分类的子层级展开。
- 每个节点只放核心关键词，不需要完整句子。
- `containerHeight` 根据内容量调整，常用范围 `400~700`。

### 数学与化学公式

- 行内公式：`$...$`
- 块级公式：`$$...$$`
- KaTeX 报错时会静默回退为原文，不会阻断构建；但应避免在公式内直接使用中文（会触发 `unicodeTextInMathMode` 警告）。

## 写作风格指南（内容生成准则）

> 以下规则源自项目既有的 `agent.md`，在协助用户撰写或修改笔记时必须遵守。

1. **严格按指令行事**：用户说一句做一句。非笔记内容的指令性操作（如改配置、改格式、添加流程图、引用教材等）必须有明确指令才执行，不推测意图。
2. **笔记定位：考点整理，不是教材复刻**：
   - 只整理常考内容和高频要点。
   - 不要照抄教材；筛选关键鉴别点、口诀、对比表等紧凑形式。
   - 省略教材中的冗长描述和冷门细节。
3. **不要评价用户发的内容**：直接写入文件，不做点评。
4. **每条内容收到后立即写入**：不攒批处理。
5. **不主动 commit/push**：除非用户明确说“提交推送一下”。
6. **题库考点对比**：可提取关键词频率，对比笔记覆盖度，并在需要时追加“题库高频考点补充”节。
7. **章节顺序必须与教材目录一致**。
8. **sidebar 新增文件必须同步更新 `config.mjs`**。
9. **ExamKeyPoints 放对应课程目录下，不放 Overview**：例如 `AnestheticEquipment/ExamKeyPoints.md` 正确，`InternalMedicine/Overview/ExamKeyPoints.md` 错误。
10. **推导链与口诀优先**：
    - 鼓励使用“理解推导”说明发病机制到临床表现的逻辑。
    - 口诀使用引用块 `> 口诀：...` 或加粗高亮。
    - 鉴别诊断优先用对比表呈现。

## 主题与样式

- 主题继承 VitePress `DefaultTheme`，自定义入口为 `docs/.vitepress/theme/index.js`。
- 全局 CSS 变量覆盖在 `docs/.vitepress/theme/custom.css` 中，主要指定 `--vp-font-family-base` 和 `--vp-font-family-mono` 为 MiSans 字体栈。
- `config.mjs` 的 `head` 中注入了几段运行时脚本，用于：
  - 自动适配文档中 SVG 的宽高比；
  - 处理表格横向溢出；
  - 侧边栏激活项自动滚动到可视区域。

## 配置关键项

`docs/.vitepress/config.mjs` 中的主要设置：

- `lang: 'zh-CN'`
- `lastUpdated: false`
- `ignoreDeadLinks: true`
- `metaChunk: true`
- 本地搜索已配置中文翻译。
- 大纲（outline）显示层级为 `[2, 4]`，标签为“本页导航”。

## 安全与合规注意事项

1. **医学免责声明**：所有页面页脚均显示“本站内容由 AI 辅助生成及网络收集整理，仅供学习参考，不保证准确性和完整性”。新增内容不得暗示其具备医疗建议效力。
2. **不提交敏感信息**：`.env`、密钥、个人身份信息等不得写入仓库。`.gitignore` 已排除常见敏感路径。
3. **依赖安全**：使用 pnpm 管理依赖；`onlyBuiltDependencies` 中声明了需要原生构建的包（`@parcel/watcher`、`esbuild`）。
4. **构建产物**：`docs/.vitepress/dist` 与 `cache` 已加入 `.gitignore`，不应将构建产物提交到版本控制（当前仓库中可能仍存在历史提交的构建产物，新增提交时应避免再引入）。

## 当前状态与待办

- 已完成内容较多的学科：总论、病理生理学、诊断学、麻醉设备学、内科学、外科学、人体系统解剖学、生物化学、麻醉药理学、妇产科学（部分）。
- 大量学科目录（病理学、医学微生物学与免疫学、麻醉解剖学、麻醉生理学、危重病医学、儿科学、临床麻醉学、疼痛诊疗学、神经病学等）仍处于建设中，`sidebar` 中对应条目多为空 `items: []`。
- `plans/knowledge-graph-design.md` 规划了一个基于 `graph-data.json` 的医学知识图谱系统，目前尚未在代码中实现，属于未来扩展方向。
- `add-frontmatter.js` 是遗留脚本，其硬编码路径 `src/content/docs` 在当前项目中不存在，若需批量添加 frontmatter 应修改或替换该脚本。

## 对 AI 助手的快速检查清单

在协助修改本项目前，请确认：

- [ ] 已阅读 `docs/.vitepress/config.mjs` 中的 sidebar 结构。
- [ ] 新增 Markdown 文件已按 PascalCase 命名，并包含 `title` frontmatter。
- [ ] 新增页面已同步加入 sidebar。
- [ ] 未引入图片或 Obsidian 专属语法。
- [ ] 运行 `pnpm build` 验证构建无错误。
- [ ] 不主动执行 `git commit` / `git push`，除非用户明确授权。
