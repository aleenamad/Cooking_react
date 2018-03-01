import firebase, { auth, provider } from '../config/fire.js';
import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: null // <-- add this line
    }
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
  }
/////////Allows user to log in and out//////////
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
}
login() {
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
        this.setState({ user });
      }
    });


}
/////////////////////////////////////////////////////////
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

        {this.state.user ?
      <button onClick={this.logout} className="btn btn-success btn-lg">Log Out</button>
      :
      <button onClick={this.login} className="btn btn-success btn-lg">Log In</button>
    }

      </ul>
      </div>
      {this.state.user ?
    <div>
      <div className='user-profile'>
        <img src={this.state.user.photoURL} />
      </div>
    </div>
    :
    <div className='wrappers'>
      {/* //////just need this here////////// */}
    </div>
  }
</div>


  );
}
}

export default Header;
