import React, { Component } from 'react';
import TimeService from '../services/TimeService';

class City extends Component {
    render() {
        return (
            <div style={{ padding: 100, border: "1px solid black" }}>
                Station: { this.props.station.stationName }<br/>
                Ville: {this.props.station.cityName}<br/>
                Durée du voyage: { TimeService.hoursToTimeString(this.props.station.travelTime) }<br/>
                Population: { this.props.station.cityPopulation.toLocaleString() }<br/>
            </div>
        )
    }
}

export default City;