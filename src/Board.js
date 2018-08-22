import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
  renderSquare(i) {
  }

  render() {
    const rows = [0, 1, 2].map((rowIndex) => {
      const columns = [0, 1, 2].map((columnIndex) => {
        const i = rowIndex * 3 + columnIndex;

        return (
          <Square
            onClick={() => this.props.onClick(i)}
            value={this.props.squares[i]}
          />
        );
      });

      return (
        <div className="board-row">{columns}</div>
      );
    });

    return (
      <div>{rows}</div>
    );
  }
}
