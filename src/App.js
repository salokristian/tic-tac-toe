import React, { Component } from "react";
import "./App.css";

class Cell extends Component {
  render() {
    return (
      <button className="Cell" onClick={() => this.props.onClick()}>
        {this.props.mark}
      </button>      
    );
  }
}

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {marks: new Array(9).fill(null)};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    let marks = this.state.marks.slice();
    marks[i] = (marks[i] === "X" ? "O" : "X");
    this.setState({marks : marks});
  }

  renderCell(i) {
    return (<Cell mark={this.state.marks[i]} onClick={() => this.handleClick(i)} />);
  }

  render() {
    return (
      <div>
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {turn : "x"};
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tic-tac-toe</h1>
        </header>
        <Grid />
      </div>
    );
  }
}

export default App;
