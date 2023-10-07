import { useState } from 'react';

function HomePage(props) {

  function onStart(){
    props.setIsRunning(true);
  }

  return (
    <div class="homePage card">
      <div class="card-body">
        
      </div>
    </div>
  );
}

export default HomePage;
