import React, { use, useEffect } from "react";
import "../Styles/connect.css";
import { IoMdCheckmark } from "react-icons/io";

function PlayerName({ setPlayerName, setGameState }) {
  const [inputName, setInputName] = React.useState("");

  return (
    <div className="connect">
      <div
        className="logo"
        onClick={() => {
          setGameState("menu");
        }}
      ></div>
      <div className="inputLobbyIDContainer">
        <div className="inputLobbyID">
          <input
            type="text"
            className="lobbyIDInput"
            placeholder="Wybierz nazwę"
            maxLength={12}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />
          <div
            className="joinButton"
            onClick={() => {
              if (inputName.length < 3) {
                alert("Nazwa jest za krótka");
                return;
              }
              setPlayerName(inputName);
              setGameState("menu");
            }}
          >
            <IoMdCheckmark />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerName;
