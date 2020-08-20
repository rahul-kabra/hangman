import React from "react";
import "./GameEnd.css";

class GameEnd extends React.Component {
  render() {
    console.log(this.props.score);
    return (
      <>
        <div className="game-end-container">
          <div
            style={
              this.props.score === 11
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <p>
              Wow, we have run out of words to describe you as well as for the
              quiz, literally. You have aced this with flying colors. You are
              truy a champion and deserve this.
              <span role="img" aria-label="medal-emoji">
                {" "}
                🥇{" "}
              </span>
            </p>
          </div>
          <div
            style={
              this.props.score !== 11
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <p style={{ margin: "18px", color: "#644566", fontWeight: "bold" }}>
              Sorry, but you have used up all your lives. However if you want to
              continue challenging yourself, get started again.
            </p>
            <button className="btn" onClick={this.props.startGame}>
              Play Again
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default GameEnd;