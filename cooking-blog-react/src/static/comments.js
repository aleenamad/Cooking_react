import React, { Component } from 'react';
import 'firebase/database';
import firebase from 'firebase/app';
import {Modal} from 'react-bootstrap';
import './comments.css';
import ToggleDisplay from 'react-toggle-display';


class Comment extends Component {
  constructor(){
    super();

    this.state ={
      // showModals: false,
      comments: '',
      things: [],
      show: false
    }


    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.removeComment = this.removeComment.bind(this);


  }



  handleTypeChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // handleDo(e) {
  //   e.preventDefault();
  //   const commentsRef = firebase.database().ref('comments');
  //   const wall = {
  //     comments: this.state.comments
  //   }
  //   commentsRef.push(wall);
  //   this.setState({
  //     comments: ''
  //   })
  // }
handleClick() {
  this.setState({
    show: !this.state.show
  });
}



  removeComment(wallId) {
    const commentsRef = firebase.database().ref(`/comments/${wallId}`);
    commentsRef.remove();
  }




  componentDidMount() {
    const commentsRef = firebase.database().ref('comments');
    commentsRef.on('value', (snapshot) => {
      let things = snapshot.val();
      let newState = [];
      for (let wall in things) {
        newState.push({
          id: wall,
          comments: things[wall].comments
        });
      }
      this.setState({
        things: newState
      });
    });
  }

render(){
return (


  <div className="comments-show">
    <button type="button" onClick={ ()=>
  this.handleClick()} className="btn btn-success btn-lg">Comments!</button>

  <ul>


              {this.state.things.map((wall) => {

              return (

                <div>

                <div key={wall.id}>


          <ToggleDisplay show={this.state.show}>
            <div className="containerComment">
              
              <li className="specificComment">{wall.comments}</li>
              <button onClick={() => this.removeComment(wall.id)} className="remove btn-sm btn-danger">(X)</button>

</div>
              </ToggleDisplay>


</div>
          </div>
          )
            })}
          </ul>

</div>









);

}

}




export default Comment;
