import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import MainControl from "./containers/MainControl/MainControl";
import Game from "./containers/Game/Game";

function App() {
  return (
    <div className="App">
      <TopBar />
      <MainControl />
      <Game />
    </div>
  );
}

export default App;
