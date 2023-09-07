
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hangman.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import HangmanImage from './HangmanImage';
import MaskedWord from './MaskedWord';
import AlphabetButtons from './AlphabetButtons';
import ResultMessage from './ResultMessage';

// List of words for the game
const words = ["HANGMAN", "COMPUTER", "JAVASCRIPT"];

// Hangman component
export default function Hangman() {
  
  const [initialWord, setInitialWord] = useState("");
  const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; 
  const [correctGuesses, setCorrectGuesses] = useState([]); 
  const [incorrectGuesses, setIncorrectGuesses] = useState([]); 
  const [showHelp, setShowHelp] = useState(false); 
  const [firstIncorrectGuess, setFirstIncorrectGuess] = useState(null); 
  const maxIncorrectGuesses = 11; // Maximum allowed incorrect guesses

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setInitialWord(words[randomIndex]);
  }, []);

  // Check incorrect guesses
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

  // Check if a letter has been guessed correctly
  const isLetterGuessed = (letter) => correctGuesses.includes(letter);

  // Word to display
  const maskedWord = initialWord
    .split('')
    .map((letter) => (isLetterGuessed(letter) ? letter : "_"))
    .join(" ");

  // Hangman image to display
  const getCurrentHangmanImage = () => {
    const incorrectGuessCount = incorrectGuesses.length;
    return Math.min(incorrectGuessCount, maxIncorrectGuesses);
  };

  // Reloading the page
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
