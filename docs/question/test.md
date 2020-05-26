# Vue

## 下面对于v-if以及v-show的说法正确的是： C

+ v-if 和 v-show 都是操作元素的display属性进行显示隐藏
+ 当条件不成立时，v-show 不会渲染DOM元素，v-if会渲染DOM元素，但display属性为none
+ 当条件不成立时，v-if 不会渲染DOM元素， v-show 会渲染DOM元素，但display属性为none

## Vuex中用于改变store中状态的唯一方法是？ D

+ getters

+ dispatch

+ action

+ mutation

##  下面对于Vue生命周期描述正确的有?   C

+ created 在实例创建完成后被立即调用,此时可以进行相关DOM操作

+ activated 被keep-alive缓存的组件激活时调用，初次与mounted生命周期不会重复执行。

+ destroyed 实例销毁后调用，此时所有的事件监听都被移除

+ beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用，该钩子在服务端渲染时可以被调用。

+ updated  由于数据更改导致的虚拟DOM重新渲染和打补丁，之后会调用该钩子，但组件DOM此时仍未更新，需要使用$nextTick函数来获取最新的DOM。

## Vue组件的data对象是一个_函数_

## Vue2.0数据响应式原理所使用的ES5 API为 Objec._defineProperty_

## keep-alive 对应的两个特殊生命周期分别为 _activated_、deactivated

##  下列代码的输出结果为: E

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
    created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
     console.log('组件钩子被调用');
    console.log(this.$data)
  }
})
```
+ '混入对象的钩子被调用'  { message: "goodbye", foo: "abc", bar: "def" }

+ '混入对象的钩子被调用'  '组件钩子被调用'  { message: "hello", foo: "abc", bar: "def" }

+ '组件钩子被调用'， '混入对象的钩子被调用' { message: "goodbye", bar: "def" }

+ '组件钩子被调用'  '混入对象的钩子被调用' { message: "hello", foo: "abc"  }

+ '组件钩子被调用'  '混入对象的钩子被调用'  { message: "goodbye", foo: "abc", bar: "def" }

## 下面对于指令对象的钩子函数描述正确的有?  A B D E

+ bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置

+ inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)

+ componentUpdated：指令的子 VNode 全部更新后调用

+ unbind：只调用一次，指令与元素解绑时调用。

+ update  所在组件的 VNode 更新时调用

##  Vue中强制迫使Vue实例重新渲染的方法名称是 _$forceUpdate_

## Vue内置的组件有?  B C D 

+ Modal

+ transition

+ component

+ keep-alive

## Vue中用于跳过一个元素及其子元素编译过程的指令为 _v-pre_

##  v-model指令自带的修饰符有？ A  D E 

+ .number

+ .stop

+ .prevent

+ .lazy

+ .trim

+ .stop

## Vue中以下能正确获取到 ref DOM实例的代码为: C
```html
<template>
<div v-for="(item,index) in 5" :key="index" :ref="`instance${index}`">{{item}}</div>
</template>
```
+ this.$refs.instance0

+ this.$refs.instance[0]

+ this.$refs.instance0[0]

## 描述一下Vue中递归组件的实现原理，以及注意事项
组件是可以在它们自己的模板中调用自身的。不过它们只能通过 name 选项来做这件事,所以需要先声明该组件的name,递归调用时需要有明确的条件判断，比如最终会得到一个为false的v-if。


## Vuex有哪几种属性? __State__  __Getter__  __Mutation__  __Action__ __Module__ 


## Vue组件内哪些路由导航守卫能够访问当前组件实例? B C

+ beforeRouteEnter

+ beforeRouteUpdate 

+ beforeRouteLeave

## 在Vue组件中要获取一个 动态路由参数为 :user 的值，以下哪个选项是正确的？ B

+ this.$router.query.user

+ this.$route.params.user

+ this.$route.query.user

+ this.$router.params.user


# Js

## 请实现一个JSONP函数。
  

```js
  // jsonp请求   
  function jsonp(params) {   
  params = params || {};   
  params.data = params.data || {};   
  var json = params.jsonp ? jsonp(params) : json(params);      
    //创建script标签并加入到页面中   
    var callbackName = params.jsonp;   
    var head = document.getElementsByTagName('head')[0];   
    // 设置传递给后台的回调参数名   
    params.data['callback'] = callbackName;   
    var data = formatParams(params.data);   
    var script = document.createElement('script');   
    head.appendChild(script);    
    //创建jsonp回调函数   
    window[callbackName] = function(json) {   
      head.removeChild(script);   
      clearTimeout(script.timer);   
      window[callbackName] = null;   
      params.success && params.success(json);   
    };   
    //发送请求   
    script.src = params.url + '?' + data;    
    //为了得知此次请求是否成功，设置超时处理   
    if(params.time) {   
     script.timer = setTimeout(function() {   
       window[callbackName] = null;   
       head.removeChild(script);   
       params.error && params.error({  
         message: '超时'   
       });   
     }, time);   

    }
 }

```

##  请实现一个获取地址栏url查询参数的函数，如 www.uupt.com?site=uupt&word=hello ,返回 { site:uupt,word:hello }
  
  ```javascript
