import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hangman.css';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'; // Import Modal
import HangmanImage from './HangmanImage';
import MaskedWord from './MaskedWord';
import AlphabetButtons from './AlphabetButtons';
import ResultMessage from './ResultMessage';

// List of words for the game
const words = ["HANGMAN", "COMPUTER", "JAVASCRIPT"];

// Hangman component
export default function Hangman() {
  // State variables
  const [initialWord, setInitialWord] = useState("");
  const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [firstIncorrectGuess, setFirstIncorrectGuess] = useState(null);
  const maxIncorrectGuesses = 11; // Maximum allowed incorrect guesses
  const [showHelpModal, setShowHelpModal] = useState(false); // Add state for help modal

  // Initialize the game by selecting a random word
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setInitialWord(words[randomIndex]);
  }, []);

  // Check if the game is lost (exceeded max incorrect guesses)
  useEffect(() => {
    if (incorrectGuesses.length >= maxIncorrectGuesses) {
      setShowHelp(true);
    }
  }, [incorrectGuesses]);

  // Handle a player's guess
  const handleGuess = (letter) => {
    if (initialWord.includes(letter)) {
      setCorrectGuesses([...correctGuesses, letter]);
      // Check if all letters have been guessed correctly
      if (isWordGuessed(initialWord, correctGuesses)) {
        // Display a "You have won!" message
        setShowHelp(true);
      }
    } else {
      setIncorrectGuesses([...incorrectGuesses, letter]);
      if (firstIncorrectGuess === null) {
        setFirstIncorrectGuess(letter);
      }
    }
  };

  
// Function to check if all letters in the word have been guessed correctly
const isWordGuessed = (word, guesses) => {
  for (const letter of word) {
    if (!guesses.includes(letter)) {
      return false;
    }
  }
  return true;
};

  // Check if a letter has been guessed correctly
  const isLetterGuessed = (letter) => correctGuesses.includes(letter);

  // Check if all correct letters have been guessed
const allCorrectLettersGuessed = initialWord
.split('')
.every((letter) => correctGuesses.includes(letter));

  // Word to display with underscores for unguessed letters
  const maskedWord = initialWord
    .split('')
    .map((letter) => (isLetterGuessed(letter) ? letter : "_"))
    .join(" ");

  // Determine the current hangman image to display
  const getCurrentHangmanImage = () => {
    const incorrectGuessCount = incorrectGuesses.length;
    return Math.min(incorrectGuessCount, maxIncorrectGuesses);
  };

  // Restart the game by reloading the page
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
          {/* Add a Help button to open the modal */}
          <Button variant="info" onClick={() => setShowHelpModal(true)}>Help</Button>
        </Col>
      </Row>
      {allCorrectLettersGuessed && (
      <ResultMessage timeUp={false} maskedWord="You have won!" />
      )}
     {/* Help Modal */}
     <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hangman Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Guess the word by selecting letters. You have a maximum of 11 incorrect guesses before you lose.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHelpModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {showHelp && incorrectGuesses.length >= maxIncorrectGuesses && (
        <ResultMessage timeUp={false} maskedWord="You have lost. No more guesses left!" />
      )}
      {firstIncorrectGuess && maskedWord.includes("_") && (
        <p className="result-message">Keep guessing!</p>
      )}
    </Container>
  );
}
