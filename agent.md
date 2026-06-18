---
name: note-organizer
description: VitePress 笔记站点管理技能（agent.md）。当用户要求整理笔记、归纳总结知识点、创建学习笔记文件时使用。支持按系统/章节分类整理，使用 markdown 格式，表格和层级结构结合，整合相关知识点到同一主题下。
---

# 笔记整理规范

## 触发条件
- 用户发送零散知识点要求整理
- 用户要求归纳总结、创建笔记文件
- 用户要求补充或完善已有笔记
- 用户提到 "整理成文件"、"系统性笔记"、"笔记整理"

## 核心原则

### 1. 系统性结构
- 不要逐条罗列，按系统/章节归类
- 将相关知识点整合到同一主题下
- 使用层级结构：## 大章节 / ### 子主题

### 2. 格式要求
- 使用 markdown 格式
- 优先使用表格：疾病对比、机制总结、检查指标
- 表格列：疾病/情况 | 核心特征 | 关键线索/机制
- 知识点用列表：- 项目1 / - 项目2
- **表格宽度处理**：全局不设 `white-space: nowrap`，通过 JS 动态检测——只有实际内容超宽的表格才自动加 nowrap 实现横滚，窄表格正常换行

### 3. 整合策略
- 同一疾病的所有相关知识点（症状、机制、检查、治疗）放在同一子主题下
- 鉴别诊断归类到 "疾病鉴别" 表格
- 机制/细胞学基础归类到 "发病机制" 表格
- 治疗原则归类到 "治疗" 表格
- 总结/口诀/记忆技巧单独保留，归入对应章节或单独列出
- **跨系统/跨疾病的梳理概括可单开章节整理**，不强求按系统/疾病归类
- **多位置联动**：如果内容涉及多个学科或多个文件（如疾病口诀既属于专科疾病章节，又属于概述/总论中的影像/鉴别诊断），应当在多个恰当的位置分别写入，不只放一处

### 4. 记忆辅助保留
- 用户提供的口诀、记忆技巧、概括性句子必须保留
- 用 **加粗** 或单独列表突出显示
- 例如：「气水堵厚弱」、记忆窍门、机制总结等
- 不要简化为纯数据表格，保留原句的辅助记忆价值

### 5. 输出与同步

- 笔记项目为 VitePress 站点，内容目录为 `docs/`
- VitePress 配置文件：`docs/.vitepress/config.mjs`
- 配置要点：
  - `lang: 'zh-CN'`
  - `lastUpdated: false`
  - 本地搜索 `search.provider: 'local'`
  - KaTeX + mhchem 支持
- 首页：`docs/index.md`，仅使用 hero actions 按钮导航，不使用 features 卡片
- 导航栏（nav）：包含有内容的学科快速链接
- 底部（footer）：包含 AI 创作声明 "本站内容由 AI 辅助生成及网络收集整理，仅供学习参考，不保证准确性和完整性"
- 首页 tagline 为免责声明式描述
- 侧边栏手动维护在 config.mjs 的 `themeConfig.sidebar` 中，按 20 个学科的固定顺序排列（含西医综合）
- **目录和文件命名**：所有目录和 .md 文件使用英文大驼峰命名（PascalCase），不得包含空格、中文、括号。例如：`CrossSystemComparison.md`、`ValvularHeartDisease.md`
- **标题不含序号**：侧边栏标题和 Markdown 文件标题不使用 "1. xxx"、"2. xxx" 等序号前缀
- **空目录**：放 `.gitkeep` 保留在 Git 中，不放无内容的 `index.md`
- **图片**：不允许包含图片（已全部移除）
- **Obsidian 语法**：不允许出现 `[[wiki链接]]`、`![[图片]]`、`#标签`、`^块引用` 等 Obsidian 特有语法
- 更新 config.mjs 时注意同步 agent.md 的命名对照表
- **主动提交推送**：用户要求提交时执行 `git add -A && git commit -m "..." && git push`，commit message 一级标题加分级列表
- **增量补充模式**：用户分多次发送同一文件的散乱内容时，先加不提交，等用户说"提交推送一下"再操作

### 6. 多位置联动（层级优先级）
- 多位置写入层级（由近到远）：
  1. **同一篇内跨章节** → 该篇的 Overview（如 Surgery2/NeckBreastSurgery/Overview/）
  2. **同一科目跨篇** → 该科目 Overview（如 Surgery/Overview/）
  3. **真正跨科目**（内外科都涉及）→ General
- **不是什么都往 General 塞。专篇自己的内容只放专篇，不往外铺。**
- **并且**：跨篇章的汇总内容在涉及到的每个具体文件里也要各写一遍（如周期性发作→Buerger病写进周围血管专篇、肛裂写进结直肠专篇等），不能只放在 Overview 里。

