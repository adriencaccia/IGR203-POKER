import React, { Component } from 'react';
import { Form, Modal, Button, Dropdown, Card, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import APIManager from './APIManager';

const inlineStyle = {
  modal : {
    marginTop: '40vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

const timeOpts = [
  // {text:'8:00',value:'8:00'},
  // {text:'8:30',value:'8:30'},
  // {text:'9:00',value:'9:00'},
  // {text:'9:30',value:'9:30'},
  // {text:'10:00',value:'10:00'},
  // {text:'10:30',value:'10:30'},
  // {text:'11:00',value:'11:00'},
  // {text:'11:30',value:'11:30'},
  // {text:'12:00',value:'12:00'},
  // {text:'12:30',value:'12:30'},
  // {text:'13:00',value:'13:00'},
  // {text:'13:30',value:'13:30'},
  // {text:'14:00',value:'14:00'},
  // {text:'14:30',value:'14:30'},
  // {text:'15:00',value:'15:00'},
  { text: '15:30', value: '15:30' },
  { text: '16:00', value: '16:00' },
  { text: '16:30', value: '16:30' },
  { text: '17:00', value: '17:00' },
  { text: '17:30', value: '17:30' },
  { text: '18:00', value: '18:00' },
  { text: '18:30', value: '18:30' },
  { text: '19:00', value: '19:00' },
  { text: '19:30', value: '19:30' },
  { text: '20:00', value: '20:00' },
  { text: '20:30', value: '20:30' },
  { text: '21:00', value: '21:00' },
  // {text:'21:30',value:'21:30'},
  // {text:'22:00',value:'22:00'},
];

const lvlOpts = [
  { text: 'Débutant', value: 'Débutant' },
  { text: 'Casu', value: 'Casu' },
  { text: 'Passionné', value: 'Passionné' },
  { text: 'Expert', value: 'Expert' },
  { text: 'Pro', value: 'Pro' },
];

const dayOpts = [
  { text: 'Lundi', value: 'Lundi' },
  { text: 'Mardi', value: 'Mardi' },
  { text: 'Mercredi', value: 'Mercredi' },
  { text: 'Jeudi', value: 'Jeudi' },
  { text: 'Vendredi', value: 'Vendredi' },
  { text: 'Samedi', value: 'Samedi' },
  { text: 'Dimanche', value: 'Dimanche' },
];

class UserTourneys extends Component {
  constructor(props){
    super(props);
    this.state = {
      tourney: {},
      date: "",
      time: "",
      difficulty: "",
      maxPlayers: 0,
      tourneys: [],
      error: false,
      success: false,
      delete: false,
      key: 0,
    };
    this.setTourneys();
    this.handleInputChangeMaxPlayers = this.handleInputChangeMaxPlayers.bind(this);
    this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    this.handleInputChangeLvl = this.handleInputChangeLvl.bind(this);
    this.handleInputChangeTime = this.handleInputChangeTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setTourneys() {
    var ids = [];
    var tourneys = [];
    APIManager.getUserData().then(response => {
      ids = response.data.userTourneys;
      if (ids.length !== 0) {
        for (let i = 0; i < ids.length; i++) {
          APIManager.getTourney(ids[i]).then(response => {
            tourneys.push(response.data);
            this.setState({
              tourneys: tourneys,
            });
          });
        }
      }
    });
  }

  close = () => {
    const bool = this.state.success;
    this.setState({
      error: false,
      success: false,
      delete: false,
      tourney: bool ? {} : this.state.tourney
    });
    this.setTourneys();
  }

  setTourneyByName(name) {
    var tourney = this.state.tourneys.filter((trn) => {
      return trn.name == name;
    })[0];
    this.setState({
      tourney: tourney,
      date: tourney.date,
      time: tourney.time,
      maxPlayers: tourney.maxPlayers,
      difficulty: tourney.difficulty,
    })
  }

  handleInputChangeTime(e, { value }) {
    this.setState({
      time: value
    });
  }

  handleInputChangeDate(e, { value }) {
    this.setState({
      date: value
    });
  }

  handleInputChangeLvl(e, { value }) {
    this.setState({
      difficulty: value
    });
  }

  handleInputChangeMaxPlayers(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    if (this.state.tourney.players > this.state.maxPlayers) {
      this.setState({
        error: true,
      })
    }
    else {
      const newData = {
        date: this.state.date,
        time: this.state.time,
        difficulty: this.state.difficulty,
        maxPlayers: this.state.maxPlayers,
      };
      APIManager.patchTourney(this.state.tourney.id, newData).then(res => {
          this.setState({
            success: true,
          });
      });
    }
    e.preventDefault();    
  }

  showDelete = () => this.setState({ delete: true });

  handleCancel = () => this.setState({ delete: false });

  handleConfirm = () => {
    APIManager.deleteTourney(this.state.tourney.id).then(() => {
      var idTourney = this.state.tourney.id;
      APIManager.getUserData().then(response => {
        var idsArray = response.data.userTourneys;
        idsArray.splice(idsArray.indexOf(idTourney), 1);
        APIManager.patchUser({userTourneys: idsArray}).then(() => {
          this.setState({
            delete: false,
            tourney: {},
            key: this.state.key+1
          });
          this.setTourneys();
        });
      });
    });
  };

  render() {
    const messageSuccess = this.state.success &&
      <p>{'Vous pouvez le retrouver sur la carte.'}</p>;

    const messageError = this.state.error &&
      // <p>{'Erreur : ' + this.state.message}</p>;
      <p>{'Joueurs Max doit être supérieur ou égal à '+this.state.tourney.players}</p>;

    const headerSuccess = this.state.success &&
      'Votre tournoi a bien été modifié';

    const headerError = this.state.error &&
      'Erreur sur le nombre de joueurs';

    return (
      <div className="add-form" onSubmit={this.handleInputSubmit}
        key={this.state.key}>
        <h1 className="app-header"> Mes tournois </h1><br/>
        <Dropdown
          className="tourneys-dropdown"
          placeholder="Sélectionnez un de vos tournois..."
          selection
          // loading={this.state.tourneys.length === 0}
          options={this.state.tourneys.map((tourney) => {
            return {
              text: tourney.name,
              value: tourney.name,
              className: "tourneys-item"
            }
          })}
          onChange={(e,data) => this.setTourneyByName(data.value)}
        />
        {!(Object.keys(this.state.tourney).length === 0 &&
          this.state.tourney.constructor === Object) &&
          <div>
            <Card className="tourneys-card">
              <Card.Content id="tourneys-card-content">
                <Card.Header className="card-header">
                  {this.state.tourney.name}
                </Card.Header>
                <Card.Meta className="card-meta">
                  {this.state.tourney.address}, {this.state.tourney.zipCode}<br />
                </Card.Meta>
                <Card.Description className="card-description">
                  {this.state.tourney.date} à {this.state.tourney.time}.<br />
                  {this.state.tourney.maxPlayers > this.state.tourney.players ?
                    <p>
                      Il reste <strong>
                        {this.state.tourney.maxPlayers - this.state.tourney.players} places </strong>
                      sur {this.state.tourney.maxPlayers}.
                    </p>
                    :
                    <p>
                      <strong>Il ne reste plus de places.</strong>
                    </p>
                  }<br />
                  Niveau de jeu conseillé: <strong>{this.state.tourney.difficulty}</strong>.
                </Card.Description>
              </Card.Content>
            </Card><br/>
            <Form onSubmit={this.handleSubmit} className="form">
              <Form.Group unstackable widths={2}>
                <Form.Select fluid label='Jour'
                  placeholder={this.state.tourney.date}
                  name='date' options={dayOpts}
                  onChange={this.handleInputChangeDate} />
                <Form.Select fluid label='Horaire de début'
                  placeholder={this.state.tourney.time}
                  name='time' options={timeOpts}
                  onChange={this.handleInputChangeTime} />
              </Form.Group><br />
              <Form.Group unstackable widths={2}>
                <Form.Input fluid label='Joueurs Max'
                  placeholder={this.state.tourney.maxPlayers}
                  name='maxPlayers' type='number'
                  onChange={this.handleInputChangeMaxPlayers} />
                <Form.Select fluid label='Niveau conseillé'
                  upward={true}
                  placeholder={this.state.tourney.difficulty}
                  name='difficulty' options={lvlOpts}
                  onChange={this.handleInputChangeLvl} />
              </Form.Group> <br />
              <Form.Group unstackable widths={2} style={{textAlign:"center"}}>
                <Form.Button type='submit' size='big'>
                  Modifier
                </Form.Button>
                <Form.Button type='button' size='big'
                  id="tourneys-delete-button"
                  onClick={this.showDelete}>
                  Supprimer
                </Form.Button>
                <Confirm style={inlineStyle.modal}
                  open={this.state.delete}
                  content='Êtes-vous sûr de vouloir supprimer ce tournoi ?'
                  cancelButton="Annuler"
                  confirmButton="Supprimer"
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm}
                  size="small"
                  className="registration-confirm"
                />
              </Form.Group>
              <Modal dimmer={true}
                style={inlineStyle.modal}
                open={this.state.success || this.state.error}>
                <Modal.Header className="modal-header">
                  {headerSuccess}
                  {headerError}
                </Modal.Header>
                <Modal.Content className="modal-content">
                  <Modal.Description className="modal-description">
                    {messageSuccess}
                    {messageError}
                  </Modal.Description>
                  {(this.state.error || this.state.success) &&
                    <div className="modal-button-container">
                      <Button onClick={this.close} id="modal-button">
                        Ok
                      </Button>
                    </div>
                  }
                </Modal.Content>
              </Modal>
            </Form>
          </div>
        }
        {this.state.tourneys.length === 0 &&
          <Card className="tourneys-card">
            <Card.Content id="tourneys-card-content">
              <Card.Header className="card-header">
                Vous n'avez pas créé de tournois pour l'instant
              </Card.Header>
              <Card.Description className="card-description">
                <Button as={Link} to="/games/add" icon="plus"
                  fluid
                  content="Organiser un tournoi"
                  id="tourneys-card-button"/>
              </Card.Description>
            </Card.Content>
          </Card>
        }
      </div>
    )
  }
}

export default UserTourneys