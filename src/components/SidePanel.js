import React, { Component } from 'react';
import Station from './Station.js';
import Search from './Search.js';

class SidePanel extends Component {
    render() {
        return (
            <div style={{ height: "60vh", width: "24%", position: "absolute", "z-index": "2", "background-color": "white", "margin-top": "20vh" }}>
                <Search onSearchChange={this.props.onSearchChange}></Search>
                { this.props.station && <Station station={this.props.station} /> }
            </div>
        )
    }
}

export default SidePanel;