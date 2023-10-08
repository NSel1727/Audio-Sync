import { useState, useEffect} from 'react';
import Logo from '../Components/Logo';
import BeatLoader from "react-spinners/BeatLoader";


function Simulation(props){

  const [tableContent, setTableContent] = useState([]);
  const [currentSong, setCurrentSong] = useState("Listening now...");
  const [buttonState, setButtonState] = useState(0);

  function makeSongHTML(artist, title, imgLink, playlistLink){
    return <tr><td>{title}</td><td>{artist}</td><td>{<img className="spotImg" src={imgLink}></img>}</td><td><a href={playlistLink}>Link</a></td></tr>
  }

  async function onButtonClick(){
    let cur = currentSong;
    if(buttonState == 0){
        while(props.isRunning){
          setButtonState(1);
          await fetch("/audio").then((res) => console.log(res.text()));
          await fetch("/playlist").then((res) =>
          res.json().then((data) => {
            if(Object.keys(data).length > 0){
              let artist = data.artist;
              let title = data.title;
              let imgLink = data.imgLink;
              let playlistLink = data.playlistLink;

              if(title != cur){
                setCurrentSong(title);
                cur = title;
                setTableContent(oldTable => [...oldTable, makeSongHTML(artist, title, imgLink, playlistLink)])
              }

            }else{
              console.log("Song not found")
            }
          }));
        }
    }else if(buttonState == 1){
      
      setButtonState(2);
    }else{
      console.log(tableContent)
      props.setIsRunning(false);
    }
  }

  function leftPanel(){
    return (
      <div className='leftPanel'>
        <Logo/>
        <button type="button" className={((buttonState) == 0 ? "green" : ((buttonState == 1) ? "" + currentSong : "blue")) + " flagButton btn btn-danger"} onClick={async () => onButtonClick()}>{(buttonState == 0) ? "Go" : ((buttonState == 1) ? "Stop" : "Close")}</button>
      </div>
    )
  }

  function rightPanel(){
    return (
      <div className='rightPanel'>
        <div className='currentSong'>
         {(buttonState) == 0 ? "Click Go To Begin" : ((buttonState == 1) ? "Current Song: " + currentSong : "Final List")}
        </div>
        {(buttonState != 1) ? null : <div className='loader'>< BeatLoader color="#ADEEEA"/></div>}
        <div className='songTable'>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Image</th>
                <th>Link</th>
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
    <div class="testing homepage aligns-items-center justify-content-center card text-center w-50 position-absolute top-50 start-50 translate-middle">
      <div class="card-body">
        {leftPanel()}
        {rightPanel()}
      </div>
    </div>
  );
}

export default Simulation;