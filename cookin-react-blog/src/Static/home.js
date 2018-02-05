import React, { Component } from 'react';
import './home.css';


class Home extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Cookin' with Gonads</h1>

        </header>

        <div className="Navbar">

            <ul className="nav justify-content-center nav-fill bg-faded text-white">
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
                </li>
              <li className="nav-item">
                <a className="nav-link active" href="/">Recipes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Create">Create a Recipe</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About Me</a>
                </li>

                <form className="form-inline">
                  <input className="form-control mr-sm-2" type="search"   placeholder="Search" aria-label="Search"></input>
                  <button className="btn btn-outline-primary my-2 my-sm-0"  type="submit">Search</button>
                </form>


              </ul>
            </div>
          <div className="theBody">
              <h1>Nadia's Cooking Blog Adventures</h1>


              <h2>Follow me on Instagram for all my amazing photos of food</h2>
              </div>
            </div>

    );
  }
}

export default Home;
