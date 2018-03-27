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
            <Menu.Item>
              <Link to='/'>
                <Icon name="search" /><br/>
                Trouver un tournoi
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/games/add'>
                <Icon name="plus" /><br/>
                Organiser un tournoi
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/timer'>
                <Icon name="play" /><br/>
                Gérer mon tournoi
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/profile'>
                <Icon name="user" /><br/>
                Mon profil
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/faq'>
                <Icon name="question circle outline" /><br/>
                FAQ
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/disconnect'>
                <Icon name="close" /><br/>
                Se déconnecter
              </Link>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Icon
              className="navbar-button"
              name="sidebar"
              size="big"
              // color="red"
              onClick={this.toggleVisibility} 
            />
            <div onClick={this.disableVisibility}>
              <Main />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default NavBarMain