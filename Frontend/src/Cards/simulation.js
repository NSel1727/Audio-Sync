import { useState, useEffect} from 'react';
import Logo from '../Components/Logo';
import BeatLoader from "react-spinners/BeatLoader";


function Simulation(props){

  const [tableContent, setTableContent] = useState([]);
  const [currentSong, setCurrentSong] = useState("Nothing is playing atm");
  const [isGreen, setIsGreen] = useState(true);

  //setTableContent([...tableContent, newElement]);

  function makeSongHTML(artist, title){
    return <tr><td>{title}</td><td>{artist}</td></tr>
  }

  async function onButtonClick(){
    if(isGreen){
      while(true){
      setIsGreen(false);
      await fetch("/audio").then((res) => console.log(res.text()));
      await fetch("/song").then((res) =>
      res.json().then((data) => {
        let artist = data.artist;
        let title = data.title;
        setCurrentSong(title);
        setTableContent([...tableContent, makeSongHTML(artist, title)])
      }));
     }
    }else{
      props.setIsRunning(false);
    }
  }

  function leftPanel(){
    return (
      <div className='leftPanel'>
        <Logo/>
        <button type="button" class={(isGreen ? "green" : "") + " flagButton btn btn-danger"} onClick={async () => onButtonClick()}>{isGreen ? "go" : "stop"}</button>
      </div>
    )
  }

  function rightPanel(){
    return (
      <div className='rightPanel'>
        <div className='currentSong'>
          Current Song: {currentSong}
        </div>
        {isGreen ? null : <div className='loader'>< BeatLoader color="#ADEEEA"/></div>}
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
    <div class="homepage aligns-items-center justify-content-center card text-center w-50 position-absolute top-50 start-50 translate-middle">
      <div class="card-body">
        {leftPanel()}
        {rightPanel()}
      </div>
    </div>
  );
}

export default Simulation;