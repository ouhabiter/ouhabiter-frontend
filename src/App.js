import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'
import StationService from './services/StationService.js';
import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'fontsource-roboto';

class App extends Component {
  constructor(props) {
    super(props);
    this.stationService = new StationService();
    this.state = {
      stations: this.stationService.stations,
      search: {
        // follows slider helper scale
        minTravelTime: 0,
        maxTravelTime: 20,
      }
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
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