import { useState, useEffect} from 'react';
import Logo from '../Components/Logo';
import BeatLoader from "react-spinners/BeatLoader";


function Simulation(props){

  const [tableContent, setTableContent] = useState([]);
  const [currentSong, setCurrentSong] = useState("Listening now...");
  const [isGreen, setIsGreen] = useState(true);

  //setTableContent([...tableContent, newElement]);

  function makeSongHTML(artist, title, imgLink, playlistLink){
    return <tr><td>{title}</td><td>{artist}</td><td>{<img className="spotImg" src={imgLink}></img>}</td><td>{playlistLink}</td></tr>
  }

  async function onButtonClick(){
    if(isGreen){
        while(props.isRunning){
          setIsGreen(false);
          await fetch("/audio").then((res) => console.log(res.text()));
          await fetch("/playlist").then((res) =>
          res.json().then((data) => {
            if(Object.keys(data).length > 0){
              let artist = data.artist;
              let title = data.title;
              let imgLink = data.imgLink;
              let playlistLink = data.playlistLink;

              if(title != currentSong){
                setCurrentSong(title);
                setTableContent(oldTable => [...oldTable, makeSongHTML(artist, title, imgLink, playlistLink)])
              }

            }else{
              console.log("Song not found")
            }
          }));
        }
    }else{
      console.log(tableContent)
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
                <th>Album Image</th>
                <th>Spotify Link</th>
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