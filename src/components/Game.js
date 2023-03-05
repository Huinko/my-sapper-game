import React from 'react';
import ControlPanel from './ControlPanel';
import MineField from './MineField';

class Game extends React.Component {
  state = {
    flagCnt: 0,
    seconds: 0,
    isGameWon: null, 
  };

  resetGame = () => {
    this.mineField.resetGame();
    this.setState({ 
      isGameWon: null,
      seconds: 0, 
      flagCnt: 0,
      cellRightClicked: 'waiting'
    });
    
  };

  showMines = () => {
    let newField = [...this.state.field];
    newField.forEach(row => {
      row.forEach(cell => {
        if (cell.hasBomb) {
          cell.opened = true;
        }
      });
    });
    this.setState({field: newField});
  }
  showAllBombs = () => {
    let newField = [...this.state.field];
    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {
        if (newField[row][col].hasBomb) {
          newField[row][col].opened = true;
        }
      }
    }
    this.setState({field: newField});
  }

 openCell = (field, row, col) => {
    if (!field[row][col].opened && !field[row][col].checked) {
      if (field[row][col].hasBomb) {
        this.setState({gameState: 'finished'});
        field[row][col].opened = true;
        this.props.gameOver(false);
        return;
      } 
      field[row][col].opened = true;
      this.closedCells -= 1;
      if (this.closedCells === 0) {
        this.props.gameOver(true);
        this.setState({gameState: 'finished'});
      }
    }
    if (field[row][col].bombNbr === 0 && field[row][col].nbrs.length > 0 && !field[row][col].hasBomb) {
      while(field[row][col].nbrs.length > 0) {
        let rf = field[row][col].nbrs.shift();
        this.openCell(field, rf[0], rf[1]);
      }
    }
  }
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
    } else {
      this.setState({ isGameWon: false });
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
          isGameWon={this.state.isGameWon} 
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





