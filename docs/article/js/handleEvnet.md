# 防抖、节流

## 防抖

在日常的开发工作中，经常会遇到一些频繁的事件触发，比如说

+ 监听window的scroll时间

+ 监听input输入框的结束时间来进行检索数据

+  鼠标的mousedown、mouseup触发时间

在遇到上面的一些监听事件时，我们不能只写了个`addEventListener`就行了，还需要控制这些事件动作触发的频率。

解决方案有两种:

+ 防抖 debounce 

+ 节流 throttle 

先来说一下防抖，用一个例子来说明他的原理:

一部电梯，开门之后如果5s之后没有人进入或者出去，则会关门开始运行，但是一旦有人进出就会重新开始计时，只有在这5s之内无人进出才会关门正常运行。

那么接下来仿照这个逻辑，来简要说一下用代码实现的逻辑，首先这个函数:

+ 接受一个函数参数，延迟等待执行的事件参数

+ 函数内部需要有一个定时器，一旦重新执行了函数就将当前的定时器清除掉重新计时，而每次执行函数都需要保存这个定时器，所以需要用到闭包，既还需要return出来一个函数，外部调用时调用的是return出来的这个函数，内部可以访问到上层函数的定时器变量。

雏形：
```js
function debounce(func,wait){
  let fn = func;
  let timer = null;
  return function(){
    //接受执行函数时传入的参数
    let args = arguments;
    //保留函数执行时的真正this指向
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(()=>{
      //函数执行时 修正this指向以及接受参数
      func.apply(context,args);
    },wait)
  }
}
```
以上初始版本的防抖函数就完成了，下面来验证一下效果

```jsx
/**
 * motions:
 *  - click:[data-action="toast"]
 *  - click:[data-action="toast"]
 *  - click:[data-action="toast"]
 *  - click:[data-action="debounce-toast"]
 *  - click:[data-action="debounce-toast"]
 *  - click:[data-action="debounce-toast"]
 */
import React from "react";
import  { Button,message} from "antd"
import 'antd/dist/antd.css';

function debounce(func,wait){
  let fn = func;
  let timer = null;
  return function(){
    //接受执行函数时传入的参数
    let args = arguments;
    //保留函数执行时的真正this指向
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(()=>{
      //函数执行时 修正this指向以及接受参数
      func.apply(context,args);
    },wait)
  }
}

const toastMessage = ()=>{
    message.success('哈哈');
}


const handleToast = debounce(toastMessage,1000);

export default ()=>(
  <div>
    <Button data-action="toast"  onClick={toastMessage}>点我就message 无防抖</Button>
    <br/>
    <Button style={{marginTop:'10px'}} data-action="debounce-toast"  onClick={handleToast}>点我就message 点击之后1s执行1次</Button>
  </div>
)
```

不过也有问题，点击第二个按钮的时候会发现延迟了1s才会执行，按正常的业务来说应该是先立即执行一次，后续再根据wait的事件延迟执行，下面就加一下立即执行的功能

```js
//增加immediate参数，代表是否立即执行函数
function debounce(func,wait,immediate=true){
  let fn = func;
  let timer = null;
  return function(){
    //接受执行函数时传入的参数
    let args = arguments;
    //保留函数执行时的真正this指向
    let context = this;
    clearTimeout(timer);
    if(immediate){
      //是否可以立即调用 初次定时器为null 取反则为true，事件执行完再将定时器置为null
      let callNow = !timer;
      timer =  setTimeout(()=>{
        timer = null;
      },wait);
      if(callNow) fn.apply(context,args);
    }else{
      timer = setTimeout(()=>{
        //函数执行时 修正this指向以及接受参数
        func.apply(context,args);
      },wait)
    }
  }
}
```

