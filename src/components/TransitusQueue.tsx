import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  isFunc,
} from '../util/checkType';

// TODO: 1. 需要完善类型  2.mergeMap 重新实现
interface TransitusQueue {
  appear?: boolean;
  enter?: boolean;
  leave?: boolean;
}

type ChildrenMap = {
  [key: string]: React.ReactNode
};

const initChildren = (children: React.ReactNode): ChildrenMap => {
  return getMap(children, (child: React.ReactNode) => {
    return React.cloneElement(child as any, {
      animation: true,
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
    if (isNew) {
      children[key] = React.cloneElement(child as any, {
        animation: true,
      });
    } else if (isDelete) {
      children[key] = React.cloneElement(child as any, {
        animation: false,
      });
    } else if (isNeverChange) {
      children[key] = React.cloneElement(child as any, {
        animation: (prevChildrenMap[key] as any).props.animation,
      });
    }
  });
  return children;
};

const getMap = (
  children: React.ReactNode,
  callback?: (child: React.ReactNode) => React.ReactNode
) => {
  const map = Object.create(null);
  if (children) {
    React.Children.map(children, (child) => {
      if (React.isValidElement(child) && isFunc(callback)) {
        map[(child as any).key] = callback(child);
      } else {
        map[(child as any).key] = child;
      }
    });
  }
  return map;
};

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

const TransitusQueue: React.FC<TransitusQueue> = (props) => {

  const {
    children: _children,
  } = props;

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

  return (
    <>
      { childNode }
    </>
  )
}

export default TransitusQueue;
