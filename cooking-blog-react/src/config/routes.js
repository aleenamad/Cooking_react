import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Recipe from '../Recipe/Recipe';
import Home2 from '../static/home2';
import AboutMe from '../static/aboutme';
import App from '../App';



export default (

   <Switch>
     <Route exact path='/' component={ Home2 }/>
     <Route path='/Create' component={ App }/>
     <Route path='/AboutMe' component={ AboutMe }/>

   </Switch>
)
