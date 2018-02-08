import React, { Component } from 'react';
import './Ingredients.css';
import { fire_config } from '../config/fire';
import firebase from 'firebase/app';
import 'firebase/database';
import Header from '../Static/header';
import MyRoutes from '../config/routes';

class Ingredients extends Component{


  constructor(){
    super();
    this.state = {
      newIngredientsContent: '',
      newRecipeTitle:'',
      recipes: []
    };
    this.app = firebase.initializeApp(fire_config);
    this.database = this.app.database().ref().child('recipes')
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
handleChange(e){
  this.setState({
    [e.target.name]: e.target.value //vlaue of text input

  });
}



handleSubmit(e){
  e.preventDefault();
  const cookinRef = firebase.database().ref('recipes');
  const cookin = {
    newRecipeTitle: this.state.newRecipeTitle,
    newIngredientsContent: this.state.newIngredientsContent
  }
  cookinRef.push(cookin);
  this.setState({
    newRecipeTitle:'',
    newIngredientsContent:''

  });
}
compnentDidMount(){
  const cookinRef = firebase.database().ref('recipes');
  cookinRef.on('value', (snapshot) => {
    let recipes = snapshot.val();
    let newState = [];
    for (let cookin in recipes){
      newState.push({
        id: cookin,
        newRecipeTitle: recipes[cookin].newRecipeTitle,
        newIngredientsContent: recipes[cookin].newIngredientsContent
      });
    }
    this.setState({
      recipes: newState
    });
  });
}


    render(){
      return(
        <div className="container">
<h1>Create Your Recipes Below:</h1>
            <ul>
              {this.state.recipes.map((cookin) => {
                return(
                  <div className="parts">
                  <li key={cookin.id}>
                  <h3>Title: {cookin.newRecipeTitle}</h3>
                  <p>Ingredeints:
                    {cookin.newIngredientsContent}</p>
                  </li>
                  </div>
                )
              })}
            </ul>




          <form onSubmit={this.handleSubmit}>
          <label>Title of Recipe:</label>
        <br/>
          <input name="newRecipeTitle" type="text" placeholder='Title of Recipe...' value={ this.state.newRecipeTitle } onChange= { this.handleChange}/>
        <br/>
        <br/>
          <label>Ingredients (Separate By Comma):</label>
          <br/>
          <textarea type="text" name="newIngredientsContent" placeholder="Write ingredients here..."
            value={ this.state.newIngredientsContent }
            onChange= { this.handleChange }/>
<br/>
          <button className="btn btn-success">Add Recipe!</button>
</form>




</div>
      )
    }

}

export default Ingredients;
