import React, { Component } from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { Marker, Popup } from 'react-leaflet';
import RegistrationButton from './RegistrationButton';
import L from 'leaflet';
import APIManager from './APIManager';

class TourneyConfirm extends Component {
  render() {
    const rButton = (this.props.maxPlayers > this.props.players &&
      !this.props.playerIds.includes(APIManager.getUser())) &&
      <Card.Content className="popup-content-extra">
        <RegistrationButton tourney={this.props} closeTourney={this.hide}
          updateMap={this.props.updateMap} />
      </Card.Content>;

    const registered = this.props.playerIds.includes(APIManager.getUser()) &&
      <Card.Content className="popup-content-extra">
        <strong style={{fontSize:"20px"}}>Vous êtes déjà inscrit.</strong>
      </Card.Content>;

    return (
       <Marker position={[this.props.position[0],this.props.position[1]]} 
          icon={this.props.icon} >
        <Popup autoPan={false} closeButton={false}>
          <Card>
            <Card.Content className="popup-content">
              <Card.Header className="card-header">
                {this.props.name}
              </Card.Header>
              <Card.Meta className="card-meta">
                {this.props.address}, {this.props.zipCode}<br/>
              </Card.Meta>
              <Card.Description className="card-description">
                {this.props.date} à {this.props.time}.<br/>
                {/* connect to API */}
                {this.props.maxPlayers>this.props.players?
                  <p>
                    Il reste <strong>
                    {this.props.maxPlayers-this.props.players} places </strong>
                     sur {this.props.maxPlayers}.
                  </p>
                :
                  <p>
                    <strong>Il ne reste plus de places.</strong>
                  </p>
                }<br/>
                Niveau de jeu conseillé: <strong>{this.props.difficulty}</strong>.
              </Card.Description>
            </Card.Content>
            {/* {this.props.maxPlayers>this.props.players && 
              <Card.Content className="popup-content-extra">
                <RegistrationButton tourney={this.props} closeTourney={this.hide}
                  updateMap={this.props.updateMap}/>
              </Card.Content>
            } */}
            {rButton}
            {registered}
          </Card>
        </Popup>
      </Marker>
    )
  }
}

export default TourneyConfirm