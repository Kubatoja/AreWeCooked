import React, { use } from "react";
import { useEffect, useState } from "react";
import "../Styles/lobby.css";

import { ref, onValue, off, onDisconnect, remove } from "firebase/database";
import { db } from "./firebase";

function Lobby({
  setGameState,
  lobbyId,
  isHost,
  setPlayers,
  players,
  playerId,
}) {
  useEffect(() => {
    const playersRef = ref(db, `lobbies/${lobbyId}/players`);
    const lobbyRef = ref(db, `lobbies/${lobbyId}`);

    const playersUnsubscribe = onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      if (players) {
        setPlayers(players);
      }
    });

    const lobbyUnsubscribe = onValue(lobbyRef, (snapshot) => {
      if (!snapshot.exists()) {
        if (!isHost) {
          alert("Lobby zostało zamknięte przez hosta");
        }
        setPlayers([]);
        setGameState("menu");
      }
    });

    if (playerId) {
      const playerRef = ref(db, `lobbies/${lobbyId}/players/${playerId}`);
      onDisconnect(playerRef).remove();

      if (isHost) {
        onDisconnect(lobbyRef).remove();
      }
    }

    return () => {
      off(playersRef);
      off(lobbyRef);
      playersUnsubscribe?.();
      lobbyUnsubscribe?.();
    };
  }, [lobbyId, playerId]);

  function handleLeaveLobby() {
    if (!lobbyId || !playerId) return;

    const playerRef = ref(db, `lobbies/${lobbyId}/players/${playerId}`);
    const lobbyRef = ref(db, `lobbies/${lobbyId}`);

    if (isHost) {
      remove(lobbyRef).then(() => {
        setPlayers([]);
        setGameState("menu");
      });
    } else {
      remove(playerRef).then(() => {
        setPlayers([]);
        setGameState("menu");
      });
    }
  }

  return (
    <div className="Lobby">
      <div className="logoCorner" onClick={handleLeaveLobby}></div>
      <div className="lobbyIDText">
        <p>Kod gry:</p>
        <div className="lobbyID">{lobbyId}</div>
      </div>
      <div className="players">
        {players &&
          Object.values(players).map((player) => (
            <Player key={player.id} name={player.name} Host={player.isHost} />
          ))}
      </div>
    </div>
  );
}

function Player({ name, Host }) {
  return (
    <div className="player">
      <div className="playerName">{name}</div>
      {Host && <div className="hostTag"></div>}
    </div>
  );
}

export default Lobby;
