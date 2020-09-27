import * as React from 'react';
import {
  useState,
  useEffect,
  useRef,
} from 'react';

export interface AnimateProps {
  animation?: boolean;
  delay?: number;
  duration?: number;
  timingFunction?: string;
  first?: boolean;
  transitionStyles?: {
    enter: React.CSSProperties,
    leave: React.CSSProperties,
  };
  children: React.ReactElement;
}

export enum STATUS {
  ENTER = 'enter',
  LEAVE = 'leave',
}

const Animate: React.FC<AnimateProps> = (props) => {
  const {
    animation = false,
    delay = 0,
    duration = 300,
    timingFunction = 'ease-in-out',
    first = true,
    transitionStyles = {
      enter: { opacity: 1, },
      leave: { opacity: 0, },
    },
    children,
  } = props;

  const firstRender = useRef(true);
  const nextStatus = useRef('');
  const [status, setStatus] = useState(() => {
    if (animation) {
      if (first) {
        nextStatus.current = STATUS['ENTER'];
        return STATUS['LEAVE'];
      } else {
        return STATUS['ENTER'];
      }
    } else {
      return STATUS['LEAVE'];
    }
  });

  useEffect(() => {
    if (nextStatus.current) {
      setStatus(nextStatus.current as STATUS);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setStatus(animation ? STATUS['ENTER'] : STATUS['LEAVE']);
    }
  }, [animation]);

  const prevStyle = children?.props?.style || {};
  const animateStyle = transitionStyles[status];
  const transitionStyle = {
    transition: `all ${duration}ms ${timingFunction} ${delay}ms`,
  };
  const styles = {
    ...prevStyle,
    ...animateStyle,
    ...transitionStyle,
  };

  return React.cloneElement(React.Children.only(children), {
    style: {
      ...styles,
    },
  })
}

export default Animate;
