import { useState } from 'react';
import './App.css';
import HomePage from './Cards/homePage';
import Simulation from './Cards/simulation';

function App() {

  const [isRunning, setIsRunning] = useState(false);

  return (
    isRunning ? <Simulation/> : <HomePage setIsRunning={setIsRunning}/>
  );
}

export default App;
