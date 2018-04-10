import React, { Component } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import axios from 'axios';
import Geocode from 'react-geocode';
import {Link} from 'react-router-dom';
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
  {text:'15:30',value:'15:30'},
  {text:'16:00',value:'16:00'},
  {text:'16:30',value:'16:30'},
  {text:'17:00',value:'17:00'},
  {text:'17:30',value:'17:30'},
  {text:'18:00',value:'18:00'},
  {text:'18:30',value:'18:30'},
  {text:'19:00',value:'19:00'},
  {text:'19:30',value:'19:30'},
  {text:'20:00',value:'20:00'},
  {text:'20:30',value:'20:30'},
  {text:'21:00',value:'21:00'},
  // {text:'21:30',value:'21:30'},
  // {text:'22:00',value:'22:00'},
]

const lvlOpts = [
  { text: 'Débutant', value: 'Débutant' },
  { text: 'Casu', value: 'Casu' },
  { text: 'Passionné', value: 'Passionné' },
  { text: 'Expert', value: 'Expert' },
  { text: 'Pro', value: 'Pro' },
]

const dayOpts = [
  {text:'Lundi',value:'Lundi'},
  {text:'Mardi',value:'Mardi'},
  {text:'Mercredi',value:'Mercredi'},
  {text:'Jeudi',value:'Jeudi'},
  {text:'Vendredi',value:'Vendredi'},
  {text:'Samedi',value:'Samedi'},
  {text:'Dimanche',value:'Dimanche'},
]

class AddForm extends Component {
  constructor(props){
    super(props);
    this.state={
      "name": "",
      "zipCode": "",
      "city": "",
      "address": "",
      "date": "",
      "time": "",
      "difficulty": "",
      "players": 0,
      "maxPlayers": 0,
      "position": [{}],
      success: false,
      error: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    this.handleInputChangeLvl = this.handleInputChangeLvl.bind(this);
    this.handleInputChangeTime = this.handleInputChangeTime.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.goToMainPage = this.goToMainPage.bind(this);
  }

  close = () => this.setState({
    error: false,
    success: false,
  });

  goToMainPage(){
    this.props.history.push("/map");
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleInputChangeTime(e,{value}){
    this.setState({
      time:value
    });
  }

  handleInputChangeDate(e,{value}){
    this.setState({
      date:value
    });
  }

  handleInputChangeLvl(e,{value}){
    this.setState({
      difficulty:value
    });
  }

  AddGame(newGame){
    APIManager.addTourney(newGame).then(resp => {
      APIManager.getUserData().then(response => {
        var newUserTourneys = response.data.userTourneys;
        if(newUserTourneys[0]=="0"){
          newUserTourneys=[resp.data.id];
        }else{
          newUserTourneys.push(resp.data.id);
        }
        APIManager.addUserTourneyToPlayer(newUserTourneys).then(() => {
          this.setState({
            success: true,
          });
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
    //console.log(newGame);
  }

  handleInputSubmit(e){
    Geocode.setApiKey("AIzaSyDpw34ry4PcRAMAYmwgNjSWxpSMd32R3_4");
    Geocode.fromAddress(this.state.address+this.state.city+this.state.zipCode).then(
      response => {
        this.setState({
          position: response.results[0].geometry.location
        }); 
        console.log(this.state.position);

        const newGame={
          name: this.state.name,
          zipCode: this.state.zipCode,
          city: this.state.city,
          address: this.state.address,
          date: this.state.date,
          time: this.state.time,
          difficulty: this.state.difficulty,
          players: 0,
          maxPlayers: parseInt(this.state.maxPlayers, 10),
          position:[this.state.position.lat,this.state.position.lng],
          playerIds:["0"]
        };
        console.log(newGame);
        this.AddGame(newGame);
      },
      () => {
        this.setState({
          error: true,
        });
      }
    );
    e.preventDefault();    
  }

  render() {
    const messageSuccess = this.state.success &&
      <p>{'Vous pouvez le retrouver sur la carte.'}</p>;

    const messageError = this.state.error &&
      // <p>{'Erreur : ' + this.state.message}</p>;
      <p>{'Veuillez vérifier les champs.'}</p>;

    const headerSuccess = this.state.success &&
      'Votre tournoi a bien été créé';

    const headerError = this.state.error &&
      'Erreur lors de la création du tournoi';

    return (
      <div className="add-form" onSubmit={this.handleInputSubmit}>
        <h1 className="app-header"> Organiser un tournoi </h1><br/>
        <Form size='big' onSubmit={this.handleSubmit} className="form">
          <Form.Input fluid label='Nom du bar'
            placeholder='Ex: Le Baratin' name='name'
            onChange={this.handleInputChange}/>
          <Form.Input fluid label='Adresse'
            placeholder='Ex: 3 rue des Crêpes'
            name='address' onChange={this.handleInputChange}/>
          <Form.Group unstackable widths={2}>
            <Form.Input fluid label='Ville'
              placeholder='Ex: Paris'
              name='city' onChange={this.handleInputChange}/>
            <Form.Input fluid label='Code Postal'
              placeholder='Ex: 75001'
              name='zipCode' onChange={this.handleInputChange}/>
          </Form.Group><br/>
          <Form.Group unstackable widths={2}>
            <Form.Select fluid label='Jour'
              // placeholder='Jour'
              name='date' options={dayOpts} 
              onChange={this.handleInputChangeDate}/>
            <Form.Select fluid label='Horaire de début'
              // placeholder='Heure'
              name='time' options={timeOpts}
              onChange={this.handleInputChangeTime}/>
          </Form.Group><br/>
          <Form.Group unstackable widths={2}>
            <Form.Input fluid label='Joueurs Max'
              placeholder='Ex: 16'
              name='maxPlayers' type='number'
              onChange={this.handleInputChange}/>
            <Form.Select fluid label='Niveau conseillé'
              upward={true}
              // placeholder='Niveau'
              name='difficulty' options={lvlOpts}
              onChange={this.handleInputChangeLvl}/>
          </Form.Group> <br/>
          <Form.Button type='submit'>Créer un tournoi</Form.Button>
          <Modal dimmer={true} 
            style={inlineStyle.modal}
            open={this.state.success||this.state.error}>
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
    )
  }
}

export default AddForm