import React, { Component } from 'react';
import { Form, Confirm } from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const inlineStyle = {
  modal : {
    top: '30%!important',
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class AddForm extends Component {
  constructor(props){
    super(props);
    this.state={
      "name": "",
      "city": "",
      "address": "",
      "date": "",
      "time": "",
      "difficulty": "",
      "players": 0,
      "maxPlayers": 0,
      open:false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  show=()=>this.setState({open:true});
  handleConfirm=()=>this.setState({open:false});

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //handleChange = (e, { value }) => this.setState({ value })

  AddGame(newGame){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/games',
      data: newGame
    }).then(response => {
      
    }).catch(err => console.log(err));
    //console.log(newGame);
  }

  handleInputSubmit(e){
    const newGame={
      name: this.state.name,
      city: this.state.city,
      address: this.state.address,
      date: this.state.date,
      time: this.state.time,
      gameType: this.state.gameType,
      difficulty: this.state.difficulty,
      players: 0,
      maxPlayers: this.state.maxPlayers
    };
    this.AddGame(newGame);
    e.preventDefault();    
  }

  render() {
    const { value } = this.state
    return (
      <div className="add-form" onSubmit={this.handleInputSubmit}>
        <h1 style={{textAlign:'right'}}> Organiser un tournoi </h1> <br />
        <Form size='huge' onSubmit={this.handleSubmit}>
          <Form.Input fluid label='Name' placeholder='Name' name='name' onChange={this.handleInputChange}/>
          <Form.Input fluid label='City' placeholder='City' name='city' onChange={this.handleInputChange}/>
          <Form.Input fluid label='Address' placeholder='Address' name='address' onChange={this.handleInputChange}/>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Date' placeholder='Date' name='date' onChange={this.handleInputChange}/>
            <Form.Input fluid label='Time' placeholder='Time' name='time' onChange={this.handleInputChange}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Max Players' placeholder='Max Players' name='maxPlayers' onChange={this.handleInputChange}/>
            <Form.Input fluid label='Level' placeholder='Level' name='difficulty' onChange={this.handleInputChange}/>            
          </Form.Group>
          <Form.Button type='submit' onClick={this.show}>Submit</Form.Button>
          <Confirm style={inlineStyle.modal}
            open={this.state.open}
            content="Votre tournoi a bien été créé"
            onConfirm={this.handleConfirm}
          />
        </Form>
      </div>
    )
  }
}

export default AddForm