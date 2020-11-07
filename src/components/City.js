import React, { Component } from 'react';
import TimeService from '../services/TimeService';

class City extends Component {
    render() {
        return (
            <div>
                <h2>{ this.props.station.city }</h2>
                Durée du voyage: { TimeService.hoursToTimeString(this.props.station.travelTime) }<br/>
                Population: { this.props.station.population.toLocaleString() }<br/>
            </div>
        )
    }
}

export default City;