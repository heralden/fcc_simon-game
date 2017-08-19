import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import Game from './Game';
import { randomButton, boolToBinary } from './actions';

const MAX_STEPS = 20;
const PUSH_TIME = 1000;
const IDLE_TIME = 200;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCount: 4,
      activeButton: null,
      steps: 0,
      switches: [ false, false ],
      start: false,
      strict: false,
      sequence: [],
      input: false,
      inputStep: 0
    };
  }

  resumeGame = () => {
    if (this.state.steps < MAX_STEPS) {
      this.setState(prevState => ({
        sequence: prevState.sequence.concat(
          randomButton(prevState.buttonCount)
        ),
        steps: prevState.steps + 1
      }), this.playSequence);
    } else {
      this.gameWon();
    }
  }

  playSequence = () => {
    this.sequencer(
      this.state.sequence,
      PUSH_TIME + IDLE_TIME,
      PUSH_TIME,
      () => {
        this.setState({
          activeButton: null,
          input: true
        });
      }
    );
  }

  checkInput = btn => {
    if (this.state.sequence[this.state.inputStep-1] === btn) {
      if (this.state.inputStep === this.state.sequence.length)
        this.setState({
          inputStep: 0
        }, this.resumeGame);
      else {
        this.setState({
          input: true
        });
      }
    } else {
      if (this.state.strict) {
        this.gameLost(this.resetGame);
      } else {
        this.gameLost(() => {
          this.setState({
            activeButton: null,
            input: false,
            inputStep: 0
          }, this.playSequence);
        });
      }
    }
  }

  resetGame = () => {
    clearInterval(this.seqInterval);
    clearInterval(this.pushInterval);
    clearTimeout(this.idleTimeout);
    clearTimeout(this.lossAnimation);
    this.setState({
      activeButton: null,
      steps: 0,
      sequence: [],
      input: false,
      inputStep: 0,
      start: false
    });
  }

  gameWon = () => {
    this.sequencer(
      Array(48).fill('').map((e, i) => i % this.state.buttonCount),
      150,
      100,
      this.resetGame
    );
  }

  gameLost = cb => {
    this.lossAnimation = setTimeout(
      () => this.buttonPush('all', PUSH_TIME, cb),
      PUSH_TIME + IDLE_TIME
    );
  }

  sequencer = (array, interval, pushTime, cb) => {
    let gen = (function* (arr) {
      for (let item of arr)
        yield item;
    })(array);

    this.seqInterval = setInterval(() => {
      let item = gen.next();
      if (item.done) {
        clearInterval(this.seqInterval);
        cb();
      } else {
        this.buttonPush(item.value, pushTime);
      }
    }, interval);
  }

  buttonPush = (btn, pushTime, cb) => {
    this.setState({ activeButton: btn }, () => {
      this.idleTimeout = setTimeout(() => {
        this.setState(
          { activeButton: null }, 
          () => { if (cb) cb(); }
        );
      }, pushTime);
    });
  }

  handleButton = buttonIndex => () => {
    if (this.state.input) {
      this.setState(prevState => ({
        activeButton: buttonIndex,
        inputStep: prevState.inputStep + 1,
        input: false
      }), () => {
        this.pushInterval = setTimeout(
          () => {
            this.setState({
              activeButton: null
            }, this.checkInput(buttonIndex));
          },
          PUSH_TIME
        );
      });
    }
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
    }), () => {
      if (this.state.start)
        this.resumeGame();
      else
        this.resetGame();
    });
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
          activeButton={this.state.activeButton}
          handleButton={this.handleButton}
        />
      </div>
    );
  }
}

export default App;
