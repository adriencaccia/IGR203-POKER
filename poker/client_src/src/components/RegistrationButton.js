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

class RegistrationButton extends Component {
  state = { 
    open: false,
    content: "Confirmez vote inscription au bar " +
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
      if(newPlayerIds[0]=="0"){
        newPlayerIds=[APIManager.getUser()];
      }else{
        newPlayerIds.push(APIManager.getUser());
      }
      var tourneyData = {
        players: resp.data.players+1,
        playerIds: newPlayerIds
      };
      APIManager.patchTourney(this.props.tourney.id,tourneyData).then(() => {
        this.props.updateMap();
      }).catch(err => console.log(err));  
    }).catch(err => console.log(err));
    
    //this.props.updateMap();
    //this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div className='ui two buttons'>
        <Button className="registration-button" onClick={this.show}>
          S'inscrire
        </Button>
        <Confirm style={inlineStyle.modal}
          open={this.state.open}
          content={this.state.content}
          cancelButton="Annuler"
          confirmButton="Je m'inscris"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size="mini"
          className="registration-confirm"
        />
      </div>
    )
  }
}

export default RegistrationButton