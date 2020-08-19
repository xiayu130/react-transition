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
    children: _children,
  } = props;

  const firstMount = useRef(true);
  const [children, setChildren] = useState(() => {
    return initChildren(children);
  });

  const initChildren = (children: React.ReactNode): React.ReactNode  => {
    return children;
  };

  const nextChildren = (
    nextchildren: React.ReactNode,
    prevChildren: React.ReactNode,
  ) => {
  }

  useEffect(() => {
    if (!firstMount.current) {
      setChildren((prevChildren) => {
        return nextChildren(_children, prevChildren);
      });
    } else {
      firstMount.current = false;

    }
  }, [children]);

  return (
    <TransitusQueueContext.Provider value={null}>
      { children }
    </TransitusQueueContext.Provider>
  )
}

export default TransitusQueue;
