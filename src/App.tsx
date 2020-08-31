import React, {
  useState,
} from 'react';
import './App.css';
import TransitusFLIP from './components/TransitusFLIP';
import TransitusFLIPS from './components/TransitusFLIPS';

const shuffle = function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function App() {
  const [list, setList] = useState([{
    id: 1,
    text: 1
  }, {
    id: 2,
    text: 2
  }, {
    id: 3,
    text: 3
  }, {
    id: 4,
    text: 4
  }, {
    id: 5,
    text: 5
  }, {
    id: 6,
    text: 6
  }, {
    id: 7,
    text: 7
  }, {
    id: 8,
    text: 8
  }, {
    id: 9,
    text: 9
  }, {
    id: 10,
    text: 10
  }, {
    id: 11,
    text: 11
  }, {
    id: 12,
    text: 12
  }, {
    id: 13,
    text: 13
  }, {
    id: 14,
    text: 14
  }, {
    id: 15,
    text: 15
  }, {
    id: 16,
    text: 16
  }, {
    id: 17,
    text: 17
  }, {
    id: 18,
    text: 18
  }, {
    id: 19,
    text: 19
  }, {
    id: 20,
    text: 20
  }, {
    id: 21,
    text: 21
  }]);


  return (
    <div className="App">
      <button onClick={() => {
        console.log('点击')
        setList((prevlist) => {
          return [...shuffle(prevlist)];
        })
      }}>随机</button>

      <TransitusFLIPS
        duration={800}
        wrap="div"
        wrapClassName="box"
      >
        {
          list && list.map(li => (
            <TransitusFLIP flipId={li.id} key={li.id}>
              <div className="box-item">{ li.text }</div>
            </TransitusFLIP>
          ))
        }
      </TransitusFLIPS>
    </div>
  );
}

export default App;
