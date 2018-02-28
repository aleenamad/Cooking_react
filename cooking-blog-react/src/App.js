import React, { Component } from 'react';
import { config } from './config/fire';
import firebase from 'firebase/app';
// import firebase, { auth, provider } from './firebase.js';
import 'firebase/database';
import './App.css';
import Header from './static/header';
// import UpdateableItem from './static/update';
// import Modal from 'react-bootstrap-modal';

import {Modal} from 'react-bootstrap';
// import Button from 'react-bootstrap'


class App extends Component {
  constructor(){
    super();
    this.state = {
      showModal: false,
      recipe: '',
      ingredients: '',
      directions: '',

      items: [],





    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    // this.MoreDetails = this.MoreDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeThings = this.removeThings.bind(this);
    this.updateThings = this.updateThings.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);


  }


  handleClose() {
    this.setState({ showModal: false });
  }



  handleShow(cookin) {
    this.setState({
      showModal: true,
      openModelTitle: cookin.title,
      openModelIngredients: cookin.ingredients,
      openModelDirections: cookin.directions

    });
  }





handleChange(e){
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleUpdateChange(a){
  this.setState({
    [a.target.name]: a.target.value
  })
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

moreDetails(){

    window.location.assign('/recipes');
}


componentDidMount() {

  const cookinRef = firebase.database().ref('recipes');
  cookinRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let cookin in items) {
      newState.push({
        id: cookin,
        title: items[cookin].title,
        ingredients: items[cookin].ingredients,
        directions: items[cookin].directions
      });
    }
    this.setState({
      items: newState
    });
  });
}


componentWillUnmount() {
   this.cookinRef.off();
 }

removeThings(cookinId) {
  const cookinRef = firebase.database().ref(`/recipes/${cookinId}`);
  cookinRef.remove();
}


updateThings(cookinId, items) {
    const cookinRef = firebase.database().ref(`/recipes/${cookinId}`);
    cookinRef.update().child(items)
  }


  render() {
    return (
      <div className="App">
        <header>
          <Header />

        </header>


        <div className="container">

          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
            <br/>
              <h1 className="what">Create Your Recipe Here:</h1>
              <label>Title:</label>


              <input type='text' className="input-lg" name='recipe' id="title" onChange={this.handleChange} value={this.state.recipe}/>
            <br/>
            <br/>
              <label>Ingredients:</label>


              <textarea type='text' className="input-lg" name='ingredients' id='ingredients' placeholder='Separate by commas' onChange={this.handleChange || this.separateComma}  value={this.state.ingredients}/>


              <label>Directions:</label>

                <textarea type='text' className="input-lg" name='directions' placeholder='Directions...' onChange={this.handleChange} value={this.state.directions}/>

                <br/>

              <button className="btn btn-success btn-lg">Add Recipe!</button>
            </form>
              </section>
              <hr/>
              <br/>
              <section className='display-recipes'>
                <div className='wrapper'>
                  <ul>
                    {this.state.items.map((cookin) => {
                      return(
                        <div className="bo">
                          <h1 key={cookin.id}></h1>

                          <h1 className="wassup">{cookin.title}</h1>



<div className="deleteBut">
  <div className="modal-container">
    <button type="button" className="btn btn-success btn-lg" onClick={ ()=> this.handleShow(cookin)}>Edit!</button>

    <Modal show={this.state.showModal} onHide={this.handleClose}>

      <Modal.Header>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>

        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
          <label className="label2">Title:</label>
          <br/>

          <input type='text' class="input-group input-group-lg" name='recipe' onChange={this.handleUpdateChange} placeholder={this.state.openModelTitle}
          value={this.state.recipe}
          />
        <br/>
        <br/>
          <label className="label2">Ingredients:</label>

          <textarea className="editthis" type='text' name='ingredients' id='ingredients'  onChange={this.handleUpdateChange} placeholder={this.state.openModelIngredients} value={this.state.ingredients}/>

          <label className="label2">Directions:</label>

            <textarea className="editthis" type='text' name='directions' onChange={this.handleUpdateChange} placeholder={this.state.openModelDirections} value={this.state.directions}/>
            </form>


        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal"onClick={this.handleClose}>Close</button>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => this.updateThings(cookin.id)}>Save changes</button>
          </Modal.Footer>

      </Modal>

</div>



                          <button className="btn btn-primary btn-lg" onClick={this.moreDetails}>Details</button>
                          <button className="btn btn-danger btn-lg" id="but" onClick={() => this.removeThings(cookin.id)}>(X)</button>
                        </div>


                        </div>
                      )
                    })}
                  </ul>
                </div>

              </section>



        </div>

      </div>
    )
  }
}

export default App;
