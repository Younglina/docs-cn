---
title: Getting Started | Guide
---

# 快速起步

## 总览

Vitest 是由 Vite 驱动的下一代测试框架。

你可以在 [为什么是 Vitest](./why) 中了解有关该项目背后的基本原理的更多信息。

## 在线试用 Vitest

你可以在 [StackBlitz](https://vitest.new) 上在线尝试 Vitest 。它直接在浏览器中运行 Vitest，它几乎与本地设置相同，但不需要在你的计算机上安装任何东西。

## 将 Vitest 安装到项目

使用 npm

<CourseLink href="https://vueschool.io/lessons/how-to-install-vitest?friend=vueuse">Learn how to install by Video</CourseLink>

::: code-group
```bash [npm]
npm install -D vitest
```
```bash [yarn]
yarn add -D vitest
```
```bash [pnpm]
pnpm add -D vitest
```
```bash [bun]
bun add -D vitest
```
:::

:::tip
Vitest 需要 Vite >=v3.0.0 和 Node >=v14.18
:::

建议你使用上面列出的方法之一在 `package.json` 中安装 `vitest` 的副本。 但是，如果你希望直接运行 `vitest`，可以使用 `npx vitest`（npm 和 Node.js 附带 `npx` 命令）。

`npx` 命令将从本地 `node_modules/.bin` 执行命令，安装命令运行所需的任何包。 默认情况下，npx 将检查命令是否存在于 $PATH 或本地项目二进制文件中，并执行它。 如果未找到命令，它将在执行之前安装。

## 编写测试

例如，我们将编写一个简单的测试来验证将两个数字相加的函数的输出。

```js
// sum.js
export function sum(a, b) {
  return a + b
}
```

```js
// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

接下来，为了执行测试，请将以下部分添加到你的 `package.json` 文件中：

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

最后，运行 `npm run test`、`yarn test` 或 `pnpm test`，具体取决于你的包管理器，Vitest 将打印此消息：

```txt
✓ sum.test.js (1)
  ✓ adds 1 + 2 to equal 3

Test Files  1 passed (1)
    Tests  1 passed (1)
  Start at  02:15:44
  Duration  311ms (transform 23ms, setup 0ms, collect 16ms, tests 2ms, environment 0ms, prepare 106ms)
```

了解更多关于 Vitest 的使用，请参考 [API 索引](https://cn.vitest.dev/api/) 部分。

## 配置 Vitest

Vitest 的主要优势之一是它与 Vite 的统一配置。如果存在，`vitest` 将读取你的根目录 `vite.config.ts` 以匹配插件并设置为你的 Vite 应用程序。例如，你的 Vite 有 [resolve.alias](https://cn.vitejs.dev/config/#resolve-alias) 和 [plugins](https://cn.vitejs.dev/guide/using-plugins.html) 的配置将会在 Vitest 中开箱即用。如果你想在测试期间想要不同的配置，你可以:

- 创建 `vitest.config.ts`，优先级将会最高。
- 将 `--config` 选项传递给 CLI，例如 `vitest --config ./path/to/vitest.config.ts`。
- 在 `defineConfig` 上使用 `process.env.VITEST` 或 `mode` 属性（如果没有被覆盖，将设置为 `test`）有条件地在 `vite.config.ts` 中应用不同的配置。

Vitest 支持与 Vite 相同的配置文件扩展名：`.js`、`.mjs`、`.cjs`、`.ts`、`.cts`、`.mts`。 Vitest 不支持 `.json` 扩展名。

如果您不使用 Vite 作为构建工具，您可以使用配置文件中的 `test` 属性来配置 Vitest：

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  },
})
```

::: tip
即使你自己不使用 Vite，Vitest 的转换管道也严重依赖它。因此，你还可以配置[Vite 文档](https://cn.vitejs.dev/config/)中描述的任何属性。
:::

如果你已经在使用 Vite，请在 Vite 配置中添加 `test` 属性。你还需要使用 [三斜杠指令](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-) 在你的配置文件的顶部引用。

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ...
  },
})
```

可以参阅 [配置索引](../config/) 中的配置选项列表

::: warning
如果你决定为 Vite 和 Vitest 使用两个单独的配置文件，请确保在 Vitest 配置文件中定义相同的 Vite 选项，因为它将覆盖您的 Vite 文件，而不是扩展它。你还可以使用 `vite` 或`vitest/config` 条目中的 `mergeConfig` 方法将 Vite 配置与 Vitest 配置合并：

:::code-group

```ts [vitest.config.mjs]
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // ...
    },
  })
)
```

```ts [vite.config.mjs]
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
})
```

但我们建议 Vite 和 Vitest 使用相同的文件，而不是创建两个单独的文件。
:::

## 支持工作空间

使用 [Vitest Workspaces](/guide/workspace) 在同一项目中运行不同的项目配置。你可以在`vitest.workspace`文件中定义工作区的文件和文件夹列表。该文件支持 `js` / `ts` / `json` 扩展名。此功能与 monorepo 设置非常配合使用。

```ts
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // you can use a list of glob patterns to define your workspaces
  // Vitest expects a list of config files
  // or directories where there is a config file
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  // you can even run the same tests,
  // but with different configs in the same "vitest" process
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
])
```

## 命令行

在安装了 Vitest 的项目中，你可以在 npm 脚本中使用 `vitest` 脚本，或者直接使用 `npx vitest` 运行它。 以下是脚手架 Vitest 项目中的默认 npm 脚本：

<!-- prettier-ignore -->
```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

