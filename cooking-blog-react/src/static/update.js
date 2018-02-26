import React from 'react';
import './update.css';
import Header from './header';
// import Modal from 'react-bootstrap/lib/Modal';
import Modal from 'react-bootstrap-modal';
import firebase from 'firebase/app';
import 'firebase/database';


class Update extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    this.updateThings = this.updateThings.bind(this);
    this.state = {
      show: false,
      recipe: '',
      ingredients: '',
      directions: '',
      items: []
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    console.log('show method called');
    this.setState({ show: true });
  }
  handleUpdateChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }



  handleSubmit(e) {
    e.preventDefault();
    const cookinRef = firebase.database().ref('recipes');
    const cookin = {
      title: this.state.recipe,
      ingredients: this.state.ingredients,
      directions: this.state.directions
    }
    cookinRef.push(cookin);
    this.setState({
      recipe: '',
      ingredients: '',
      directions: ''
    });
  }

  componentDidMount() {

    const cookinRef = firebase.database().ref('recipes');
    cookinRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let cookin in items) {
        newState.push({
          id: cookin,
          title: items[cookin].title,
          ingredients: items[cookin].ingredients,
          directions: items[cookin].directions
        });
      }
      this.setState({
        items: newState
      });
    });
  }


  updateThings(cookinId, cookin) {
      const cookinRef = firebase.database().ref(`/recipes/${cookinId}`);
      cookinRef.update(cookin).child(cookinId);
    }
  render() {
    return (

<div>
  <button type="button" className="btn btn-success btn-sm" onClick={this.handleShow}>Edit!</button>

  <Modal show={this.state.show} onHide={this.handleClose}>

    <Modal.Header closeButton>
      <Modal.Title>Edit Recipe</Modal.Title>
    </Modal.Header>

      <Modal.Body>
        <form onSubmit={this.handleSubmit}>
        <label>Title:</label>

        <input type='text' name='recipe' placeholder='Title...' onChange={this.handleUpdateChange} value={this.state.recipe}/>
      <br/>
      <br/>
        <label>Ingredients:</label>

        <textarea type='text' name='ingredients' id='ingredients' placeholder='Separate by commas' onChange={this.handleUpdateChange} value={this.state.ingredients}/>

        <label>Directions:</label>

          <textarea type='text' name='directions' placeholder='Directions...' onChange={this.handleUpdateChange} value={this.state.directions}/>
          </form>

      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={() => this.updateThings()}>Save changes</button>
        </Modal.Footer>

    </Modal>
    </div>
  )
  }
}

export default Update;
// render(<Update />);
