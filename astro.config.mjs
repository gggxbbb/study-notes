import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://study-notes.gxb.pub',
  integrations: [
    starlight({
      title: '医学笔记',
      defaultLocale: 'zh-CN',
      locales: {
        'zh-CN': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      sidebar: [
        {
          label: '内科',
          autogenerate: { directory: '内科' },
        },
        {
          label: '外科',
          autogenerate: { directory: '外科' },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
    }),
  ],
});
