import React, { Component } from 'react';
import './App.css';
// import Recipe from './Recipe/Recipe';
// import Ingredients from './Recipe-Form/Ingredients';
import MyRoutes from './config/routes';
// import Home from './Static/home';
import Header from './Static/header';

class App extends Component {

  render() {
    return (

      <div className="App">

      <Header />

            { MyRoutes }
    </div>
    );
  }
}

export default App;
