import * as React from 'react';
interface FlipsProps {
    inOutDuration?: number;
    wrap?: string | false;
    wrapClass?: string;
    name?: string;
}
export declare const FlipsContext: React.Context<{
    forceUpdate: any;
}>;
declare const Flips: React.FC<FlipsProps>;
export default Flips;
