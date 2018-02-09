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
      items: []
    }
    const cookinRef = firebase.database().ref('recipes');
    const cookin = {
      title: this.state.recipe,
      ingredients: this.state.ingredients
    }

    // componentDidMount(){
    //   const cookinRef = firebase.database().ref('recipes');
    //   cookinRef.on('value', (snapshot) => {
    //     let items = snapshot.val()
    //     let newState = [];
    //     for (let cookin in items) {
    //       newState.push({
    //         id: cookin,
    //         title: items[cookin].title,
    //         ingredients: items[cookin].ingredients
    //       });
    //     }
    //     this.setState({
    //       items: newState
    //     });
    //   });
    // }

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

{/* <div className="showit">
  {
    this.state.items.map((cookin) => {
      return(
    <h1 title={cookin.title}></h1>
      )
    })
  }
</div> */}



    </div>
  );
  }
}

export default Show;
