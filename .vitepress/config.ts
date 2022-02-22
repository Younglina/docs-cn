import { defineConfig } from 'vitepress'
import { version } from '../package.json'

import {
  contributing,
  discord,
  font,
  ogImage,
  ogUrl,
  releases,
  twitter,
  englishDev,
  vitestDescription,
  vitestName
} from "../docs-data";
// noinspection ES6PreferShortImport: IntelliJ IDE hint to avoid warning to use `~/contributors`, will fail on build if changed
import { coreTeamMembers } from '../src/contributors'

export default defineConfig({
  title: vitestName,
  description: vitestDescription,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { name: 'author', content: `${coreTeamMembers.map(c => c.name).join(', ')} and ${vitestName} contributors` }],
    // TODO: review this
    ['meta', { name: 'keywords', content: 'vitest, vite, test, coverage, snapshot, react, vue, preact, svelte, solid, lit, ruby, cypress, puppeteer, jsdom, happy-dom, test-runner, jest, typescript, esm, tinypool, tinyspy, c8, node' }],
    ['meta', { property: 'og:title', content: vitestName }],
    ['meta', { property: 'og:description', content: vitestDescription }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: vitestName }],
    ['meta', { name: 'twitter:description', content: vitestDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { href: font, rel: 'stylesheet' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: "180x180" }],
  ],
  themeConfig: {
    repo: 'vitest-dev/vitest',
    logo: '/logo.svg',
    docsRepo:'xiaoxunyao/cn.vitest.dev',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '建议更改此页面',
    /* TODO

    algolia: {
      apiKey: '...',
      indexName: 'vitest',
      searchParameters: {
        facetFilters: ['tags:en']
      }
    },

    carbonAds: {
      carbon: '...',
      placement: 'vitest'
    },
    */

    nav: [
      { text: '指引', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '配置', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: `v${version}`,
        items: [
          {
            text: '版本发布 ',
            link: releases,
          },
          {
            text: '社区指南 ',
            link: contributing,
          },
        ],

      },
      {
        text: 'Discord 聊天室',
        link: discord
      },
      {
        text: 'Twitter',
        link: twitter
      },
      {
        text: '语言',
        items: [
          {
            text: 'English',
            link: englishDev
          },
          {
            text: '简体中文',
            link: '/'
          },
          /**{
            text: '日本語',
            link: 'https://ja.vitest.dev'
          } */
        ]
      }
    ],

    sidebar: {
      '/config/': 'auto',
      '/api/': 'auto',
      // '/plugins': 'auto',
      // catch-all fallback
      '/': [
        {
          text: '开始',
          children: [
            {
              text: '简介',
              link: '/guide/why',

            },
            {
              text: '快速开始',
              link: '/guide/'
            },
            {
              text: '特性',
              link: '/guide/features'
            },
            {
              text: '模拟',
              link: '/guide/mocking'
            },
            {
              text: '调试',
              link: '/guide/debugging'
            },
            /* TODO
            {
              text: 'Using Plugins',
              link: '/guide/using-plugins'
            },
            */
            {
              text: '比较',
              link: '/guide/comparisons'
            },
            {
              text: '迁移指南',
              link: '/guide/migration'
            }
          ]
        },
        /* TODO
        {
          text: 'APIs',
          children: [
            {
              text: 'Plugin API',
              link: '/guide/api-plugin'
            },
            {
              text: 'Config Reference',
              link: '/config/'
            }
          ]
        },
        */
      ]
    }
  }
})
