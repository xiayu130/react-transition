
## React Flip Transition

React Flip animation component library

## what is this

1. Use WebAnimationAPI to implement flip animation queue
2. Support custom entry and exit animation transition. No need to pass additional parameters, directly change the data to complete the entry and exit animation effects.

## working principle

https://juejin.im/post/6877773443715203079

## install

```shell

npm install react-flip-transition
```

## preview

- [Demo](http://flip.bengbuzhangyue.xyz/#/)

### matrix

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

### todo list

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

### staggered

![staggered.gif](https://i.loli.net/2020/09/20/YQMduc4UaXsFxn2.gif)

## use

### TransitionFLIPS

params | detail | type | default
---|---|---|---
duration | flip animation transition time | number | 200ms
inOutDuration | entry animation, exit animation transition time | number | 200ms
inOut | whether to enable the animation effect of entering and leaving | boolean | false
easing | easing function of flip animation | string | 'linear'
fill | WAAPI Fill | string | auto
wrap | whether to create a layer of wrapped elements | string | div
wrapClassName | the classname of the wrapped element | string | ''
transitionStyles | the transition style of entering and leaving animation | TransitionStyles | ![transitionStyles.png](https://i.loli.net/2020/09/11/wb6LNZCfFpv94ec.png)

### TransitionFLIP

params | detail | type | default
---|---|---|---
flipId | unique Id of flip animation element | string | necessary
key | the unique key of the flip animation element | string | necessary（Can be set to the same as id）

## v0.0.2

1. 支持交错动画效果
2. 解决现有存在的问题
3. 暴露出更多组件
