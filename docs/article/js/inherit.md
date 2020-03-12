# 继承

## 原型链继承

之前我们已经总结过关于原型链的内容，可以回顾一下。

ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法，其主要思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。
这么说，每个构造函数都有一个原型对象，原型对象内都包含一个执行构造函数的指针，而构造函数所创建的实例都包含一个指向原型对象的指针。如果将一个原型对象等于另一个类型的实例，那么此时的原型对象将包含指向另一个原型的指针，相应的，另一个原型的指针又包含着指向另一个原型对象的指针，以此类推。(好好捋捋)

实现的代码方式大概如下:

```js
function SuperType() {
  this.property = true;
}
Super.prototype.getSuperValue = function() {
  return this.property;
};
function SubType() {
  this.subproperty = false;
}
//继承了SuperType
SubType.prototype = new SuperType();

var instance = new SubType();
console.log(instance.getSuperValue()); // true
```

一句话说明就是构造函数 SubType 的原型对象换成了 SuperType 构造函数的实例，而这个实例又包含一个指向 SuperType 原型对象的指针，即 instance 继承了 SuperType 原型的所有属性与方法。

注意，此时 instance 的 constructor 指向 SuperType，因为 SubType 的 prototype 的 constructor 已经被改写。

## 借用构造函数继承

这种技术的基本思想就是，在子类型构造函数的内部用过 call 或 applay 来调用超类型构造函数。

如下:

```js
function SuperType(name) {
  this.colors = [1, 2, 3];
  this.name = name;
}
function SubType() {
  //继承了SuperType
  SuperType.call(this, 'melon'); // 也可传递参数
  this.age = 18;
}
var instance1 = new SubType();

instance1.colors.push(4);

console.log(instance1.colors); // 1,2,3,4

var instance2 = new SubType();

console.log(instance2.colors); //1 2 3

var instance3 = new SubType();

console.log(instance3.name); //melon
console.log(instance3.age); //18
```

## 组合继承

顾名思义，指的是将原型链继承与借用构造函数继承结合起来，思路是使用原型链实现对原型属性和方法的继承，通过构造函数继承来实现对实例属性的继承。这样的好处是，即通过在原型定义方法实现了函数复用，又能保证每个实例都有自己的属性。
👇

```js
function SuperType(name){
    this.name = name;
    this,.colors = [1,2,3];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
}
function SubType(name,age){
    //继承属性
    SuperType.call(this,name);
    this.age = age;
}
//继承方法
SubType.prototype  = new SuperType();
SubType.prototype.constructor = SubType;//因为改写了原型对象，所以重新手动指向SubType构造函数
SubType.prototype.sayAge = function(){
    alert(this.age);
}
var instance1 = new SubType('melon',18);
instance1.colors.push(4);
console.log(instance1.colors); // 1,2,3,4
instance1.sayName(); // melon
instance1.sayAge(); // 18

var instance2 = new SubType('melon2',20);
console.log(instance2.colors);//1,2,3
instance2.sayName();//melon02
instance2.sayAge();//20
```

## 原型式继承

这种思路是 借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

先来看这么一个函数 👇

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

在这个函数内部，先创建了一个临时性构造函数，然后将传入的对象作为这个构造函数的原型对象，最后返回这个构造函数的一个新实例。本质来讲，此函数相当于对传入其中的对象进行了浅拷贝。

看下面的例子

```js
var person = {
  name: 'melon',
  friends: [1, 2, 3],
};
var anoPerson = object(person);
anoPerson.name = 'melon02';
anoPerson.friends.push(4);

var thirdPerson = object(person);
thirdPerson.name = 'melon03';
thirdPerson.friends.push(5);
console.log(person.friends); //1,2,3,4,5
```

ECMAScript5 新增的 Object.create()方法在传入一个参数的情况下，作用与上边的 object 函数一致，其第二个参数与 Object.defineProperties()方法的第二个参数一致，有兴趣可以了解一下。

## 寄生式继承

这种模式的思路与寄生构造函数和工厂模式类似(稍后会总结)。即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象。
以下代码为寄生式继承模式的实现:

```js
function createAnother(origin) {
  var clone = object(original); //创建一个新对象
  clone.sayHi = function() {
    alert('hi');
  };
  return clone;
}
```

来看一个使用场景:

```js
var person = {
  name: 'melon',
  friends: [1, 2, 3],
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //hi
```

## 寄生组合式继承

本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型，基本模式代码实现如下：

```js
function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype); //创建对象
  prototype.constructor = subType; //弥补因为重写subType原型对象而失去默认的constructor属性
  subType.prototype = prototype;
}
```

使用场景如下:

```js
function SuperType(name){
    this.name = name;
    this,.colors = [1,2,3];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
}
function SubType(name,age){
    //继承属性
    SuperType.call(this,name);
    this.age = age;
}

inheritPrototype(SubType,SuperType);
SubType.protype.sayAge = function(){
    alert(this.age);
}
```

## 参考文章

《JavaScript 高级程序设计第三版》6.3 小节
