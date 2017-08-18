import React from 'react';
import './Game.css';

const Game = props => (
  <ul className="flex-container">
    {Array(props.buttonCount).fill('').map((e, i) => 
      <Button 
        active={props.activeButton === i ||
          props.activeButton === 'all'}
        count={props.buttonCount} 
        hue={(360 / props.buttonCount) * i} 
        onClick={props.handleButton(i)}
        key={i} 
      />
    )}
  </ul>
);

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
