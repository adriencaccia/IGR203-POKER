import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Lundi', value: 'Lundi' },
  { key: 2, text: 'Mardi', value: 'Mardi' },
  { key: 3, text: 'Mercredi', value: 'Mercredi' },
  { key: 4, text: 'Jeudi', value: 'Jeudi' },
  { key: 5, text: 'Vendredi', value: 'Vendredi' },
  { key: 6, text: 'Samedi', value: 'Samedi' },
  { key: 7, text: 'Dimanche', value: 'Dimanche' },
];

var sorter = {
  "Lundi": 1,
  "Mardi": 2,
  "Mercredi": 3,
  "Jeudi": 4,
  "Vendredi": 5,
  "Samedi": 6,
  "Dimanche": 7
};

const sortByDay = (a, b) => {
  return sorter[a] > sorter[b];
};


const renderLabel = label => ({
  content: `${label.value}`,
});

class DaySelection extends Component {
  constructor(){
    super();
    this.state = {value: []};
    this.clear = this.clear.bind(this);
  }

  updateValue(data) {
    this.setState({
      value: data.value.sort(sortByDay),
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
          className="day-select-dropdown"
          // upward={true}
          multiple
          selection
          fluid
          options={options}
          placeholder='Filtrer les jours'
          renderLabel={renderLabel}
          compact
          onChange={(e, data) => {
            this.updateValue(data);
            this.props.updateMap("day", data)}}
          value={this.state.value}
          onLabelClick={
            (e,data) => {
              var newValue = this.state.value;
              var index = newValue.indexOf(data.value)
              newValue.splice(index,1);
              this.setState({
                value:  newValue
              });
              this.updateValue({ value: newValue });
              this.props.updateMap("day", { value: newValue });
            }
          }
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