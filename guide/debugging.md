---
title: Debugging | Guide
---

# 调试

## Terminal

在非集成开发环境下，为了调试一个测试文件，你可以使用 [`ndb`](https://github.com/GoogleChromeLabs/ndb)。仅仅在你的代码的任何位置添加一个 `debugger` 语句，然后运行 `ndb`：

```sh
# 全局安装 ndb
npm install -g ndb

# 或者使用 yarn
yarn global add ndb

# 在启用 debugger 的情况下运行测试
ndb npm run test
```

:::tip
在调试测试时，你可能使用 `--test-timeout` CLI 参数来防止测试在断点处停止时超时。
:::

## VSCode

在 VSCode 中调试测试的快速方法是通过 `JavaScript 调试终端`。 打开一个新的 `JavaScript 调试终端` 并直接运行 `npm run test` 或 `vitest`。_这适用于在 Node 中运行的任何代码，因此适用于大多数 JS 测试框架_

![image](https://user-images.githubusercontent.com/5594348/212169143-72bf39ce-f763-48f5-822a-0c8b2e6a8484.png)

你还可以添加专用启动配置以在 VSCode 中调试测试文件:

```json
{
  // 想了解更多的信息, 请访问：https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}
```

然后在调试选项卡中确保选择 'Debug Current Test File'，然后你可以打开要调试的测试文件并按 F5 开始调试。

## IntelliJ IDEA

创建一个 'Node.js' 运行配置。使用以下配置在调试模式下运行所有测试：

| Setting                | Value                            |
| ---------------------- | -------------------------------- |
| Working directory      | /path/to/your-project-root       |
| JavaScript file        | ./node_modules/vitest/vitest.mjs |
| Application parameters | run --pool forks                 |

然后在调试模式下运行此配置。IDE 将在编辑器中设置的 JS/TS 断点处停止。

## Node Inspector, e.g. Chrome DevTools

Vitest 还支持在没有 IDE 的情况下调试测试。然而，这要求测试不是并行运行的。可以使用以下命令之一启动 Vitest。

```sh
# To run in a single worker
vitest --inspect-brk --pool threads --poolOptions.threads.singleThread

# To run in a single child process
vitest --inspect-brk --pool forks --poolOptions.forks.singleFork
```

一旦 Vitest 启动，它将停止执行并等待你打开可以连接到 [NodeJS 检查器](https://nodejs.org/en/docs/guides/debugging-getting-started/) 的开发人员工具。 你可以通过在浏览器上打开 `chrome://inspect` 来使用 Chrome DevTools。

在监视模式下，你可以使用 `--poolOptions.threads.isolate false` 选项在测试重新运行期间保持调试器打开。
