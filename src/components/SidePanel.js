import React, { Component } from 'react';
import City from './City.js';
import Search from './Search.js';

class SidePanel extends Component {
    render() {
        return (
            <div style={{ height: "100vh", width: "50%"}}>
                <Search onSearchChange={this.props.onSearchChange}></Search>
                { this.props.station && <City station={this.props.station} /> }
            </div>
        )
    }
}

export default SidePanel;