import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe/Recipe';


class App extends Component {


  constructor(props){
    super(props);
// setup react state of our Component
    this.state={
      recipe: [
        { id: 1, recipeContent: "Fettucine Alfredo"},
        { id: 2, recipeContent: "Grilled Chicken"},

      ],
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cooking Blog</h1>
        </header>
        <p className="App-intro">
          <h1>Recipes:</h1>
          {
            this.state.recipe.map((recipe) => {
              return(
              <Recipe recipeContent={ recipe.recipeContent } recipeId={ recipe.recipeId } key={ recipe.id }/>
                )
            })
          }

        </p>
      </div>
    );
  }
}

export default App;
