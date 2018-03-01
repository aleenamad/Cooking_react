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
      autoplaySpeed: 2000,
      pauseOnHover: true,
      rtl: true,
    };
    return (

        <Slider {...settings}>
          <div>
            <img id="cake" src={require('./img/cake.JPG')} />
            <p className="clabel">Drake Farwell Cake</p>
          </div>
          <div>
            <img  id="fruitcake" src={require('./img/fruitcake.jpg')} />
            <p className="clabel">A Family Fruitcake</p>
          </div>
          <div>
          <img  id="cupcake" src={require('./img/cupcake.jpg')} />
          <p className="clabel">A Moist Cupcake</p>
          </div>
          <div>
            <img id="nadiacake" src={require('./img/nadiawcake.jpg')} />
            <p className="clabel">Me With A Cake</p>
          </div>
        </Slider>

    );
  }
}


export default Slick;
