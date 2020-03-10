---
title: 面试题
toc: menu
nav:
  title: 面试题
---

## 1.viewport 的作用以及移动端适配

## 2.rem 的适配原理

## 3.移动端如何实现 1px 边框

## 4.css 实现元素水平垂直居中

## 5.click 事件在 ios 上有 300ms 延迟，原因以及如何解决

## 6.css 盒模型有几种，简单讲一下区别

1.W3C 标准盒模型：属性 width、height 只包含内容 content，不包含 border 和 padding
2.IE 盒模型 属性 width,height 包含 border 和 padding，指的是 content+padding+border。

> 在 ie8+浏览器中使用哪个盒模型可以由 box-sizing(CSS 新增的属性)控制，默认值为 content-box，即标准盒模型；如果将 box-sizing 设为 border-box 则用的是 IE 盒模型。如果在 ie6,7,8 中 DOCTYPE 缺失会触发 IE 模式。在当前 W3C 标准中盒模型是可以通过 box-sizing 自由的进行切换的。

## 7.简述一下 javascript 堆和栈的概念,基本类型以及引用类型

## 8.Js 的隐式转换

## 9.数组的迭代方法有几种以及区别?

forEach、map、filter、reduce、every、some

## 10.ES6、7、8 的特性?

## 11.Js 继承有哪几种方案?

函数、原型、实例、拷贝

## 12.讲一下闭包，以及防抖、节流的实现

## 13.深拷贝、浅拷贝概念，如何实现深拷贝

## 14.Promise 的作用，能否手动实现以下，当有多个 Promise 时如何解决？

## 15.如何捕捉 async/await 的错误

## 16.Vue 数据响应式的实现原理

## 17.Vue 中插件的封装方法，以及递归组件如何使用

## 18.Vue 中组件的通信方案有几种？兄弟组件、父子组件、跨级组件

## 19.React 中 setState 的同异步问题，以及第二个参数有什么作用

## 20.对 React Hooks 有了解没有，简单说下 useEffect 的用法，以及手动实现一个监听浏览器窗口尺寸变化的 Hooks

## 21.如何提高 React 组件的渲染效率

## 22.简单说下高阶组件的用法

## 23.React 中组件通信方案，兄弟组件、父子组件、跨级组件

## 24.TypeScript 中 type 与 interface 的区别

## 25.TypeScript 中 泛型的概念以及运用

## 26.webpack 的基本配置，能否手动搭建一个适用于 Vue、React 项目开发的脚手架

## 27.Node 方面有没有了解，做过什么项目？使用的是什么框架?(Koa、express、egg)

## 28.前端性能优化的方案

1.减少 HTTP 请求 2.减少静态资源的体积 3.使用缓存 4.内存溢出
...

## 29.有没有了解过混合开发，与原生客户端的交互方案是什么？

## 30.有没有了解过小程序，用过哪个小程序框架？

## 31.是否还在职，为什么要换工作？如果在外地预计什么时候能返回？

## 32.有没有了解一些新技术

## 33.有什么要问我的吗？

## 34.原型链面试题

```js
1;
var obj1 = { name: 'one' };
obj2 = Object.create(obj1);
obj2.name = 'two';
console.log(obj1.name);
//one

var obj1 = { prop: { name: 'one' } };
obj2 = Object.create(obj1);
obj2.prop.name = 'two';
console.log(obj1.prop.name);
//two

var obj1 = { list: ['one', 'one', 'one'] };
obj2 = Object.create(obj1);
obj2.list[0] = 'two';
console.log(obj1.list[0]);
//two

2;
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```
