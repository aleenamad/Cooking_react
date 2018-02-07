
// import './Main.css';
// import Recipe from '../Recipe/Recipe'; // getting unused warning
// import Ingredients from './Ingredients'; // getting unused warning
// import Title from './title'; // getting unused warning

// import MyRoutes from './config/routes';
// import Home from '../Static/home';

import { fire_config } from '../config/fire';
import firebase from 'firebase/app';
import 'firebase/database';





class MainTitle extends Component {

  constructor(props){
    super(props);


    //Title
    // this.addTitle = this.addTitle.bind(this);
    this.removeTitle = this.removeTitle.bind(this);
    //Firebase stuff
    this.app = firebase.initializeApp(fire_config);
    // this.database = this.app.database().ref().child('recipe');
    this.databse = this.app.database().ref().child('title');


// setup react state of our Component
    this.state={
      recipes: [],
      title: []
    }
  }


componentWillMount(){


// const previousTitle = this.state.title;
//
// //Ingredients:////////
// //data snapshot
// this.database.on('child_added', snap => {
//   previousTitle.push({
//     id: snap.key,
//     titleContent: snap.val().titleContent
//   })
//   this.setState({
//     title: previousTitle
//   })
// })
//
// this.database.on('child_removed', snap => {
//   for(var i=0; i < previousTitle.length; i++){
//     if(previousTitle[i].id === snap.key){
//       previousTitle.splice(i, 1);
//     }
//   }
//   this.setState({
//     title: previousTitle
//   })
// })



}




// addTitle(title){
// this.database.push().set({ titleContent: title });
//
// }

removeTitle(TitleId){
console.log('removed title');
  this.database.child(TitleId).remove();
}


  render() {
    return (


    );
  }
}

export default MainTitle;
