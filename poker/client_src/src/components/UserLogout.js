import React, { Component } from 'react';
import { Form, Message, Modal, Header } from 'semantic-ui-react';
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

class UserLogout extends Component {
  constructor(props) {
    super(props);
    this.goToHomepage = this.goToHomepage.bind(this);
  }

  goToHomepage() {
    this.props.history.push("/");
  }

  logOut(){
    APIManager.logOut().then(() => {
      APIManager.setAuthToken("0");
      APIManager.setUserName("0");
      APIManager.setUser("0");
    }).catch(() => {});
    setTimeout(this.goToHomepage, 1800);      
  }

  render() {
    this.logOut();

    return (
      <Modal dimmer={true} open={true}
        style={inlineStyle.modal} onClose={() => {}}>
        <Modal.Header className="modal-header">
          Déconnexion...
        </Modal.Header>
        <Modal.Content className="modal-content">
          <Modal.Description className="modal-description">
            Vous allez être redirigé vers la page d'accueil.
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UserLogout