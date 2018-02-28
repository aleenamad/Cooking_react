import React, { Component } from 'react';
import App from '../App';
import Header from './header';
import Comment from './comments';
import './show.css';
import 'firebase/database';
// import firebase from 'firebase/app';
import {Modal} from 'react-bootstrap';
import ToggleDisplay from 'react-toggle-display';
import firebase, { auth, provider } from '../config/fire.js';

class Show extends Component {
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
      search: '',
      show: false,
      username: '',
      user: null,
      things: []
    }
    this.handleDo = this.handleDo.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    const cookinRef = firebase.database().ref('recipes');
    const cookin = {
      title: this.state.recipe,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
      cookTime: this.state.cookTime,
      prepTime: this.state.prepTime,

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
            cookTime: items[cookin].cookTime,
            prepTime: items[cookin].prepTime,

          });
        }
        this.setState({
          items: newState
        });
      });



  }
  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      console.log("hey");
    const user = result.user;
    this.setState({
      user
    });
  });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });

}
/////////////Handles Modal opening/closing //////////////////////////
  handleClose() {
    this.setState({ showModal: false });
  }
  handleShow(id) {
      this.setState({
        showModal: id,
      });
    }

///////////////////////////////////////////////////////////////////////////////////////////
////////////////Handle toggle//////////////////////////////////////////////////////
  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Handle typing and submitting to firebase//////////////////////////////////////////////////////
  handleTypeChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDo(e) {
    e.preventDefault();
    const commentsRef = firebase.database().ref('comments');
    const wall = {
      comments: this.state.comments,
      user: this.state.user.displayName || this.state.user.email
    }
    this.handleClose();
    commentsRef.push(wall);
    this.setState({
      comments: '',
      username: ''
    })
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////Mounting//////////////////////////////////////////////////////
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        }
      });
    const commentsRef = firebase.database().ref('comments');
    commentsRef.on('value', (snapshot) => {
      let things = snapshot.val();
      let newState = [];
      for (let wall in things) {
        newState.push({
          id: wall,
          comments: things[wall].comments,
          user: things[wall].comments,
        });
      }
      this.setState({
        things: newState
      });
    });
  }
/////////////Search Function///////////////////////////
  updateSearch(event){
    this.setState({search: event.target.value.substr(0, 20)});
  }
/////////////////////////////////////////////////////////////////////////////////
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
        this.handleShow(cookin.id)}>Details!</button>

        <Modal show={this.state.showModal === cookin.id} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Description For: {cookin.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className="here">Ingredients:</p>
          <p className="ingred">{cookin.ingredients}</p>
          <p className="here">Directions:</p>
          <p className="directy">{cookin.directions}</p>
          <p className="here">Cook Time:</p>
          <p className="directy">{cookin.cookTime} Minutes</p>
          <p className="here">Prep Time:</p>
          <p className="directy">{cookin.prepTime} Minutes</p>
<hr/>

          <p className="here">Add A Comment:</p>

          <form onSubmit={this.handleDo}>
            <p className="heres">Name:</p>
            <br/>
            {this.state.user ?

                           <input type="text" className="input-sm" name="username" value={this.state.user.displayName || this.state.user.email} />
                           : <p>You must be logged in to comment.</p>
                           }
                           <br/>
                           <p className="heres">Add Comment:</p>
                           <br/>
                          <textarea type="text" className="Comment-Box input-lg" name="comments"  onChange={this.handleTypeChange}  value={this.state.comments} />

                        <button className="btn btn-primary btn-lg">Add Comment</button>
                      </form>
          </Modal.Body>
          <Modal.Footer>
              <br/>
            <button type="button" className="btn btn-info btn-lg" data-dismiss="modal"onClick={this.handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
            </div>
        )}
      )}

  </ul>
<footer>
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
