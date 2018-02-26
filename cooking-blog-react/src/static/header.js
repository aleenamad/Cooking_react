import React, { Component } from 'react';
import './header.css';
class Header extends Component {
  render() {
    return (

<div className="header">
<header className="App-header">
  <h1 className="App-title">Cookin' with Gonads</h1>

</header>

<div className="Navbar">

    <ul className="nav justify-content-center nav-fill bg-faded text-white">
      <li className="nav-item">
        <a className="nav-link active" href="/">Home</a>
        </li>
      <li className="nav-item">
        <a className="nav-link active" href="/Recipes">Recipes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Create">Create a Recipe</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/AboutMe">About Me</a>
        </li>

        {/* <form className="form-inline">
          <input className="form-control mr-sm-2" type="search"   placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-primary my-2 my-sm-0"  type="submit">Search</button>
        </form> */}



      </ul>
      </div>
    </div>


  );
}
}

export default Header;
