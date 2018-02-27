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
      items: [],
      search: ''
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
          <p className="here">Ingredients:</p>
          <p className="ingred">{cookin.ingredients}</p>
          <p className="here">Directions:</p>
          <p className="directy">{cookin.directions}</p>
          {/* <button className="btn btn-danger btn-sm" id="but" onClick={() => this.removeThings(cookin.id)}>(X)</button> */}
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
