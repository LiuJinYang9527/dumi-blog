---
title: Node入门
toc: menu
---

# 什么是 Node.js

- Node.js 是一个基于&lt;mark&gt;Chrome V8 引擎&lt;/mark&gt;的 JavaScript 运行环境

- Node.js 使用了一个&lt;mark&gt;事件驱动&lt;/mark&gt;、&lt;mark&gt;非阻塞式 I/O&lt;/mark&gt;的模型，使其轻量又高效。

> 在 Node.js 里运行 JavaScript 跟在 Chrome 里运行 JavaScript 是一样的，用的是同样的 JavaScript 的引擎和模型。

但 Node.js 没有浏览器 API，如 document、window；加了许多自身的 API

# Node.js 可以用来做什么？

- 搜索引擎优化+首屏速度优化 = 服务端渲染

- 服务端渲染+前后端同构 = Node.js

- 构建工作流，webpack、gulp 等

- 开发工具 Visual Studio Code

- 游戏-wayward

- 客户端应用 electron

## 可扩展性

- 大型应用需要给使用者自定义模块的能力

- 使用 Node.js 做复杂本地应用

  - 可以利用 JS 的灵活性提供外部扩展

  - JS 庞大的开发者基数让他们的灵活性得到利用

### Node.js 特有变量

- \_\_\_\_filename //当前所在的文件位置

- \_\_dirname //当前所在的目录位置

- \_\_process //进程对象

## CommonJs 模块规范

- JavaScript 社区发起，在 Node.js 上应用并推广

- 后续也影响到了浏览器端 JavaScript

exports 、module.exports 暴露 require 引用 值引用

## npm

Node.js 的包管理工具

命令：

npm init //创建一个 package.json 文件

创建完毕后，即可安装其他 npm 包，npm 安装的文件在 node_modules 文件夹下

- dependencies npm 依赖项

npm install 依赖

npm uninstall 依赖

--save 将依赖加到 dependencies 中

著名大神：

- TJ Holo waychunk express

- Mafintosh

- Dominictarr

- ....

### npm event-stream 事件

## Node.js 内置模块

- fs

- os

- process

- path

- EventEmitter

  - 观察者模式

  - 调用 VS 抛事件 何时使用

  - 关键在于 ‘不知道被通知者存在’

  - 以及 ‘没有人听还能继续下去’

## 异步：非阻塞 I/o

- I/o 几 input/Output 一个系统的输入和输出

- 阻塞 I/o 和非阻塞 i/o 的区别就在于系统接收输入再到输出期间，能不能接收其他输入

### 例子：

- 吃饭 对于点菜人员

  - 去饭堂 阻塞 I/O

  - 餐厅点菜 非阻塞 I/O

理解非阻塞 I/o 的要点在于：

- 确定一个进行 Input/Output 的系统

- 思考在 I/O 进程中，能不能进行其他 I/O

## 异步编程之 callback

- 回调函数格式规范

  - error first callback

  - Node-style callback

- 第一个参数是 error，后边的参数才是结果

- 异步调用控制 -回调地狱以及并发

## 事件循环

## Promise

- 当前事件循环得不到得结果，但未来的事件循环会给你结果

- 是一个状态机

  - pending

  - fulfilled/resolved

  - rejected

- .then 和.catch

  - resolved 状态的 Promise 会回调后边的第一个.then

  - rejected 状态的 Promise 会回调后面的第一个.catch

  - 任何一个 rejected 状态且后面没有.catch 的 Promise，都会造成浏览器/node 环境的全局错误

- 执行.then 和.catch 会返回一个新的 Promise，该 Promise 最终状态根据 then 和 catch 的回调函数的执行结果决定

  - 如果回调函数最终是 throw，该 Promise 是 reject 状态

  - 如果回调函数最终是 return，该 Promise 是 resolved 状态

  - 如果回调函数最终 return 了一个 Promise，该 Promise 会和回调函数 return 的 Promise 状态保持一致

## asycn/await

- async/await

  - async function 是 Promise 的语法糖封装

  - 异步编程的终极方案-以同步的方式写异步

    - await 关键字可以暂停 async function 的执行

    - await 关键字可以以同步的写法获取 Promise 的执行结果

    - try-catch 可以获取 await 所得到的错误

  - 一个穿越事件循环存在的 function

## HTTP 服务

- HTTP 是什么

  - 应用层协议

  - 五层网络协议

    1.物理层

    2.数据链路层

    3.网络层

    4.运输层

    5.应用层

- 一个网页请求，包含两次 HTTP 包交换

  - 浏览器向 HTTP 服务器发送请求 HTTP 包

  - HTTP 服务器向浏览器返回 HTTP 包

- HTTP 服务要做什么事情？

  - 解析进来的 HTTP 请求报文

  - 返回对应的 HTTP 返回报文

## 简单实现一个 HTTP 服务器

```js
//index.js
const http = require('http');
http
  .createServer(function(request, response) {
    if (request.url == '/favicon.ico') {
      response.writeHead(200);
      response.end();
      return;
    }
    response.writeHead(200);
    fs.createReadStream(__dirname + '/index.html').pipe(response);
  })
  .listen(3000);
```

```html
<!-- index.html -->
<html>
  <head></head>
  <body>
    Hello
  </body>
</html>
```

npm 模块

- httpserver
