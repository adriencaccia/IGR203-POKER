import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Step } from 'semantic-ui-react';

class Homepage extends Component {
  render(){
    return (
      <div className="homepage">
        <h1 className="app-header"> IGR203 Poker </h1>
        <div className="homepage-container">
          <Step.Group className="homepage-stepgroup" vertical>
            <Step className="homepage-step">
              <Icon name='search' />
              <Step.Content className="homepage-content">
                <Step.Title>Carte interactive</Step.Title>
                <Step.Description id="homepage-description-map">
                  Trouvez des tournois près de chez vous et
                  inscrivez vous en un clic !
                </Step.Description>
              </Step.Content>
            </Step>

            <Step className="homepage-step">
              <Icon name="line graph" />
              <Step.Content className="homepage-content">
                <Step.Title>Progressez au poker</Step.Title>
                <Step.Description id="homepage-description-stats">
                  Confrontez à des joueurs de votre niveau et
                  progressez au poker à chaque tournoi !
                </Step.Description>
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

export default Homepage;
