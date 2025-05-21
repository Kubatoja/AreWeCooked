import React from "react";
import "../Styles/mainmenu.css";
import { ref, set } from "firebase/database";
import { db } from "./firebase";

function MainMenu({
  setGameState,
  setLobbyId,
  setIsHost,
  playerName,
  setPlayerId,
}) {
  const createLobby = async () => {
    const lobbyId = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    const hostId = "host_" + Date.now();
    setPlayerId(hostId);
    try {
      await set(ref(db, `lobbies/${lobbyId}`), {
        hostId: hostId,
        players: {
          [hostId]: {
            id: hostId,
            name: playerName || "Host",
            isHost: true,
          },
        },
        createdAt: Date.now(),
      });

      setLobbyId(lobbyId);
      setIsHost(true);
      setGameState("lobby");
    } catch (error) {
      console.error("Error creating lobby:", error);
      alert("Failed to create lobby. Please try again.");
    }
  };

  return (
    <div className="MainMenu">
      <div className="logo"></div>
      <div className="buttonContainer">
        <div className="button">
          <div
            className="buttonInside"
            onClick={() => {
              createLobby();
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
