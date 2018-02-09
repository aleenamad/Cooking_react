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
      directions: '',
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

          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
            <br/>
              <h1 className="what">Create Your Recipe Here:</h1>
              <label>Title:</label>
            <br/>

              <input type='text' name='recipe' placeholder='Title...' onChange={this.handleChange} value={this.state.recipe}/>
            <br/>
              <label>Ingredients:</label>
              <br/>

              <textarea type='text' name='ingredients' placeholder='Separate by commas' onChange={this.handleChange} value={this.state.ingredients}/>

              <br/>
              <label>Directions:</label>
              <br/>
                <textarea type='text' name='directions' placeholder='Directions...' onChange={this.handleChange} value={this.state.directions}/>

                <br/>
              <button className="btn btn-success">Add Recipe!</button>
            </form>
              </section>
              <section className='display-recipes'>
                <div className='wrapper'>
                  <ul>
                    {this.state.items.map((cookin) => {
                      return(
                        <div className="bo">
                          <h1 key={cookin.id}></h1>

                          <h2 className="wassup">{cookin.title}</h2>
                          {/* <p className="here">Ingredients:</p>
                          <li className="ingred">{cookin.ingredients}</li>
                          <p className="here">Directions:</p>
                          <p className="direct">{cookin.directions}</p> */}

                          <button className="btn btn-danger btn-sm" id="but" onClick={() => this.removeThings(cookin.id)}>(X)</button>

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