下面再来试一下:
```jsx
/**
 * motions:
 *  - click:[data-action="toast"]
 *  - click:[data-action="toast"]
 *  - click:[data-action="toast"]
 *  - click:[data-action="debounce-toast"]
 *  - click:[data-action="debounce-toast"]
 *  - click:[data-action="debounce-toast"]
 *  - click:[data-action="debounce-toast-i"]
 *  - click:[data-action="debounce-toast-i"]
 *  - click:[data-action="debounce-toast-i"]
 */
import React from "react";
import  { Button,message} from "antd"
import 'antd/dist/antd.css';

function debounce(func,wait,immediate=true){
  let fn = func;
  let timer = null;
  return function(){
    //接受执行函数时传入的参数
    let args = arguments;
    //保留函数执行时的真正this指向
    let context = this;
    clearTimeout(timer);
    if(immediate){
      //是否可以立即调用 初次定时器为null 取反则为true，事件执行完再将定时器置为null
      let callNow = !timer;
      timer =  setTimeout(()=>{
        timer = null;
      },wait);
      if(callNow) fn.apply(context,args);
    }else{
      timer = setTimeout(()=>{
        //函数执行时 修正this指向以及接受参数
        func.apply(context,args);
      },wait)
    }
  }
}


const toastMessage = ()=>{
    message.success('哈哈');
}


const handleToast = debounce(toastMessage,1000,false);

const handleToastIme = debounce(toastMessage,1000);
export default ()=>(
  <div>
    <Button data-action="toast"  onClick={toastMessage}>点我就message 无防抖</Button>
    <br/>
    <Button style={{marginTop:'10px'}} data-action="debounce-toast"  onClick={handleToast}>点我就message 点击1s之后执行1次</Button>
      <br/>
    <Button style={{marginTop:'10px'}} data-action="debounce-toast-i"  onClick={handleToastIme}>点我就message 点击1s之后执行1次  首次立即执行</Button>
  </div>
)
```

这样基本就完成了一个满足日常业务开发的防抖函数了。

### 参考文章
+ [javaScript专题之跟着underscore学防抖](https://juejin.cn/post/6844903480239325191#heading-0)

##  节流 

上边说过了防抖，那么接下来说节流，说起来这两者的作用其实很相似，都是用来做限制一些频繁触发的接口调用或者事件的，但也是有差别的。

节流的概念：

持续频繁的去触发事件，每隔一定时间，只会执行一次。

摘自网上一段比较容易理解的解释：

假设你正在乘电梯上楼，当电梯门关闭之前发现有人也要乘电梯，礼貌起见，你会按下开门开关，然后等他进电梯； 但是，你是个没耐心的人，你最多只会等待电梯停留一分钟； 在这一分钟内，你会开门让别人进来，但是过了一分钟之后，你就会关门，让电梯上楼。

所以throttle的作用是，预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新的时间周期。

了解完概念之后，那么来考虑一下用代码如何去实现，跟实现防抖时一样，先来列一下要点：

+ 接受一个函数参数，一个延迟执行的时间参数

+ 内部需要有一个判断当前是否可以执行函数的变量，判断的条件是 1.是否为初次执行 2.距离上一次执行是否超过了延迟执行的参数，这个变量同样需要用闭包保存起来。

雏形：
```js
function throttle(func,wait){
  let fn = func;
  // 定义 一个变量用来保存上次执行时的时间戳
  let  previous = 0;
  return function(){
    //获取当前的时间戳
    let now = + new Date();
    //保存函数执行时真正的this
    let context = this;
    //接受参数
    let args = arguments;
    //如果当前与上次的触发动作时间差已经超过了等待时间 则执行
    if(now - previous > wait){
      //修正函数执行时的this 
      fn.apply(context,args);
      //将当前时间赋给previous变量
      previous = now;
    }
  }

}
```

下面来测试一下：
```jsx

/**
 * motions:
 *  - click:[data-action="toast"]
 *  - click:[data-action="toast"]
 *  - click:[data-action="toast"]
 *  - click:[data-action="throttle-toast"]
 *  - click:[data-action="throttle-toast"]
 *  - click:[data-action="throttle-toast"]
 */
import React from "react";
import  { Button,message} from "antd"
import 'antd/dist/antd.css';

function throttle(func,wait){
  let fn = func;
  // 定义 一个变量用来保存上次执行时的时间戳
  let  previous = 0;
  return function(){
    //获取当前的时间戳
    let now = + new Date();
    //保存函数执行时真正的this
    let context = this;
    //接受参数
    let args = arguments;
    //如果当前与上次的触发动作时间差已经超过了等待时间 则执行
    if(now - previous > wait){
      //修正函数执行时的this 
      fn.apply(context,args);
      //将当前时间赋给previous变量
      previous = now;
    }
  }

}


const toastMessage = ()=>{
    message.success('哈哈');
}


const handleToast = throttle(toastMessage,1000,false);

export default ()=>(
  <div>
    <Button data-action="toast"  onClick={toastMessage}>点我就message 无节流</Button>
    <br/>
    <Button style={{marginTop:'10px'}} data-action="throttle-toast"  onClick={handleToast}>点我就message 1s内只会执行1次</Button>
      <br/>
  </div>
)
```

一个满足大多数业务开发场景的节流函数就好了，但是也有缺点，可以参考下方文章自己手动改造一下。（晚上11点了，被催睡觉了😢）

### 参考文章

[JavaScript专题之跟着 underscore 学节流](https://juejin.cn/post/6844903481761857543#heading-0)
