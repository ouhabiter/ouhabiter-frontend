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
      stations: [],
      search: {
        // follows slider helper scale
        minTravelTime: 0,
        maxTravelTime: 20,
        fromCityInseeCode: process.env.REACT_APP_PARIS_INSEE_CODE,
      }
    };
  }

  componentDidMount() {
    stationService.search(this.state.search).then((stations) => {
      this.setState({stations: stations});
    });
    this.handleSearchChange = this.handleSearchChange.bind(this);
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