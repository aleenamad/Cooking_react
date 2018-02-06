import React, { Component } from 'react';
// import './App.css';
import Recipe from '../Recipe/Recipe';
import Ingredients from './Ingredients';
import Title from './title';

// import MyRoutes from './config/routes';
// import Home from '../Static/home';
import { fire_config } from '../config/fire';
import firebase from 'firebase/app';
import 'firebase/database';





class App extends Component {

  constructor(props){
    super(props);
    this.addIngredients = this.addIngredients.bind(this);
    this.removeIngredients = this.removeIngredients.bind(this);

    this.app = firebase.initializeApp(fire_config);
    this.database = this.app.database().ref().child('recipe');


// setup react state of our Component
    this.state={
      recipes: [],
      title: [],
    }
  }


componentWillMount(){

const previousIngredients = this.state.recipes;

//data snapshot
this.database.on('child_added', snap => {
  previousIngredients.push({
    id: snap.key,
    recipeContent: snap.val().recipeContent,
  })
  this.setState({
    recipes: previousIngredients
  })
})
this.database.on('child_removed', snap => {
  for(var i=0; i < previousIngredients.length; i++){
    if(previousIngredients[i].id === snap.key){
      previousIngredients.splice(i, 1);
    }
  }
  this.setState({
    recipes: previousIngredients
  })
})



}
addIngredients(recipe){
this.database.push().set({ recipeContent: recipe });

}


removeIngredients(recipeId){
console.log("from the parent: " + recipeId);
  this.database.child(recipeId).remove();
}


// updateIngredients(recipeId){
//   this.database.child(recipeId).update();
// }
  render() {
    return (

      <div className="App">

      <div className= "App-intro">
        <h1>Creat Your Recipe Below:</h1>
          <h2>Add Your Title & Ingredients:</h2>
          {
            this.state.recipes.map((recipes) => {
              return(
              <Recipe recipeContent={ recipes.recipeContent }   recipeId={ recipes.id }
              key={ recipes.id } removeIngredients ={ this.removeIngredients }/>
            )
          })
        }
        {
                this.state.title.map((title) => {
                  return(
              <Title titleContent={ title.titleContent } titleId={ title.id } key= { title.id }/>
            )
          })
}

        </div>
<br/>
<br/>
<br/>
        <div className= "formIngredients">

          <Ingredients addIngredients={ this.addIngredients }/>

        </div>

    </div>
    );
  }
}

export default App;
