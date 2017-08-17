import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import Game from './Game';

const MAX_STEPS = 20;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCount: 4,
      steps: 0,
      switches: [ false, false ],
      start: false,
      strict: false,
      sequence: []
    };
  }

  handleSwitch = i => e => {
    if (!this.state.start) {
      this.setState({
        switches: [
          ...this.state.switches.slice(0, i),
          e.target.checked,
          ...this.state.switches.slice(i+1)
        ]
      }, () => this.setState({ 
        buttonCount: 4 + 4 * boolToBinary(this.state.switches) 
      }));
    }
  }
  handleStart = () => {
    this.setState(prevState => ({
      start: prevState.start ? false : true
    }));
  }
  handleStrict = () => {
    if (!this.state.start) {
      this.setState(prevState => ({
        strict: prevState.strict ? false : true
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <Menu 
          steps={this.state.steps}
          handleSwitch={this.handleSwitch}
          switches={this.state.switches}
          start={this.state.start}
          strict={this.state.strict}
          handleStart={this.handleStart}
          handleStrict={this.handleStrict}
        />
        <Game 
          buttonCount={this.state.buttonCount}
        />
      </div>
    );
  }
}

export default App;

const boolToBinary = arr => parseInt(arr.map(e => e === true ? 1 : 0).join(''), 2)
