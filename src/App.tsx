import React, {
  useState,
} from 'react';
import TransitusQueue from './components/TransitusQueue';
import Transitus from './components/Transitus';

function App() {

  const [list, setList] = useState<any[]>(['1', '2'])

  return (
    <div className="App">
      <TransitusQueue>
        {
          list && list.map((li, i) => (
            <Transitus
              key={i}
            >
              <div>{ li }</div>
            </Transitus>
          ))
        }
      </TransitusQueue>
    </div>
  );
}

export default App;
