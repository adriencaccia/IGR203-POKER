import React, { Component } from 'react';
import { Icon, Button, Header, Image, Confirm, Card } from 'semantic-ui-react';
import { Marker, Popup } from 'react-leaflet';
import RegistrationButton from './RegistrationButton';

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
            <Card.Content>
              <Image floated='right' size='mini' src={require('./chip2_stacks.svg')}/>
              <Card.Header>
                {this.props.name}
              </Card.Header>
              <Card.Meta>
                {this.props.address}, {this.props.zipCode}
              </Card.Meta>
              <Card.Description>
                {this.props.day} à {this.props.startTime}.<br/>
                {/* connect to API */}
                Il reste <strong>2 places</strong> sur 18.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <RegistrationButton tourney={this.props}/>
            </Card.Content>
          </Card>
        </Popup>
      </Marker>
    )
  }
}

export default TourneyConfirm