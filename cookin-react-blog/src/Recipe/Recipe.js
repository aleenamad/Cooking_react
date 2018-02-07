// import Title from '../Recipe-Form/title';
// import Main from '../Recipe-Form/Main'; unused var
// import TitleMain from '../Recipe-Form/TitleMain';
import React, { Component } from 'react';
import './Recipe.css';
import PropTypes from 'prop-types';



class Recipe extends Component{
  constructor(props){
    super(props);

    // this.titleContent = props.titleContent;
    this.recipeContent = props.recipeContent;
    this.recipeId = props.recipeId;
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);


    console.log(props.recipeContent);
    console.log(props.titleContent);



  }


//recipe
  handleRemoveIngredient(id){
    this.props.removeIngredients(id);
    console.log('Ingredients have been removed');
  }


    render(props){
      return(
        <div className= "recipe">
          <div className= "container">

          <span className="closebtn"
            onClick={() =>  this.handleRemoveIngredient(this.recipeId)}>
            X
          </span>
          <h1 className="titleContent">{ this.titleContent }</h1>
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
