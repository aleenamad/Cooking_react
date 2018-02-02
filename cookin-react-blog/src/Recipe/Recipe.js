import React, { Component } from 'react';
import './Recipe.css';
import PropTypes from 'prop-types';


class Recipe extends Component{


  constructor(props){
    super(props);
    this.recipeContent = props.recipeContent;
    this.recipeId = props.recipeId;

  }
    render(props){
      return(
        <div className= "recipe fade-in">
          <p className= "recipeContent">{ this.recipeContent }</p>
        </div>
      )
    }

}


Recipe.propTypes = {
  recipeContent: PropTypes.string

}


export default Recipe;
