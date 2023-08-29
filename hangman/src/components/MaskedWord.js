import React from 'react';
import { Row, Col } from 'react-bootstrap';

const MaskedWord = ({ word }) => {
  return (
    <Row>
      <Col>
        <p className="masked-word">{word}</p>
      </Col>
    </Row>
  );
};

export default MaskedWord;
