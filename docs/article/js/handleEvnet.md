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
    <Button style={{marginTop:'10px'}} data-action="debounce-toast"  onClick={handleToast}>点我就message 1s执行1次</Button>
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
    <Button style={{marginTop:'10px'}} data-action="debounce-toast"  onClick={handleToast}>点我就message 1s执行1次</Button>
      <br/>
    <Button style={{marginTop:'10px'}} data-action="debounce-toast-i"  onClick={handleToastIme}>点我就message 1s执行1次  首次立即执行</Button>
  </div>
)
```

这样基本就完成了一个满足日常业务开发的防抖函数了。

### 参考文章
+ [javaScript专题之跟着underscore学防抖](https://juejin.cn/post/6844903480239325191#heading-0)

##  节流 

待更新...