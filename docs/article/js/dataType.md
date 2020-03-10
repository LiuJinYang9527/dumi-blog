---
order:1
---

# 数据类型

## 前言

JavaScript 本身是弱类型语言，相对于一些强语言来说有利也有弊，好处就是上手难度低，没有太多规范要求，但由此带来的弊端就是只能在代码运行的时候你才能发现一些由于数据类型导致的错误，不过可以通过使用 TypeScript 来改进。先主要总结一下数据类型的知识点。

JavaScript 数据类型分为两种:

- 基本数据类型(string、number、boolean、undefined、null、symbol、bigInt)
- 引用数据类型(Object、Function、Date、RegExp 等)
  > 最新的 ECMAScript 标准定义了 8 种数据类型,增加了 bigInt ,它可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制

## 基本数据类型的特点

- 基本数据类型是按值访问的，就是保存在变量中的一个值

* 基本数据类型的值是不可变的，任何方法都不能改变一个基本数据类型的值

```javascript
let name = 'Melon';
name.substr();
console.log(name); // Melon
let sex = 'man';
sex.toUpperCase();
console.log(sex); // man
```

> 可以看到，调用 substr 和 toUpperCase 会返回新的字符串，而对原本定义的变量并无影响

- 基本数据类型不可以添加属性和方法

```javascript
let person = 'Melon'';
person.age = 12;
person.do = function(){
    console.log('I Can Do Anything!');
};
console.log(person.age); //undefined
console.log(person.do);//undefined
console.log(person.son);//你在无中生有
```

- 基本类型之间复制就是简单的赋值(不影响原有变量)

```javascript
let aName = 'Melon';
let bName = aName;
aName = 'Liu';
console.loog(aName); //Liu
console.log(bName); //Melon
```

- 基本数据类型的比较只比较值

```javascript
let a = '{}';
let b = '{}';
console.log(a === b); // true
```

- 基本类型的值在内存中占据固定大小的空间，被保存在栈内存中。

## 引用数据类型

引用数据类型是指存放在堆内存中的对象，其变量其实保存的只是在栈内存中的一个指针，指向堆内存。

```javascript
let obj = {};
let obj2 = obj;
obj.a = 1;
console.log(obj2.a); // 1
```

> 两个引用类型相互赋值时，改变其中任何一个值，其实都是在改变堆内存中所对应的对象，所以两者都会跟着改变。

## 数据类型转换

### 转为字符串

- toStirng() 注意 不可以转 null、undefined
- String() 都可以转

```
let a = 'melon';
let b = undefined;
let c = null;
console.log(a.toString());//melon
console.log(b.toString());//error
console.log(c.toString());//error
console.log(String(a));//melon
console.log(String(b));//undefined
console.log(String(null));//null
```

- 隐式转换
  > 当 + 两边一个操作符是字符串类型，一个操作符是其它类型的时候，会先把其它类型转换成字符串再进行字符串拼接，返回字符串

```javascript
let a = true;
let b = '1';
console.log(a + b); // true1
```

### 转为数字

- Number() 都可以转，如果不能转换成数字，则返回 NaN
- parseInt()/parseFloat 如果不能转换成数字，则返回 NaN
  > parseInt 把字符串转换为整数；parseFloat 把字符串转换成浮点数. 如果有小数点，parseFloat 也会解析第一个小数点到第二个小数点(或非数字)之前的内容，如果只有整数则解析为整数。

```javascript
let num = '10.1.1.1';
console.log(parseInt(num)); //10
console.log(parseFloat(num)); //10.1
```

- 隐式转换

```javascript
let str = '321';
let num = str - 1;
console.log(num); //320
```

- isNaN 用于判断是否是非数字，如果传入数字返回 false,非数字返回 true.

### 转换为 Boolean()

除了 0 '' null undefined NaN 会为 false，其他都为 true

```javascript
Boolean(0); // false
Boolean(''); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false
```

## 判断 JS 数据类型

- typeof
  > 只能用于判断基础类型(无法判断是否为 null)，引用类型都会返回 object,函数返回 function

```js
typeof '213' // string
typeof 123 //number
typeof undefined // undefined
typeof null // object
typeof Symbol //sumbol
typeof true // boolean

typeof {} //object
typeof [] // object
typeof ()=>{} //function
```

- instanceof

```js
{} instanceof Object //true
[] instanceof Array // true
```

- Object.prototype.toString.call()

```js
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call(() => {}); // '[object,Function]'
```

- constructor

```js
var a = [];
console.log(a.constructor === Array); //true
console.log(a.constructor === Number); //false
```

### JavaScript 的内置方法

- toString() 返回代表该对象的字符串
- valueOf() 返回指定对象的原始值

### 包装对象

> 基本数据类型，本来是不存在属性、方法的，包装对象是为了你补基本数据类型的非对象特征而出现的。

包装对象指的是数据类型为 Number、String、Boolean 的值对应的原生对象，意义在于:

- 能够将基本类型包装成真正的对象，体现 JavaScript 中一切皆对象的特点
- 是字面量使用对应包装对象的方法的内在原理
- 进行数据类型转换类型的利器

```js
let num = 1;
typeof num; // number

let num = new Number(1);
typeof num; // object
```

两种方式创建的区别在于，一个是基本类型，一个是引用类型
包装对象的原理在于每次基本类型字面量调用包装对象实例的方法时，首先创建对应包装对象的实例，然后在实例上调用该方法，最后销毁该实例

```js
let str = 'hello';
str.split(' ');
//等价于
let str = new String('hello');
str.split(' ');
str = null; //此处可认为销毁包装对象的实例
```

所以，对字面量属性进行赋值时都是无效的，因为每次字面量调用完对象实例的方法后都会销毁实例。
