import { useState, useEffect} from 'react';
import Logo from '../Components/Logo';
import DOMPurify from 'dompurify'


function Simulation(props){

  const [tableContent, setTableContent] = useState([]);
  const [currentSong, setCurrentSong] = useState("Nothing is playing atm");
  const [isGreen, setIsGreen] = useState(true);

  function onButtonClick(){
    if(isGreen){
      setIsGreen(false);
      fetch("/audio").then((res) =>
            res.json().then((data) => {
                console.log(data);
            })
        );
    }else{
      props.setIsRunning(false);
    }
  }

  function leftPanel(){
    return (
      <div className='leftPanel'>
        <Logo/>
        <button type="button" class={(isGreen ? "green" : "") + " stopButton btn btn-danger"} onClick={() => onButtonClick()}>{isGreen ? "go" : "stop"}</button>
      </div>
    )
  }

  function rightPanel(){
    return (
      <div className='rightPanel'>
        <div className='currentSong'>
          Current Song: {currentSong}
        </div>
        <div className='songTable'>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div class="aligns-items-center justify-content-center card text-center w-50 position-absolute top-50 start-50 translate-middle">
      <div class="card-body">
        {leftPanel()}
        {rightPanel()}
      </div>
    </div>
  );
}

export default Simulation;