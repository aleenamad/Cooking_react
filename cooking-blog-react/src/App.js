import React, { Component } from 'react';
import { config } from './config/fire';
import firebase from 'firebase/app';
// import firebase, { auth, provider } from './firebase.js';
import 'firebase/database';
import './App.css';
import Header from './static/header';
import {Modal} from 'react-bootstrap';



class App extends Component {
  constructor(){
    super();
    this.state = {
      showModal: false,
      recipe: '',
      ingredients: '',
      directions: '',
      cookTime:'',
      prepTime: '',
      items: [],
      user: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeThings = this.removeThings.bind(this);
    this.updateThings = this.updateThings.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

/////////Modal open/close //////////////////////////////////////////////////////
  handleClose() {
    this.setState({ showModal: false });
  }
  handleShow(id) {
    this.setState({
      showModal: id,
    });
  }



/////////////////// Handles typing and updating to firebase ///////////////////////////

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
    directions: this.state.directions,
    cookTime: this.state.cookTime,
    prepTime: this.state.prepTime,
  }
  cookinRef.push(cookin);
  this.setState({
    recipe: '',
    ingredients: '',
    directions: '',
    cookTime: '',
    prepTime: '',
  });

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// Allows detail button to take you to other page ///////////////////////////
moreDetails(){
    window.location.assign('/recipes');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////Mounting//////////////////////////////////////////////////////
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
        directions: items[cookin].directions,
        cookTime: items[cookin].cookTime,
        prepTime: items[cookin].prepTime,
      });
    }
    this.setState({
      items: newState
    });
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Update and remove things//////////////////////////////////////////////////////
removeThings(cookinId) {
  const cookinRef = firebase.database().ref(`/recipes/${cookinId}`);
  cookinRef.remove();
}

updateThings(cookin) {
    const cookinRef = firebase.database().ref(`/recipes/${cookin.id}`);
    let updates = {
      title: this.state.recipe,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
      cookTime: this.state.cookTime,
      prepTime: this.state.prepTime,
    };
    cookinRef.update(updates);
    this.handleClose();
    this.setState({
      recipe: '',
      ingredients: '',
      directions: '',
      cookTime: '',
      prepTime: '',
    });
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

              <textarea type='text' className="input-lg" name='ingredients' id='ingredients' placeholder='Separate By Commas' onChange={this.handleChange}  value={this.state.ingredients}/>

              <br/>
              <label>Directions:</label>

                <textarea type='text' className="input-lg" name='directions' onChange={this.handleChange} value={this.state.directions}/>

                <br/>
                <label>Cook Time:</label>

                <input type='number' className="input-lg" name='cookTime' placeholder="In Minutes" onChange={this.handleChange} value={this.state.cookTime}/>

                <br/>
                <label>Prep Time:</label>

                <input type='number' className="input-lg" name='prepTime' placeholder="In Minutes" onChange={this.handleChange} value={this.state.prepTime}/>
              <br/>
              <br/>
              <button className="addb btn btn-success btn-lg">Add Recipe!</button>
            </form>
              </section>
              <hr/>
              <br/>
{/* //////////////////Shows Title, edit, delete, details button from here down////////////////////////  */}
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
    <button type="button" className="btn btn-success btn-lg" onClick={ ()=> this.handleShow(cookin.id)}>Edit!</button>
    <Modal show={this.state.showModal === cookin.id} onHide={this.handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
          <label className="label2">Title:</label>
          <br/>

          <input type='text' class="input-lg" name='recipe' placeholder={cookin.title} onChange={this.handleUpdateChange}
          value={this.state.recipe}
          />
        <br/>
        <br/>
          <label className="label2">Ingredients:</label>

          <textarea className="editthis input-lg" type='text' placeholder={cookin.ingredients} name='ingredients' id='ingredients'  onChange={this.handleUpdateChange}  value={this.state.ingredients}/>

          <label className="label2">Directions:</label>

            <textarea className="editthis input-lg" type='text' placeholder={cookin.directions} name='directions' onChange={this.handleUpdateChange}  value={this.state.directions}/>

            <label className="label2">Cook Time:</label>

              <input className="editthis input-lg" type='number' name='cookTime' placeholder={cookin.cookTime} onChange={this.handleUpdateChange}  value={this.state.cookTime}/>
              <label className="label2">Prep Time:</label>
                <input className="editthis input-lg" type='number' placeholder={cookin.prepTime} name='prepTime' onChange={this.handleUpdateChange}  value={this.state.prepTime}/>
                <br/>
                <br/>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.updateThings(cookin)}>Save changes</button>
            </form>

        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-info btn-lg" data-dismiss="modal" onClick={this.handleClose}>Close</button>

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
