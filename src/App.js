import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'
import StationService from './services/StationService.js';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: null,
      stations: this.getStations(),
      search: null
    };
    this.handleStationChange = this.handleStationChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleStationChange(newStation) {
    this.setState({station: newStation});
  }

  handleSearchChange(search) {
    let stations = this.getStations(search);
    this.setState({
      search: search,
      stations: stations
    });
  }

  getStations(search) {
    let stationService = new StationService();
    let stations = stationService.getStations();
    let result = []
    stations.forEach(station => {
      if (
        search &&
        (
          (search.minPopulation && search.minPopulation > station.cityPopulation) ||
          (search.maxPopulation && search.maxPopulation < station.cityPopulation) ||
          (search.minTravelTime && search.minTravelTime > station.travelTime) ||
          (search.maxTravelTime && search.maxTravelTime < station.travelTime) ||
          (search.hasFiber && !station.hasFiber) ||
          (search.hasMountains && !station.hasMountains) ||
          (search.hasLake && !station.hasLake) ||
          (search.hasCoastline && !station.hasCoastline)
        )
      ) {
        return;
      }
      result.push(station)
    })
    return result;
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
          search={this.state.search}
        />
      </div>
    );
  }
}

export default App;