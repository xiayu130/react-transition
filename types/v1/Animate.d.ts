import * as React from 'react';
export interface AnimateProps {
    animation?: boolean;
    delay?: number;
    duration?: number;
    timingFunction?: string;
    first?: boolean;
    transitionStyles?: {
        enter: React.CSSProperties;
        leave: React.CSSProperties;
    };
    children: React.ReactElement;
}
export declare enum STATUS {
    ENTER = "enter",
    LEAVE = "leave"
}
declare const Animate: React.FC<AnimateProps>;
export default Animate;
