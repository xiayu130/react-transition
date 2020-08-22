import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  isFunc,
} from '../util/checkType';
import {
  TransitusProps,
  STATUS,
} from './Transitus';

interface TransitusQueue {
  appear?: boolean;
  enter?: boolean;
  leave?: boolean;
  wrap?: string;
}

type ChildrenMap = {
  [key: string]: React.ReactNode
};

function getProps<T>(p1: T, p2: T): T {
  if (p1 === undefined) {
    return p2;
  }
  return p1;
}

export const TransitusQueueContext = React.createContext({} as {
  _status: STATUS,
});

const TransitusQueue: React.FC<TransitusQueue> = (props) => {

  const {
    children: _children,
    enter,
    leave,
    appear,
    wrap,
  } = props;

  const mergeMap = (prev: ChildrenMap, next: ChildrenMap): ChildrenMap => {
  };

  const initChildren = (children: React.ReactNode): ChildrenMap => {
    return getMap(children, (child) => {
      const props = ((child as React.ReactElement)?.props as TransitusProps);
      return React.cloneElement(child as React.ReactElement, {
        animation: true,
        appear: getProps(appear, props.appear),
        enter: getProps(enter, props.enter),
        leave: getProps(leave, props.leave),
      });
    });
  };

  const nextChildren = (
    nextChildren: React.ReactNode,
    prevChildrenMap: ChildrenMap,
  ): ChildrenMap => {
    const nextChildrenMap = getMap(nextChildren);
    const children = mergeMap(prevChildrenMap, nextChildrenMap);
    Object.keys(children).forEach(key => {
      const child = children[key];
      if (!React.isValidElement(child)) {
        return;
      }
      const hasKeyByNew = nextChildrenMap[key] !== undefined;
      const hasKeyByPrev = prevChildrenMap[key] !== undefined;
      const isNew = hasKeyByNew && !hasKeyByPrev;
      const isDelete = !hasKeyByNew && hasKeyByPrev;
      const isNeverChange = hasKeyByNew&& hasKeyByPrev;
      const prevProps = ((prevChildrenMap[key] as React.ReactElement)?.props as TransitusProps);
      const nextProps = ((nextChildrenMap[key] as React.ReactElement)?.props as TransitusProps);
      if (isNew) {
        children[key] = React.cloneElement(child, {
          animation: true,
          appear: getProps(appear, nextProps.appear),
          enter: getProps(enter, nextProps.enter),
          leave: getProps(leave, nextProps.leave),
        });
      } else if (isDelete) {
        children[key] = React.cloneElement(child, {
          animation: false,
        });
      } else if (isNeverChange) {
        children[key] = React.cloneElement(child, {
          animation: prevProps.animation,
          appear: prevProps.appear,
          enter: prevProps.enter,
          leave: prevProps.leave,
        });
      }
    });
    return children;
  };

  const firstMount = useRef(true);
  const [children, setChildren] = useState<ChildrenMap>(() => {
    return initChildren(_children);
  });

  useEffect(() => {
    if (!firstMount.current) {
      setChildren(nextChildren(_children, children));
    } else {
      firstMount.current = false;
    }
  }, [_children]);

  const childNode = Object.values(children);

  if (wrap) {
    return React.createElement(wrap, {}, childNode)
  }

  return (
    <TransitusQueueContext.Provider value={{
      _status: 'unmounted' as STATUS,
    }}>
      { childNode }
    </TransitusQueueContext.Provider>
  )
}

export default TransitusQueue;
