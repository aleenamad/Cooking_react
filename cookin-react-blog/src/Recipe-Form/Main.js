import React, { Component } from 'react';
import './Main.css';
import Recipe from '../Recipe/Recipe';
import Ingredients from './Ingredients';
import Title from './title';
// import MainTitle from './TitleMain'; // getting unused warning

// import MyRoutes from './config/routes';
// import Home from '../Static/home';
import { fire_config } from '../config/fire';
import firebase from 'firebase/app';
import 'firebase/database';





class Main extends Component {

  constructor(props){
    super(props);
    //Ingredients
    this.addIngredients = this.addIngredients.bind(this);
    this.removeIngredients = this.removeIngredients.bind(this);
    //Title
    this.addTitle = this.addTitle.bind(this); // commented out because already using in titlemain.js
    this.removeTitle = this.removeTitle.bind(this);
    //Firebase stuff
    this.app = firebase.initializeApp(fire_config);
    this.database = this.app.database().ref().child('recipe');
    this.databse = this.app.database().ref().child('title');


// setup react state of our Component
    this.state={
      recipes: [],
      title: []
    }
  }


componentWillMount(){

const previousIngredients = this.state.recipes;
const previousTitle = this.state.title;

//Ingredients:////////
//data snapshot

this.database.on('child_added', snap => {
  previousIngredients.push({
    id: snap.key,
    recipeContent: snap.val().recipeContent,


  })
  this.setState({
    recipes: previousIngredients,

  })
})
this.database.on('child_added', snap => {
  previousTitle.push({
    id: snap.key,
    titleContent: snap.val().titleContent
  })
  this.setState({
    title: previousTitle
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
this.database.on('child_removed', snap => {
  for(var i=0; i < previousTitle.length; i++){
    if(previousTitle[i].id === snap.key){
      previousTitle.splice(i, 1);
    }
  }
  this.setState({
    title: previousTitle
  })
})



}
addIngredients(recipe){
this.database.push().set({ recipeContent: recipe });

}


removeTitle(TitleId){
console.log('removed title');
  this.database.child(TitleId).remove();
}


removeIngredients(IngredientId){
console.log('removed ingredients');
  this.database.child(IngredientId).remove();
}

addTitle(title){
this.databse.push().set({ titleContent: title });

} // commented out because already working in Titlemain.js


  render(props) {
    return (

      <div className="Main">

      <div className="Main-intro">
        <h1>Create Your Recipe Below:</h1>
          <h2>Add Your Title & Ingredients:</h2>
          {

                    this.state.title.map((title) => {
                      return(
                        <Title
                          titleContent={ title.titleContent }
                          titleId={ title.id }
                          key={ title.id }
                          removeTitle={ this.removeTitle }/>
                      )
                    })


                  }


          {
            this.state.recipes.map((recipes) => {
              return(

              <Recipe

                  recipeContent={ recipes.recipeContent }
                  recipeId={ recipes.id }
                  key={ recipes.id }
                  removeIngredients ={ this.removeIngredients }/>
            )
          })
}



        </div>
<br/>
<br/>
<br/>
        <div className= "formIngredients">

          <Ingredients addIngredients={ this.addIngredients } addTitle={ this.addTitle }/>

        </div>

    </div>
    );
  }
}

export default Main;
