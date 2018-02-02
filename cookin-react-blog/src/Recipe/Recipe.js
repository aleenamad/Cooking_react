import React, { Component } from 'react';
import './Recipe.css';
import PropTypes from 'prop-types';


class Recipe extends Component{


  constructor(props){
    super(props);
    this.message = "Yo what up from recipe component"
  }
    render(props){
      return(
        <div>
          <h1>{this.message}</h1>
        </div>
      )
    }




}

export default Recipe;
