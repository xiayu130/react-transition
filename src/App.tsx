import React, {
  useState,
  useEffect,
} from 'react';
import { v4 as uuid } from 'uuid';
import FLIP from './components/FLIP';
import FLIPS from './components/FLIPS';
import TransitionFLIP from './components/TransitionFLIP';
import TransitionFLIPS from './components/TransitionFLIPS';
import calssnames from 'classnames';
import './App.css';

interface ListItem {
  id: string;
  name: string;
  active?: boolean;
}

const shuffle = function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function App() {

  const [list, setList] = useState<ListItem[]>([{
      name: '',
      id: uuid(),
    }, {
      name: '',
      id: uuid(),
    },
    {
      name: '',
      id: uuid(),
    }, {
      name: '',
      id: uuid(),
    }, {
      name: '',
      id: uuid(),
    }, {
      name: '',
      id: uuid(),
    }
  ]);
  const [matrix, setMatrix] = useState([1, 2, 3, 4])
  const [focused, setFocused] = useState<any>(null);

  // useEffect(() => {
  //   setInterval(() => {
  //     setMatrix((pre) => {
  //       return [...shuffle(shuffle(pre))];
  //     });
  //   }, 2000)
  // }, []);

  const random = () => {
    setList((pre) => {
      return [...shuffle(shuffle(pre))];
    })
  };

  const add = () => {
    const name = prompt('请输入一个名字', '');
    if (name) {
      setList((pre) => {
        return [...pre, {
          name,
          id: uuid(),
        }];
      });
    }
  };

  const remove = (id: string) => {
    setList((pre) => {
      return pre.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="App">
      {/* <TransitionFLIPS
        duration={800}
        wrapClassName="matrix"
      >
        {
          matrix && matrix.map((m) => (
            <TransitionFLIP key={m} flipId={m}><div className="matrix-item">{ m }</div></TransitionFLIP>
          ))
        }
      </TransitionFLIPS> */}
      <div className="flip">
        <div className="flip-buttons">
          <div
            className="flip-button flip-button-random"
            role="button"
            onClick={random}
          >
            random
          </div>
          <div
            className="flip-button flip-button-add"
            role="button"
            onClick={add}
          >
            add
          </div>
        </div>
        <div className="flip-list">
          <TransitionFLIPS
            duration={500}
            transitionStyles={{
              entering: { opacity: 1 },
              enter: { opacity: 1 },
              leaveing: { opacity: 0, transform: `translateX(26px)`, },
              leave: { opacity: 0, transform: `translateX(-26px)` },
            }}
            easing="cubic-bezier(.37,.89,.41,1.46)"
          >
            {
              list && list.map((item) => {
                if (item.id === focused) {
                  return (
                    <TransitionFLIP key={item.id} flipId={item.id}>
                      <div
                        className={calssnames({
                          'flip-list-item-active': true,
                        })}
                        onClick={() => {
                          setFocused(null);
                        }}
                      >
                        <span>{ item.name }</span>
                        <span
                          className="flip-list-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(item.id);
                          }}
                        />
                      </div>
                    </TransitionFLIP>
                  )
                } else {
                  return (
                    <TransitionFLIP key={item.id} flipId={item.id}>
                      <div
                        className={calssnames({
                          'flip-list-item': true,
                        })}
                        onClick={() => {
                          setFocused(item.id)
                        }}
                      >
                        <span>{ item.name }</span>
                        <span
                          className="flip-list-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(item.id);
                          }}
                        />
                      </div>
                    </TransitionFLIP>
                  )
                }
              })
            }
          </TransitionFLIPS>
        </div>
      </div>

    </div>
  );
}

export default App;
