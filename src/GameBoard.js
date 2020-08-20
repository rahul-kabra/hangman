import React from "react";
import "./GameBoard.css";

import Category from "./Category.js";
import Word from "./Word";
import Alphabets from "./Alphabets";
import GameEnd from "./GameEnd";

import * as Constants from "./Constants";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alphabetList: Constants.AlphabetsList,
      categoryList: Constants.CategoryList,
      selectedCategory: "",
      prevSelectedCategory: "",
      categoryWords: "",
      randomWord: "",
      clickedAlphabets: [],
      matchedAlphabets: [],
      wordAlphabets: [],
      gameState: "initial",
      score: 0,
      totalWordCount: Constants.TotalWords,
      categoryWordCount: 0,
      totalLives: Constants.TotalLives,
      isCategoryClicked: "",
      categoryComplete: [],
    };

    this.completedCategory = [];
    this.randomNumber = 0;
    this.finalScore = 0;

    this.selectCategory = this.selectCategory.bind(this);
    this.randomWord = this.randomWord.bind(this);
    this.createWordPlaceholder = this.createWordPlaceholder.bind(this);
    this.checkAlphabet = this.checkAlphabet.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (this.state.randomWord !== "") {
      this.checkAlphabet(e.key.toUpperCase() + "~" + e.keyCode);
    } else {
    }
  }

  startGame() {
    this.completedCategory = [];
    this.setState({
      alphabetList: Constants.AlphabetsList,
      categoryList: Constants.CategoryList,
      selectedCategory: "",
      prevSelectedCategory: "",
      categoryWords: "",
      randomWord: "",
      clickedAlphabets: [],
      matchedAlphabets: [],
      wordAlphabets: [],
      gameState: "initial",
      score: 0,
      totalWordCount: Constants.TotalWords,
      categoryWordCount: 0,
      totalLives: Constants.TotalLives,
      isCategoryClicked: "",
      categoryComplete: [],
    });
  }

  selectCategory(category) {
    let words = [];
    switch (category.split(" ")[0]) {
      case "Colors":
        words = Constants.Colors;
        break;
      case "Shapes":
        words = Constants.Shapes;
        break;
      case "Movies":
        words = Constants.Movies;
        break;
      case "Superheroes":
        words = Constants.Superheroes;
        break;
      case "Countries":
        words = Constants.Countries;
        break;
      case "Naruto":
        words = Constants.Naruto;
        break;
      case "Flowers":
        words = Constants.Flowers;
        break;
      case "Disney":
        words = Constants.Disney;
        break;
      case "HarryPotter":
        words = Constants.HarryPotter;
        break;
      case "Music":
        words = Constants.Music;
        break;
      case "Fantasy":
        words = Constants.Fantasy;
        break;
      default:
        words = [];
    }

    this.setState({
      selectedCategory: category.split(" ")[0],
      prevSelectedCategory: category.split(" ")[0],
      categoryWords: words,
      gameState: "running",
      categoryWordCount: words.length,
      totalLives: Constants.TotalLives,
      isCategoryClicked: category.split(" ")[0],
      clickedAlphabets: [],
      matchedAlphabets: [],
      wordAlphabets: [],
    });

    setTimeout(() => {
      this.randomWord();
    }, 100);
  }

  randomWord() {
    var num = Math.floor(Math.random() * this.state.categoryWords.length);
    var randomWord = this.state.categoryWords[num];

    this.randomNumber = num;

    this.setState({
      randomWord: randomWord,
    });

    setTimeout(() => {
      this.createWordPlaceholder();
    }, 100);
  }

  createWordPlaceholder() {
    var word = this.state.randomWord.toUpperCase();
    for (var i = 0; i < word.length; i++) {
      this.state.wordAlphabets.push(word.charAt(i));
    }
    this.setState({
      wordAlphabets: this.state.wordAlphabets,
    });
  }

  checkAlphabet(inputAlphabet) {
    let clickedAlphabets = this.state.clickedAlphabets;
    let keyCode = 0;
    if (this.state.wordAlphabets.includes(" ")) {
      if (clickedAlphabets.indexOf(" ") === -1) {
        clickedAlphabets.push(" ");
        this.state.matchedAlphabets.push(" ");
      }
    }
    if (inputAlphabet.indexOf("~") !== -1) {
      keyCode = parseInt(inputAlphabet.split("~")[1]);
      inputAlphabet = inputAlphabet.split("~")[0];
    }
    if (
      !clickedAlphabets.includes(inputAlphabet) &&
      (keyCode !== 0
        ? (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)
        : true)
    ) {
      clickedAlphabets.push(inputAlphabet);

      this.setState({
        clickedAlphabets: this.state.clickedAlphabets,
      });
      this.state.wordAlphabets.forEach((alphabet) => {
        if (alphabet === inputAlphabet) {
          this.state.matchedAlphabets.push(inputAlphabet);
          this.setState({
            matchedAlphabets: this.state.matchedAlphabets,
          });
        }
      });
    }

    if (
      !this.state.wordAlphabets.includes(inputAlphabet) &&
      (keyCode !== 0
        ? (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)
        : true)
    ) {
      this.setState((prevState) => {
        return {
          score: prevState.score,
          totalLives:
            prevState.totalLives === 0
              ? prevState.totalLives
              : prevState.totalLives - 1,
        };
      });
      if (this.state.totalLives === 0) {
        this.setState({
          gameState: "end",
        });
      }
    }

    if (
      this.state.wordAlphabets.length === this.state.matchedAlphabets.length
    ) {
      this.state.categoryWords.splice(this.randomNumber, 1);
      this.setState((prevState) => {
        return {
          score: prevState.score + 1,
          totalLives: Constants.TotalLives,
          totalWordCount: prevState.totalWordCount - 1,
          clickedAlphabets: [],
          matchedAlphabets: [],
          wordAlphabets: [],
          categoryWordCount: prevState.categoryWordCount - 1,
          categoryWords: prevState.categoryWords,
        };
      });
      if (this.state.categoryWords.length === 0) {
        this.completedCategory.push(this.state.selectedCategory);
        this.setState({
          categoryComplete: this.completedCategory,
          clickedAlphabets: [],
          matchedAlphabets: [],
          wordAlphabets: [],
          selectedCategory: "",
          categoryWords: "",
          randomWord: "",
          categoryWordCount: 0,
        });
      } else {
        this.setState({
          clickedAlphabets: [],
          matchedAlphabets: [],
          wordAlphabets: [],
          randomWord: "",
        });
        setTimeout(() => {
          this.randomWord();
        }, 1000);
      }
    }

    if (this.state.totalWordCount === 0) {
      this.finalScore = this.state.score;
      this.setState({
        gameState: "end",
        selectedCategory: "",
        prevSelectedCategory: "",
        categoryWords: "",
        randomWord: "",
        clickedAlphabets: [],
        matchedAlphabets: [],
        wordAlphabets: [],
        score: 0,
        totalWordCount: Constants.TotalWords,
        categoryWordCount: 0,
        totalLives: Constants.TotalLives,
        isCategoryClicked: "",
        categoryComplete: [],
      });
    }
  }

  createLifeEmojis = () => {
    let lives = [];
    for (let i = 1; i <= this.state.totalLives; i++) {
      lives.push(
        <span
          key={"life_" + i}
          id={"life_" + i}
          role="img"
          aria-label="gem-emoji"
        >
          💎
        </span>
      );
    }
    return lives;
  };

  render() {
    return (
      <>
        <div
          style={
            (this.state.gameState === "running" ||
              this.state.gameState !== "") &&
            this.state.gameState !== "end"
              ? { display: "block" }
              : this.state.gameState === "end"
              ? { display: "block", opacity: 0.3 }
              : { display: "none" }
          }
        >
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
          <div id="category-container">
            <Category
              categoryList={this.state.categoryList}
              categoryComplete={this.completedCategory}
              isCategoryClicked={this.state.isCategoryClicked}
              gameState={this.state.gameState}
              clickHandle={this.selectCategory}
            />
          </div>
          <p style={{ textAlign: "center" }}>
            {this.state.gameState !== "" && this.state.selectedCategory !== ""
              ? `Selected category is ${
                  this.state.selectedCategory +
                  Constants.getEmoji(this.state.selectedCategory)
                }`
              : `Please select a category to proceed.`}
          </p>
          <div className="separator">
            <hr style={{ color: "transparent" }} />
          </div>
          <div id="dynamic-elements-container">
            <div id="word-container">
              <Word
                wordAlphabetsList={this.state.wordAlphabets}
                matchedAlphabets={this.state.matchedAlphabets}
              />
            </div>
            <div id="game-board-container">
              <Alphabets
                alphabetList={this.state.alphabetList}
                selectedCategory={this.state.selectedCategory}
                clickedAlphabets={this.state.clickedAlphabets}
                matchedAlphabets={this.state.matchedAlphabets}
                gameStatus={this.state.gameState}
                clickHandle={this.checkAlphabet}
              />
            </div>
          </div>
          <div id="stats-container">
            <p>
              <span role="img" aria-label="pen-emoji">
                ✒️
              </span>{" "}
              Score : {this.state.score}
            </p>
            <p>Total Lives : {this.createLifeEmojis()}</p>
          </div>
          <div id="word-count-container">
            <p
              style={
                this.state.selectedCategory !== ""
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
            >
              <span role="img" aria-label="telescope-emoji">
                🔭
              </span>{" "}
              Words remaining in this category : {this.state.categoryWordCount}
            </p>
            <p>
              <span role="img" aria-label="dartboard-emoji">
                🎯
              </span>{" "}
              Total words remaining : {this.state.totalWordCount}
            </p>
          </div>
        </div>
        <div
          style={
            this.state.gameState === "end" &&
            this.state.gameState !== "" &&
            this.state.gameState !== "running"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <GameEnd score={this.finalScore} startGame={this.startGame} />
        </div>
      </>
    );
  }
}

export default GameBoard;