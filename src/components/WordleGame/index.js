import React, { useState } from "react";
import './index.css'

const WORDS = [
  "apple", "grape", "table", "chair", "house",
  "beach", "light", "smile", "brave", "stone",
  "heart", "cloud", "peace", "dream", "flame",
  "river", "plant", "tiger", "eagle", "grace",
  "ocean", "happy", "music", "paint", "earth"
];
const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const Wordle = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const maxAttempts = 6;

  const checkGuess = (guess) => {
    return guess.split("").map((letter, index) => {
      if (letter === targetWord[index]) return "green";
      if (targetWord.includes(letter)) return "yellow";
      return "gray";
    });
  };

  const handleSubmit = () => {
    if (input.length !== 5 || guesses.length >= maxAttempts) return;
    
    const feedback = checkGuess(input);
    setGuesses([...guesses, { word: input, feedback }]);
    setInput("");

    if (input === targetWord || guesses.length + 1 === maxAttempts) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setInput("");
    setGameOver(false);
  };

  return (
    <div className="wordle-container">
      <h1>Wordle Game</h1>
        <p className='para'>ENTER A 5-LETTER WORD</p>
      <div className="grid">
        {guesses.map((guessObj, i) => (
          <div key={i} className="row">
            {guessObj.word.split("").map((letter, j) => (
              <span key={j} className={`box ${guessObj.feedback[j]}`}>{letter}</span>
            ))}
          </div>
        ))}
      </div>
      {!gameOver ? (
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toLowerCase())}
            maxLength={5}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="result-container">
          <h2>{guesses[guesses.length - 1].word === targetWord ? "You Win!" : "Game Over!"}</h2>
          <button onClick={handleRestart}>New Game</button>
        </div>
      )}
    </div>
  );
};

export default Wordle;
