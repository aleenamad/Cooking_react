import React, { Component } from 'react';
import './Ingredients.css';


class Ingredients extends Component{


  constructor(props){
    super(props);
    this.state = {
      newIngredientsContent: '',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeIngredients = this.writeIngredients.bind(this);

  }
handleUserInput(e){
  this.setState({
    newIngredientsContent: e.target.value //vlaue of text input
  })
}
writeIngredients(){
  //call a method that sets the recipeContent
  this.props.addIngredients(this.state.newIngredientsContent)


  // set newIngredientsContent back to empty after enter
  this.setState({
    newRecipeTite:'',
    newIngredientsContent: ''
  })

}

    render(){
      return(
        <div className="container">
        <div className="formWrapper">
          <input className='recipeTitle' placeholder='Title of Recipe...' value={ this.state.newRecipeTite } onChange= {this.handleUserInput}/>
          <input className="ingredientInput" placeholder="Write ingredients here (separate by comma)"
            value={ this.state.newIngredientsContent }
            onChange= { this.handleUserInput }/>

          <button className="ingredientsButton" onClick={ this.writeIngredients }>Add Ingredients</button>



        </div>
</div>
      )
    }

}

export default Ingredients;
