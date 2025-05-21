import React, { use, useEffect } from "react";
import "../Styles/connect.css";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import { ref, update, get, off } from "firebase/database";
import { db } from "./firebase";

function Connect({
  setGameState,
  setLobbyId,
  setPlayers,
  PlayerName,
  setPlayerId,
}) {
  const [inputLobby, setInputLobby] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  function joinLobby(lobbyCode) {
    if (!inputLobby || isConnecting) return;

    const lobbyRef = ref(db, `lobbies/${lobbyCode}`);

    get(lobbyRef).then((snapshot) => {
      if (!snapshot.exists()) {
        alert("Lobby does not exist");
        setIsConnecting(false);
        return;
      }

      const playerId = "player_" + Date.now();
      setPlayerId(playerId);

      const newPlayer = {
        id: playerId,
        name: PlayerName || "Player",
        isHost: false,
      };

      update(ref(db, `lobbies/${lobbyCode}/players`), {
        [playerId]: newPlayer,
      }).then(() => {
        setPlayers((prev) => ({ ...prev, [playerId]: newPlayer }));
        setGameState("lobby");
      });
    });

    setIsConnecting(false);
  }

  function performConnect() {
    setLobbyId(inputLobby);
    setIsConnecting(true);
    joinLobby(inputLobby);
  }

  return (
    <div className="connect">
      <div
        className="logo"
        onClick={() => {
          setGameState("menu");
        }}
      ></div>
      <div className="inputLobbyIDContainer">
        {!isConnecting && (
          <div className="inputLobbyID">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                performConnect();
              }}
            >
              <input
                type="text"
                className="lobbyIDInput"
                placeholder="Kod gry"
                maxLength={6}
                onChange={(e) => {
                  setInputLobby(e.target.value);
                }}
              />
            </form>
            <div className="joinButton" onClick={performConnect}>
              <IoMdCheckmark />
            </div>
          </div>
        )}
        {isConnecting && (
          <div className="connecting">
            <p>Łączenie z pokojem...</p>
            <div className="loading"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connect;
