import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hangman.css';

import { Container, Row, Col, Button } from 'react-bootstrap';
import HangmanImage from './components/HangmanImage';
import MaskedWord from './components/MaskedWord';
import AlphabetButtons from './components/AlphabetButtons';
import ResultMessage from './components/ResultMessage';

const words = ["HANGMAN", "COMPUTER", "JAVASCRIPT"];

export default function Hangman() {
  const [initialWord, setInitialWord] = useState("");
  const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [firstIncorrectGuess, setFirstIncorrectGuess] = useState(null);
  const maxIncorrectGuesses = 11;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setInitialWord(words[randomIndex]);
  }, []);

  useEffect(() => {
    if (incorrectGuesses.length >= maxIncorrectGuesses) {
      setShowHelp(true);
    }
  }, [incorrectGuesses]);

  const handleGuess = (letter) => {
    if (initialWord.includes(letter)) {
      setCorrectGuesses([...correctGuesses, letter]);
    } else {
      setIncorrectGuesses([...incorrectGuesses, letter]);
      if (firstIncorrectGuess === null) {
        setFirstIncorrectGuess(letter);
      }
    }
  };

  const isLetterGuessed = (letter) => correctGuesses.includes(letter);

  const maskedWord = initialWord
    .split('')
    .map((letter) => (isLetterGuessed(letter) ? letter : "_"))
    .join(" ");

  const getCurrentHangmanImage = () => {
    const incorrectGuessCount = incorrectGuesses.length;
    return Math.min(incorrectGuessCount, maxIncorrectGuesses);
  };

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <Container className="hangman-container">
      <Row>
        <Col>
          <h1>Hangman Game</h1>
        </Col>
      </Row>
      <HangmanImage stage={getCurrentHangmanImage()} />
      <MaskedWord word={maskedWord} />
      <AlphabetButtons
        alphabets={alphabets}
        isLetterGuessed={isLetterGuessed}
        handleGuess={handleGuess}
        disabled={incorrectGuesses.length >= maxIncorrectGuesses || maskedWord === initialWord}
      />
      <Row>
        <Col>
          <Button variant="primary" onClick={restartGame}>Restart Game</Button>
          <Button variant="info" onClick={() => setShowHelp(!showHelp)}>Help</Button>
        </Col>
      </Row>
      {(incorrectGuesses.length >= maxIncorrectGuesses || maskedWord === initialWord) && (
        <ResultMessage timeUp={false} maskedWord={maskedWord} />
      )}
      {showHelp && incorrectGuesses.length >= maxIncorrectGuesses && (
        <ResultMessage timeUp={false} maskedWord="You have lost. No more guesses left!" />
      )}
      {firstIncorrectGuess && maskedWord.includes("_") && (
        <p className="result-message">Keep guessing!</p>
      )}
    </Container>
  );
}
