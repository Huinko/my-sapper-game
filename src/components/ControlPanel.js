import React from 'react';
import smiley from '../img/finy-smile.PNG';
import coolSmile from '../img/coolSmile.PNG';
import deadSmile from '../img/deadSmile.PNG';
class ControlPanel extends React.Component {
  render() {
    const { flagCnt, seconds, isGameWon, resetGame } = this.props;
    let smileyImg = null;
    if (isGameWon === null) {
      smileyImg = smiley; 
    } else if (isGameWon) {
      smileyImg = coolSmile; 
    } else {
      smileyImg = deadSmile;
    }

    return (
      <div className='Control' style={{color:'white'}}>
        <div className='flags'>{flagCnt}</div>
        <div className='Smiley' onClick={resetGame}>
          <img src={smileyImg} alt='smiley' />
        </div>
        <div className='time'>{seconds}</div>
      </div>
    );
  }
}

export default ControlPanel;


