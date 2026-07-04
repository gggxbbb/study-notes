import { defineConfig } from 'vitepress'
import katex from './markdown-it-katex-custom.js'
import markdownItPlantUML from 'markdown-it-plantuml'
import markmapPlugin from '@vitepress-plugin/markmap'
import { withMermaid } from 'vitepress-plugin-mermaid'
import 'katex/dist/contrib/mhchem.mjs'

export default withMermaid(defineConfig({
  title: '医学笔记',
  description: '内科学1、外科学2知识点整理',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: false,
  metaChunk: true,
  ignoreDeadLinks: true,
  vite: {
    plugins: [markmapPlugin()],
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.svg' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css' }],
    ['style', {}, `table { display: block; overflow-x: auto; }
.vp-doc table { display: block; overflow-x: auto; }
.vp-doc .vp-table-wrapper { overflow-x: auto; }
.vp-doc svg { display: block; }`],
    ['script', {}, `(function(){
function fitSvgs() {
  var svgs = document.querySelectorAll('.vp-doc svg');
  for (var i = 0; i < svgs.length; i++) {
    var s = svgs[i];
    if (s.hasAttribute('data-fitted')) continue;
    var vb = s.getAttribute('viewBox');
    if (!vb) { s.style.maxWidth = '100%'; s.style.height = 'auto'; s.setAttribute('data-fitted','1'); continue; }
    var parts = vb.split(/\\s+/);
    var vbW = parseFloat(parts[2]), vbH = parseFloat(parts[3]);
    if (!vbW || !vbH) { s.style.maxWidth = '100%'; s.style.height = 'auto'; s.setAttribute('data-fitted','1'); continue; }
    var ratio = vbH / vbW;
    var w = s.parentElement.clientWidth;
    if (!w) w = document.querySelector('.vp-doc').clientWidth;
    s.setAttribute('width', w);
    s.setAttribute('height', Math.round(w * ratio));
    s.removeAttribute('style');
    s.setAttribute('data-fitted','1');
  }
}
fitSvgs();
var ob = new MutationObserver(function() { fitSvgs(); });
ob.observe(document.body, { childList: true, subtree: true });
})();`],
    ['script', {}, `document.addEventListener('DOMContentLoaded',function(){
var wrappers=document.querySelectorAll('.vp-doc .vp-table-wrapper');
for(var i=0;i<wrappers.length;i++){
  var w=wrappers[i],t=w.querySelector('table');
  if(t&&t.scrollWidth>w.clientWidth+1)t.style.whiteSpace='nowrap';
}
}());`],
    ['script', {}, `(function(){
var ob=new MutationObserver(function(){
  var el=document.querySelector('.VPSidebar .is-active');
  if(el)el.scrollIntoView({block:'center',behavior:'instant'});
});
var sb=document.querySelector('.VPSidebar');
if(sb)ob.observe(sb,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
})();`],
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
      { text: '主页', link: '/' },
      { text: '总论', link: '/General/MedicalEnglish' },
      { text: '病理生理学', link: '/Pathophysiology/Introduction' },
      { text: '诊断学', link: '/Diagnostics/CommonSymptoms' },
      { text: '麻醉设备学', link: '/AnestheticEquipment/BasicKnowledge' },
      { text: '内科学', link: '/InternalMedicine/Medicine1/Respiratory/RespiratoryOverview' },
      { text: '外科学', link: '/Surgery/Surgery2/NeckBreastSurgery/NeckDisease' }
    ],
    sidebar: [
      {
        text: '总论',
        collapsed: true,
        items: [
          { text: '常见医学英语', link: '/General/MedicalEnglish' },
          { text: '周期性发作疾病汇总', link: '/General/PeriodicDiseases' }
        ]
      },
      {
        text: '西医综合',
        collapsed: true,
        items: [
          { text: '考情分析', link: '/ComprehensiveExam/ExamOverview' },
          { text: '卫生法知识点', link: '/ComprehensiveExam/HealthLaw' }
        ]
      },
      {
        text: '人体系统解剖学',
        collapsed: true,
        items: []
      },
      {
        text: '生物化学与分子生物学',
        collapsed: true,
        items: []
      },
      {
        text: '病理学',
        collapsed: true,
        items: []
      },
      {
        text: '医学微生物学与免疫学',
        collapsed: true,
        items: []
      },
      {
        text: '麻醉生理学',
        collapsed: true,
        items: []
      },
      {
        text: '病理生理学',
        collapsed: true,
        items: [
          { text: '绪论', link: '/Pathophysiology/Introduction' },
          { text: '健康与疾病', link: '/Pathophysiology/DiseaseOverview' },
          { text: '水、钠代谢紊乱', link: '/Pathophysiology/WaterElectrolyteDisorder' },
          { text: '酸碱平衡和酸碱平衡紊乱', link: '/Pathophysiology/AcidBaseBalance' },
          { text: '缺氧', link: '/Pathophysiology/Hypoxia' },
          { text: '发热', link: '/Pathophysiology/Fever' },
          { text: '应激概述', link: '/Pathophysiology/Stress' },
          { text: '缺血-再灌注损伤', link: '/Pathophysiology/IschemiaReperfusion' },
          { text: '休克', link: '/Pathophysiology/Shock' },
          { text: '凝血与抗凝血平衡紊乱/DIC', link: '/Pathophysiology/Dic' },
          { text: '心功能不全', link: '/Pathophysiology/CardiacInsufficiency' },
          { text: '肺功能不全', link: '/Pathophysiology/RespiratoryInsufficiency' },
          { text: '肝功能不全', link: '/Pathophysiology/HepaticInsufficiency' },
          { text: '肾功能不全', link: '/Pathophysiology/RenalInsufficiency' }
        ]
      },
      {
        text: '麻醉解剖学',
        collapsed: true,
        items: []
      },
      {
        text: '诊断学',
        collapsed: true,
        items: [
          { text: '常见症状', link: '/Diagnostics/CommonSymptoms' },
          { text: '问诊', link: '/Diagnostics/Inquiry' },
          { text: '体格检查', link: '/Diagnostics/PhysicalExamination' },
          { text: '辅助检查', link: '/Diagnostics/AuxiliaryExamination' },
          { text: '病历书写', link: '/Diagnostics/MedicalRecord' },
          { text: '诊断思维', link: '/Diagnostics/DiagnosticThinking' },
          { text: '临床血液学检测', link: '/Diagnostics/LabDiagnosis' },
          { text: '实验诊断QRH（精简版）', link: '/Diagnostics/LabDiagnosisQrh' },
          { text: '水电解质代谢紊乱', link: '/Diagnostics/WaterElectrolyte' }
        ]
      },
      {
        text: '麻醉药理学',
        collapsed: true,
        items: [
          { text: '药理学口诀', link: '/AnestheticPharmacology/Mnemonics' }
        ]
      },
      {
        text: '麻醉设备学',
        collapsed: true,
        items: [
          { text: '医学仪器基础知识', link: '/AnestheticEquipment/BasicKnowledge' },
          { text: '常考知识点汇总', link: '/AnestheticEquipment/ExamKeyPoints' },
          {
            text: '监测仪器',
            items: [
              { text: '呼吸功能监测', link: '/AnestheticEquipment/RespiratoryMonitoring' },
              { text: '循环功能监测仪器', link: '/AnestheticEquipment/CirculatoryMonitoring' },
              { text: '肌松监测仪', link: '/AnestheticEquipment/NeuromuscularMonitoring' },
              { text: '麻醉深度监测', link: '/AnestheticEquipment/AnesthesiaDepth' },
              { text: '医学气体监测', link: '/AnestheticEquipment/MedicalGasMonitoring' },
              { text: '超声诊断仪器', link: '/AnestheticEquipment/UltrasoundDiagnostics' },
              { text: '围术期保温设备', link: '/AnestheticEquipment/PerioperativeWarming' }
            ]
          },
          {
            text: '治疗设备',
            items: [
              { text: '麻醉喉镜和光导纤维内镜', link: '/AnestheticEquipment/LaryngoscopeEndoscope' },
              { text: '医用输注设备', link: '/AnestheticEquipment/InfusionDevices' },
              { text: '体外循环辅助设备', link: '/AnestheticEquipment/CardiopulmonaryBypass' }
            ]
          },
          {
            text: '呼吸机',
            items: [
              { text: '呼吸机常见缩写', link: '/AnestheticEquipment/Ventilator/CommonAbbreviations' },
              { text: '通气机概论和基本概念', link: '/AnestheticEquipment/Ventilator/VentilatorOverview' }
            ]
          },
          {
            text: '麻醉机',
            items: [
              { text: '麻醉机总论', link: '/AnestheticEquipment/AnesthesiaMachineMain' },
              { text: '麻醉回路', link: '/AnestheticEquipment/AnesthesiaMachine/AnesthesiaCircuit' }
            ]
          }
        ]
      },
      {
        text: '内科学',
        collapsed: true,
        items: [
          {
            text: '概述',
            items: [
              { text: '跨系统对比', link: '/InternalMedicine/Overview/CrossSystemComparison' },
              { text: '诊断公式汇总', link: '/InternalMedicine/Overview/DiagnosticFormulas' },
              { text: '记忆口诀汇总', link: '/InternalMedicine/Overview/MemorizationTips' }
            ]
          },
          {
            text: '内科1',
            collapsed: true,
            items: [
              { text: '常考知识点汇总', link: '/InternalMedicine/Medicine1/ExamKeyPoints' },
              {
                text: '呼吸系统',
                items: [
                  { text: '呼吸系统总论', link: '/InternalMedicine/Medicine1/Respiratory/RespiratoryOverview' },
                  { text: '慢性阻塞性肺疾病', link: '/InternalMedicine/Medicine1/Respiratory/Copd' },
                  { text: '支气管哮喘', link: '/InternalMedicine/Medicine1/Respiratory/Asthma' },
                  { text: '支气管扩张症', link: '/InternalMedicine/Medicine1/Respiratory/Bronchiectasis' },
                  { text: '肺炎', link: '/InternalMedicine/Medicine1/Respiratory/Pneumonia' },
                  { text: '肺脓肿', link: '/InternalMedicine/Medicine1/Respiratory/LungAbscess' },
                  { text: '肺结核', link: '/InternalMedicine/Medicine1/Respiratory/Tuberculosis' },
                  { text: '肺癌', link: '/InternalMedicine/Medicine1/Respiratory/LungCancer' },
                  { text: '肺动脉高压与肺源性心脏病', link: '/InternalMedicine/Medicine1/Respiratory/ChronicPulmonaryHeartDisease' },
                  { text: '胸膜疾病', link: '/InternalMedicine/Medicine1/Respiratory/PleuralDisease' },
                  { text: '呼吸衰竭', link: '/InternalMedicine/Medicine1/Respiratory/RespiratoryFailure' }
                ]
              },
              {
                text: '循环系统',
                items: [
                  { text: '循环系统概论', link: '/InternalMedicine/Medicine1/Circulatory/CirculatoryOverview' },
                  { text: '心力衰竭', link: '/InternalMedicine/Medicine1/Circulatory/HeartFailure' },
                  { text: '心律失常', link: '/InternalMedicine/Medicine1/Circulatory/Arrhythmia' },
                  { text: '动脉粥样硬化和冠心病', link: '/InternalMedicine/Medicine1/Circulatory/CoronaryHeartDisease' },
                  { text: '高血压', link: '/InternalMedicine/Medicine1/Circulatory/Hypertension' },
                  { text: '心肌疾病', link: '/InternalMedicine/Medicine1/Circulatory/MyocarditisCardiomyopathy' },
                  { text: '心脏瓣膜病', link: '/InternalMedicine/Medicine1/Circulatory/ValvularHeartDisease' },
                  { text: '感染性心内膜炎', link: '/InternalMedicine/Medicine1/Circulatory/InfectiveEndocarditis' },
                  { text: '心包疾病', link: '/InternalMedicine/Medicine1/Circulatory/PericardialDisease' }
                ]
              },
              {
                text: '消化系统',
                items: [
                  { text: '消化系统概述', link: '/InternalMedicine/Medicine1/Digestive/Overview' },
                  { text: '消化系统概论', link: '/InternalMedicine/Medicine1/Digestive/DigestiveOverview' },
                  { text: '胃炎', link: '/InternalMedicine/Medicine1/Digestive/Gastritis' },
                  { text: '消化性溃疡', link: '/InternalMedicine/Medicine1/Digestive/PepticUlcer' },
                  { text: '肠结核和结核性腹膜炎', link: '/InternalMedicine/Medicine1/Digestive/IntestinalTuberculosis' },
                  { text: '炎症性肠病', link: '/InternalMedicine/Medicine1/Digestive/InflammatoryBowelDisease' },
                  { text: '肝硬化', link: '/InternalMedicine/Medicine1/Digestive/Cirrhosis' },
                  { text: '原发性肝癌', link: '/InternalMedicine/Medicine1/Digestive/HepatocellularCarcinoma' },
                  { text: '肝性脑病', link: '/InternalMedicine/Medicine1/Digestive/HepaticEncephalopathy' },
                  { text: '胰腺炎', link: '/InternalMedicine/Medicine1/Digestive/AcutePancreatitis' },
                  { text: '消化道出血', link: '/InternalMedicine/Medicine1/Digestive/GastrointestinalBleeding' }
                ]
              }
            ]
          }
        ]
      },
      {
        text: '外科学',
        collapsed: true,
        items: [
          {
            text: '概述',
            collapsed: true,
            items: [
              { text: '记忆口诀汇总', link: '/Surgery/Overview/MemorizationTips' },
              { text: '危象鉴别', link: '/Surgery/Overview/CrisisComparison' },
              { text: '消化道X线征', link: '/Surgery/Overview/GIXraySigns' },
              { text: '腹部体征鉴别', link: '/Surgery/Overview/AbdominalPhysicalSigns' }
            ]
          },
          {
            text: '外科1',
            collapsed: true,
            items: [
              {
                text: '第一篇 外科学基础',
                items: [
                  { text: '水电解质代谢紊乱', link: '/Surgery/Surgery1/BasicPrinciples/WaterElectrolyteBalance' },
                  { text: '休克', link: '/Surgery/Surgery1/BasicPrinciples/Shock' },
                  { text: '外科营养', link: '/Surgery/Surgery1/BasicPrinciples/Nutrition' },
                  { text: '外科感染', link: '/Surgery/Surgery1/BasicPrinciples/Infection' },
                  { text: '创伤', link: '/Surgery/Surgery1/BasicPrinciples/Trauma' },
                  { text: '烧伤与冻伤', link: '/Surgery/Surgery1/BasicPrinciples/Burns' },
                  { text: '肿瘤', link: '/Surgery/Surgery1/BasicPrinciples/Tumors' },
                  { text: '移植', link: '/Surgery/Surgery1/BasicPrinciples/Transplant' }
                ]
              },
              {
                text: '第二篇 麻醉与围手术期处理',
                items: [
                  { text: '围手术期处理', link: '/Surgery/Surgery1/AnesthesiaPerioperative/Perioperative' }
                ]
              }
            ]
          },
          {
            text: '外科2',
            collapsed: true,
            items: [
              {
                text: '第四篇 颈部与乳腺外科',
                items: [
                  { text: '颈部疾病', link: '/Surgery/Surgery2/NeckBreastSurgery/NeckDisease' },
                  { text: '乳房疾病', link: '/Surgery/Surgery2/NeckBreastSurgery/BreastDisease' }
                ]
              },
              {
                text: '第六篇 心脏与血管外科',
                items: [
                  { text: '主动脉疾病', link: '/Surgery/Surgery2/CardiovascularSurgery/AorticDisease' },
                  { text: '周围血管与淋巴疾病', link: '/Surgery/Surgery2/CardiovascularSurgery/PeripheralVascularDisease' }
                ]
              },
              {
                text: '第七篇 腹部外科',
                items: [
                  { text: '腹外疝', link: '/Surgery/Surgery2/AbdominalSurgery/Hernia' },
                  { text: '腹部损伤', link: '/Surgery/Surgery2/AbdominalSurgery/AbdominalInjury' },
                  { text: '急性化脓性腹膜炎', link: '/Surgery/Surgery2/AbdominalSurgery/AcutePeritonitis' },
                  { text: '胃十二指肠疾病', link: '/Surgery/Surgery2/AbdominalSurgery/GastroduodenalDisease' },
                  { text: '小肠疾病', link: '/Surgery/Surgery2/AbdominalSurgery/SmallIntestineDisease' },
                  { text: '阑尾疾病', link: '/Surgery/Surgery2/AbdominalSurgery/AppendicealDisease' },
                  { text: '结直肠与肛管疾病', link: '/Surgery/Surgery2/AbdominalSurgery/ColorectalDisease' },
                  { text: '肝疾病', link: '/Surgery/Surgery2/AbdominalSurgery/LiverDisease' },
                  { text: '门静脉高压症', link: '/Surgery/Surgery2/AbdominalSurgery/PortalHypertension' },
                  { text: '胆道疾病', link: '/Surgery/Surgery2/AbdominalSurgery/BiliaryDisease' },
                  { text: '胰腺疾病', link: '/Surgery/Surgery2/AbdominalSurgery/PancreaticDisease' },
                  { text: '脾疾病', link: '/Surgery/Surgery2/AbdominalSurgery/SpleenDisease' },
                  { text: '消化道大出血', link: '/Surgery/Surgery2/AbdominalSurgery/GastrointestinalHemorrhage' },
                  { text: '急腹症', link: '/Surgery/Surgery2/AbdominalSurgery/AcuteAbdomen' }
                ]
              },
              {
                text: '第九篇 骨科',
                items: [
                  { text: '骨折概论', link: '/Surgery/Surgery2/Orthopedics/FractureOverview' },
                  { text: '运动系统畸形', link: '/Surgery/Surgery2/Orthopedics/MusculoskeletalDeformity' },
                  { text: '上肢骨关节损伤', link: '/Surgery/Surgery2/Orthopedics/UpperLimbInjury' },
                  { text: '手外伤及断肢（指）再植', link: '/Surgery/Surgery2/Orthopedics/HandTrauma' },
                  { text: '下肢骨关节损伤', link: '/Surgery/Surgery2/Orthopedics/LowerLimbInjury' },
                  { text: '脊柱脊髓损伤', link: '/Surgery/Surgery2/Orthopedics/SpineInjury' },
                  { text: '骨盆与髋臼骨折', link: '/Surgery/Surgery2/Orthopedics/PelvicFracture' },
                  { text: '周围神经损伤', link: '/Surgery/Surgery2/Orthopedics/PeripheralNerveInjury' },
                  { text: '运动系统慢性损伤', link: '/Surgery/Surgery2/Orthopedics/ChronicMusculoskeletalInjury' },
                  { text: '股骨头坏死', link: '/Surgery/Surgery2/Orthopedics/FemoralHeadNecrosis' },
                  { text: '颈腰椎退行性疾病', link: '/Surgery/Surgery2/Orthopedics/CervicalLumbarDegeneration' },
                  { text: '骨与关节化脓性感染', link: '/Surgery/Surgery2/Orthopedics/PyogenicInfection' },
                  { text: '骨与关节结核', link: '/Surgery/Surgery2/Orthopedics/BoneJointTuberculosis' },
                  { text: '非化脓性关节炎', link: '/Surgery/Surgery2/Orthopedics/NonPyogenicArthritis' },
                  { text: '骨肿瘤', link: '/Surgery/Surgery2/Orthopedics/BoneTumor' },
                  { text: '骨科英文', link: '/Surgery/Surgery2/Orthopedics/OrthopedicEponyms' }
                ]
              }
            ]
          }
        ]
      },
      {
        text: '危重病医学',
        collapsed: true,
        items: []
      },
      {
        text: '妇产科学',
        collapsed: true,
        items: [
          { text: '妇产科口诀汇总', link: '/ObstetricsGynecology/MemorizationTips' },
          { text: '子宫内膜癌', link: '/ObstetricsGynecology/EndometrialCancer' }
        ]
      },
      {
        text: '儿科学',
        collapsed: true,
        items: []
      },
      {
        text: '临床麻醉学',
        collapsed: true,
        items: []
      },
      {
        text: '疼痛诊疗学',
        collapsed: true,
        items: []
      },
      {
        text: '神经病学',
        collapsed: true,
        items: []
      }
    ],
    socialLinks: [],
    footer: {
      message: '本站内容由 AI 辅助生成及网络收集整理，仅供学习参考，不保证准确性和完整性'
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
}))
