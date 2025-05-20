import React, { use, useEffect } from "react";
import "../Styles/connect.css";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import Peer from "peerjs";

function Connect({
  setGameState,
  setLobbyId,
  lobbyId,
  setPlayers,
  players,
  peer,
  setPeer,
  PlayerName,
}) {
  const [inputLobby, setInputLobby] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  function connectToLobby() {
    if (!inputLobby || isConnecting) return;
    setIsConnecting(true);

    const peerInstance = new Peer({
      host: "0.peerjs.com",
      port: 443,
      secure: true,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          {
            urls: "turn:numb.viagenie.ca:3478",
            username: "free",
            credential: "free",
          },
        ],
      },
    });

    peerInstance.on("open", (id) => {
      const conn = peerInstance.connect(inputLobby, {
        reliable: true, // Lepsza niezawodność
      });

      conn.on("open", () => {
        console.log("Połączenie z hostem otwarte!");
        conn.send({ type: "player-joined", PlayerName: PlayerName });
        setLobbyId(inputLobby);
        setGameState("lobby");
      });
    });

    peerInstance.on("error", (err) => {
      console.error("Błąd PeerJS:", err);
      setIsConnecting(false);
    });

    setPeer(peerInstance);
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
            <input
              type="text"
              className="lobbyIDInput"
              placeholder="Kod gry"
              maxLength={6}
              onChange={(e) => {
                setInputLobby(e.target.value);
              }}
            />
            <div
              className="joinButton"
              onClick={() => {
                setLobbyId(inputLobby);
                setIsConnecting(true);
                connectToLobby();
              }}
            >
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
