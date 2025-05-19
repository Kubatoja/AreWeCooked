import { useEffect, useState } from "react";
import "./App.css";
import Background from "./Components/Background";
import MainMenu from "./Components/MainMenu";
import Language from "./Components/Language";
import Lobby from "./Components/Lobby";
import Connect from "./Components/Connect";
import PlayerName from "./Components/PlayerName";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameState, setGameState] = useState("playrerName");
  const [lobbyId, setLobbyId] = useState("000000");
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState([]);
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    console.log(`Lobby ID: ${lobbyId}`);
  }, [lobbyId]);

  useEffect(() => {
    console.log(peer);
  }, [peer]);
  return (
    <>
      <div>
        <Language />
        <Background />
        {gameState == "playrerName" && (
          <PlayerName
            setGameState={setGameState}
            setPlayerName={setPlayerName}
          />
        )}
        {gameState == "menu" && (
          <MainMenu
            setGameState={setGameState}
            setLobbyId={setLobbyId}
            setIsHost={setIsHost}
          />
        )}
        {gameState == "lobby" && (
          <Lobby
            setGameState={setGameState}
            lobbyId={lobbyId}
            setLobbyId={setLobbyId}
            isHost={isHost}
            players={players}
            setPlayers={setPlayers}
            peer={peer}
            setPeer={setPeer}
            PlayerName={playerName}
          />
        )}
        {gameState == "connect" && (
          <Connect
            setLobbyId={setLobbyId}
            setGameState={setGameState}
            setPlayers={setPlayers}
            setPeer={setPeer}
            players={players}
            peer={peer}
            lobbyId={lobbyId}
            PlayerName={playerName}
          />
        )}
      </div>
    </>
  );
}

export default App;
