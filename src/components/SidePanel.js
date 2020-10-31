import React, { Component } from 'react';
import City from './City.js';

class SidePanel extends Component {
    render() {
        return (
            <div style={{ height: "100vh", width: "50%"}}>
                { this.props.station && <City station={this.props.station} /> }
            </div>
        )
    }
}

export default SidePanel;