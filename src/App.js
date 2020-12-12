import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'
import stationService from './services/StationService.js';
import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'fontsource-roboto';
import { getDestination, getSearch } from './helpers/SearchHelper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: null,
      stations: [],
      search: getSearch(),
    };
  }

  componentDidMount() {
    stationService.search(this.state.search).then((stations) => {
      let searchParams = new URLSearchParams(window.location.search);
      this.setState({
        stations: stations,
        destination: getDestination(),
      });
    });
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
  }

  handleSearchChange(search) {
    if (search !== this.state.search) {
      stationService.search(search).then((stations) => {
        this.setState({
          search: search,
          stations: stations
        });
      });
    }
  }

  handleDestinationChange(destination) {
    if (destination !== this.state.destination) {
      this.setState({
        destination: destination,
      });
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="">
            <SidePanel
              onSearchChange={this.handleSearchChange}
              destination={this.state.destination}
            />
            <Map
              stations={this.state.stations}
              minTravelTime={this.state.search.minTravelTime}
              maxTravelTime={this.state.search.maxTravelTime}
              fromCityInseeCode={this.state.search.fromCityInseeCode}
              onDestinationChange={this.handleDestinationChange}
            />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
