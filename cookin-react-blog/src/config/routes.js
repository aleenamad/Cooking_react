import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Recipe from '../Recipe/Recipe';
import Home from '../Static/home';
import IngredientsForm from '../Recipe-Form/Main';


export default (

   <Switch>
     <Route exact path='/' component={ Home }/>
     <Route path='/Create' component={ IngredientsForm }/>
   </Switch>

)
