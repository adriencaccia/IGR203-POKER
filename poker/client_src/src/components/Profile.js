import React, {Component} from 'react';
import APIManager from './APIManager';
import {Menu, Feed, Pagination, Icon} from 'semantic-ui-react';
import {Line} from 'react-chartjs-2';

class Profile extends Component{	
	constructor(props){
		super(props);
		this.state={
      user:{},
      activeItem:"Niveau de jeu",
      activeRanking:"1"
    };
    // this.updateProfile();
    this.handlePageChange = this.handlePageChange.bind(this);
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
  
  getEloChart(){
    var eloList = this.state.user.elo;
    eloList = ["1500","1450","1475","1515","1497",
      "1502","1515","1534","1569","1547"];
    var minElo = Math.min.apply(Math, eloList);
    var maxElo = Math.max.apply(Math, eloList);
    var chartData=[];
    var chartLabels=[];
    for(var i=0;i<eloList.length;i++){
      chartData.push(eloList[i]);
      chartLabels.push(i);
    }
    console.log(chartData);
    var data={labels:chartLabels, 
      datasets:[{
        label: 'Elo',
        fill: true,
        lineTension: 0.1,
        backgroundColor: '#b34640',
        backgroundWidth: 5,
        borderColor: '#b34640',
        borderCapStyle: 'square',
        borderJoinStyle: 'miter',
        pointBorderColor: '#b34640',
        pointBackgroundColor: '#e8d9c9',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#e8d9c9',
        pointHoverBorderColor: '#b34640',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: chartData}]
    };
    return <div className="elo-chart">
            <Line data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  display:false
                },
                title: {
                  display:true,
                  position: 'bottom',
                  fontColor: '#b34640',
                  fontSize: '20',
                  text: 'Evolution de votre Elo'
                },
                scales: {
                  xAxes: [{
                    ticks: {
                      display:false,
                      max:11,
                      fontColor: '#b34640',                    
                    },
                    gridLines:{
                      // display:false,
                      drawTicks:false,
                      color: '#b34640'
                    }
                  }],
                  yAxes: [{
                    ticks: {
                      padding:5,
                      min: Math.round(minElo/50)*50-100,
                      max: Math.round(maxElo/50)*50+50,
                      fontColor: '#b34640',                    
                    },
                    gridLines:{
                      drawTicks:false,
                      drawBorder:false,
                      color: '#b34640'
                    }
                  }], 
                }
              }}
            />
          </div>;
  }

  getTourneyList(){
    var tourneys = [
      {
        date:"17-03-2018",
        place:"2",
        players:"11",
        eloDiff:"+35",
        name:"Soyouz" 
      },
      {
        date:"15-03-2018",
        place:"4",
        players:"13",
        eloDiff:"+19",
        name:"L'Excuse" 
      },
      {
        date:"08-03-2018",
        place:"4",
        players:"11",
        eloDiff:"+13",
        name:"L'Excuse" 
      },
      {
        date:"01-03-2018",
        place:"6",
        players:"15",
        eloDiff:"+5",
        name:"L'Excuse" 
      },
      {
        date:"10-02-2018",
        place:"8",
        players:"16",
        eloDiff:"-18",
        name:"Soyouz" 
      },
      {
        date:"08-02-2018",
        place:"2",
        players:"14",
        eloDiff:"+40",
        name:"L'Excuse" 
      },
      {
        date:"01-02-2018",
        place:"7",
        players:"14",
        eloDiff:"+25",
        name:"L'Excuse" 
      },
      {
        date:"25-01-2018",
        place:"11",
        players:"15",
        eloDiff:"-50",
        name:"L'Excuse" 
      },
    ];
    return <Feed className="tourney-feed">
      <div className="feed-element-first">
        <div className="feed-date">
          22-03-2018
        </div>
        <div className="feed-bar">
          <strong>L'Excuse</strong>
        </div>
        <div className="feed-rank">
          Votre placement: <strong>10/16</strong>
        </div>
        <div className="feed-elo">
          Elo: <strong>-22</strong>
        </div>
      </div>
      {tourneys.map((object,i) => {
        return <div className="feed-element">
            <div className="feed-date">
              {object.date}
            </div>
            <div className="feed-bar">
              <strong>{object.name}</strong>
            </div>
            <div className="feed-rank">
              Votre placement: <strong>{object.place}/{object.players}</strong>
            </div>
            <div className="feed-elo">
              Elo: <strong>{object.eloDiff}</strong>
            </div>
          </div>;
      })}
    </Feed>
  }

  handlePageChange(e,data){
    console.log(data);
    this.setState({
      activeRanking:data.activePage
    });
  }

  getRanking(){
    var playerRankPage = 1;
    var players = [
      {username:"Lorkis", elo:"2310"},
      {username:"Zunrin", elo:"2117"},
      {username:"Jacques", elo:"2081"},
      {username:"Michelle", elo:"2051"},
      {username:"Robert", elo:"2017"},
      {username:"Henri", elo:"1984"},
      {username:"Jean", elo:"1981"},
      {username:"Regis", elo:"1973"},
      {username:"Paul", elo:"1951"},
      {username:"Quentin", elo:"1930"},
      {username:"Claire", elo:"1912"},
      {username:"Bastien", elo:"1851"},
      {username:"Jeanne", elo:"1827"},
      {username:"Jules", elo:"1803"},
      {username:"Jerome", elo:"1776"},
      {username:"Maxime", elo:"1765"},
      {username:"Justine", elo:"1749"},
      {username:"Antoine", elo:"1731"},
      {username:"Chris", elo:"1728"},
      {username:"Luc", elo:"1702"},
      {username:"Kevin", elo:"1659"},
      {username:"Maurice", elo:"1648"},
      {username:"Jean Paul", elo:"1617"},
      {username:"Marie", elo:"1578"},
      {username:"Alexis", elo:"1567"},
      {username:"Arthur", elo:"1516"},
      {username:"Marion", elo:"1479"},
      {username:"Camille", elo:"1468"},
      {username:"Arnaud", elo:"1453"}
    ];
    var numPages = Math.ceil(players.length/10);
    var playersOnPage = [];
    var startP = 10*(this.state.activeRanking-1);
    for(var i=0; i<10; i++){
      if(startP+i<players.length){
        playersOnPage.push(players[startP+i]);
      }
    }
    return <div className="rank">
          {playersOnPage.map((object,i) => {
            return <div className="rank-page">
                <div className="rank-name">
                  {startP+i+1}. {object.username}
                </div>
                <div className="rank-elo">
                  {object.elo}
                </div>

              </div>
          })}<br/>
        <Pagination className="rank-pagination"
          defaultActivePage={playerRankPage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          prevItem={{content: <Icon name='angle left'/>, icon:true}}
          nextItem={{content: <Icon name='angle right'/>, icon:true}}
          totalPages={numPages}
          onPageChange={this.handlePageChange}
        />
      </div>
  }

	render(){
    //this.updateProfile();
    var tourneys = this.state.user.playedTourneys;
    var tourneyDates = this.state.user.tourneyDates;
    const activeItem = this.state.activeItem;
    var pane;
    switch(this.state.activeItem){
      case "Niveau de jeu":
        pane = this.getEloChart();
        break;
      case "Tournois":
        pane = this.getTourneyList();
        break;
      case "Classement":
        pane = this.getRanking();
        break;
    }

		return(
			<div>
				<h1 className="app-header">{APIManager.getUsername()}</h1>
        <Menu widths={3} id="stats" borderless>
          <Menu.Item
            className="stats-item"
            name='Niveau de jeu'
            active={activeItem === 'Niveau de jeu'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            className="stats-item"
            id="stats-item-middle"
            name="Tournois"
            active={activeItem === 'Tournois'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            className="stats-item"
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