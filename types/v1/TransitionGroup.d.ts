import * as React from 'react';
import { TransitionProps } from './Transition';
interface TransitionGroup {
    animation?: boolean;
    interval?: number;
}
export declare type TransitionPropsAndID = TransitionProps & {
    ID: string;
};
export declare const TransitionContext: React.Context<{
    animations: {
        [key: string]: Pick<TransitionPropsAndID, "animation" | "delay">;
    };
    register: (props: TransitionPropsAndID) => void;
}>;
declare const TransitionGroup: React.FC<TransitionGroup>;
export default TransitionGroup;
