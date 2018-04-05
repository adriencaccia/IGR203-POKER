import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import Main from './Main';
import { Link } from 'react-router-dom';

class NavBarMain extends Component {
  state = { visible: false };

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
            <Link to='/games/add'>
              <Menu.Item>
                <Icon name="plus" /><br/>
                Organiser un tournoi
              </Menu.Item>
            </Link>
            <Link to='/timer'>
              <Menu.Item>
                <Icon name="play" /><br/>
                Gérer mon tournoi
              </Menu.Item>
            </Link>
            <Link to='/profile'>
              <Menu.Item>
                <Icon name="user" /><br/>
                Mon profil
              </Menu.Item>
            </Link>
            <Link to='/faq'>
              <Menu.Item>
                <Icon name="question circle outline" /><br/>
                FAQ
              </Menu.Item>
            </Link>
            <Link to='/disconnect'>
              <Menu.Item>
                <Icon name="close" /><br/>
                Se déconnecter
              </Menu.Item>
            </Link>
            <Link to='/login'>
              <Menu.Item>
                <Icon name="user circle" /><br/>
                Se connecter
              </Menu.Item>
            </Link>
            <Link to='/register'>
              <Menu.Item>
                <Icon name="add user" /><br/>
                Créer un compte
              </Menu.Item>
            </Link>
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
              <Main />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default NavBarMain