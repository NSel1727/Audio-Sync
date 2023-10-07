import Logo from '../Components/Logo';

function HomePage(props) {

  function onStart(){
    props.setIsRunning(true);
  }

  return (
      <div class="homepage aligns-items-center justify-content-center card text-center w-50 position-absolute top-50 start-50 translate-middle">
        <div class="card-body">
          <div class="welcome">
            welcome to
          </div>
          <Logo/>
          <div class="startMusicText">
            start playing music...
          </div>
          <button type="button" class="startButton btn btn-success" onClick={() => onStart()}>Start!</button>
        </div>
      </div>
  );
}

export default HomePage;
