import React from 'react';

const ResultMessage = ({ timeUp, maskedWord }) => {
  let message = "";

  if (timeUp) {
    message = "Time's up! You lost.";
  } else {
    message = maskedWord;
  }

  return <p className="result-message">{message}</p>;
};

export default ResultMessage;
