import React, { Component } from 'react';
import './aboutme.css';
import Header from './header';


class AboutMe extends Component {
  render() {
    return (
      <div className="App">



          <div className="theBody">
            <Header />
              <h1 className="name">Hi! I'm Nadia but my friends call me Gonads</h1>
              <br/>

              <h3>This is me, Gonads <br/><img src={require("./img/IMG_5531.JPG")}/></h3>
              

              </div>
            </div>

    );
  }
}

export default AboutMe;
