import { defineConfig } from 'vitepress'
import katex from './markdown-it-katex-custom.js'
import markdownItPlantUML from 'markdown-it-plantuml'
import 'katex/dist/contrib/mhchem.mjs'

export default defineConfig({
  title: '医学笔记',
  description: '内科学1、外科学2知识点整理',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  metaChunk: true,
  mpa: true,
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css' }],
    ['style', {}, `table { display: block; overflow-x: auto; white-space: nowrap; }
.vp-doc table { display: block; overflow-x: auto; white-space: nowrap; }
.vp-doc .vp-table-wrapper { overflow-x: auto; }`],
  ],
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(katex)
      md.use(markdownItPlantUML)
      md.use(markdownItPlantUML, { openMarker: '@startgantt', closeMarker: '@endgantt', diagramName: 'gantt' })
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '未找到相关结果',
                resetButtonTitle: '清除搜索条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
    nav: [
      { text: '总论', link: '/总论/' },
      { text: '内科', link: '/内科/' },
      { text: '外科', link: '/外科/' },
      { text: '妇产科', link: '/妇产科/' },
      { text: '麻醉设备学', link: '/麻醉设备学/' }
    ],
    sidebar: {
      '/内科/': [
        {
          text: '概述',
          collapsed: false,
          items: [
            { text: '跨系统对比', link: '/内科/概述/跨系统对比' }
          ]
        },
        {
          text: '内科1',
          collapsed: false,
          items: [
            {
              text: '呼吸系统',
              items: [
                { text: '1. 内科学总论', link: '/内科/内科1/呼吸系统/1. 内科学总论' },
                { text: '2. 肺结核', link: '/内科/内科1/呼吸系统/2. 肺结核' },
                { text: '3. 肺炎', link: '/内科/内科1/呼吸系统/3. 肺炎' },
                { text: '4. 支气管哮喘', link: '/内科/内科1/呼吸系统/4. 支气管哮喘' },
                { text: '5. COPD', link: '/内科/内科1/呼吸系统/5. COPD' },
                { text: '6. 慢性肺源性心脏病', link: '/内科/内科1/呼吸系统/6. 慢性肺源性心脏病' },
                { text: '7. 呼吸衰竭', link: '/内科/内科1/呼吸系统/7. 呼吸衰竭' },
                { text: '8. 肺癌', link: '/内科/内科1/呼吸系统/8. 肺癌' }
              ]
            },
            {
              text: '循环系统',
              items: [
                { text: '1. 心瓣膜病', link: '/内科/内科1/循环系统/1. 心瓣膜病' },
                { text: '2. 心包疾病', link: '/内科/内科1/循环系统/2. 心包疾病' },
                { text: '3. 心肌炎与心肌病', link: '/内科/内科1/循环系统/3. 心肌炎与心肌病' },
                { text: '4. 感染性心内膜炎', link: '/内科/内科1/循环系统/4. 感染性心内膜炎' },
                { text: '5. 高血压', link: '/内科/内科1/循环系统/5. 高血压' },
                { text: '6. 心力衰竭', link: '/内科/内科1/循环系统/6. 心力衰竭' },
                { text: '7. 冠心病', link: '/内科/内科1/循环系统/7. 冠心病' },
                { text: '8. 心律失常', link: '/内科/内科1/循环系统/8. 心律失常' }
              ]
            },
            {
              text: '消化系统',
              items: [
                { text: '0. 概述', link: '/内科/内科1/消化系统/0. 概述' },
                { text: '1. 急性胃炎与慢性胃炎', link: '/内科/内科1/消化系统/1. 急性胃炎与慢性胃炎' },
                { text: '2. 消化性溃疡', link: '/内科/内科1/消化系统/2. 消化性溃疡' },
                { text: '3. 肝硬化', link: '/内科/内科1/消化系统/3. 肝硬化' },
                { text: '4. 肝性脑病', link: '/内科/内科1/消化系统/4. 肝性脑病' },
                { text: '5. 原发性肝癌', link: '/内科/内科1/消化系统/5. 原发性肝癌' },
                { text: '6. 肠结核与结核性腹膜炎', link: '/内科/内科1/消化系统/6. 肠结核与结核性腹膜炎' },
                { text: '7. 炎症性肠病', link: '/内科/内科1/消化系统/7. 炎症性肠病' },
                { text: '8. 急性胰腺炎', link: '/内科/内科1/消化系统/8. 急性胰腺炎' },
                { text: '9. 消化道出血', link: '/内科/内科1/消化系统/9. 消化道出血' }
              ]
            }
          ]
        }
      ],
      '/外科/': [
        {
          text: '概述',
          collapsed: false,
          items: [
            { text: '记忆口诀', link: '/外科/概述/记忆口诀' }
          ]
        },
        {
          text: '外科2',
          collapsed: false,
          items: [
            {
              text: '普外科',
              items: [
                { text: '1. 乳房疾病', link: '/外科/外科2/普外科/1. 乳房疾病' },
                { text: '2. 颈部疾病（甲状腺）', link: '/外科/外科2/普外科/2. 颈部疾病（甲状腺）' },
                { text: '3. 周围血管和淋巴管疾病', link: '/外科/外科2/普外科/3. 周围血管和淋巴管疾病' },
                { text: '4. 急性化脓性腹膜炎', link: '/外科/外科2/普外科/4. 急性化脓性腹膜炎' },
                { text: '5. 腹部损伤', link: '/外科/外科2/普外科/5. 腹部损伤' },
                { text: '6. 腹外疝', link: '/外科/外科2/普外科/6. 腹外疝' },
                { text: '7. 阑尾疾病', link: '/外科/外科2/普外科/7. 阑尾疾病' },
                { text: '8. 胃十二指肠疾病', link: '/外科/外科2/普外科/8. 胃十二指肠疾病' },
                { text: '9. 外科微创技术', link: '/外科/外科2/普外科/9. 外科微创技术' },
                { text: '10. 小肠疾病（肠梗阻）', link: '/外科/外科2/普外科/10. 小肠疾病（肠梗阻）' },
                { text: '11. 结、直肠与肛管疾病', link: '/外科/外科2/普外科/11. 结、直肠与肛管疾病' },
                { text: '12. 胆道疾病', link: '/外科/外科2/普外科/12. 胆道疾病' },
                { text: '13. 肝疾病', link: '/外科/外科2/普外科/13. 肝疾病' },
                { text: '14. 门静脉高压症', link: '/外科/外科2/普外科/14. 门静脉高压症' },
                { text: '15. 胰腺疾病', link: '/外科/外科2/普外科/15. 胰腺疾病' }
              ]
            },
            {
              text: '骨科',
              items: [
                { text: '1. 骨折概论', link: '/外科/外科2/骨科/1. 骨折概论' },
                { text: '2. 上肢骨、关节损伤', link: '/外科/外科2/骨科/2. 上肢骨、关节损伤' },
                { text: '3. 手外伤及断肢（指）再植', link: '/外科/外科2/骨科/3. 手外伤及断肢（指）再植' },
                { text: '4. 下肢骨、关节损伤', link: '/外科/外科2/骨科/4. 下肢骨、关节损伤' },
                { text: '5. 脊柱、脊髓损伤和骨盆、髋臼骨折', link: '/外科/外科2/骨科/5. 脊柱、脊髓损伤和骨盆、髋臼骨折' },
                { text: '6. 运动系统畸形', link: '/外科/外科2/骨科/6. 运动系统畸形' },
                { text: '7. 股骨头坏死', link: '/外科/外科2/骨科/7. 股骨头坏死' },
                { text: '8. 颈腰椎退变性疾病', link: '/外科/外科2/骨科/8. 颈腰椎退变性疾病' },
                { text: '9. 骨与关节化脓性感染', link: '/外科/外科2/骨科/9. 骨与关节化脓性感染' },
                { text: '10. 骨与关节结核', link: '/外科/外科2/骨科/10. 骨与关节结核' },
                { text: '11. 运动系统慢性损伤', link: '/外科/外科2/骨科/11. 运动系统慢性损伤' },
                { text: '12. 非化脓性关节炎', link: '/外科/外科2/骨科/12. 非化脓性关节炎' },
                { text: '13. 骨肿瘤', link: '/外科/外科2/骨科/13. 骨肿瘤' }
              ]
            }
          ]
        }
      ],
      '/妇产科/': [
        {
          text: '妇产科',
          collapsed: false,
          items: [
            { text: '子宫内膜癌', link: '/妇产科/子宫内膜癌' }
          ]
        }
      ],
      '/麻醉设备学/': [
        {
          text: '麻醉设备学',
          collapsed: false,
          items: [
            { text: '医学仪器基础知识', link: '/麻醉设备学/医学仪器基础知识' },
            { text: '麻醉机', link: '/麻醉设备学/麻醉机' },
            { text: '常考知识点汇总', link: '/麻醉设备学/考试重点' },
            {
              text: '监测仪器',
              items: [
                { text: '呼吸功能监测', link: '/麻醉设备学/呼吸功能监测' },
                { text: '循环功能监测仪器', link: '/麻醉设备学/循环功能监测仪器' },
                { text: '肌松监测仪', link: '/麻醉设备学/肌松监测仪' },
                { text: '麻醉深度监测', link: '/麻醉设备学/麻醉深度监测' },
                { text: '医学气体监测', link: '/麻醉设备学/医学气体监测' },
                { text: '超声诊断仪器', link: '/麻醉设备学/超声诊断仪器' },
                { text: '围术期保温设备', link: '/麻醉设备学/围术期保温设备' },
              ]
            },
            {
              text: '治疗设备',
              items: [
                { text: '麻醉喉镜和光导纤维内镜', link: '/麻醉设备学/麻醉喉镜和光导纤维内镜' },
                { text: '医用输注设备', link: '/麻醉设备学/医用输注设备' },
                { text: '体外循环辅助设备', link: '/麻醉设备学/体外循环辅助设备' },
              ]
            },
            {
              text: '呼吸机/通气机',
              items: [
                { text: '常见缩写', link: '/麻醉设备学/呼吸机/常见缩写' },
                { text: '通气机概论和基本概念', link: '/麻醉设备学/呼吸机/通气机概论' }
              ]
            },
            {
              text: '麻醉机',
              items: [
                { text: '麻醉回路', link: '/麻醉设备学/麻醉机/麻醉回路' }
              ]
            }
          ]
        }
      ],
      '/总论/': [
        {
          text: '总论',
          collapsed: false,
          items: [
            { text: '跨系统对比', link: '/总论/跨系统对比' },
            { text: '诊断公式汇总', link: '/总论/诊断公式汇总' },
            { text: '记忆口诀', link: '/总论/记忆口诀' }
          ]
        }
      ]
    },
    socialLinks: [],
    footer: {
      message: '医学笔记',
      copyright: '2026'
    },
    outline: {
      level: [2, 4],
      label: '本页导航',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
  }
})