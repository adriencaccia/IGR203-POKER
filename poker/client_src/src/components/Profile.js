import React, {Component} from 'react';
import APIManager from './APIManager';
import {Menu} from 'semantic-ui-react';

class Profile extends Component{	
	constructor(props){
		super(props);
		this.state={
      user:{},
      activeItem:"Elo"
		};
	}

  handleItemClick = (e,{name}) => {
    this.setState({
      activeItem:name
    });
  }

	updateProfile(){
		APIManager.getUserData().then(response => {
      if(this.state.user.id!=response.data.id){
        this.setState({
          user:response.data
        });
      }      
    }).catch(err => {console.log(err)});
	}

	render(){
    //this.updateProfile();
    var eloList = this.user.elo;
    var tourneyList = this.user.tourneys;
    var tourneyDates = this.user.tourneyDates;
    const activeItem = this.state.activeItem;
    var LineChart = require("react-chartjs").Line;
    var pane;
    switch(this.state.activeItem){
      case "Elo":
        var chartData=[];
        for(var i=0;i<this.state.user;i++){
          chartData.push({label:tourneyDates[i],value:eloList[i]});
        }
        var chartOptions={
          
        };
        var graphComp = React.createClass({
          render: function() {
            return <LineChart data={chartData} options={chartOptions} width="600" height="250" />
          }
        });
        pane=graphComp;
        break;
      case "Parties Récentes":
        pane=<div>this is tab2</div>;
        break;
      case "Classement":
        pane=<div>this is tab3</div>;
        break;

    }

		return(
			<div>
				<h1 className="app-header">Profile - {APIManager.getUsername()}</h1>
        <Menu widths={3}>
          <Menu.Item
            name='Elo'
            active={activeItem === 'Elo'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Parties Récentes'
            active={activeItem === 'Parties Récentes'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Classement'
            active={activeItem === 'Classement'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {pane}
			</div>

		)
	}

}

export default Profile;