import * as React from 'react';
import { TransitionStyles } from './Transition';
declare type Rect = DOMRect | ClientRect;
interface CatchStylesValue {
    rect: Rect;
    styles: CSSStyleDeclaration;
}
interface FLIPSContext {
    catchStyles: CatchStylesMap;
    catchAnimations: CatchAnimations;
    animationOption: KeyframeAnimationOptions;
}
declare type CatchStylesMap = Map<string | number, CatchStylesValue>;
declare type CatchAnimations = Map<string | number, Animation>;
export declare const FLIPSContext: React.Context<FLIPSContext>;
interface TransitionFLIPS {
    delay?: number;
    duration?: number;
    inOutDuration?: number;
    easing?: string;
    fill?: 'auto' | 'backwards' | 'both' | 'forwards' | 'none' | undefined;
    wrap?: string;
    wrapClassName?: string;
    transitionStyles?: TransitionStyles;
}
declare const TransitionFLIPS: React.FC<TransitionFLIPS>;
export default TransitionFLIPS;
