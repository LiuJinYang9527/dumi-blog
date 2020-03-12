# 执行环境、作用域以及闭包

## 执行环境

执行环境(execution context)是 JavaScript 中最为重要的一个概念。它定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象(variable object), 环境中定义的所有变量和函数都会保存在这个对象中。虽然代码无法访问这个对象，但解析器在处理数据时会在后台使用它。
当前某个执行环境中的所有代码执行完毕后，该环境将被销毁，保存在其变量对象中的变量以及函数也将被销毁。（全局执行环境只在应用程序退出的情况下才会销毁，如关闭网页或浏览器）
执行环境分为两种:

- 全局执行环境
- 函数执行环境

### 全局执行环境

全局执行环境为最外围的一个执行环境。在浏览器中，它为 window 对象（非浏览器环境为 Global）, 就拿在浏览器环境下来说，所有的全局变量以及函数都是作为 window 对象的属性和方法创建的。(如 window.alert window.confirm 等)

### 函数执行环境

每个函数都有自己的执行环境，当执行一个函数时，此函数的执行环境就会被推入一个环境栈中，函数执行完毕后，其执行环境被栈弹出，将控制权交给之前的执行环境。

> 栈的顺序 先进后出

### 作用域链

当代码在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)。其作用是为了保证对执行环境有权访问的所有变量和函数的有序访问。

作用域链的前端，始终都是当前执行的代码所在环境的变量对象。(如果环境为函数，则将其活动对象(activation object)作为变量对象)。

活动对象一开始只包含一个变量，即 arguments 对象(在全局环境中不存在)。

作用域链中的下一个变量对象来自包含(外部)环境，一直延续到全局执行环境，全局执行环境的变量对象始终都是作用域中的最后一个对象。

> 上边的描述可能太过生硬，结合代码和图例会更清晰易懂。

来看下方代码

```js
var color = 'blue';
function changeColor() {
  if (color == ' blue ') {
    color = 'red';
  } else {
    color = 'blue';
  }
}
changeColor();
alert('Color is now ' + color);
```

在这个例子中，全局环境中有一个变量 color 和一个函数 changeColor，所以在执行`changeColor()`时，可以找到对应函数执行成功。而 changeColor 函数的作用域链中则包含两个对象，为 arguments 对象和全局环境中的 color 变量，因为在此作用域链中可以找到它，所以在 changeColor 函数中可以访问变量 color。

再来看复杂一点的

```js
var color = 'blue';
function changeColor() {
  var anotherColor = 'red';
  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    //这里可以访问color、anotherColor、tempColor
  }

  swapColors(); //这里可以访问color anotherCololr 不能访问tempColor
}
//这里只能访问color
changeColor();
```

上述代码有三个执行环境:

1.全局执行环境

2.changeColor 的局部执行环境

3.swapColors 的局部执行环境

全局环境中有一个变量 color 和一个函数 changeColor,chanceColor 的局部执行环境包含一个 anotherColor 的变量和一个 swapColors 函数，但它也能访问到全局环境中的 color 变量。
swapColors 的局部执行环境中有一个 tempColor 的变量，这个变量只能在此执行环境中问题；无论是全局环境还是 changeColor 的局部环境，都无法访问 tempColor 变量，而在 swapColors 执行环境中，则可以访问其他两个环境中的所有变量，因为那两个环境是他的父执行环境。

作用域链图示:

```jsx | inline
import React from 'react';
import Chain from '../..//assets/function-chain.png';

export default () => <img src={Chain} width="100%" />;
```

总结作用域链特点:

- 通过作用域链，内部执行环境可以访问所有外部执行环境(包括全局执行环境)的变量和函数。
- 每个执行环境可以向上搜索作用域链，来查询变量和函数名，但不能向下搜索作用域链而进入另一个执行环境。
- 在执行环境中，查找变量或函数时，优先在自己的局部变量对象中搜索，如果找不到就再向上搜索上一级作用域链，直到全局作用域链为止。

## 延长作用域链（了解即可）

- try-catch
- with
- eval

with 语句会将指定的对象添加到作用域链中。
catch 则是把捕捉到的错误对象创建为一个新的变量对象放入作用域链中。
eval 则是将字符串转换为 js 代码，创建一个新的执行环境。

## 闭包

闭包的创建方式就是在一个函数内部创建另一个函数并返回，使用一个值去接收这个返回的函数。

```js
function test() {
  var a = 1;
  return function() {
    return ++a;
  };
}
var closure = test();
var result = closure(); //2
```

上边的匿名函数就是一个闭包，从作用域链的角度来讲，全局执行环境含有一个 test 函数和一个 closure 变量，而 test()的函数执行环境中则包含一个变量 a 和一个匿名函数，调用 test()函数之后，这个时候一般来讲，test 函数执行环境所对应的活动对象会被销毁，即变量 a 会被销毁;

但闭包的情况不同，因为在另一个函数内部定义的函数会将包含(外部)函数的活动对象添加到自己的作用域链中，即此匿名函数的作用域链中包含了 test()函数的活动对象，并且在调用返回的匿名函数之后，有一个 closure 全局变量始终在引用这个函数，所以其活动对象不会销毁，可以继续访问到变量 a。

如果要进行销毁，可直接将引用匿名函数的变量置为 null，如下:

```js
...
var closure = test();

var result = closure();//2

closure = null ;//解除引用，释放内存
```

## 参考文章

《JavaScript 高级程序设计第三版》4.2 小节以及 7.2 小节内容
