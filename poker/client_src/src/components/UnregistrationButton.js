import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import APIManager from './APIManager';

const inlineStyle = {
  modal : {
    marginTop: '40vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class UnregistrationButton extends Component {
  state = { 
    open: false,
    content: "Confirmez vote désinscription au bar " +
      this.props.tourney.name +
      " le "+
      this.props.tourney.date +
      " à "+
      this.props.tourney.time +
      "."
  };

  show = () => {
    this.setState({ open: true });
    // console.log(this.props);
  };
  handleConfirm = () => {
    APIManager.getTourney(this.props.tourney.id).then(resp => {
      var newPlayerIds = resp.data.playerIds;
      newPlayerIds.splice(newPlayerIds.indexOf(APIManager.getUser()), 1);
      if (newPlayerIds.length == 0) {
        newPlayerIds.push("0");
      }
      var tourneyData = {
        players: this.props.tourney.players - 1,
        playerIds: newPlayerIds
      };
      APIManager.patchTourney(this.props.tourney.id, tourneyData).then(() => {
        this.props.updateMap();
      }).catch(err => console.log(err));
    //this.props.updateMap();
    //this.setState({ open: false });
    }).catch(err => console.log(err));
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div className='ui two buttons'>
        <Button className="unregistration-button" onClick={this.show}>
          Se désinscrire
        </Button>
        <Confirm style={inlineStyle.modal}
          open={this.state.open}
          content={this.state.content}
          cancelButton="Annuler"
          confirmButton="Je me désinscris"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size="mini"
          className="registration-confirm"
        />
      </div>
    )
  }
}

export default UnregistrationButton