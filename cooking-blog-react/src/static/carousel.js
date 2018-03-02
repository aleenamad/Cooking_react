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
          <div>
            <img id="nadiacake" src={require('./img/cupcakes2.jpg')} />
            <p className="clabel">Some More Cupcakes</p>
          </div>
          <div>
            <img id="aleena" src={require('./img/aleenacake.JPG')} />
            <p className="clabel">For My Best Friend</p>
          </div>
          <div>
            <img id="nadiacake" src={require('./img/nicerballs.JPG')} />
            <p className="clabel">Balls of Cake</p>
          </div>
          <div>
            <img id="nadiacake" src={require('./img/grilled.JPG')} />
            <p className="clabel">Grilled Stone Fruit</p>
          </div>
          <div>
            <img id="nadiacake" src={require('./img/cheesecake.JPG')} />
            <p className="clabel">A Wonderful Cheesecake</p>
          </div>
          <div>
            <img id="nadiacake" src={require('./img/yasmeen.JPG')} />
            <p className="clabel">For My Mom's 50th</p>
          </div>
          <div>
            <img id="nadiacake" src={require('./img/myra.JPG')} />
            <p className="clabel">For My Other Best Friend</p>
          </div>
        </Slider>

    );
  }
}


export default Slick;
