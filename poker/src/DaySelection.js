import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Lundi', value: 'Lundi' },
  { key: 2, text: 'Mardi', value: 'Mardi' },
  { key: 3, text: 'Mercredi', value: 'Mercredi' },
  { key: 4, text: 'Jeudi', value: 'Jeudi' },
  { key: 5, text: 'Vendredi', value: 'Vendredi' },
  { key: 6, text: 'Samedi', value: 'Samedi' },
  { key: 7, text: 'Dimanche', value: 'Dimanche' },
];

const renderLabel = label => ({
  color: 'red',
  content: `${label.value}`,
});

class DaySelection extends Component {
  constructor(){
    super();
    this.state = {value: ""};
    this.clear = this.clear.bind(this);
  }

  updateValue(data) {
    this.setState({
      value: data.value,
    });
  }

  clear() {
    this.setState({
      value: "",
    });
  }

  render() {
    return (
      <div className="day-select">
        <Dropdown
          multiple
          selection
          fluid
          options={options}
          placeholder='Filtrer les jours'
          renderLabel={renderLabel}
          compact
          onChange={(e, data) => {this.props.updateMap(e, data); this.updateValue(data)}}
          value={this.state.value}
        />
        {/*
        <Button 
          icon="close"
          onClick={(e) => {this.clear(); this.props.updateMap(e,{value: []})}}
          className="day-select-clear"
        />
        */}
      </div>
    );
  }
}

export default DaySelection