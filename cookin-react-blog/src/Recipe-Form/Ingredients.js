import React, { Component } from 'react';
import './Ingredients.css';


class Ingredients extends Component{


  constructor(props){
    super(props);
    this.state = {
      newIngredientsContent: '',
    };

  }
    render(){
      return(
        <div className="formWrapper">

          <input className="ingredientInput" placeholder="Write ingredients here..." value={ this.state.newIngredientsContent } />
          <button className="ingredientsButton">Add Ingredients</button>



        </div>

      )
    }

}

export default Ingredients;
