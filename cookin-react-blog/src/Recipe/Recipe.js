import React, { Component } from 'react';
import './Recipe.css';
import PropTypes from 'prop-types';


class Recipe extends Component{


  constructor(props){
    super(props);
    this.recipeContent = props.recipeContent;

    this.recipeId = props.recipeId;
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);

  }

  handleRemoveIngredient(id){
    this.props.removeIngredients(id);
  }



    render(){
      return(
        <div className= "recipe fade-In">
          <div className= "container">
          <span className="closebtn"
            onClick={() => this.handleRemoveIngredient(this.recipeId)}>
            X
          </span>
          <p className= "recipeContent">{ this.recipeContent }</p>
        </div>
        </div>
      )
    }

}


Recipe.propTypes = {
  recipeContent: PropTypes.string,

}


export default Recipe;
