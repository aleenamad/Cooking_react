import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Recipe from '../Recipe/Recipe';
import Home2 from '../static/home2';
import App from '../App';



export default (

   <Switch>
     <Route exact path='/' component={ Home2 }/>
     <Route path='/Create' component={ App }/>
   </Switch>
)
