import * as React from 'react';
declare type Rect = DOMRect | ClientRect;
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
declare type CatchStylesMap = Map<string | number, CatchStylesValue>;
declare type CatchAnimations = Map<string | number, Animation>;
export declare const FLIPSContext: React.Context<FLIPSContext>;
declare const FLIPS: React.FC<FLIPS>;
export default FLIPS;
