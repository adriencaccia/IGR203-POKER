import React, { Component } from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { Marker, Popup } from 'react-leaflet';
import RegistrationButton from './RegistrationButton';
import APIManager from './APIManager';

class TourneyConfirm extends Component {
  state = { open: false };

  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <Marker position={[this.props.position[0],this.props.position[1]]} 
          icon={this.props.icon} >
        <Popup autoPan={false} closeButton={false}>
          <Card>
            <Card.Content className="popup-content">
              {/* <Image floated='right' size='mini' src={require('../icons/chip2_stacks.svg')}/> */}
              <Card.Header className="card-header">
                {this.props.name}
              </Card.Header>
              <Card.Meta className="card-meta">
                {this.props.address}, {this.props.zipCode}<br/>
                {this.props.tel}
              </Card.Meta>
              <Card.Description className="card-description">
                {this.props.day} à {this.props.startTime}.<br/>
                {/* connect to API */}
                Il reste <strong>2 places</strong> sur 18.
              </Card.Description>
            </Card.Content>
            <Card.Content className="popup-content-extra">
              {APIManager.getAuthToken()!="0"? 
                <RegistrationButton tourney={this.props}/>
              : 
                <div className="ui two buttons">
                  <Button onClick={this.props.goToConnect} className="registration-button"> 
                    Connectez vous 
                  </Button>
                </div>
              }
            </Card.Content>
          </Card>
        </Popup>
      </Marker>
    )
  }
}

export default TourneyConfirm