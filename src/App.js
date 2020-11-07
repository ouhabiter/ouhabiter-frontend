import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: null,
      search: null
    };
    this.handleStationChange = this.handleStationChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleStationChange(newStation) {
    this.setState({station: newStation});
  }

  handleSearchChange(search) {
    this.setState({
      search: search
    });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Map
          station={this.state.station}
          onStationClick={this.handleStationChange}
          search={this.state.search}
        />
        <SidePanel
          station={this.state.station}
          onSearchChange={this.handleSearchChange}
        />
      </div>
    );
  }
}

export default App;