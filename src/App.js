import React from 'react';
import GameContainer from './features/gameContainer/GameContainer';

import { Counter } from './features/counter/Counter';

import 'normalize.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameContainer/>

      <header className="App-header">
        <Counter />
      </header>

    </div>
  );
}

export default App;