function getUrl(){
    let url = window.location.href;
    if(url.indexOf('?')>-1){
      let queryArr = url.split('?')[1].split('&');
    let urlObj = {};
    queryArr.forEach(item=>{
     let curSplitArr = item.split('=');
      let key = curSplitArr[0];
     let value = curSplitArr[1];
      if(!urlObj[key]){
        urlObj[key] = value;
        }
    });
      return urlObj;
     }
    return false;
  }
  ```
  
## 给定一个数组 let arr = [1,2,3,4,5,6,7,2,3,4,8,1,2],实现一个函数进行去重操作(不使用Set)
  
  ```js
//filter
const unique = arr => {
    return arr.filter((ele, index, array) => {
        return index === array.indexOf(ele)
    })
}
//set
const unique = arr => {
    return [...new Set(arr)]
}
//foreach
const unique = arr => {
    let obj = {}
    arr.forEach(value => {
        obj[value] = 0
    })
    return Object.keys(obj)
}
//reduce
const unique = arr.reduce((map, item) => {
    map[item] = 0
    return map
}, {})
Object.keys(unique)
  
  ```
  
##  实现一个new 函数
  
  ```js
function _new() {
  let func = [].shift.call(arguments); // 拿到传入第一个参数 即构造函数
  let obj = {};
  obj.__proto__ = func.prototype; // 或者使用object.create(func.prototype)
  func.apply(obj, arguments);
  return obj;
}
  ```
  
## 以下结果输出什么？
  
  ```js
let a = 'uupt;
let b = undefined;
let c = null;
console.log(a.toString());//melon
console.log(b.toString());//error
console.log(c.toString());//error
console.log(String(a));//melon
console.log(String(b));//undefined
console.log(String(null));//null
  ```
  
## 以下结果输出什么？
  
  ```js
let num = 1;
typeof num; // number

let num2= new Number(1);
typeof num2; // object
  ```
  
## Javascript中的三个包装对象分别有 __Number__ _String_ _Boolean 三种
  
##  以下哪个不属于JavaScript关键字 parent
  
  - with
    
  - parent
    
  - class
    
  - void
    
## 请选择结果为真的表达式
  
  - null instanceof Object
    
  - null == undefined
    
  - null === undefined
    
  - NaN == NaN
    
## 以下代码的输出结果是什么？
  
  ```js
setTimeout(() => console.log(4));
async function test() {
  console.log(1);
  await Promise.resolve();
  console.log(3);
}
test();
console.log(2);
  ```

## 用localStorage或sessionStorage 实现一个可设置数据有效时长的set以及get函数，作用同cookie一致。
  
  ```js
 /**
       * 设置有期限local
       * key 名称
       * val 值
       */
      setLocalStorageAndTime(key, value) {
        window.localStorage.setItem(key, JSON.stringify({
          data: value,
          time: new Date().getTime()
        }))
      }
      /**
       * 获取local时比较时间  
       *  key 名称
       * exp 过期时间 毫秒
       * */
      getLocalStorageAndTime(key, exp = 86400000) {
        // 获取数据
        let data = window.localStorage.getItem(key)
        if (!data) return null
        let dataObj = JSON.parse(data)
        // 与过期时间比较
        if (new Date().getTime() - dataObj.time > exp) {
          // 过期删除返回null
          localStorage.removeItem(key)
          return null
        } else {
          return dataObj.data
        }
      }
  ```
  
##  翻转字符串 let str =‘hello uupt’;,输出 ‘tpuu olleh’;
  
  ```js
const reverseString = str =>{
    return [...str].reverse().join("");
}
  ```
##  下列代码的输出结果
  
  ```js
  typeof function(){} //function
  typeof String //function
  typeof new RegExp(); //object
  ```
  
  - Function  、String、RegExp
    
  - object、function、object
    
  - function、object、object
    
  - function、function、object
    
##  给定一个数组 let arr = [1,2,3,4,[4,5,6,7,[8,9,10]]],将其变为一维数组,不得使用flat方法。
  
  ```js
let result = [];
let fn = function(ary) {
  for(let i = 0; i < ary.length; i++) }{
    let item = ary[i];
    if (Array.isArray(ary[i])){
      fn(item);
    } else {
      result.push(item);
    }
  }
}




//用 reduce 实现数组的 flat 方法
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))
  ```
  
## 以下输出为ture的选项为： C
  
  - typeof [] == “array”
    
  - [] instanceof Function
    
  - [].__proto__ == Array.prototype
    
  - [].__proto__ == Function.prototype

    
##  Javascript基础类型存放在_栈_内存中，引用类型存放在_堆_内存中


## 请实现一个获取浏览器滚动条宽度的函数?
```js
const getScrollBarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
 
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  return scrollBarWidth;

}

```

# React 

  

# Css

##  该div标签在w3c标准盒子模型和IE的怪异盒子模型下，它的宽度分别是多少？
```html
 <div style="width:100px;height=100px;border:10px;padding:10px;"></div>
 ```
  
怪异：100px IE：140px