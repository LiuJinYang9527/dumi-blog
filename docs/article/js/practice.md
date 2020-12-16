# JS练习

## 实现call、apply、bind

### 前言

在日常的开发工作中，call、apply、bind 这三个函数会经常用到，主要用途大概就是改变当前 this 的指向，不过 call 和 apply 都是立即执行，返回函数执行的结果，而 bind 则是返回一个函数，不会立即调用。

### call

来自 MDN 的介绍:

> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

用人话来讲，就是允许一个对象调用另一个对象上的函数或方法，改写方法内部 this 的指向，使其指向接受的参数对象。

#### 语法

```js
function.call(thisArg, arg1, arg2, ...)
```

#### 参数

- this.Arg :可选的。在 function 函数运行时使用的 this 值。请注意，this 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

- arg1,arg2:传递的参数列表，可传递多个

#### 返回值

使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

#### 例子

我举一个 🌰

```js
let person = {
  name: 'Melon',
  age: 18,
  description: function() {
    console.log(`我是${this.name},今年${this.age}岁了`);
  },
};

let person2 = {
  name: 'Water',
  age: 20,
};
person.description.call(person2); // 我是Water，今年20岁了
```

如上所示，`person2`对象并没有 description 方法，但`person`对象有，那通过调用 call 就可以实现了。

其实之前在总结继承相关知识的时候，就已经使用过它了，再来复习一下吧

```js
//构造函数继承
function Person(name) {
  this.name = name;
  this.age = 18;
}

function Person2(name) {
  Person.call(this, name);
  this.sex = 'man';
}

let person = new Person2('Melon');
console.log(person); // { name:'Melon',age:18,sex:'man'}
```

> 其中在 Person2 构造函数中，通过 call 调用 Person 构造函数，改变了 this 继承了 Person 中的 name、age 属性

#### 注意

- 使用 call 方法调用函数，不指定第一个参数，this 默认指向全局对象(浏览器为 window)，在严格模式下，会是 undefined。

#### 手动实现 call 方法

##### 模拟实现步骤

首先，让我们来总结一下，在调用 call 方法时，都做了什么事情

1.给第一个参数，即指向的对象添加一个方法，此方法即要调用的方法

2.调用此函数

3.删除此函数

4.返回函数执行的结果

##### 初版

代码如下 👇

```js
Function.prototype.myCall = function(ctx) {
  //1.给这个指定的对象增加一个方法，即为this
  ctx['fn'] = this;
  //2.调用函数
  var result = ctx['fn']();
  //3.删除此函数
  delete ctx['fn'];
  //4.返回函数执行的结果
  return result;
};
```

这样简易版的就实现了，让我们来个 🌰 调用一下

```js
let person1 = {
  say() {
    alert('hello');
    return 'hello';
  },
};
let person2 = {};

let result = person1.say.myCall(person2); // alert('hello')

console.log(result); // hello
```

当然，仔细想想是不是还缺少些什么情况处理?

- 当不传递第一个参数时，调用的函数上下文的 this 指向全局对象

- 没有考虑传递参数的问题

##### 最终版

```js
Function.prototype.myCall = function(ctx) {
  let context = ctx || window;
  //1.给这个指定的对象增加一个方法，即为this
  context['fn'] = this;
  var args = [];
  //接收参数
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  console.log(args);
  //2.调用函数 并传递参数
  var result = context['fn'](...args);
  //3.删除此函数
  delete context['fn'];
  //4.返回函数执行的结果
  return result;
};
```

再来实验一下：

```js
let person = {
  name: 'melon',
  age: 18,
  say(extra) {
    alert(`我的名字是${this.name},今年${this.age}岁了`);
    console.log(`额外数据:${extra}`);
    return `我的名字是${this.name},今年${this.age}岁了`;
  },
};

let person2 = {
  name: 'Water',
  age: 22,
};

let result = person.say.myCall(person2, '我是额外数据');

console.log(result);
```

### apply

apply 的用途以及调用方式基本与 call 一致，只不过 apply 的第二个参数是一个数组，当第二个参数为`undefined`或`null`时，则表示不需要传入任何参数。

所以在实现 call 的基础上，对第二个参数进行处理下就可以了

