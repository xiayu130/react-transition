
## React Flip Transition

React Flip 动画组件库

## react-flip-transition 是什么？

1. 使用WebAnimationAPI实现flip动画队列
2. 支持自定义入场，出场动画的过渡。无需额外的传递参数，直接变化数据即可完成入场以及出场动画效果。

## 工作原理

撰写中……

## 安装

```shell

npm install react-flip-transition
```

## 预览

### 网格

### 列表

### 交错效果

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
key | flip动画元素的唯一的key | string | 必传

## v0.0.2

1. 支持交错动画效果
2. 解决现有存在的问题
3. 暴露出更多组件
