import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import Main from './Main';
import { Link } from 'react-router-dom';

class NavBarMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false, 
      authToken: "0" 
    }
    this.setTokenId = this.setTokenId.bind(this);
    this.getTokenId = this.getTokenId.bind(this);
  }

  setTokenId = (tokenId) => {
    console.log("setting token Id");
    console.log(tokenId);
    this.setState({ authToken: tokenId})
  };

  getTokenId = () => {
    console.log("getting token Id");
    console.log(this.state.authToken);
    return this.state.authToken;
  };

  isLogged = () => {
    return this.state.authToken!="0";
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  disableVisibility = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state
    return (
      <div className='navbar'>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} 
              icon='labeled' vertical inverted onClick={this.disableVisibility}>
            <Link to='/'>
              <Menu.Item>
                <Icon name="search" /><br/>
                Trouver un tournoi
              </Menu.Item>
            </Link>
            {this.isLogged() && <Link to='/games/add'>
              <Menu.Item>
                <Icon name="plus" /><br/>
                Organiser un tournoi
              </Menu.Item>
            </Link>}
            {this.isLogged() && <Link to='/timer'>
              <Menu.Item>
                <Icon name="play" /><br/>
                Gérer mon tournoi
              </Menu.Item>
            </Link>}
            {this.isLogged() && <Link to='/profile'>
              <Menu.Item>
                <Icon name="user" /><br/>
                Mon profil
              </Menu.Item>
            </Link>}
            <Link to='/faq'>
              <Menu.Item>
                <Icon name="question circle outline" /><br/>
                FAQ
              </Menu.Item>
            </Link>
            {this.isLogged() && <Link to='/disconnect'>
              <Menu.Item>
                <Icon name="close" /><br/>
                Se déconnecter
              </Menu.Item>
            </Link>}
            {!this.isLogged() && <Link to='/login'>
              <Menu.Item>
                <Icon name="user circle" /><br/>
                Se connecter
              </Menu.Item>
            </Link>}
            {!this.isLogged() && <Link to='/register'>
              <Menu.Item>
                <Icon name="add user" /><br/>
                Créer un compte
              </Menu.Item>
            </Link>}
          </Sidebar>
          <Sidebar.Pusher>
            {/* <Icon
              className="navbar-button"
              name="sidebar"
              size="big"
              // color="red"
              onClick={this.toggleVisibility} 
            /> */}
            <img
              className="navbar-button"
              onClick={this.toggleVisibility}               
              src={require('../icons/EXPORTS/SVG/poker_BLEU-03.svg')}
              width="100" 
            />
            <div onClick={this.disableVisibility} className="main-container">
              <Main setTokenId={this.setTokenId} getTokenId={this.getTokenId}/>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default NavBarMain