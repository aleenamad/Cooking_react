import React, { Component } from 'react';
import App from '../App';
import Header from './header';
import './show.css';
import 'firebase/database';
import firebase from 'firebase/app';
import {Modal} from 'react-bootstrap';

class Show extends Component {
  constructor(){
    super();

    this.state = {
      showModal: false,
      recipe: '',
      ingredients: '',
      directions: '',
      items: [],
      search: '',
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    const cookinRef = firebase.database().ref('recipes');
    const cookin = {
      title: this.state.recipe,
      ingredients: this.state.ingredients,
      directions: this.state.directions
    }

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

  updateSearch(event){
    this.setState({search: event.target.value.substr(0, 20)});
  }
  render(){
    let filteredRecipes = this.state.items.filter(
      (cookin) => {
        return cookin.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return(

<div className="ShowAll">

<header>
  <Header />
</header>
<br/>

<div className="container4">

<h1>All the Recipes:</h1>

<br/>
</div>


  <form className="form">
    <label className="label3">Sort Through Recipes here:</label>
    {/* <br/> */}
    <input className="search" type="text" placeholder="Sort here..." aria-label="Search" onChange={this.updateSearch.bind(this)} value={this.state.search}/>

  </form>






  <hr/>
  <div className="showit">

  <ul>
    {
      filteredRecipes.map((cookin) => {
      return(
        <div className="boya">
          <h1 key={cookin.id}></h1>

          <li className="yo">{cookin.title}</li>
        <button type="button" className="btn btn-primary btn-lg" onClick={ ()=>
        this.handleShow(cookin)}>Details!</button>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Description For: {this.state.openModelTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className="here">Ingredients:</p>
          <p className="ingred">{this.state.openModelIngredients}</p>
          <p className="here">Directions:</p>
          <p className="directy">{this.state.openModelDirections}</p>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal"onClick={this.handleClose}>Close</button>

          </Modal.Footer>
        </Modal>

          <hr/>
            </div>
        )}
      )}

  </ul>

</div>




    </div>
  );
  }
}

export default Show;
