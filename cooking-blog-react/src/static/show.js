import React, { Component } from 'react';
import App from '../App';
import Header from './header';
import Comment from './comments';
import './show.css';
import 'firebase/database';
import firebase from 'firebase/app';
import {Modal} from 'react-bootstrap';
import ToggleDisplay from 'react-toggle-display';

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
      show: false
    }
    this.handleDo = this.handleDo.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    const cookinRef = firebase.database().ref('recipes');
    const cookin = {
      title: this.state.recipe,
      ingredients: this.state.ingredients,
      directions: this.state.directions,

    }

      cookinRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let cookin in items) {
          newState.push({
            id: cookin,
            title: items[cookin].title,
            ingredients: items[cookin].ingredients,
            directions: items[cookin].directions,

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
  // handleCloses() {
  //   this.setState({ showModal: false });
  // }
  handleTypeChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleClick() {
    this.setState({
      show: !this.state.show
    });
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


handleShow(cookin) {
    this.setState({
      showModal: true,
      openModelTitle: cookin.title,
      openModelIngredients: cookin.ingredients,
      openModelDirections: cookin.directions,
    });
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
<h2>Add A Comment Below</h2>

<br/>
</div>


  <form className="form">
    <label className="label3">Sort Through Recipes here:</label>

    <input className="search input-lg" type="text" aria-label="Search" onChange={this.updateSearch.bind(this)} value={this.state.search}/>

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
        <button type="button" className="Details-button btn btn-primary btn-lg" onClick={ ()=>
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


<footer>


<h2>Click To Add A Comment</h2>
  <button type="button" onClick={ ()=>
  this.handleClick()} className="btn btn-success btn-lg">Add!</button>
  <ToggleDisplay show={this.state.show}>
    <form onSubmit={this.handleDo}>
                    <textarea type="text" className="Comment-Box input-lg" name="comments" placeholder="Add comment here..." onChange={this.handleTypeChange} value={this.state.comments} />
                  <br/>
                  <button className="btn btn-primary btn-lg">Add Comment</button>
                </form>
  </ToggleDisplay>
  <hr/>
  <h2>Click to View Comments</h2>
  <Comment />
              </footer>



</div>




    </div>
  );
  }
}

export default Show;
