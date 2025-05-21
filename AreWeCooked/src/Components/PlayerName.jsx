import React, { use, useEffect } from "react";
import "../Styles/connect.css";
import { IoMdCheckmark } from "react-icons/io";

function PlayerName({ setPlayerName, setGameState }) {
  const [inputName, setInputName] = React.useState("");

  function saveUsername() {
    if (inputName.length < 3) {
      alert("Nazwa jest za krótka");
      return;
    }
    setPlayerName(inputName);
    setGameState("menu");
  }

  return (
    <div className="connect">
      <div className="logo"></div>
      <div className="inputLobbyIDContainer">
        <div className="inputLobbyID">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUsername();
            }}
          >
            <input
              type="text"
              className="lobbyIDInput"
              placeholder="Wybierz nazwę"
              maxLength={12}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
          </form>
          <div className="joinButton" onClick={saveUsername}>
            <IoMdCheckmark />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerName;
