import React, { Component } from 'react';
import './Ingredients.css';


class Ingredients extends Component{


  constructor(props){
    super(props);
    this.state = {
      newIngredientsContent: '',
      newRecipeTitle:'',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeIngredients = this.writeIngredients.bind(this);
    this.handleTitleInput = this.handleTitleInput.bind(this);
  }
handleUserInput(e){
  this.setState({
    newIngredientsContent: e.target.value //vlaue of text input

  })
}

handleTitleInput(e){
  this.setState({
    newRecipeTitle: e.target.value
  })
}
writeIngredients(){
  //call a method that sets the recipeContent
  this.props.addIngredients(this.state.newIngredientsContent);
  this.props.addTitle(this.state.newRecipeTitle);


  // set newIngredientsContent back to empty after enter
  this.setState({
    newRecipeTitle:'',
    newIngredientsContent: ''
  })

}

    render(){
      return(
        <div className="container">
        <div className="formWrapper">
          <form>
          <label>Title of Recipe:</label>
        <br/>
          <input className='recipeTitle' placeholder='Title of Recipe...' value={ this.state.newRecipeTitle } onChange= { this.handleTitleInput }/>
        <br/>
        <br/>
          <label>Ingredients (Separate By Comma):</label>
          <br/>
          <input className="ingredientInput" placeholder="Write ingredients here..."
            value={ this.state.newIngredientsContent }
            onChange= { this.handleUserInput }/>

          <button className="ingredientsButton" onClick={ this.writeIngredients } class="btn btn-success">Add Recipe!</button>
</form>


        </div>
</div>
      )
    }

}

export default Ingredients;
