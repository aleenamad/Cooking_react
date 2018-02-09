import React, { Component } from 'react';
import './home2.css';
import Header from './header';


class Home2 extends Component {
  render() {
    return (
      <div className="App">



          <div className="theBody">
            <Header />
              <h1 className="hey">Nadia's Cooking Blog Adventures</h1>

              <div className="container3">

            <h3>Drake Farewell Cake <br/> <img className="cake"  src={require('./img/cake.JPG')}/></h3>

                <h3>A Family FruitCake <br/> <img className="fruitcake" src={require('./img/fruitcake.jpg')}/></h3>

              <h3>Me With A Cake<br/><img className="nadiacake" src={require('./img/nadiawcake.jpg')}/></h3>

            <h3>Some Moist Cupcakes<br/>  <img className="cupcake" src={require('./img/cupcake.jpg')}/></h3>
            </div>



              </div>
            </div>

    );
  }
}

export default Home2;
