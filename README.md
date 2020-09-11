
## React Transition

React动画组件

## TransitionFLIPS

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

## TransitionFLIP

组件参数 | 说明 | 类型 | 默认值
---|---|---|---
flipId | flip动画元素的唯一Id | string | 必传
