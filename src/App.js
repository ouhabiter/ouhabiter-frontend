import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { station: null };
    this.handleStationChange = this.handleStationChange.bind(this);
  }

  handleStationChange(newStation) {
    this.setState({station: newStation});
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Map station={this.state.station} onStationClick={this.handleStationChange} />
        <SidePanel station={this.state.station} />
      </div>
    );
  }
}

export default App;
