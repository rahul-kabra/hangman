import React from "react";
import "./Alphabets.css";

class Alphabets extends React.Component {
  handleClick(e) {
    let alphabetValue = e.currentTarget.textContent;
    this.props.clickHandle(alphabetValue);
  }

  render() {
    let alphabetsList = this.props.alphabetList;
    return (
      <div id="alphabet-container">
        {alphabetsList.map((alphabet) => {
          return (
            <div
              key={"alphabet_" + alphabet}
              id={"alphabet_" + alphabet}
              className="alphabet"
              style={
                this.props.clickedAlphabets.length === 0
                  ? null
                  : !this.props.clickedAlphabets.includes(alphabet)
                  ? null
                  : this.props.matchedAlphabets.includes(alphabet)
                  ? { background: "#baddb1" }
                  : { background: "#e8afbb" }
              }
            >
              <label
                className={`single-alphabet ${
                  this.props.clickedAlphabets.includes(alphabet)
                    ? "shifter"
                    : ""
                }`}
                style={
                  this.props.selectedCategory === ""
                    ? { pointerEvents: "none" }
                    : this.props.clickedAlphabets.includes(alphabet) ||
                      this.props.gameStatus === "initial"
                    ? { pointerEvents: "none" }
                    : { cursor: "pointer" }
                }
                onClick={(e) => {
                  this.handleClick(e);
                }}
              >
                {alphabet}
              </label>
              <span className="alphabet-span-background"></span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Alphabets;