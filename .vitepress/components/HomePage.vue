<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme'
import { teamMembers } from '../contributors'
</script>

<template>
  <div class="content">
    <div class="content-container">
      <main class="main">
        <div class="vp-doc" flex flex-col items-center mt-10>
          <h2 id="meet-the-team" op50 font-normal p="t-10 b-2">
            认识一下团队
          </h2>
          <div w-full p-10>
            <VPTeamMembers size="small" :members="teamMembers" />
          </div>
          <h2 id="the-team" op50 font-normal pt-5 pb-2>
            贡献者
          </h2>
          <p text-lg max-w-200 text-center leading-7>
            <Contributors />
            <br>
            <a href="https://chat.vitest.dev" rel="noopener noreferrer">加入我们</a>将乐在其中！
          </p>

          <h2 id="sponsored-by" op50 font-normal pt-5 pb-2>
            赞助商
          </h2>
          <div grid="~ cols-1 lg:cols-2" w-full text-center mt-10>
            <div class="flex flex-col">
              <a text-lg h="32px" href="https://github.com/sponsors/antfu" rel="noopener noreferrer">Anthony's 的赞助商</a>
              <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg" target="_blank" rel="noopener noreferrer">
                <img
                  crossorigin="anonymous"
                  inline-block
                  width="768" height="1464"
                  class="resizable-img"
                  loading="lazy"
                  src="/sponsors/antfu.svg"
                  alt="Anthony Fu's sponsors"
                  decoding="async"
                >
              </a>
            </div>
            <div class="flex flex-col">
              <a text-lg h="32px" href="https://github.com/sponsors/sheremet-va" rel="noopener noreferrer">Vladimir's 的赞助商</a>
              <a href="https://cdn.jsdelivr.net/gh/sheremet-va/static/sponsors.svg" target="_blank" rel="noopener noreferrer">
                <img
                  crossorigin="anonymous"
                  inline-block
                  width="768" height="1464"
                  class="resizable-img"
                  loading="lazy"
                  src="/sponsors/sheremet-va.svg"
                  alt="Vladimir's sponsors"
                  decoding="async"
                >
              </a>
            </div>
            <div class="flex flex-col">
              <a text-lg h="32px" href="https://github.com/sponsors/patak-dev" rel="noopener noreferrer">Patak's 的赞助商</a>
              <a href="https://cdn.jsdelivr.net/gh/patak-dev/static/sponsors.svg" target="_blank" rel="noopener noreferrer">
                <img
                  crossorigin="anonymous"
                  inline-block
                  width="768" height="722"
                  class="resizable-img"
                  loading="lazy"
                  src="/sponsors/patak-dev.svg"
                  alt="Patak's sponsors"
                  decoding="async"
                >
              </a>
            </div>
          </div>
          <p class="text-center opacity-75">
            <a href="https://www.netlify.com" rel="noopener noreferrer">
              <img src="/netlify.svg" alt="Deploys by Netlify" width="114" height="151" decoding="async">
            </a>
          </p>
        </div>
      </main>
    </div>
  </div>
</template>
