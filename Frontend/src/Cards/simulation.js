import { useState } from 'react';
import Logo from '../Components/Logo';

function Simulation(props) {

  function onEnd(){
    props.setIsRunning(false);
  }

  function leftPanel(){

  }

  function rightPanel(){
    
  }

  return (
    <div class="aligns-items-center justify-content-center card text-center w-50 position-absolute top-50 start-50 translate-middle">
      <div class="card-body">
        
      </div>
    </div>
  );
}

export default Simulation;