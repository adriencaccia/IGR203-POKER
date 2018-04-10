import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon, Button } from 'semantic-ui-react';
import Main from './Main';
import { Link } from 'react-router-dom';
import APIManager from './APIManager';

class NavBarMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
  }

  // componentDidMount() {
  //   window.screen.lockOrientationUniversal = 
  //     window.screen.lockOrientation || 
  //     window.screen.mozLockOrientation || 
  //     window.screen.msLockOrientation ||
  //     window.screen.orientation.lock;
  //   window.screen.lockOrientationUniversal("portrait");
  //   if ('ontouchstart' in document.documentElement) {
  //     document.body.style.cursor = 'pointer';
  //   }
  // }

  isLogged = () => {
    return APIManager.getAuthToken()!="0";
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
            {this.isLogged() && <Link to='/map'>
              <Menu.Item className="sidebar-item">
                <Icon name="map" /><br/>
                Trouver un tournoi
              </Menu.Item>
            </Link>}
            {this.isLogged() && <Link to='/games/add'>
              <Menu.Item className="sidebar-item">
                <Icon name="plus" /><br/>
                Organiser un tournoi
              </Menu.Item>
            </Link>}
            {this.isLogged() && <Link to='/timer'>
              <Menu.Item className="sidebar-item">
                <Icon name="play" /><br/>
                Gérer mon tournoi
              </Menu.Item>
            </Link>}
            {this.isLogged() && <Link to='/tourneys'>
              <Menu.Item className="sidebar-item">
                <Icon name="life ring" /><br />
                Mes tournois
              </Menu.Item>
            </Link>}
            {this.isLogged() && <Link to='/profile'>
              <Menu.Item className="sidebar-item">
                <Icon name="line graph" /><br/>
                Mes statistiques
              </Menu.Item>
            </Link>}
            {!this.isLogged() && <Link to='/'>
              <Menu.Item className="sidebar-item">
                <Icon name="home" /><br/>
                Page d'accueil
              </Menu.Item>
            </Link>}
            {this.isLogged() && <Link to='/disconnect'>
              <Menu.Item className="sidebar-item">
                <Icon name="close" /><br/>
                Se déconnecter
              </Menu.Item>
            </Link>}
            {!this.isLogged() && <Link to='/login'>
              <Menu.Item className="sidebar-item">
                <Icon name="user circle" /><br/>
                Se connecter
              </Menu.Item>
            </Link>}
            {!this.isLogged() && <Link to='/register'>
              <Menu.Item className="sidebar-item">
                <Icon name="add user" /><br/>
                Créer un compte
              </Menu.Item>
            </Link>}
          </Sidebar>
          <Sidebar.Pusher>
            <Button icon compact
              size="massive"
              className="navbar-button"
              onClick={this.toggleVisibility}
            >
              <Icon
                className="navbar-button-icon"
                name="bars"
              />
            </Button>
            {/* <img
              className="navbar-button"
              onClick={this.toggleVisibility}               
              src={require('../icons/EXPORTS/SVG/poker_BLEU-03.svg')}
              width="100" 
            /> */}
            <div onClick={this.disableVisibility} className="main-container">
              <Main/>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default NavBarMain