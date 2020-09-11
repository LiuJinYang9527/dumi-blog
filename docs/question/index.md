---
title: 常见面试题
toc: menu
nav:
  title: 常见面试题
---

## 1.viewport 的作用以及移动端适配

## 2.rem 的适配原理

## 3.移动端如何实现 1px 边框

## 4.css 实现元素水平垂直居中

## 5.click 事件在 ios 上有 300ms 延迟，原因以及如何解决

## 6.css 盒模型有几种，简单讲一下区别

1.W3C 标准盒模型：属性 width、height 只包含内容 content，不包含 border 和 padding
2.IE 盒模型 属性 width,height 包含 border 和 padding，指的是 content+padding+border。

> 在 ie8+浏览器中使用哪个盒模型可以由 box-sizing(CSS 新增的属性)控制，默认值为 content-box，即标准盒模型；如果将 box-sizing 设为 border-box 则用的是 IE 盒模型。如果在 ie6,7,8 中 DOCTYPE 缺失会触发 IE 模式。在当前 W3C 标准中盒模型是可以通过 box-sizing 自由的进行切换的

## 7.简述一下 javascript 堆和栈的概念,基本类型以及引用类型

## 8.Js 的隐式转换的情况

## 9.数组的迭代方法有几种以及区别?

forEach、map、filter、reduce、every、some

## 10.ES6、7、8 的特性?

## 11.Js 继承有哪几种方案?

构造函数继承、原型链集成、组合继承、原型式继承、寄生式继承、寄生组合式继承。

## 12.讲一下闭包，以及防抖、节流的实现

## 13.JavaScript 事件循环 event-loop

js 执行时会产生堆和栈，代码一次进入栈中等待执行，如果遇到异步方法，则会被添加到队列中。
即 javascript 执行引擎的主线程拥有一个执行栈/堆和一个任务队列。

执行顺序: 1.先执行主线程的代码，遇到异步任务则将异步任务添加到队列中，主线程代码执行完毕，再将队列中的任务入栈执行（先微后宏）。

> webAPI 如 Dom 的 onClick onload 事件也属于异步任务，会被添加到队列中。
> 异步任务分为宏任务和微任务

宏任务:setTimeout, setInterval, setImmediate, I/O, UI rendering

微任务：process.nextTick, Promises, Object.observe(废弃), MutationObserver

在主线程代码执行完毕后，会先检查微任务队列然后入栈执行，直到没有微任务然后才去执行宏任务

以上过程不断重复，就是 Event Loop。

## 14.深拷贝、浅拷贝概念，如何实现深拷贝

## 15.Promise 的作用，能否手动实现一下，当有多个 Promise 时如何解决？

## 16.如何捕捉 async/await 的错误，有没有优雅的处理方式

## 17.Vue 数据响应式的实现原理

## 18.Vue 中插件的封装方法，以及递归组件如何使用

## 19.Vue 中this.$nextTick 的作用

## 20.Vue 中组件的 data 为什么必须是一个函数?

## 21.Vue 中组件的通信方案有几种？兄弟组件、父子组件、跨级组件

## 22.React 中 setState 的同异步问题，以及第二个参数有什么作用 ss

## 23.对 React Hooks 有了解没有，简单说下 useEffect 的用法，以及手动实现一个监听浏览器窗口尺寸变化的 Hooks

## 24.如何提高 React 组件的渲染效率

## 25.简单说下高阶组件的用法

## 26.React 中组件通信方案，兄弟组件、父子组件、跨级组件

## 27.TypeScript 中 type 与 interface 的区别

## 28.TypeScript 中 泛型的概念以及运用

## 29.webpack 的基本配置，能否手动搭建一个适用于 Vue、React 项目开发的脚手架

## 30.前端性能优化的方案

1.减少 HTTP 请求 2.减少静态资源的体积 3.使用缓存 4.内存溢出
...

## 30.有没有了解过混合开发，与原生客户端的交互方案是什么？

## 31.有没有了解过小程序，用过哪个小程序框架？

# Node 相关

## Node 方面有没有了解，做过什么项目？使用的是什么框架?(Koa、express、egg)

## 介绍一下 express 或 koa 框架的基本架构，以及各自是如何处理路由的、如何进行错误处理的

Express 使用 callback 捕获异常，对于深层次的异常捕获不了，
Koa 使用 try catch，能更好地解决异常捕获。

## express 和 koa 各自是如何实现处理异步请求，解决回调地狱的？

Express 采用 callback 来处理异步，Koa v1 采用 generator，Koa v2 采用 async/await。

# 主观问题

## 是否还在职，为什么要换工作？如果在外地预计什么时候能返回？

## 有没有了解一些新技术

## 有什么要问我的吗？
