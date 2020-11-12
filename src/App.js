import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'
import StationService from './services/StationService.js';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.stationService = new StationService();
    this.state = {
      station: null,
      stations: this.stationService.getStations(),
      search: {
        minTravelTime: null,
        maxTravelTime: null,
      }
    };
    this.handleStationChange = this.handleStationChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleStationChange(newStation) {
    this.setState({station: newStation});
  }

  handleSearchChange(search) {
    let stations = this.stationService.search(search);
    this.setState({
      search: search,
      stations: stations
    });
  }

  render() {
    return (
      <div>
        <SidePanel
          station={this.state.station}
          onSearchChange={this.handleSearchChange}
        />
        <Map
          stations={this.state.stations}
          station={this.state.station}
          onStationClick={this.handleStationChange}
          minTravelTime={this.state.search.minTravelTime}
          maxTravelTime={this.state.search.maxTravelTime}
        />
      </div>
    );
  }
}

export default App;