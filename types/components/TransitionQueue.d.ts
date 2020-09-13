import * as React from 'react';
import { STATUS } from './Transition';
interface TransitionQueue {
    appear?: boolean;
    enter?: boolean;
    leave?: boolean;
    wrap?: string;
    wrapClassName?: string;
}
export declare type ChildrenMap = {
    [key: string]: React.ReactNode;
};
export declare const TransitionQueueContext: React.Context<{
    _initStatus: STATUS;
}>;
declare const TransitionQueue: React.FC<TransitionQueue>;
export default TransitionQueue;
