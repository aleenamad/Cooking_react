import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe/Recipe';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cooking Blog</h1>
        </header>
        <p className="App-intro">
          <h1>Recipes:</h1>
          <Recipe />

        </p>
      </div>
    );
  }
}

export default App;
