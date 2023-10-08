import { useState } from 'react';
import './App.css';
import HomePage from './Cards/homePage';
import Simulation from './Cards/simulation';

function App() {

  const [isRunning, setIsRunning] = useState(false);

  return (
    isRunning ? 
      <div className="wider background">
        <Simulation isRunning={isRunning} setIsRunning={setIsRunning}/>
      </div> 
      : 
      <div className="background">
        <HomePage isRunning={isRunning} setIsRunning={setIsRunning}/>
      </div>
  );
}

export default App;
