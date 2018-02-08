import React, { Component } from 'react';
import { fire_config } from './config/fire';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import Header from './static/header';
class App extends Component {
  constructor(){
    super();
    this.state = {
      recipe: '',
      ingredients: '',
      items: []

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeThings = this.removeThings.bind(this);
  }

handleChange(e){
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleSubmit(e) {
  e.preventDefault();
  const cookinRef = firebase.database().ref('recipes');
  const cookin = {
    title: this.state.recipe,
    ingredients: this.state.ingredients
  }
  cookinRef.push(cookin);
  this.setState({
    recipe: '',
    ingredients: ''
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
        ingredients: items[cookin].ingredients
      });
    }
    this.setState({
      items: newState
    });
  });
}

removeThings(cookinId) {
  const cookinRef = firebase.database().ref(`/recipes/${cookinId}`);
  cookinRef.remove();
}


  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>


        <div className="container">


          <section className='display-recipes'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((cookin) => {
                  return(
                    <div>
                      <h1 key={cookin.id}></h1>
                      <h2>{cookin.title}</h2>
                      <li>{cookin.ingredients}</li>
                      <button className="button1 btn btn-danger btn-sm" onClick={() => this.removeThings(cookin.id)}>Remove</button>
                    </div>
                  )
                })}
              </ul>
            </div>
          </section>



          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <label>Title here:</label>
            <br/>

              <input type='text' name='recipe' placeholder='place title here..' onChange={this.handleChange} value={this.state.title}/>
            <br/>
              <label>Ingredients here:</label>
              <br/>

              <textarea type='text' name='ingredients' placeholder='write ingredients here...' onChange={this.handleChange} value={this.state.ingredients}/>
              <br/>
              <button className="btn btn-success">Add Recipe!</button>
            </form>
              </section>



        </div>

      </div>
    )
  }
}

export default App;
