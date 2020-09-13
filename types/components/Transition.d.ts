import * as React from 'react';
interface TransitionDuration {
    enter: number;
    leave: number;
}
interface TransitionDisplay {
    enter: React.CSSProperties;
    leave: React.CSSProperties;
}
export interface TransitionStyles {
    enter?: React.CSSProperties;
    entering?: React.CSSProperties;
    leave?: React.CSSProperties;
    leaveing?: React.CSSProperties;
}
export interface TransitionProps {
    display?: boolean | TransitionDisplay;
    duration?: number | TransitionDuration;
    delay?: number;
    animation?: boolean;
    children: React.ReactElement;
    unmount?: boolean;
    enter?: boolean;
    leave?: boolean;
    appear?: boolean;
    timingFunction?: (string & {}) | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-end" | "step-start" | "linear";
    transitionStyles?: TransitionStyles;
    onLeave?: () => void;
    onEnter?: () => void;
}
export declare enum STATUS {
    UNMOUNTED = "unmounted",
    ENTER = "enter",
    ENTERING = "entering",
    LEAVE = "leave",
    LEAVEING = "leaveing"
}
declare const Transition: React.FC<TransitionProps>;
export default Transition;
