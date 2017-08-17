import React from 'react';
import './Menu.css';

const Menu = props => (
  <div className="Menu">
    <Button name="start" 
      value={props.start} 
      onClick={props.handleStart} />
    <Display value={props.steps} />
    <SwitchGroup amount={2}
      onChange={props.handleSwitch} 
      switches={props.switches} />
    <Button name="strict" 
      value={props.strict} 
      onClick={props.handleStrict} />
  </div>
);

export default Menu;

const Display = ({ value }) => (
  <div className="Display">
    <span className="Display-value">{value < 10 && '0' + value}</span>
  </div>
);

const Button = ({ name, value, onClick }) => (
  <button className={value ? "Button active" : "Button"}
    onClick={onClick}>
    {name}
  </button>
);

const SwitchGroup = ({ amount, onChange, switches }) => (
  <div className="SwitchGroup">
    {Array(2).fill('').map((e, i) => (
      <Switch index={i} onChange={onChange} 
        value={switches[i]} key={i} />
    ))}
  </div>
);

const Switch = ({ index, onChange, value }) => (
  <label className="switch">
    <input type="checkbox" 
      checked={value} onChange={onChange(index)} />
    <span className="slider"></span>
  </label>
);
