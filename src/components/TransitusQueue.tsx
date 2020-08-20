import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

export const TransitusQueueContext = React.createContext(null);

interface TransitusQueue {
  appear?: boolean;
  enter?: boolean;
  leave?: boolean;
}

type ChildrenMap = {
  [key: string]: React.ReactNode
};

const TransitusQueue: React.FC<TransitusQueue> = (props) => {

  const initChildren = (children: React.ReactNode): ChildrenMap => {
    const map = Object.create(null);
    if (children) {
      React.Children.map(children, (child) => {
        map[(child as any).key] = React.cloneElement(child as any, {
          animation: true,
        });
      });
    }
    return map;
  };

  const nextChildren = (
    nextchildren: React.ReactNode,
    prevChildren: React.ReactNode,
  ) => {
  }

  const {
    children: _children,
  } = props;

  const firstMount = useRef(true);
  const [children, setChildren] = useState<ChildrenMap>(() => {
    return initChildren(_children);
  });

  useEffect(() => {
    if (!firstMount.current) {
      // 比较children
    } else {
      firstMount.current = false;
    }
  }, [children]);


  return (
    <TransitusQueueContext.Provider value={null}>
      { Object.values(children) }
    </TransitusQueueContext.Provider>
  )
}

export default TransitusQueue;
