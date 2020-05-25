# Vue

# React

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
    
##  给定一个数组 let arr = [1,2,3,4,[4,5,6,7,[8,9,10]]],将其变为一维数组。
  
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
    
- Javascript基础类型存放在_栈_内存中，引用类型存放在_堆_内存中
  

# Css

##  该div标签在w3c标准盒子模型和IE的怪异盒子模型下，它的宽度分别是多少？
```html
 <div style="width:100px;height=100px;border:10px;padding:10px;"></div>
 ```
  
怪异：100px IE：140px