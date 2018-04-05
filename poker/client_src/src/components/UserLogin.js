import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Token from './Token';

class UserLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
      success: false,
      error: false,
      message: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  AddUser(newUser){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/users/login',
      data: newUser
    }).then(response => {
      this.setState({
        success: true,
        error: false,
        message: this.state.username
      });
      Token.set(response.data.id);
    }).catch(err => {
      this.setState({
        success: false,
        error: true,
        message: err.message
      });
    });
  }

  handleSubmit(e){
    const newUser={
      username: this.state.username,
      password: this.state.password
    };
    this.AddUser(newUser);
    e.preventDefault();    
  }

  render() {
    const { value } = this.state;

    const success = this.state.success &&
          <Message success
            header='Connection réussie'
            content={'Bienvenue '+this.state.message}
          />;

    const error = this.state.error &&
          <Message error
            header='Erreur lors de la connection'
            content={this.state.message}
          />;

    return (
      <div className="add-form">
        <h1 style={{textAlign: 'center'}}>
          Se connecter
        </h1> <br />
        <Form size='huge' onSubmit={this.handleSubmit}>
          <Form.Input
            label="Nom d'utilisateur"
            placeholder='Rentrez votre pseudo ici'
            name='username' onChange={this.handleInputChange}
          />
          <Form.Input 
            label="Mot de passe"
            placeholder='Rentrez votre mot de passe ici'
            name='password' onChange={this.handleInputChange}
            type='password'
          />
          <Form.Button type='submit'>
            Se connecter
          </Form.Button>
        </Form>
        {success}
        {error}
      </div>
    )
  }
}

export default UserLogin