
// import MainTitle from './TitleMain'; unused var
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './title.css';



class Title extends Component {
  constructor(props){
  super(props);
  this.titleContent = props.titleContent;
  this.titleId = props.titleId;
  this.handleRemoveTitle = this.handleRemoveTitle.bind(this);

}

handleRemoveTitle(id){
  this.props.removeTitle(id);
  console.log('Title has been removed');
}


    render(){
      return(
        <div className="title">
          <span className="closebutton"
            onClick={() => this.handleRemoveTitle(this.titleId)}>
            X
          </span>
          {/* <h1 className="titleContent">{ this.titleContent }</h1> */}

        </div>


        )
    }
}

Title.propTypes = {
  titleContent: PropTypes.string
}

export default Title;
