import React from "react";
import "./Word.css";

class Word extends React.Component {
  render() {
    return (
      <>
        {this.props.wordAlphabetsList.map((alphabet, index) => {
          return (
            <div
              key={"wordAlphabet_" + index}
              id={"wordAlphabet_" + index}
              className="word-alphabet"
            >
              <label
                className="placeholder-label"
                style={
                  this.props.matchedAlphabets.includes(alphabet)
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
              >
                {alphabet}
              </label>
              <span
                className="placeholder-span"
                style={alphabet.trim() === "" ? { borderBottom: "none" } : null}
              ></span>
            </div>
          );
        })}
      </>
    );
  }
}

export default Word;