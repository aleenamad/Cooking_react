import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";



class Slick extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };
    return (

        <Slider {...settings}>
          <div>
            <img className="img-responsive center-block" id="cake" src={require('./img/cake.JPG')} />
          </div>
          <div>
            <img  className="img-responsive center-block" id="fruitcake" src={require('./img/fruitcake.jpg')} />
          </div>
          <div>
          <img  className="img-responsive center-block" id="cupcake" src={require('./img/cupcake.jpg')} />
          </div>
          <div>
            <img className="img-responsive center-block" id="nadiacake" src={require('./img/nadiawcake.jpg')} />
          </div>
        </Slider>

    );
  }
}


export default Slick;
