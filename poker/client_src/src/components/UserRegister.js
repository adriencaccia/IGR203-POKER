import React, { Component } from 'react';
import { Form, Message, Modal, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import APIManager from './APIManager';

const inlineStyle = {
  modal: {
    marginTop: '40vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class UserRegister extends Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      email: "",
      password: "",
      success: false,
      error: false,
      message: "",
      open: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToMainPage = this.goToMainPage.bind(this);
  }

  goToMainPage() {
    this.props.history.push("/map");
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addUser(newUser){
    APIManager.register(newUser
    ).then(() => {
      this.setState({
        success: true,
        error: false,
      });
      setTimeout(this.goToMainPage, 3000);
      APIManager.logIn(newUser).then(response => {
        APIManager.setAuthToken(response.data.id);
        APIManager.setUserName(newUser.username);
        APIManager.setUser(response.data.userId);
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
      password: this.state.password,
      elo: ["1500"],
      playedTourneys: ["0"],
      userTourneys: ["0"]
    };
    this.addUser(newUser);
    e.preventDefault();    
  }

  close = () => this.setState({ error: false });  

  render() {
    const messageSuccess = this.state.success &&
      <p>{'Vous allez être redirigé vers la carte'}</p>;

    const messageError = this.state.error &&
      // <p>{'Erreur : ' + this.state.message}</p>;
      <p>{'Veuillez vérifier les champs.'}</p>;

    const headerSuccess = this.state.success &&
      'Votre compte a bien été créé';

    const headerError = this.state.error &&
      'Erreur lors de la création de compte';

    return (
      <div className="add-form">
        <h1 className="app-header">
          Créer un compte
        </h1> <br />
        <Form size='huge' onSubmit={this.handleSubmit}>
          <Form.Input fluid 
            label="Nom d'utilisateur"
            placeholder='Rentrez votre pseudo ici'
            name='username' onChange={this.handleInputChange}
          />
          <Form.Input fluid 
            label="Adresse mail"
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
        <Modal dimmer={true} open={this.state.success || this.state.error}
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

export default UserRegister