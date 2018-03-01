import React, { Component } from 'react';
import './home2.css';
import Header from './header';
import {Carousel} from 'react-bootstrap';
var Slider = require('react-slick');

class Home2 extends Component {
  render() {
    return (
      <div className="App">

          <div className="theBody">
            <Header />
              <h1 className="hey">Nadia's Cooking Blog Adventures</h1>
              <br/>
              <br/>

              <Carousel className="ccc">
              <Carousel.Item>
                <img className="img-responsive center-block" id="cake" src={require('./img/cake.JPG')} />
                <Carousel.Caption>
                  <h3>Drake Farewell Cake</h3>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img  className="img-responsive center-block" id="fruitcake" src={require('./img/fruitcake.jpg')} />
                <Carousel.Caption>
                  <h3>A Family Fruitcake</h3>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img  className="img-responsive center-block" id="cupcake" src={require('./img/cupcake.jpg')} />
                <Carousel.Caption>
                  <h3>Some Moist Cupcakes</h3>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="img-responsive center-block" id="nadiacake" src={require('./img/nadiawcake.jpg')} />
                <Carousel.Caption>
                  <h3>Me With A Cake</h3>

                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>


              </div>
            </div>

    );
  }
}

export default Home2;
