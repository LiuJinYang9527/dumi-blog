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

## Expres

> 要了解一个框架，最好的方法

- 了解它的关键功能
- 推导出它要解决的问题是什么

### 核心功能

- 路由
- request/response 简化
  - request：pathname、query 等
  - response：send() json() jsonp()等

安装：

```js
npm i express
```

上方`indexjs`使用 express 重构

```js
//index.js
const fs = require('fs');
const game = require('./game');
const express = require('express');

// 玩家胜利次数，如果超过3，则后续往该服务器的请求都返回500
var playerWinCount = 0;
// 玩家的上一次游戏动作
var lastPlayerAction = null;
// 玩家连续出同一个动作的次数
var sameCount = 0;

const app = express();

// 通过app.get设定 /favicon.ico 路径的路由
// .get 代表请求 method 是 get，所以这里可以用 post、delete 等。这个能力很适合用于创建 rest 服务
app.get('/favicon.ico', function(request, response) {
  // 一句 status(200) 代替 writeHead(200); end();
  response.status(200);
  return;
});

// 设定 /game 路径的路由
app.get(
  '/game',

  function(request, response, next) {
    if (playerWinCount >= 3 || sameCount == 9) {
      response.status(500);
      response.send('我不会再玩了！');
      return;
    }

    // 通过next执行后续中间件
    next();

    // 当后续中间件执行完之后，会执行到这个位置
    if (response.playerWon) {
      playerWinCount++;
    }
  },

  function(request, response, next) {
    // express自动帮我们把query处理好挂在request上
    const query = request.query;
    const playerAction = query.action;

    if (!playerAction) {
      response.status(400);
      response.send();
      return;
    }

    if (lastPlayerAction == playerAction) {
      sameCount++;
      if (sameCount >= 3) {
        response.status(400);
        response.send('你作弊！我再也不玩了');
        sameCount = 9;
        return;
      }
    } else {
      sameCount = 0;
    }
    lastPlayerAction = playerAction;

    // 把用户操作挂在response上传递给下一个中间件
    response.playerAction = playerAction;
    next();
  },

  function(req, response) {
    const playerAction = response.playerAction;
    const result = game(playerAction);

    // 如果这里执行setTimeout，会导致前面的洋葱模型失效
    // 因为playerWon不是在中间件执行流程所属的那个事件循环里赋值的
    // setTimeout(()=> {
    response.status(200);
    if (result == 0) {
      response.send('平局');
    } else if (result == -1) {
      response.send('你输了');
    } else {
      response.send('你赢了');
      response.playerWon = true;
    }
    // }, 500)
  },
);

app.get('/', function(request, response) {
  // send接口会判断你传入的值的类型，文本的话则会处理为text/html
  // Buffer的话则会处理为下载
  response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});
app.listen(3000);
```

```js
//game.js
module.exports = function(playerAction) {
  // 计算电脑出的东西
  var computerAction;
  var random = Math.random() * 3;
  if (random < 1) {
    computerAction = 'rock';
    // console.log('电脑出了石头')
  } else if (random > 2) {
    computerAction = 'scissor';
    // console.log('电脑出了剪刀')
  } else {
    computerAction = 'paper';
    // console.log('电脑出了布')
  }

  if (computerAction == playerAction) {
    return 0;
  } else if (
    (computerAction == 'rock' && playerAction == 'scissor') ||
    (computerAction == 'scissor' && playerAction == 'paper') ||
    (computerAction == 'paper' && playerAction == 'rock')
  ) {
    return -1;
  } else {
    return 1;
  }
};
```

```html
<!-- index.html-->
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      button {
        display: inline-block;
      }
    </style>
  </head>

  <body>
    <div
      id="output"
      style="height: 400px; width: 600px; background: #eee"
    ></div>
    <button id="rock" style="height: 40px; width: 80px">石头</button>
    <button id="scissor" style="height: 40px; width: 80px">剪刀</button>
    <button id="paper" style="height: 40px; width: 80px">布</button>
  </body>
  <script>
    const $button = {
      rock: document.getElementById('rock'),
      scissor: document.getElementById('scissor'),
      paper: document.getElementById('paper'),
    };

    const $output = document.getElementById('output');

    Object.keys($button).forEach(key => {
      $button[key].addEventListener('click', function() {
        fetch(`http://${location.host}/game?action=${key}`)
          .then(res => {
            return res.text();
          })
          .then(text => {
            $output.innerHTML += text + '<br/>';
          });
      });
    });
  </script>
</html>
```

## Koa

> 由于 express 中间件对于异步调用的支持不好，社区又产生了一个新的框架 Koa。

### 核心功能

- 使用 async function 实现的中间件
  - 有 暂停执行 的能力
  - 在异步的情况下也符合洋葱模型
- 精简内核，所有额外功能都移到中间件里实现

安装：

```js
npm i koa
```

上面`index.js`使用 koa 改造

```js
//index.js
const fs = require('fs');
const game = require('./game');
const koa = require('koa');
const mount = require('koa-mount');

// 玩家胜利次数，如果超过3，则后续往该服务器的请求都返回500
var playerWinCount = 0;
// 玩家的上一次游戏动作
var lastPlayerAction = null;
// 玩家连续出同一个动作的次数
var sameCount = 0;

const app = new koa();

app.use(
  mount('/favicon.ico', function(ctx) {
    // koa比express做了更极致的response处理函数
    // 因为koa使用异步函数作为中间件的实现方式
    // 所以koa可以在等待所有中间件执行完毕之后再统一处理返回值，因此可以用赋值运算符
    ctx.status = 200;
  }),
);

const gameKoa = new koa();
app.use(mount('/game', gameKoa));
gameKoa.use(async function(ctx, next) {
  if (playerWinCount >= 3) {
    ctx.status = 500;
    ctx.body = '我不会再玩了！';
    return;
  }

  // 使用await 关键字等待后续中间件执行完成
  await next();

  // 就能获得一个准确的洋葱模型效果
  if (ctx.playerWon) {
    playerWinCount++;
  }
});
gameKoa.use(async function(ctx, next) {
  const query = ctx.query;
  const playerAction = query.action;
  if (!playerAction) {
    ctx.status = 400;
    return;
  }
  if (sameCount == 9) {
    ctx.status = 500;
    ctx.body = '我不会再玩了！';
  }

  if (lastPlayerAction == playerAction) {
    sameCount++;
    if (sameCount >= 3) {
      ctx.status = 400;
      ctx.body = '你作弊！我再也不玩了';
      sameCount = 9;
      return;
    }
  } else {
    sameCount = 0;
  }
  lastPlayerAction = playerAction;
  ctx.playerAction = playerAction;
  await next();
});
gameKoa.use(async function(ctx, next) {
  const playerAction = ctx.playerAction;
  const result = game(playerAction);

  // 对于一定需要在请求主流程里完成的操作，一定要使用await进行等待
  // 否则koa就会在当前事件循环就把http response返回出去了
  await new Promise(resolve => {
    setTimeout(() => {
      ctx.status = 200;
      if (result == 0) {
        ctx.body = '平局';
      } else if (result == -1) {
        ctx.body = '你输了';
      } else {
        ctx.body = '你赢了';
        ctx.playerWon = true;
      }
      resolve();
    }, 500);
  });
});

app.use(
  mount('/', function(ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  }),
);
app.listen(3000);
```

### Express vs Koa

- express 门槛低，koa 强大优雅
- express 内置封装更多东西，开发更快速 ，koa 可定制性更高
