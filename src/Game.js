import React, { Component } from 'react';
import './Game.css';
import { PUSH_TIME } from './static';
import { playSound } from './actions';

class Game extends Component {
  componentWillReceiveProps(nextProps) {
    let active = nextProps.activeButton;
    if (active === 'all') {
      playSound('square', 200, PUSH_TIME);
    } else if (active !== null) {
      let freq = 200 + (100 * active);
      playSound('triangle', freq, PUSH_TIME);
    }
  }

  render() { 
    return (
      <ul className="flex-container">
        {Array(this.props.buttonCount).fill('').map((e, i) => (
          <Button 
            active={this.props.activeButton === i ||
                this.props.activeButton === 'all'}
            count={this.props.buttonCount} 
            hue={(360 / this.props.buttonCount) * i} 
            onClick={this.props.handleButton(i)}
            key={i} 
          />
        ))}
      </ul>
    );
  }
}

export default Game;

const Button = ({ active, count, hue, onClick }) => (
  <li 
    style={buttonStyle(active, count, hue)}
    onClick={onClick}
  />
);

const buttonStyle = (active, c, hue) => {
  let d = c / 4 < 3 ? 2 : c / 4;
  let bg = active ? 
    `hsl(${hue}, 90%, 65%)`: 
    `hsl(${hue}, 60%, 45%)`;
  return {
    width: `calc(100% / (${c} / ${d}) )`,
    height: `calc(100% / ${d})`,
    backgroundColor: bg
  };
}
