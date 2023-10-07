import { useState } from 'react';
import './App.css';
import HomePage from './Cards/homePage';
import Simulation from './Cards/simulation';

function App() {

  const [isRunning, setIsRunning] = useState(false);

  return (
    isRunning ? 
      <div className="background">
        <Simulation setIsRunning={setIsRunning}/>
      </div> 
      : 
      <div className="background">
        <HomePage setIsRunning={setIsRunning}/>
      </div>
  );
}

export default App;
