import React, {
  useState,
  useRef,
  useLayoutEffect,
} from 'react';

type Rect = DOMRect | ClientRect;

interface TransitusFLIPS {
  delay: number;
  duration: number;
  easing: string;
  fill: "auto" | "backwards" | "both" | "forwards" | "none" | undefined;
}

interface FLIPSContext {
  catchStyles: CatchStylesMap;
  catchAnimations: CatchAnimations;
  animationOption: KeyframeAnimationOptions;
}

interface CatchStylesValue {
  rect: Rect;
}

type CatchStylesMap = Map<string, CatchStylesValue>;
type CatchAnimations = Map<string, Animation>;

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
