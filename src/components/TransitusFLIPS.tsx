import React, {
  useRef,
  useLayoutEffect,
} from 'react';

type Rect = DOMRect | ClientRect;

interface TransitusFLIPS {
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
  animationOption: {},
});

const TransitusFLIPS: React.FC<TransitusFLIPS> = (props) => {

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
  const animationOption: KeyframeAnimationOptions = {
    delay,
    duration,
    easing,
    fill,
  };

  useLayoutEffect(() => {
    if (catchAnimations.size > 0) {
      const values = catchAnimations.values();
      for (const value of values) {
        value.play();
      }
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
    }}>
      { children }
    </FLIPSContext.Provider>
  )
};

export default TransitusFLIPS;
