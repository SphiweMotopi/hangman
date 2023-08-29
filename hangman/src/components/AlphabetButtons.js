import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const AlphabetButtons = ({ alphabets, isLetterGuessed, handleGuess, timeUp }) => {
  return (
    <Row>
      <Col>
        <div className="alphabet-buttons">
          {alphabets.map((alphabet, index) => (
            <Button
              key={index}
              variant="outline-primary"
              disabled={isLetterGuessed(alphabet) || timeUp}
              onClick={() => handleGuess(alphabet)}
              className={`alphabet-button ${isLetterGuessed(alphabet) ? 'correct' : ''}`}
            >
              {alphabet}
            </Button>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default AlphabetButtons;
