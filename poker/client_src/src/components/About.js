import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Step } from 'semantic-ui-react';

class About extends Component {
  render(){
    return (
      <div className="homepage">
        <h1 className="app-header"> IGR203 Poker </h1>
        <div className="homepage-container">
          <Step.Group className="homepage-stepgroup" vertical>
            <Step className="homepage-step">
              <Icon name='truck' />
              <Step.Content className="homepage-content">
                <Step.Title>Shipping</Step.Title>
                <Step.Description>Choose your shipping options</Step.Description>
              </Step.Content>
            </Step>

            <Step className="homepage-step">
              <Icon name='payment' />
              <Step.Content className="homepage-content">
                <Step.Title>Billing</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
              </Step.Content>
            </Step>

            <Step className="homepage-step">
              <Icon name='info' />
              <Step.Content className="homepage-content">
                <Step.Title>Confirm Order</Step.Title>
              </Step.Content>
            </Step>

            <Step className="homepage-step-button" as={Link} to="/login">
              <Icon name='user circle' className="homepage-icon"/>
              <Step.Content className="homepage-content-button">
                <Step.Title>Se connecter</Step.Title>
              </Step.Content>
            </Step>

            <Step className="homepage-step-button" as={Link} to="/register">
              <Icon name='add user' className="homepage-icon" />
              <Step.Content className="homepage-content-button">
                <Step.Title>Créer un compte</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group><br/>
          {/* <Button as={Link} to="/login"
            className="homepage-connect"
            content="Se connecter"
            icon="user circle"
            size="big"/><br/>
          <Button as={Link} to="/register"
            className="homepage-register"
            content="Créer un compte"
            icon="add user"
            size="big"/> */}
        </div>
      </div>
    )
  } 
}

export default About;
