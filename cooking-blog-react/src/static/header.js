import firebase, { auth, provider } from '../config/fire.js';
import React, { Component } from 'react';
import './header.css';
// import { Spinner } from '@blueprintjs/core';
var Spinner = require('react-spinkit');




class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: null, // <-- add this line
      loading: true
    }
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
  }
/////////Allows user to log in and out//////////
  logout(e) {
    window.location.reload();
      e.preventDefault();
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
}
login(e) {
  e.preventDefault();
  auth.signInWithPopup(provider)
  .then((result) => {
    console.log("hey, you're loggin!");
	const user = result.user;
  this.setState({
    user
  });
});
}


/////////////////////////////////////////////////////////////
//////////Mounting///////////////////
componentDidMount() {
  auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          loading: false,
        })
      }
      else {
      this.setState({
        loading: false
      })
    }

    });


}
/////////////////////////////////////////////////////////
  render() {

    return (

<div className="header">

{/* <header className="App-header">
  <h1 className="App-title">Cookin' with Gonads</h1>

</header> */}
<div className="pacmen">
<Spinner className="pac" name="pacman" />
<h1 className="hey">Gonad's Cooking Blog Adventures</h1>
<Spinner className="pac2" name="pacman" />
</div>

<div className="Navbar">

    <ul className="nav justify-content-center nav-fill bg-faded text-white">
      <li className="nav-item">
        <a className="nav-link active" href="/">Home</a>
        </li>
      <li className="nav-item">
        <a className="nav-link active" href="/Recipes">Recipes</a>
        </li>
        {this.state.user?
        <li className="nav-item">
          <a className="nav-link" href="/Create">Create a Recipe</a>
        </li>
        :
        <li className="nav-item">
          <a className="nav-link" href="#">Log In To Create a Recipe</a>
        </li>
      }
        <li className="nav-item">
          <a className="nav-link" href="/AboutMe">About Me</a>
        </li>
        {this.state.user?
          <div>
          <div>
              <li className="nav-item">
                <h3 className="hello">Welcome {this.state.user.displayName}!</h3>
            </li>
          </div>
</div>
          :
          null
        }
        {this.state.user?
          <div>
          <div className='user-profile'>
              <li className="nav-item">
                <figure>
                <div className='user-profile'>
            <img src={this.state.user.photoURL}/>
            </div>
            </figure>

            </li>
          </div>
</div>
          :
          <p className="log">Click to Login</p>

        }

    {this.state.user?
      <li className="nav-item">
<button onClick={this.logout} type="submit" className="btn btn-danger navbar-btn btn-lg">Log Out!</button>
</li>


      :

      <button onClick={this.login} className="btn btn-success navbar-btn btn-lg">Log In!</button>

    }
      </ul>

</div>
</div>

  );
}
}

export default Header;
