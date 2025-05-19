import React from "react";
import "../Styles/mainmenu.css";

function MainMenu({ setGameState, setLobbyId, setIsHost }) {
  function generateLobbyId() {
    const lobbyId = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    return lobbyId;
  }

  return (
    <div className="MainMenu">
      <div className="logo"></div>
      <div className="buttonContainer">
        <div className="button">
          <div
            className="buttonInside"
            onClick={() => {
              const lobbyId = generateLobbyId();
              setLobbyId(lobbyId);
              setIsHost(true);
              setGameState("lobby");
            }}
          >
            Stwórz gre
          </div>
        </div>
        <div className="button">
          <div
            className="buttonInside"
            onClick={() => {
              setGameState("connect");
            }}
          >
            Dołącz do gry
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
