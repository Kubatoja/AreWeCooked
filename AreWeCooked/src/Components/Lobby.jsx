import React, { use } from "react";
import { useEffect, useState } from "react";
import "../Styles/lobby.css";
import Peer from "peerjs";

function Lobby({
  setGameState,
  lobbyId,
  setLobbyId,
  isHost,
  setPlayers,
  players,
  peer,
  setPeer,
  PlayerName,
}) {
  const updatePlayersForAll = (playersList) => {
    if (!peer) return;

    console.log("Updating players for all connections:", playersList);
    Object.values(peer.connections).forEach((conns) => {
      conns.forEach((conn) => {
        if (conn.open) {
          conn.send({ type: "update-players", players: playersList });
        }
      });
    });
  };

  useEffect(() => {
    if (isHost) {
      setPlayers([{ id: "host", name: PlayerName, isHost: true }]);
      const peerInstance = new Peer(lobbyId);
      setPeer(peerInstance);

      peerInstance.on("connection", (conn) => {
        conn.on("data", (data) => {
          if (data.type === "player-joined") {
            console.log("Player joined:", data.PlayerName);
            setPlayers((prevPlayers) => [
              ...prevPlayers,
              { id: conn.peer, name: data.PlayerName, isHost: false },
            ]);
          }
        });
      });

      return () => {
        peerInstance.destroy();
      };
    }
  }, [isHost, lobbyId]);

  useEffect(() => {
    if (isHost && peer) {
      updatePlayersForAll(players);
    }
  }, [players, isHost, peer]);

  useEffect(() => {
    if (!isHost && peer) {
      // Nasłuchuj wszystkie aktywne połączenia
      Object.values(peer.connections).forEach((conns) => {
        conns.forEach((conn) => {
          conn.on("data", (data) => {
            if (data.type === "update-players") {
              console.log("Otrzymano nową listę graczy:", data.players);
              setPlayers(data.players);
            }
          });
        });
      });

      // Obsługa nowych połączeń (jeśli klient sam nawiązuje połączenia)
      peer.on("connection", (conn) => {
        conn.on("data", (data) => {
          if (data.type === "update-players") {
            setPlayers(data.players);
          }
        });
      });
    }
  }, [peer, isHost]);

  useEffect(() => {
    if (isHost && peer) {
      // Nasłuchuj nowych połączeń
      peer.on("connection", (conn) => {
        conn.on("close", () => {
          console.log(`Gracz ${conn.peer} opuścił lobby`); //!!!!!!!!!
          setPlayers((prev) => prev.filter((p) => p.id !== conn.peer));
        });
      });
    }
  }, [isHost, peer]);

  useEffect(() => {
    if (!isHost && peer) {
      const connectionChecker = setInterval(() => {
        const isConnected = Object.values(peer.connections)
          .flat()
          .some((conn) => conn.open);

        if (!isConnected) {
          alert("Connection lost - host disconnected");
          setGameState("menu");
          clearInterval(connectionChecker);
        }
      }, 5000); // Sprawdzaj co 5 sekund

      return () => clearInterval(connectionChecker);
    }
  }, [peer, isHost]);

  return (
    <div className="Lobby">
      <div
        className="logoCorner"
        onClick={() => {
          if (peer) peer.destroy();
          setLobbyId("000000");
          setPlayers([]);
          setGameState("menu");
        }}
      ></div>
      <div className="lobbyIDText">
        <p>Kod gry:</p>
        <div className="lobbyID">{lobbyId}</div>
      </div>
      <div className="players">
        {players.map((player) => (
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
