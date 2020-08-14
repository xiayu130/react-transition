import React, {
  useState,
} from 'react';

interface TransitusGroup {
  appear?: boolean; // 是否首次挂载时，使用入场动画
  enter?: boolean; // 是否禁用入场动画
  leave?: boolean; // 是否禁用出场动画
  animation?: boolean; // 是否开启动画
  interval?: number; // group间隔的时间
}

const TransitusContext = React.createContext({
  animation: [],
});

const TransitusGroup: React.FC<TransitusGroup> = (props) => {

  const {
    children,
  } = props;

  return (
    <TransitusContext.Provider value={{
      animation: []
    }}>
      { children }
    </TransitusContext.Provider>
  )
}

export default TransitusGroup;
