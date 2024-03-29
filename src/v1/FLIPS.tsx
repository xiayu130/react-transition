import * as React from 'react';
import {
  useRef,
  useLayoutEffect,
} from 'react';

type Rect = DOMRect | ClientRect;

interface FLIPS {
  delay?: number;
  duration?: number;
  easing?: string;
  fill?: 'auto' | 'backwards' | 'both' | 'forwards' | 'none' | undefined;
  wrap?: string;
  wrapClassName?: string;
}

interface FLIPSContext {
  catchStyles: CatchStylesMap;
  catchAnimations: CatchAnimations;
  updateCatchAnimations: CatchAnimations;
  animationOption: KeyframeAnimationOptions;
}

interface CatchStylesValue {
  rect: Rect;
}

type CatchStylesMap = Map<string | number, CatchStylesValue>;
type CatchAnimations = Map<string | number, Animation>;

export const FLIPSContext = React.createContext<FLIPSContext>({
  catchStyles: new Map(),
  catchAnimations: new Map(),
  updateCatchAnimations: new Map(),
  animationOption: {},
});

const FLIPS: React.FC<FLIPS> = (props) => {

  const {
    delay = 0,
    duration = 200,
    easing = 'linear',
    fill = 'both',
    wrap = '',
    wrapClassName = '',
    children,
  } = props;

  const catchStyles = useRef<CatchStylesMap>(new Map()).current;
  const catchAnimations = useRef<CatchAnimations>(new Map()).current;
  const updateCatchAnimations = useRef<CatchAnimations>(new Map()).current;
  const animationOption: KeyframeAnimationOptions = {
    delay,
    duration,
    easing,
    fill,
  };

  useLayoutEffect(() => {
    if (updateCatchAnimations.size > 0) {
      const values = updateCatchAnimations.values();
      for (const value of values) {
        value.play();
      }
      updateCatchAnimations.clear();
    }
  });

  if (wrap) {
    const wrapChildren = React.createElement(wrap, {
      className: wrapClassName,
    }, children);

    return (
      <FLIPSContext.Provider value={{
        catchStyles,
        catchAnimations,
        animationOption,
        updateCatchAnimations,
      }}>
        { wrapChildren }
      </FLIPSContext.Provider>
    )
  }

  return (
    <FLIPSContext.Provider value={{
      catchStyles,
      catchAnimations,
      animationOption,
      updateCatchAnimations,
    }}>
      { children }
    </FLIPSContext.Provider>
  )
};

export default FLIPS;
