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
  const [playerId, setPlayerId] = useState("");

  useEffect(() => {
    console.log(`Lobby ID: ${lobbyId}`);
  }, [lobbyId]);

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
            playerName={playerName}
            setGameState={setGameState}
            setLobbyId={setLobbyId}
            setIsHost={setIsHost}
            setPlayerId={setPlayerId}
          />
        )}
        {gameState == "lobby" && (
          <Lobby
            setGameState={setGameState}
            lobbyId={lobbyId}
            isHost={isHost}
            players={players}
            setPlayers={setPlayers}
            playerId={playerId}
          />
        )}
        {gameState == "connect" && (
          <Connect
            setLobbyId={setLobbyId}
            setGameState={setGameState}
            setPlayers={setPlayers}
            PlayerName={playerName}
            setPlayerId={setPlayerId}
          />
        )}
      </div>
    </>
  );
}

export default App;
