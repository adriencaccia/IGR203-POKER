import React, { Component } from 'react';
import { Form, Message, Modal, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import APIManager from './APIManager';

const inlineStyle = {
  modal: {
    marginTop: '40vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class UserLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
      success: false,
      error: false,
      message: "",
      open: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToMap = this.goToMap.bind(this);
  }

  goToMap(){
    this.props.history.push("/map");
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  logUser(newUser){
    APIManager.logIn(newUser
    ).then(response => {
      this.setState({
        success: true,
        error: false,
        message: this.state.username
      });
      APIManager.setAuthToken(response.data.id);
      APIManager.setUserName(newUser.username);
      APIManager.setUser(response.data.userId);
      setTimeout(this.goToMap,1800);
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
    this.logUser(newUser);
    e.preventDefault(); 
  }

  close = () => this.setState({ error: false });  

  render() {
    const messageSuccess = this.state.success &&
      <p>{'Bienvenue ' + this.state.message}</p>;

    const messageError = this.state.error &&
      // <p>{'Erreur : ' + this.state.message}</p>;
      <p>{'Veuillez vérifier les champs.'}</p>;

    const headerSuccess = this.state.success &&
      'Connection réussie';

    const headerError = this.state.error &&
      'Erreur lors de la connexion';

    return (
      <div className="add-form">
        <h1 className="app-header">
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
        <Modal dimmer={true} open={this.state.success||this.state.error}
          style={inlineStyle.modal} onClose={this.close}>
          <Modal.Header className="modal-header">
            {headerSuccess}
            {headerError}
          </Modal.Header>
          <Modal.Content className="modal-content">
            <Modal.Description className="modal-description">
              {messageSuccess}
              {messageError}
            </Modal.Description>
            {this.state.error &&
              <div className="modal-button-container">
                <Button onClick={this.close} id="modal-button">
                  Ok
                </Button>
              </div>
            }
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default UserLogin