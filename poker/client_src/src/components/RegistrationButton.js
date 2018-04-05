import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

const inlineStyle = {
  modal : {
    marginTop: '40%',
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
      this.props.tourney.day +
      " à "+
      this.props.tourney.startTime +
      "."
  };

  show = () => {
    this.setState({ open: true });
    // console.log(this.props);
  };
  handleConfirm = () => this.setState({ open: false });
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