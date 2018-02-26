import React, { Component } from 'react';
import { fire_config } from './config/fire';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import Header from './static/header';
// import Update from './static/update';
// import Modal from 'react-bootstrap-modal';
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap'



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      recipe: '',
      ingredients: '',
      directions: '',
      items: []



    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeThings = this.removeThings.bind(this);
    this.updateThings = this.updateThings.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);


  }


  handleClose() {
    this.setState({ showModal: false });
  }

  handleShow() {
    console.log('show method called');
    this.setState({ showModal: true });
  }

handleChange(e){
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleUpdateChange(e){
  this.setState({
    [e.target.name]: e.target.value
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
// componentWillUnmount: function() {
//    this.firebaseRef.off();
// }



removeThings(cookinId) {
  const cookinRef = firebase.database().ref(`/recipes/${cookinId}`);
  cookinRef.remove();
}


updateThings(cookinId, cookin) {
    const cookinRef = firebase.database().ref(`/recipes/${cookinId}`);
    cookinRef.update(cookin).child(cookinId);
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


              <input type='text' name='recipe' id="heyyou" onChange={this.handleChange} value={this.state.recipe}/>
            <br/>
            <br/>
              <label>Ingredients:</label>


              <textarea type='text' name='ingredients' id='ingredients' placeholder='Separate by commas' onChange={this.handleChange} value={this.state.ingredients}/>


              <label>Directions:</label>

                <textarea type='text' name='directions' placeholder='Directions...' onChange={this.handleChange} value={this.state.directions}/>

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
                          {/* <p className="here">Ingredients:</p>
                          <li className="ingred">{cookin.ingredients}</li>
                          <p className="here">Directions:</p>
                          <p className="direct">{cookin.directions}</p> */}
                        <br/>


                          {/* <button className="btn btn-success btn-sm" id="butt" onClick={() => this.updateThings(cookin.id)}>Edit!</button> */}






<div className="deleteBut">
  <div className="modal-container">
    <button type="button" className="btn btn-success btn-lg" onClick={this.handleShow}>Edit!</button>

    <Modal show={this.state.showModal} onHide={this.handleClose}>

      <Modal.Header>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>

        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
          <label className="label2">Title:</label>
          <br/>

          <input type='text' class="input-group input-group-lg" name='recipe' onChange={this.handleUpdateChange} value={this.state.recipe}/>
        <br/>
        <br/>
          <label className="label2">Ingredients:</label>

          <textarea className="editthis" type='text' name='ingredients' id='ingredients' placeholder='Separate by commas' onChange={this.handleUpdateChange} value={this.state.ingredients}/>

          <label className="label2">Directions:</label>

            <textarea className="editthis" type='text' name='directions' placeholder='Directions...' onChange={this.handleUpdateChange} value={this.state.directions}/>
            </form>


        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal"onClick={this.handleClose}>Close</button>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => this.updateThings()}>Save changes</button>
          </Modal.Footer>

      </Modal>
      </div>


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
