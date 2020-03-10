---
order: 1
---

# 原型、原型链

先上图:

```jsx | inline
import React from 'react';
import chain from '../../assets/chain.png';

export default () => <img src={chain} width="100%" />;
```

## 构造函数

函数分为两种，一种为普通函数，一种为构造函数，构造函数常常以首字母大写来命名，用来定义一个对象的属性以及方法。
构造函数(constructor)都有一个原型对象 prototype，其原型对象内部则有一个指向该构造函数的指针即 constructor,通过构造函数创造的实例其内部有一个\_\_proto 即原型指向该构造函数的原型 prototype.

```js
function Person(name) {
  this.name = name;
} //构造函数

const Melon = new Person('melon'); //实例

console.log(Person === Person.prototype.constructor); //true
console.log(Melon.constructor === Person); // true
console.log(Melon.__proto__ === Person.prototype); //true
```

## 原型对象 prototype

每个构造函数都有一个 prototype 原型对象属性，指向该构造函数创建实例的原型 **proto**，

```js
function Person() {
  Person.prototype.name = 'A';
  Person.prototype.sayHi = function() {
    console.log(this.name);
  };
}

const Melon = new Person();
const Water = new Person();
Melon.sayHi(); //A
Water.sayHi(); //A
console.log(Melon.sayHi == Water.sayHi); // true  公用的都是该构造函数的prototype上的sayHi函数
```

## 原型 **proto**

每一个 JavaScript 对象(除了 null)都有一个属性,即为**proto**,该属性指向对应构造函数的原型 prototype,

```js
function Person() {}
const A = new Person();
console.log(A.__proto__ == Person.prototype); //true
```

## constructor

每一个原型对象都有一个 constructor 属性指向对应的构造函数

```js
function Person() {}
const B = new Person();
console.log(Person == Person.prototype.constructor); //true
```

## 对象属性查找顺序

当读取一个对象上的属性时，会先从对象自身查找，如果没有就查找与该对象关联的原型对象，即该对象的构造函数的原型对象，如果没有则一直向上查找原型对象的原型对象，一直找到或返回 null 为止。

```js
function Person() {}
Person.prototype.name = 'A';

let melon = new Person();
melon.name = 'B';
console.log(melon.name); //B
delete melon.name;
console.log(melon.name); //A
```

## 附加内容

既然上边提到了 new 关键字，就顺带总结以下 new 关键字的相关内容。

### new 做了什么

先简单概述一下步骤:

1.创建一个新的空对象

2.把新对象的**proto**原型属性指向对应构造函数的 prototype 原型对象

3.通过使用 call 调用该构造函数，将 this 指向改为新对象，将属性与方法全都复制给新对象，并返回该对象

```js
function Person(name){
    this.name = name;
}
let Melon = new Person('Melon');

=> new 的过程 等价于

let Melon = {};
Melon.__proto__ = Person.prototype;
Person.call(Melon,name);

```

### 实现一个 new 函数

```js
function _new() {
  let func = [].shift.call(arguments); // 拿到传入第一个参数 即构造函数
  let obj = {};
  obj.__proto__ = func.prototype; // 或者使用object.create(func.prototype)
  func.apply(obj, arguments);
  return obj;
}
```

> 关于 call、apply 与 this 的内容放到之后的文章去总结

## 补充

创建对象有三种方式:

```js
let obj = {};
let obj1 = new Object();
let obj2 = Object.create({});
```

> new Object() 通过构造函数创建，添加的属性是在自身实例下

> Object.create() 为 es6 创建对象的方式，可以理解为继承一个对象。

## 参考文章

[2019 面试准备 - JS 原型与原型链](https://juejin.im/post/5c72a1766fb9a049ea3993e6)

[JS 基础总结（2）——原型与原型链](https://juejin.im/post/5e25017a6fb9a030026e804e)
