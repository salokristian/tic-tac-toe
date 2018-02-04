import React, { Component } from "react";
import "./App.css";

class Cell extends Component {
  render() {
    return (
      <button className="Cell" onClick={this.props.onClick}>
        {this.props.mark}
      </button>      
    );
  }
}

class Grid extends Component {
  renderCell(i) {
    return (<Cell mark={this.props.marks[i]} onClick={() => this.props.onClick(i)} />);
  }

  render() {
    return (
      <div className="Grid">
        <div className="CellRow">
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
        </div>
        <div className="CellRow">
          {this.renderCell(3)}
          {this.renderCell(4)}
          {this.renderCell(5)}
        </div>
        <div className="CellRow">
          {this.renderCell(6)}
          {this.renderCell(7)}
          {this.renderCell(8)}
        </div>
      </div>
    );
  }
}

class NameForm extends Component {

  render() {
    return (
      <div>
        <label>
          Player {this.props.playerNo}'s name: 
          <input type="text" value={this.props.name} onChange={(event) => this.props.onChange(event)}/>
          <input type="button" value="Add" onClick={() => this.props.action()} />
        </label>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: new Array(9).fill(null),
      xTurn: true,
      initialized: false,
      name: "",
      names: {x: null, o: null},
      currentInputID: 1
    };
  }

  handleClick(i) {
    if (this.calculateWinner(this.state.marks)) {
      return;
    }
    const marks = this.state.marks.slice();
    if (marks[i] === null) {
      marks[i] = this.state.xTurn ? "X" : "O";
    }
    this.setState(prevState => ({
      marks: marks,
      xTurn: !prevState.xTurn
    }));
  }

  calculateWinner(marks) { //function taken from react tutorials
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
        return marks[a];
      }
    }
    return null;
  }

  parseForm() {
    var newNames;
    if (this.state.currentInputID === 1) {
      newNames = {
        names: {x: this.state.name},
        currentInputID: this.state.currentInputID + 1,
        name: ""
      };
    } else if (this.state.currentInputID === 2) {
      newNames = {
        names: {x: this.state.names.x, y: this.state.name},
        name: undefined,
        currentInputID: undefined,
        initialized: true
      };
    }
    this.setState(newNames);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    const winner = this.calculateWinner(this.state.marks);
    let status;
    if (winner) {
      status = "The winner is: " + (winner === "X" ? this.state.names.x: this.state.names.y)  + "!!";
    } else if (this.state.initialized) {
      status = "It is " + (this.state.xTurn ? this.state.names.x: this.state.names.y) + "'s turn.";
    } else {
      status = <NameForm action={() => this.parseForm()} playerNo={this.state.currentInputID} name={this.state.name} onChange={(event) => this.handleNameChange(event)}/>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tic-tac-toe</h1>
        </header>
        <Grid marks={this.state.marks} onClick={(i) => this.handleClick(i)}/>
        <div className="App-infotext">{status}</div>
      </div>
    );
  }
}

export default App;
