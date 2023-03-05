import React from 'react';
import ControlPanel from './ControlPanel';
import MineField from './MineField';

class Game extends React.Component {
  state = {
    flagCnt: 0,
    seconds: 0,
    isGameWon: null, // добавляем состояние игры
  };

  resetGame = () => {
    this.mineField.resetGame();
  };
  start = () => {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  stop = () => {
    clearInterval(this.timerID)
  }

  tick() {
    const oldsec = this.state.seconds;
    this.setState({seconds: oldsec + 1});
  }

  startGame = () => {
    this.start();
  }


  stopGame = (isGameWon) => {
    if (isGameWon) {
      this.setState({ isGameWon: true });
      alert("You win");
    } else {
      this.setState({ isGameWon: false });
      alert("You lose");
    }
    this.stop();
  }

  setFlag = (val) => {
    let oldflagCnt = this.state.flagCnt;
    oldflagCnt += val;
    this.setState({flagCnt: oldflagCnt});
  }

render () {
    return (
      <div className='Game'>
        <ControlPanel 
          flagCnt={this.state.flagCnt} 
          seconds={this.state.seconds}
          isGameWon={this.state.isGameWon} // передаем состояние игры
          resetGame={this.resetGame} 
        />
        <MineField
          rows='16'
          cols='16'
          mines='20'
          gameStarted={this.startGame}
          gameOver={this.stopGame}
          changeFlagCount={this.setFlag}
          ref={(mf) => (this.mineField = mf)}
        />
      </div>
    );
  }
}
export default Game;





