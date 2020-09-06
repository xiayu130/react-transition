import React, {
  useState,
  useEffect,
} from 'react';
import { v4 as uuid } from 'uuid';
import FLIP from './components/FLIP';
import FLIPS from './components/FLIPS';
import TransitionFLIP from './components/TransitionFLIP';
import TransitionFLIPS from './components/TransitionFLIPS';
import './App.css';

interface ListItem {
  id: string;
  name: string;
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
    name: '西尔莎·罗南',
    id: uuid(),
  }, {
    name: '艾玛·沃特森',
    id: uuid(),
  }, {
    name: '詹妮弗·劳伦斯',
    id: uuid(),
  }, {
    name: '安妮·海瑟薇',
    id: uuid(),
  }, {
    name: '麦肯吉·弗依',
    id: uuid(),
  }, {
    name: '玛格特·罗比',
    id: uuid(),
  }]);
  const [matrix, setMatrix] = useState([1, 2, 3, 4])

  useEffect(() => {
    setInterval(() => {
      setMatrix((pre) => {
        return [...shuffle(shuffle(pre))];
      });
    }, 2000)
  }, []);

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
      {/* <div className="matrix">
        <FLIPS
          duration={800}
        >
          {
            matrix && matrix.map((m) => (
              <FLIP key={m} flipId={m}><div className="matrix-item">{ m }</div></FLIP>
            ))
          }
        </FLIPS>
      </div> */}
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
            easing="ease-in-out"
          >
            {
              list && list.map((item) => (
                <TransitionFLIP key={item.id} flipId={item.id}>
                  <div className="flip-list-item">
                    <span>{ item.name }</span>
                    <span
                      className="flip-list-remove"
                      onClick={() => {
                        remove(item.id);
                      }}
                    />
                  </div>
                </TransitionFLIP>
              ))
            }
          </TransitionFLIPS>
        </div>
      </div>

    </div>
  );
}

export default App;
