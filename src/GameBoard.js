import React from "react";
import "./GameBoard.css";

class GameBoard extends React.Component {
  render() {
    return (
      <>
        <div id="category-header-container">
          <h3
            style={{
              textAlign: "center",
              color: "#644566",
              background:
                "linear-gradient(to bottom, white 0, white 60%, #fedc2a 60%, #fedc2a 80%, white 60%, white 100%)",
              margin: "0 5px",
            }}
          >
            Categories
          </h3>
          <span role="img" aria-label="pen-emoji">
            📋
          </span>
        </div>
        <div id="category-container"></div>
        <div className="separator">
          <hr style={{ color: "transparent" }} />
        </div>
        <div id="dynamic-elements-container">
          <div id="word-container"></div>
          <div id="game-board-container"></div>
        </div>
      </>
    );
  }
}

export default GameBoard;