### 7. 禁止行为
- ❌ 不要评价用户发的内容——直接写进去，不加"👍 很精辟""好逻辑"等任何正向/负向评价
- ❌ 不要发挥分析整理后发回给用户——直接写入文件，确认时只需说"写进去了。继续。"或类似极简确认
- ❌ 不要攒多了再写——每条内容收到后立即写入

### 8. 外部 Memos 整合

当用户有 Memos 站点要求整理到 study-notes 时：
1. 通过 API 拉取全部 memos（注意分页，pageSize=200）
2. 按标签分类（#诊断→Diagnostics、#外科→Surgery/Surgery1、#药理→AnestheticPharmacology 等）
3. 判断已有文件是否已覆盖，未覆盖的补充进去
4. 跨学科口诀考虑多位置写入



## 示例结构

```markdown
# XX整理

---

## 一、系统名称

### 1. 疾病鉴别诊断

| 疾病 | 核心特征 | 关键线索 |
|------|----------|----------|
| 疾病A | 特征1、特征2 | 病史/线索 |
| 疾病B | 特征3、特征4 | 病史/线索 |

### 2. 发病机制

| 细胞/因子 | 关联疾病 | 机制 |
|-----------|----------|------|
| 细胞A | 疾病X | 机制描述 |

### 3. 检查与诊断

- 检查A：意义/指标
- 检查B：意义/指标

### 4. 治疗原则

| 疾病/情况 | 治疗方式 |
|-----------|----------|
| 疾病A | 治疗1 |

---

## 二、另一系统
...
```

## 根目录命名对照表

| 序号 | 中文名 | 目录名（PascalCase） |
|------|--------|-------------------|
| 0 | 总论 | General |
| 1 | 西医综合 | ComprehensiveExam |
| 2 | 人体系统解剖学 | SystematicAnatomy |
| 3 | 生物化学与分子生物学 | BiochemistryMolecularBiology |
| 4 | 病理学 | Pathology |
| 5 | 医学微生物学与免疫学 | MedicalMicrobiologyImmunology |
| 6 | 麻醉生理学 | AnestheticPhysiology |
| 7 | 病理生理学 | Pathophysiology |
| 8 | 麻醉解剖学 | AnestheticAnatomy |
| 9 | 诊断学 | Diagnostics |
| 10 | 麻醉药理学 | AnestheticPharmacology |
| 11 | 麻醉设备学 | AnestheticEquipment |
| 12 | 内科学 | InternalMedicine |
| 13 | 外科学 | Surgery |
| 14 | 危重病医学 | CriticalCareMedicine |
| 15 | 妇产科学 | ObstetricsGynecology |
| 16 | 儿科学 | Pediatrics |
| 17 | 临床麻醉学 | ClinicalAnesthesiology |
| 18 | 疼痛诊疗学 | PainManagement |
| 19 | 神经病学 | Neurology |

**目录和 .md 文件名必须使用英文大驼峰命名（PascalCase），不含空格、中文、括号。**

## 内外科整理框架要求

### 内科学1
- InternalMedicine/Medicine1/Respiratory/：MedicineOverview、Tuberculosis、Pneumonia、Asthma、Copd、ChronicPulmonaryHeartDisease、RespiratoryFailure、LungCancer、Bronchiectasis
- InternalMedicine/Medicine1/Circulatory/：ValvularHeartDisease、PericardialDisease、MyocarditisCardiomyopathy、InfectiveEndocarditis、Hypertension、HeartFailure、CoronaryHeartDisease、Arrhythmia
- InternalMedicine/Medicine1/Digestive/：Overview、Gastritis、PepticUlcer、Cirrhosis、HepaticEncephalopathy、HepatocellularCarcinoma、IntestinalTuberculosis、InflammatoryBowelDisease、AcutePancreatitis、GastrointestinalBleeding

### 外科学1（外科总论）
- Surgery/Surgery1/：WaterElectrolyteBalance、Shock、Perioperative、Infection、Trauma、Burns、Tumors、Nutrition、Transplant

### 外科学2（各论）
- Surgery/Surgery2/GeneralSurgery/：BreastDisease、ThyroidDisease、PeripheralVascularDisease、AcutePeritonitis、AbdominalInjury、Hernia、AppendicealDisease、GastroduodenalDisease、MinimallyInvasiveSurgery、IntestinalObstruction、ColorectalDisease、BiliaryDisease、LiverDisease、PortalHypertension、PancreaticDisease
- Surgery/Surgery2/Orthopedics/：FractureOverview、UpperLimbInjury、HandTrauma、LowerLimbInjury、SpinePelvisFracture、MusculoskeletalDeformity、FemoralHeadNecrosis、CervicalLumbarDegeneration、PyogenicInfection、BoneJointTuberculosis、ChronicMusculoskeletalInjury、NonPyogenicArthritis、BoneTumor

### 跨系统对比板块
- General/CrossSystemComparison、General/DiagnosticFormulas、General/MemorizationTips