要在不监视文件更改的情况下运行一次测试，请使用 `vitest run`。
你还可以指定其他 CLI 选项，例如 `--port` 或 `--https`。 有关 CLI 选项的完整列表，可以在你的项目中运行 `npx vitest --help`。

了解更多有关 [命令行界面](./cli.md) 的更多信息

## IDE 集成

我们还提供了 Visual Studio Code 的官方扩展，以增强你使用 Vitest 的测试体验。

[从 VS Code 插件市场进行安装](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)

了解更多有关 [IDE 插件](./ide.md) 的更多信息

## 示例

| 示例                    | 源代码                                                                                  | 演练场                                                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `basic`                 | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/basic)                 | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/basic?initialPath=__vitest__)                 |
| `graphql`               | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/graphql)               | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/graphql?initialPath=__vitest__)               |
| `lit`                   | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/lit)                   | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/lit?initialPath=__vitest__)                   |
| `mocks`                 | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/mocks)                 | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/mocks?initialPath=__vitest__)                 |
| `nextjs`                | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/nextjs)                | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/nextjs?initialPath=__vitest__)                |
| `puppeteer`             | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/puppeteer)             |                                                                                                                                     |
| `react-enzyme`          | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/react-enzyme)          | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/react-enzyme?initialPath=__vitest__)          |
| `react-mui`             | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/react-mui)             | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/react-mui?initialPath=__vitest__)             |
| `react-storybook`       | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/react-storybook)       | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/react-storybook?initialPath=__vitest__)       |
| `react-testing-lib-msw` | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib-msw) | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/react-testing-lib-msw?initialPath=__vitest__) |
| `react-testing-lib`     | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)     | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/react-testing-lib?initialPath=__vitest__)     |
| `react`                 | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/react)                 | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/react?initialPath=__vitest__)                 |
| `ruby`                  | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/ruby)                  | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/ruby?initialPath=__vitest__)                  |
| `solid`                 | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/solid)                 | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/solid?initialPath=__vitest__)                 |
| `svelte`                | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)                | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/svelte?initialPath=__vitest__)                |
| `vitesse`               | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/vitesse)               | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/vitesse?initialPath=__vitest__)               |
| `vue-jsx`               | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/vue-jsx)               | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/vue-jsx?initialPath=__vitest__)               |
| `vue`                   | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/vue)                   | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/vue?initialPath=__vitest__)                   |
| `vue2`                  | [GitHub](https://github.com/vitest-dev/vitest/tree/main/examples/vue2)                  | [Play Online](https://stackblitz.com/fork/github/vitest-dev/vitest/tree/main/examples/vue2?initialPath=__vitest__)                  |

## 使用 Vitest 的项目

- [unocss](https://github.com/unocss/unocss)
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [vue](https://github.com/vuejs/core)
- [vite](https://github.com/vitejs/vite)
- [vitesse](https://github.com/antfu/vitesse)
- [vitesse-lite](https://github.com/antfu/vitesse-lite)
- [fluent-vue](https://github.com/demivan/fluent-vue)
- [vueuse](https://github.com/vueuse/vueuse)
- [milkdown](https://github.com/Saul-Mirone/milkdown)
- [gridjs-svelte](https://github.com/iamyuu/gridjs-svelte)
- [spring-easing](https://github.com/okikio/spring-easing)
- [bytemd](https://github.com/bytedance/bytemd)
- [faker](https://github.com/faker-js/faker)
- [million](https://github.com/aidenybai/million)
- [Vitamin](https://github.com/wtchnm/Vitamin)
- [neodrag](https://github.com/PuruVJ/neodrag)
- [svelte-multiselect](https://github.com/janosh/svelte-multiselect)
- [iconify](https://github.com/iconify/iconify)
- [tdesign-vue-next](https://github.com/Tencent/tdesign-vue-next)
- [cz-git](https://github.com/Zhengqbbb/cz-git)

<!--
For contributors:
We no longer accept new entries to this list a this moment.
Thanks for choosing Vitest!
-->

## 使用未发布的功能

如果你迫不及待想要体验最新的功能，可以自行克隆 [vitest 仓库](https://github.com/vitest-dev/vitest) 到本地机器上然后自行将其链接（将需要 [pnpm](https://pnpm.io/zh/)）：

```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
cd packages/vitest
pnpm run build
pnpm link --global # 你可以使用你喜爱的任何包管理工具来设置这个步骤
```

然后，回到你的 Vitest 项目并运行 `pnpm link --global vitest`（或者使用你的其他包管理工具来全局链接 `Vitest`）。

## 社区

如果你有疑问或者需要帮助，可以到 [Discord](https://chat.vitest.dev) 和 [GitHub Discussions](https://github.com/vitest-dev/vitest/discussions) 社区来寻求帮助。
