import React, {
  useState, useEffect,
} from 'react';
import './App.css';
import TransitusFLIP from './components/TransitusFLIP';
import TransitusFLIPS from './components/TransitusFLIPS';
import TransitusFLIPSQueue from './components/TransitusFLIPSQueue';
import FLIP from './components/FLIP';

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
  }]);

  useEffect(() => {
    // setTimeout(() => {
    //   setInterval(() => {
    //     document.getElementById('btn')?.click()
    //   }, 30)
    // }, 5000)
  }, []);


  return (
    <div className="App">
      <button id="btn" style={{
        marginBottom: '30px'
      }} onClick={() => {
        setList((prevlist) => {
          return [...shuffle(prevlist)];
        })
      }}>随机</button>

      <TransitusFLIPS
        duration={400}
      >
        {
          list && list.map(li => (
            <TransitusFLIP flipId={li.id} key={li.id}>
              <div className="box-item"
                onClick={() => {
                  setList(prevList => {
                    return prevList.filter(l => l.id !== li.id)
                  })
                }}
              >{ li.text }</div>
            </TransitusFLIP>
          ))
        }
      </TransitusFLIPS>
    </div>
  );
}

export default App;
