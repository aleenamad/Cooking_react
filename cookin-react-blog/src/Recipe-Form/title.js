import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Title extends Component {
  constructor(props){
  super(props);
  this.titleContent = props.titleContent;
  this.titleId = props.titleId;
}

    render(props){
      return(
        <div className="title fade-in">
          <p className="titleContent">{ this.titleContent }</p>


        </div>


        )
    }
}

Title.propTypes = {
  titleContent: PropTypes.string
}

export default Title;
