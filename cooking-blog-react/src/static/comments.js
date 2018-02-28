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
      showModal: false,
      comments: '',
      things: [],
      show: false
    }


    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.handleIt = this.handleIt.bind(this);
    this.closeIt = this.closeIt.bind(this);

  }



  handleTypeChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDo(e) {
    e.preventDefault();
    const commentsRef = firebase.database().ref('comments');
    const wall = {
      comments: this.state.comments
    }
    commentsRef.push(wall);
    this.setState({
      comments: ''
    })
  }
handleClick() {
  this.setState({
    show: !this.state.show
  });
}



  removeComment(wallId) {
    const commentsRef = firebase.database().ref(`/comments/${wallId}`);
    commentsRef.remove();
  }

updateComment(wall) {
  const commentsRef = firebase.database().ref(`/comments/${wall.id}`);
  let updated = {
    comments: this.state.comments
  };
  commentsRef.update(updated);
  this.closeIt();
  this.setState({
    comments: ''
  })
}
handleIt(id) {
  this.setState({
    showModal: id,

  });
}

closeIt() {
  this.setState({ showModal: false });
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


              <button type="button" className="btn btn-success btn-sm" onClick={ ()=> this.handleIt(wall.id)}>Edit!</button>

              <Modal show={this.state.showModal === wall.id} onHide={this.closeIt}>
                <Modal.Header>
                  <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={this.handleDo}>

                    <textarea type="text" className="Comment-Box input-lg" name="comments" placeholder="Edit comment here..." onChange={this.handleTypeChange} value={this.state.comments} />
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => this.updateComment(wall)}>Update Comment!</button>

                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal" onClick={this.closeIt}>Close</button>
                </Modal.Footer>

              </Modal>

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
