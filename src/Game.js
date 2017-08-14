import React from 'react';
import './Game.css';

const Game = props => (
  <ul className="flex-container">
    {Array(props.buttonCount).fill('').map((e, i) => 
      <Button 
        count={props.buttonCount} 
        hue={(360 / props.buttonCount) * i} 
        key={i} 
      />
    )}
  </ul>
);

export default Game;

const Button = ({ count, hue }) => (
  <li 
    className="flex-button"
    style={buttonStyle(count, hue)}
  />
);

const buttonStyle = (c, hue) => {
  let d = c / 4 < 3 ? 2 : c / 4;
  return {
    width: `calc(100% / (${c} / ${d}) )`,
    height: `calc(100% / ${d})`,
    backgroundColor: `hsl(${hue}, 60%, 50%)`
  };
}
