import React, {
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
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
      name: '1',
      id: uuid(),
    }, {
      name: '2',
      id: uuid(),
    },
    {
      name: '3',
      id: uuid(),
    }
  ]);

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
            duration={1200}
          >
            {
              list && list.map((item) => {
                return (
                  <TransitionFLIP key={item.id} flipId={item.id}>
                    <div
                      className={calssnames({
                        'flip-list-item': true,
                      })}
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
              })
            }
          </TransitionFLIPS>
        </div>
      </div>

    </div>
  );
}

export default App;
