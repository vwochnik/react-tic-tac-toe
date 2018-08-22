import React, { Component } from 'react';
import './History.css';

export default class History extends Component {
  handleGoto(step) {
    this.props.onGoto(step);
  }

  render() {
    const moves = this.props.history.map((step, move) => {
      let row, col;

      if (step.move !== null) {
        row = step.move.row;
        col = step.move.col;
      }

      const player = (move % 2 === 0) ? 'X' : 'O';
      const isBold = (move === this.props.currentStep);

      return (
        <tr key={move} className={(isBold)?"bold":""}>
          <td>{move}</td>
          <td>{player}</td>
          <td>{row}</td>
          <td>{col}</td>
          <td>
            <button onClick={() => this.handleGoto(move)}>Go to</button>
          </td>
        </tr>
      );
    });

    return (
      <table className="History">
        <thead>
          <tr>
            <th>Step</th>
            <th>Player</th>
            <th>Row</th>
            <th>Column</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{moves}</tbody>
      </table>
    );
  }
}
