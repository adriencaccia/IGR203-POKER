import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserRegister extends Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      email: "",
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
      url:'http://localhost:3000/api/users',
      data: newUser
    }).then(response => {
      this.setState({
        success: true,
        error: false,
      });
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
      email: this.state.email,
      password: this.state.password
    };
    this.AddUser(newUser);
    e.preventDefault();    
  }

  render() {
    const { value } = this.state;

    const success = this.state.success &&
          <Message success
            header='Votre compte a bien été créé'
            content='Vous pouvez maintenant vous connecter'
          />;

    const error = this.state.error &&
          <Message error
            header='Erreur lors de la création de compte'
            content={this.state.message}
          />;

    return (
      <div className="add-form">
        <h1 style={{textAlign:'center'}}>
          Créer un compte
        </h1> <br />
        <Form size='huge' onSubmit={this.handleSubmit}>
          <Form.Input fluid 
            label="Nom d'utilisateur"
            placeholder='Rentrez votre pseudo ici'
            name='username' onChange={this.handleInputChange}
          />
          <Form.Input fluid 
            label="Addresse mail"
            placeholder='Rentrez votre adresse mail ici'
            name='email' onChange={this.handleInputChange}
          />
          <Form.Input fluid 
            label="Mot de passe"
            placeholder='Rentrez votre mot de passe ici'
            name='password' onChange={this.handleInputChange}
            type='password'
          />
          <Form.Button type='submit'>
            Créer un compte
          </Form.Button>
        </Form>
        {success}
        {error}
      </div>
    )
  }
}

export default UserRegister