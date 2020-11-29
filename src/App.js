import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'
import stationService from './services/StationService.js';
import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'fontsource-roboto';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: stationService.stations,
      search: {
        // follows slider helper scale
        minTravelTime: 0,
        maxTravelTime: 20,
      }
    };
    stationService.updateStations(process.env.REACT_APP_PARIS_INSEE_CODE).then(() => {
      this.setState({stations: stationService.stations});
    });
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(search) {
    stationService.updateStations(search.fromCityInseeCode).then(() => {
      this.setState({
        search: search,
        stations: stationService.stations
      });
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/:origin?/:destination?">
            <SidePanel
              onSearchChange={this.handleSearchChange}
            />
            <Map
              stations={this.state.stations}
              minTravelTime={this.state.search.minTravelTime}
              maxTravelTime={this.state.search.maxTravelTime}
            />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;