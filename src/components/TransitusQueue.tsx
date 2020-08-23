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
  _initStatus: STATUS,
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
    prev = prev || {};
    next = next || {};
    function getValueForKey(key: any) {
      return key in next ? next[key] : prev[key];
    }
    let nextKeysPending = Object.create(null);
    let pendingKeys = [];
    for (let prevKey in prev) {
      if (prevKey in next) {
        if (pendingKeys.length) {
          nextKeysPending[prevKey] = pendingKeys;
          pendingKeys = [];
        }
      } else {
        pendingKeys.push(prevKey);
      }
    }
    let i;
    let childMapping: any = {};
    for (let nextKey in next) {
      if (nextKeysPending[nextKey]) {
        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
          let pendingNextKey = nextKeysPending[nextKey][i];
          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(
            pendingNextKey
          );
        }
      }
      childMapping[nextKey] = getValueForKey(nextKey);
    }
    for (i = 0; i < pendingKeys.length; i++) {
      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
    }
    return childMapping;
  };

  const getMap = (
    children: React.ReactNode,
    callback?: (child: React.ReactNode) => React.ReactNode
  ): ChildrenMap => {
    const map = Object.create(null);
    if (children) {
      // 如果没有手动添加key, React.Children.map会自动添加key
      React.Children.map(children, c => c)?.forEach((child) => {
        const key = (child as React.ReactElement).key || '';
        if (key) {
          if (React.isValidElement(child) && isFunc(callback)) {
            map[key] = callback(child);
          } else {
            map[key] = child;
          }
        }
      });
    }
    return map;
  };

  const initChildren = (
    children: React.ReactNode,
  ): ChildrenMap => {
    return getMap(children, (child) => {
      const props = ((child as React.ReactElement)?.props as TransitusProps);
      return React.cloneElement(child as React.ReactElement, {
        animation: true,
        appear: getProps(appear, props.appear),
        enter: getProps(enter, props.enter),
        leave: getProps(leave, props.leave),
        onLeave: () => {
          const key = (child as React.ReactElement).key || '';
          handleLeave(key);
        },
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
      const isNeverChange = hasKeyByNew && hasKeyByPrev;
      const prevProps = ((prevChildrenMap[key] as React.ReactElement)?.props as TransitusProps);
      const nextProps = ((nextChildrenMap[key] as React.ReactElement)?.props as TransitusProps);
      if (isNew) {
        children[key] = React.cloneElement(child, {
          animation: true,
          appear: getProps(appear, nextProps.appear),
          enter: getProps(enter, nextProps.enter),
          leave: getProps(leave, nextProps.leave),
          onLeave: () => {
            const key = (child as React.ReactElement).key || '';
            handleLeave(key);
          },
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
          onLeave: () => {
            const key = (child as React.ReactElement).key || '';
            handleLeave(key);
          },
        });
      }
    });
    return children;
  };

  const handleLeave = (key: React.ReactText) => {
    setChildren((prevChildren) => {
      if (key in prevChildren) {
        delete prevChildren[key];
      }
      return { ...prevChildren };
    });
  };

  const firstMount = useRef<boolean>(true);
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
      _initStatus: 'unmounted' as STATUS,
    }}>
      { childNode }
    </TransitusQueueContext.Provider>
  )
}

export default TransitusQueue;
