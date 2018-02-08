import React, { Component } from 'react';
import './home.css';
import Header from './header';
import MyRoutes from '../config/routes';

class Home extends Component {
  render() {
    return (
      <div className="App">

        { MyRoutes }

            </div>

    );
  }
}

export default Home;
