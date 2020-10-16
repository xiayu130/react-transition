
## React Flip Transition

React Flip 动画组件库

## react-flip-transition 是什么？

1. 使用WebAnimationAPI实现flip动画队列
2. 支持自定义入场，出场动画的过渡。无需额外的传递参数，直接变化数据即可完成入场以及出场动画效果。

## 工作原理

https://juejin.im/post/6877773443715203079

## 安装

```shell

npm install react-flip-transition
```

## 预览

- [Demo](http://flip.bengbuzhangyue.xyz/#/)

### 网格

![网格.gif](https://i.loli.net/2020/09/20/Z3Oo5wTXtYHVxcv.gif)

```jsx

import React, {
  useState,
} from 'react';
import {
  shuffle
} from 'lodash';
import {
  TransitionFLIP,
  TransitionFLIPS
} from 'react-flip-transition';
import './index.css';

const Matrix = () => {

  const [matrix, setMatrix] = useState(() => {
    let arr = [];
    for (let i = 0; i < 49; i++) {
      arr.push(i);
    }
    return arr;
  });

  return (
    <>
      <div className="matrix-container">
        <button onClick={() => {
          setMatrix((prev) => [...shuffle(prev)]);
        }}>乱序</button>
        <TransitionFLIPS
          wrapClassName="matrix"
          duration={500}
        >
          {
            matrix && matrix.map((m) => (
              <TransitionFLIP flipId={m} key={m}>
                <div className="matrix-item">{ m }</div>
              </TransitionFLIP>
            ))
          }
        </TransitionFLIPS>
      </div>
    </>

  )
}

export default Matrix;
```

### 列表

![list.gif](https://i.loli.net/2020/09/20/p2LqHSPvFtA9IaD.gif)

```jsx

import React, {
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import {
  TransitionFLIP,
  TransitionFLIPS,
} from 'react-flip-transition'
import './index.css';
import {
  shuffle
} from 'lodash';

const TodoList = () => {

  const [list, setList] = useState([
    {
      id: uuid(),
      name: '1. 西尔莎罗南'
    },
    {
      id: uuid(),
      name: '2. 艾玛沃森'
    },
    {
      id: uuid(),
      name: '3. 娜塔丽波特曼'
    },
    {
      id: uuid(),
      name: '4. 艾伦佩吉'
    },
    {
      id: uuid(),
      name: '5. 詹妮弗康纳利'
    },
    {
      id: uuid(),
      name: '6. 朱迪福斯特'
    }
  ]);


  return (
    <div className="list-container">
      <button
        className="list-button"
        onClick={() => {
          const str = window.prompt('添加一个你喜欢的明星')
          if (str) {
            setList(prev => [...prev, {
              name: str,
              id: uuid(),
            }])
          }
        }}
      >添加</button>
      <button
        className="list-button"
        onClick={() => {
          setList((prev) => [...shuffle(prev)]);
        }}
      >乱序</button>
      <TransitionFLIPS
        wrapClassName="list"
        duration={600}
        transitionStyles={{
          leave: {
            opacity: 0
          },
          leaveing: {
            opacity: 0,
            transform: `translateX(50px)`,
          },
          enter: {
            opacity: 1,
          },
          entering: {
            opacity: 1,
          }
        }}
      >
        {
          list && list.map((li) => {
            return (
              <TransitionFLIP
                flipId={li.id}
                key={li.id}>
                <div className="list-item">
                  <span>{ li.name }</span>
                  <span onClick={() => {
                    setList((prev) => {
                      return [...prev.filter(item => item.id !== li.id)]
                    })
                  }}>删除</span>
                </div>
              </TransitionFLIP>
            )
          })
        }
      </TransitionFLIPS>
    </div>
  )
}

export default TodoList;
```

### 交错效果

![staggered.gif](https://i.loli.net/2020/09/20/YQMduc4UaXsFxn2.gif)

## 使用 & 文档

### TransitionFLIPS

组件参数 | 说明 | 类型 | 默认值
---|---|---|---
duration | flip动画过渡的时间 | number | 200ms
inOutDuration | 入场动画，出场动画过渡的时间 | number | 200ms
inOut | 是否开启入场以及出场动画 | boolean | false
easing | flip动画的缓动函数 | string | 'linear'
fill | WAAPI的Fill属性 | string | auto
wrap | 是否创建一层包裹的元素 | string | div
wrapClassName | 包裹的元素的classname | string | ''
transitionStyles | 入场出场动画的过渡样式 | TransitionStyles | ![transitionStyles.png](https://i.loli.net/2020/09/11/wb6LNZCfFpv94ec.png)

### TransitionFLIP

组件参数 | 说明 | 类型 | 默认值
---|---|---|---
flipId | flip动画元素的唯一Id | string | 必传
key | flip动画元素的唯一的key | string | 必传（可以和id设置成一样）

## v0.0.2

1. 支持交错动画效果
2. 解决现有存在的问题
3. 暴露出更多组件