```js
Function.prototype.myApply = function(ctx, arr) {
  let context = ctx || window;
  context['fn'] = this;
  var result;
  if (!arr) {
    result = context['fn']();
  } else {
    result = context['fn'](...arr);
  }
  delete context['fn'];
  return result;
};
```

来个例子测试一下:

```js
let person = {
  name: 'melon',
  age: 18,
  say(x, y) {
    alert(`我的名字是${this.name},今年${this.age}岁了`);
    return `x:${x},y:${y}`;
  },
};

let person2 = {
  name: 'Water',
  age: 22,
};

let result = person.say.myApply(person2, [1, 2]);
console.log(result); // x:1,y:2
```

### bind

> bind 方法创建一个新的函数，在 bind()被调用时，这个新函数的 this 被指定为 bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用。语法与 call 一致。





## 实现一个EventEmitter实现事件发布、订阅

要点：

+ 提供增加、删除以及触发事件的api
+ 支持once只调用一次的特性
+ 同一个事件可以支持多个回调函数，触发时按顺序触发
+ 删除一个事件时，删除所有或指定的回调函数


```jsx

  import React from "react"
  import  { Button,message} from "antd"
  import 'antd/dist/antd.css';
  class EventEmitter {
    constructor(){
      this.listeners = []
    }
    on(event,cb){
      let curEvent = this.listeners.find(item=>item.name == event);
      if(curEvent){
        curEvent.callback.push(cb);
      }else{
        this.listeners.push({
          name:event,
          callback:[cb]
        })
      }
    }
    once(event,cb){
      cb.isOnce=true;
      this.on(event,cb);
    }
    off(event,cb){
     let curIndex = this.listeners.findIndex(item=>item.name == event);
      if(curIndex>-1){
        if(!cb){
          this.listeners.splice(curIndex,1);
          return;
        }
          let callbacks =  this.listeners[curIndex].callback;
          this.listeners[curIndex].callback = callbacks.filter(func=>func!=cb);
      }
    }
    emit(event){
      let curEvent = this.listeners.find(item=>item.name == event);
      if(curEvent){
        let callbacks = curEvent.callback;
        let args = Array.prototype.slice.call(arguments,1);
        let onceFunc = [];
        for(let i =0;i<callbacks.length;i++){
          let curfunc = callbacks[i];
          curfunc(...args);
          if(curfunc.hasOwnProperty('isOnce')){
            onceFunc.push(curfunc)
          }
        }
        onceFunc.forEach(func=>{
          this.off(event,func);
        })
      }
    }
  }
  const Event = new EventEmitter();

  const func1 = (params1,params2)=>{
    console.log(`click事件1，参数:${params1},${params2}`)
    message.success(`click事件1，参数:${params1},${params2}`)
  }
  const func2=()=>{
        console.log('click事件2');
    message.success('click事件2');
  }  
  const once = ()=>{
    console.log('once事件,我只执行一次');
    message.success('once事件,我只执行一次');
  }
  const addFuncs = ()=>{
      Event.on('click',func1)
      Event.on('click',func2)
  }
  const addOnce=()=>{
      Event.once('click',once)
  }
  export default ()=>{
    return (
      <div>
        <Button style={{marginTop:"15px"}} type="primary" onClick={addFuncs}>添加func1,func2事件</Button><br/>

         <Button style={{marginTop:"15px"}} type="primary" onClick={addOnce}>添加once事件</Button><br/>

        <Button style={{marginTop:"15px"}} type="primary" onClick={()=>{Event.off('click',func2)}}>取消事件func2</Button><br/>

        <Button  style={{marginTop:"15px"}} type="primary" onClick={()=>{Event.off('click')}}>取消全部事件</Button><br/>

        <Button  style={{marginTop:"15px"}} type="primary" onClick={()=>{Event.emit('click',{a:1},{b:2})}}>测试事件触发按钮</Button><br/>
      </div>
    )
  }
```

## 浅拷贝和深拷贝

## 数组去重、扁平、最值

## 数组乱序-洗牌算法

## 函数柯里化

## 模拟实现Promise

## 手动实现Es5继承

## 手动实现instanceof
