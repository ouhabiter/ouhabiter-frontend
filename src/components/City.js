import React, { Component } from 'react';
import TimeService from '../services/TimeService';

class City extends Component {
    render() {
        return (
            <div>
                <h2>{ this.props.station.stationName }</h2>
                Ville: {this.props.station.cityName}<br/>
                Durée du voyage: { TimeService.hoursToTimeString(this.props.station.travelTime) }<br/>
                Population: { this.props.station.cityPopulation.toLocaleString() }<br/>
            </div>
        )
    }
}

export default City;