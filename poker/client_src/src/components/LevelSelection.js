import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Débutant', value: 'Débutant' },
  { key: 2, text: 'Casu', value: 'Casu' },
  { key: 3, text: 'Passionné', value: 'Passionné' },
  { key: 4, text: 'Expert', value: 'Expert' },
  { key: 5, text: 'Pro', value: 'Pro' },
]

var sorter = {
  "Débutant": 1,
  "Casu": 2,
  "Passionné": 3,
  "Expert": 4,
  "Pro": 5,
};

const sortByLevel = (a, b) => {
  return sorter[a] > sorter[b];
};


const renderLabel = label => ({
  content: `${label.value}`,
});

class LevelSelection extends Component {
  constructor(){
    super();
    this.state = {value: []};
    this.clear = this.clear.bind(this);
  }

  updateValue(data) {
    this.setState({
      value: data.value.sort(sortByLevel),
    });
  }

  clear() {
    this.setState({
      value: "",
    });
  }

  render() {
    return (
      <div className="level-select">
        <Dropdown
          className="day-select-dropdown"
          multiple
          selection
          fluid
          options={options}
          placeholder='Filtrer les niveaux'
          renderLabel={renderLabel}
          compact
          onChange={(e, data) => {
            this.updateValue(data);
            this.props.updateMap("level", data);}}
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
              this.props.updateMap("level", { value: newValue });
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

export default LevelSelection