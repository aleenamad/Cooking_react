import React, { Component } from 'react';
import './home2.css';
import Header from './header';
import Slick from './carousel';




class Home2 extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cookin' with Gonads</h1>

        </header>

          <div className="theBody">
            <Header />
              {/* <h1 className="hey">Nadia's Cooking Blog Adventures</h1> */}
              <br/>
              <br/>

<Slick />


              </div>
            </div>

    );
  }
}


export default Home2;
