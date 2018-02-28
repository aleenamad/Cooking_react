import React, { Component } from 'react';
import './home2.css';
import Header from './header';
import {Carousel} from 'react-bootstrap';


class Home2 extends Component {
  render() {
    return (
      <div className="App">



          <div className="theBody">
            <Header />
              <h1 className="hey">Nadia's Cooking Blog Adventures</h1>
              <Carousel className="ccc">
              <Carousel.Item>
                <img className="cake img-responsive center-block" src={require('./img/cake.JPG')} />
                <Carousel.Caption>
                  <h3>Drake Farewell Cake</h3>
                  {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img  className="fruitcake img-responsive center-block" src={require('./img/fruitcake.jpg')} />
                <Carousel.Caption>
                  <h3>A Family Fruitcake</h3>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img  className="cupcake img-responsive center-block" src={require('./img/cupcake.jpg')} />
                <Carousel.Caption>
                  <h3>Some Moist Cupcakes</h3>
                  {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="nadiacake img-responsive center-block" src={require('./img/nadiawcake.jpg')} />
                <Carousel.Caption>
                  <h3>Me With A Cake</h3>
                  {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>




              </div>
            </div>

    );
  }
}

export default Home2;
