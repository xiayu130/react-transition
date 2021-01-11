import * as React from 'react';
import {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  ChildrenMap
} from './Observer';
import {
  TransitionFLIPProps
} from './TransitionFLIP';

type Rect = DOMRect | ClientRect;

interface CatchStylesValue {
  rect: Rect;
  styles: CSSStyleDeclaration,
}

type FLIPSContextType = {
  catchStyles: CatchStylesMap;
  catchAnimations: CatchAnimations;
  animationOption: KeyframeAnimationOptions;
}

type CatchStylesMap = Map<string | number, CatchStylesValue>;
type CatchAnimations = Map<string | number, Animation>;

export const FLIPSContext = React.createContext<FLIPSContextType>({
  catchStyles: new Map(),
  catchAnimations: new Map(),
  animationOption: {},
});

interface TransitionFLIPSProps {
  delay?: number;
  duration?: number;
  inOutDuration?: number;
  easing?: string;
  fill?: 'auto' | 'backwards' | 'both' | 'forwards' | 'none' | undefined;
  wrap?: string;
  wrapClassName?: string;
  name?: string;
}

const TransitionFLIPS: React.FC<TransitionFLIPSProps> = (props) => {

  const {
    delay = 0,
    duration = 200,
    inOutDuration = 200,
    easing = 'linear',
    fill = 'auto',
    wrap = 'div',
    wrapClassName = '',
    name = '',
    children: _children,
  } = props;

  const handleLeave = (key: React.ReactText) => {
    setChildren((prevChildren) => {
      if (key in prevChildren) {
        delete prevChildren[key];
      }
      return { ...prevChildren };
    });
  };

  const mergeMap = (prev: ChildrenMap, next: ChildrenMap): ChildrenMap => {
    prev = prev || {};
    next = next || {};
    function getValueForKey(key: React.ReactText) {
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
    let childMapping: ChildrenMap = {};
    for (let nextKey in next) {
      if (nextKeysPending[nextKey]) {
        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
          let pendingNextKey = nextKeysPending[nextKey][i];
          childMapping[pendingNextKey] = getValueForKey(
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
          if (React.isValidElement(child) && callback) {
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
      return React.cloneElement(child as React.ReactElement, {
        _duration: inOutDuration,
        _name: name,
        _animation: true,
        _onLeave: () => {
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
      const prevProps = ((prevChildrenMap[key] as React.ReactElement)?.props as TransitionFLIPProps);
      if (isNew) {
        children[key] = React.cloneElement(child, {
          _name: name,
          _duration: inOutDuration,
          _animation: true,
          _onLeave: () => {
            const key = (child as React.ReactElement).key || '';
            handleLeave(key);
          },
        });
      } else if (isDelete) {
        children[key] = React.cloneElement(child, {
          _animation: false,
        });
      } else if (isNeverChange) {
        children[key] = React.cloneElement(child, {
          _animation: prevProps._animation,
          _duration: prevProps._duration,
          _name: prevProps._name,
          _onLeave: () => {
            const key = (child as React.ReactElement).key || '';
            handleLeave(key);
          },
        });
      }
    });
    return children;
  };

  const firstMount = useRef<boolean>(true);
  const [children, setChildren] = useState<ChildrenMap>(() => {
    return initChildren(_children);
  });
  const catchStyles = useRef<CatchStylesMap>(new Map()).current;
  const catchAnimations = useRef<CatchAnimations>(new Map()).current;
  const animationOption: KeyframeAnimationOptions = {
    delay,
    duration,
    easing,
    fill,
  };

  useEffect(() => {
    if (!firstMount.current) {
      setChildren(nextChildren(_children, children));
    } else {
      firstMount.current = false;
    }
  }, [_children]);

  const childNode = Object.values(children);

  const wrapChildNode = React.createElement(wrap, {
    className: wrapClassName,
  }, childNode);

  return (
    <FLIPSContext.Provider value={{
      catchStyles,
      catchAnimations,
      animationOption,
    }}>
      { wrapChildNode }
    </FLIPSContext.Provider>
  );
}

export default TransitionFLIPS;
