import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

var _ = require('lodash');

var Row = require("./row.jsx");

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [
        {id: "1"},
        {id: "2"}, 
        {id: "3"}
      ]
    }

  }

  moveRow = (id, afterId) => {
    var rows = _.clone(this.state.rows);

    var currentRow = _.filter(rows, function (r) { return r.id === id;})[0];
    var afterRow = _.filter(rows, function (r) { return r.id === afterId;})[0];

    var currentRowIndex = rows.indexOf(currentRow);
    var afterRowIndex = rows.indexOf(afterRow);

    // remove the current row
    rows.splice(currentRowIndex, 1);
    // put it after
    rows.splice(afterRowIndex, 0, currentRow);

    this.setState({rows: rows});
  }

  render() {

    const rows = this.state.rows.map(function (r) {
      return <Row key={r.id} id={r.id} moveRow={this.moveRow} />;
    });

    return (
      <div className="App">
        <div>TEST</div>

        <table style={{width: "200px", height: "100px"}}>
          <tbody>
            {rows}
          </tbody>
        </table>
{/* 
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>TEST</div>

        </header> */}
      </div>
    );
  }
}

export default App;
