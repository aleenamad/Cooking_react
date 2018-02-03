import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe/Recipe';
import Ingredients from './Recipe-Form/Ingredients'


class App extends Component {


  constructor(props){
    super(props);
    this.addIngredients = this.addIngredients.bind(this);
// setup react state of our Component
    this.state={
      recipe: [
        { id: 1, recipeContent: "Fettucine Alfredo"},
        { id: 2, recipeContent: "Grilled Chicken"},

      ],
    }
  }

addIngredients(ingredients){
const previousIngredients = this.state.recipe; previousIngredients.push({ id: previousIngredients.length +1 , recipeContent: ingredients });
this.setState({
  ingredients: previousIngredients
})

}





  render() {
    return (

      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Welcome to The Cooking Blog</h1>

        </header>

        <div className="Navbar">

            <ul className="nav justify-content-center nav-fill bg-faded text-white">
              <li className="nav-item">
                <a className="nav-link active" href="#">Recipes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Create a Recipe</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About Me</a>
                </li>

                <form class="form-inline">
                  <input class="form-control mr-sm-2" type="search"   placeholder="Search" aria-label="Search"></input>
                  <button class="btn btn-outline-primary my-2 my-sm-0"  type="submit">Search</button>
                </form>


              </ul>
              </div>

      <div className= "App-intro">
          <h1>Recipes:</h1>
          {
            this.state.recipe.map((recipe) => {
              return(
              <Recipe recipeContent={ recipe.recipeContent } recipeId={ recipe.recipeId } key={ recipe.id }/>
                )
            })
          }
        </div>
<br/>
<br/>
<br/>
        <div className= "formIngredients">

          <Ingredients addIngredients={ this.addIngredients }/>

        </div>



    </div>
    );
  }
}

export default App;
