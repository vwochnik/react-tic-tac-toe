import React, { Component } from 'react';
import Board from './Board';
import History from './History';

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: null
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1),
          current = history[history.length - 1],
          squares = current.squares.slice();

    if ((calculateWinner(squares) !== null) || (squares[i] !== null)) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    current.move = {
      row: Math.floor(i / 3),
      col: i % 3
    };

    this.setState({
      history: history.concat([{ squares, move: null }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history,
          current = history[this.state.stepNumber],
          winner = calculateWinner(current.squares);
    let status;

    if (winner !== null) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <History
            history={history}
            currentStep={this.state.stepNumber}
            onGoto={(step) => this.jumpTo(step)}
          />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
