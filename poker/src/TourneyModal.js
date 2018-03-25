import React, { Component } from 'react';
import { Icon, Button, Header, Image, Modal, Card } from 'semantic-ui-react';
import { Marker, Popup } from 'react-leaflet';


const inlineStyle = {
  modal : {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class TourneyModal extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });

  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
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
                <div className='ui two buttons'>
                  <Button basic color='green' onClick={this.show('blurring')}>
                    S'inscrire
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Popup>
        </Marker>
        <Modal dimmer={dimmer} open={open} onClose={this.close}
             style={inlineStyle.modal}>
          <Modal.Header>{this.props.name}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={require('./chip2_stacks.svg')} />
            <Modal.Description>
              <Header>{this.props.day} à {this.props.startTime}</Header>
              <p>{this.props.address}, {this.props.zipCode}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Non
            </Button>
            <Button positive icon='checkmark' labelPosition='right' 
              content="S'inscrire" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default TourneyModal