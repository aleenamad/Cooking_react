import React, { Component } from 'react';
import './update.css';
import Header from './header';
import firebase from 'firebase/app';
import 'firebase/database';
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap'

class UpdateableItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      recipe: props.recipe,
      ingredients: props.ingredients,
      directions: props.directions,
    };
    this.cookinRef = firebase.database().ref().child('recipes');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  itemChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdateItem(e) {
    e.preventDefault();
    if (this.state.recipe && this.state.recipe.trim().length !== 0) {
      this.cookinRef.child(this.props.dbkey).update(this.state);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const cookinRef = firebase.database().ref('recipes');
    const cookin = {
      title: this.state.recipe,
      ingredients: this.state.ingredients,
      directions: this.state.directions
    }
    cookinRef.push(cookin);
    this.setState({
      recipe: '',
      ingredients: '',
      directions: ''
    });
  }
  render(){
    return (
      <div className="deleteBut">
        <div className="modal-container">
          <button type="button" className="btn btn-success btn-lg" onClick={ ()=> this.handleShow(cookin)}>Edit!</button>

          <Modal show={this.state.showModal} onHide={this.handleClose}>

            <Modal.Header>
              <Modal.Title>Edit Recipe</Modal.Title>
            </Modal.Header>

              <Modal.Body>
                <form onSubmit={this.handleUpdateItem}>
                <label className="label2" htmlFor={this.props.dbkey + 'recipename'}>Title:</label>
                <br/>

                <input type='text' class="input-group input-group-lg" name='recipe' id={this.props.dbkey + 'recipename'} onChange={this.itemChange} placeholder={this.state.openModelTitle}
                value={this.state.recipe}
                />
              <br/>
              <br/>
                <label className="label2" htmlFor={this.props.dbkey + 'recipeingredients'}>Ingredients:</label>

                <textarea className="editthis" type='text' name='ingredients' id={this.props.dbkey + 'recipeingredients'}  onChange={this.itemChange} placeholder={this.state.openModelIngredients} value={this.state.ingredients}/>

                <label className="label2" htmlFor={this.props.dbkey + 'recipedirections'}>Directions:</label>

                  <textarea className="editthis" type='text' name='directions' id={this.props.dbkey + 'recipedirections'} onChange={this.itemChange} placeholder={this.state.openModelDirections} value={this.state.directions}/>

                </form>

              </Modal.Body>
              <Modal.Footer>
                <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal"onClick={this.handleClose}>Close</button>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.updateThings(cookin.id)}>Save changes</button>

                </Modal.Footer>

            </Modal>
            </div>
          </div>
    );
  }
}
