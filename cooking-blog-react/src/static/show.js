import React, { Component } from 'react';
import App from '../App';
import Header from './header';
import './show.css';
import 'firebase/database';
import firebase from 'firebase/app';

class Show extends Component {
  constructor(){
    super();
    this.state = {
      recipe: '',
      ingredients: '',
      directions: '',
      items: []
    }
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
  render(){
    return(

<div className="ShowAll">

<header>
  <Header />
</header>
<br/>

<div className="container4">

<h1>All the Recipes:</h1>


</div>

<div className="showit">
  <ul>
    {
      this.state.items.map((cookin) => {
      return(
        <div className="boya">
          <h1 key={cookin.id}></h1>

          <li className="yo">{cookin.title}</li>
          <p className="here">Ingredients:</p>
          <p className="ingred">{cookin.ingredients}</p>
          <p className="here">Directions:</p>
          <p className="directy">{cookin.directions}</p>
          {/* <button className="btn btn-danger btn-sm" id="but" onClick={() => this.removeThings(cookin.id)}>(X)</button> */}
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
