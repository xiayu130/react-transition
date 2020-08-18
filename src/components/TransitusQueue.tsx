import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  TransitusPropsAndID,
} from './TransitusGroup';

export const TransitusQueueContext = React.createContext(null);

interface TransitusQueue {
  appear?: boolean;
  enter?: boolean;
  leave?: boolean;
}

const TransitusQueue: React.FC<TransitusQueue> = (props) => {

  const {
    children,
  } = props;

  const firstMount = useRef(true);

  useEffect(() => {

  }, [children]);

  return (
    <TransitusQueueContext.Provider value={null}>
      { children }
    </TransitusQueueContext.Provider>
  )
}

export default TransitusQueue;
