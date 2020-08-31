import React, {
  useState,
  useRef,
} from 'react';

interface TransitusFLIPS {
}

interface FLIPSContext {
  catchStyles: CatchStylesMap;
  catchAnimations: CatchAnimations;
}

type CatchStylesValue = DOMRect | ClientRect;
type CatchStylesMap = Map<string, CatchStylesValue>;
type CatchAnimations = Map<string, Animation>;

export const FLIPSContext = React.createContext<FLIPSContext>({
  catchStyles: new Map(),
  catchAnimations: new Map(),
});

const TransitusFLIPS: React.FC<TransitusFLIPS> = (props) => {

  const {
    children,
  } = props;

  const catchStyles = useRef<CatchStylesMap>(new Map()).current;
  const catchAnimations = useRef<CatchAnimations>(new Map()).current;

  return (
    <FLIPSContext.Provider value={{
      catchStyles,
      catchAnimations,
    }}>
      { children }
    </FLIPSContext.Provider>
  )
};

export default TransitusFLIPS;
