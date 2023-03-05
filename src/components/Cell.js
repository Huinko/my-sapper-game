import React from 'react';

import flag from '../img/flag.PNG';
import bomb from '../img/bomb.PNG';
import question from '../img/question.PNG'


class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagState: 'none' // 'none', 'flag', 'question'
    }
  }

  leftClickHandler = () => {
    this.props.clickLeft(this.props.row, this.props.col);
  }

  rightClickHandler = (e) => {
    e.preventDefault();
    let newFlagState;
    switch (this.state.flagState) {
      case 'none':
        newFlagState = 'flag';
        break;
      case 'flag':
        newFlagState = 'question';
        break;
      case 'question':
        newFlagState = 'none';
        break;
      default:
        newFlagState = 'none';
    }
    this.setState({
      flagState: newFlagState
    }, () => {
      this.props.clickRight(this.props.row, this.props.col, newFlagState);
    });
  }

  render () {
    const cellSize = 40; //px
    var width = cellSize + 'px';
    var height = cellSize + 'px';
    var left = this.props.col * (cellSize + 4) + 'px';
    var top = this.props.row * (cellSize + 4) + 'px';
    let backgroundColor = this.props.opened ? '#474747' : '#adadad';

    var rendstate = () => {
      switch (this.state.flagState) {
        case 'flag':
          return <img className='flag' src={flag} alt=''/>;
        case 'question':
            return <img className='question' src={question} alt=''/>;
        default:
          if (this.props.opened) {
            return this.props.hasBomb ? <img className='bomb' src={bomb} alt=''/> : (this.props.bombNbr > 0 ? this.props.bombNbr : '');
          } else {
            return '';
          }
      }
    }

    return (
      <div className='Cell'
        style={{width, height, left, top, backgroundColor}}
        onClick={this.leftClickHandler}
        onContextMenu={this.rightClickHandler}
      >
        {rendstate()}
      </div>
    );
  }
}

export default Cell;
