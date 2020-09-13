import * as React from 'react';
import { TransitionStyles } from './Transition';
export interface TransitionFLIP {
    children: React.ReactElement;
    flipId: string | number;
    _onLeave?: () => void;
    _animation?: boolean;
    _transitionStyles?: TransitionStyles;
    _duration?: number;
}
declare const TransitionFLIP: React.FC<TransitionFLIP>;
export default TransitionFLIP;
