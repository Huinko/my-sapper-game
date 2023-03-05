import React from 'react';
import smiley from '../img/finy-smile.PNG';
import coolSmile from '../img/coolSmile.PNG';
import deadSmile from '../img/deadSmile.PNG';

class Smiley extends React.Component {
  render() {
    const { isGameWon, isGameOver, onReset } = this.props;

    let imgSrc = '';
    let alt = '';
    let onClick = onReset;
    if (isGameOver) {
      imgSrc = {deadSmile};
      alt = 'Game Over';
    } else if (isGameWon) {
      imgSrc = {coolSmile};
      alt = 'Game Won';
    } else {
      imgSrc = {smiley};
      alt = 'New Game';
    }

    return (
      <img className="smiley" src={imgSrc} alt={alt} onClick={onClick} />
    );
  }
}

export default Smiley;
