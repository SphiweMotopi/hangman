import React from 'react';

import Image1 from '../images/state1.jpg';
import Image2 from '../images/state2.jpg';
import Image3 from '../images/state3.jpg';
import Image4 from '../images/state4.jpg';
import Image5 from '../images/state5.jpg';
import Image6 from '../images/state6.jpg';
import Image7 from '../images/state7.jpg';
import Image8 from '../images/state8.jpg';
import Image9 from '../images/state9.jpg';
import Image10 from '../images/state10.jpg';
import Image11 from '../images/state11.jpg';

class HangmanImage extends React.Component {
  getImageForStage(stage) {
    switch (stage) {
      case 0:
        return Image1;
      case 1:
        return Image2;
      case 2:
        return Image3;
      case 3:
        return Image4;
      case 4:
        return Image4;
      case 5:
        return Image5;
      case 6:
        return Image6;
      case 7:
        return Image7;
      case 8:
        return Image8;
      case 9:
        return Image9;
      case 10:
        return Image10;
        case 11:
        return Image11;
      default:
        return Image1;
    }
  }

  render() {
    const { stage } = this.props;
    const imageToShow = this.getImageForStage(stage);

    return (
      <div>
        <img
          src={imageToShow}
          alt={`Hangman Stage ${stage}`}
          className="hangman-image"
        />
      </div>
    );
  }
}

export default HangmanImage;