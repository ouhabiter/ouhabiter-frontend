import React, { Component } from 'react';
import TimeHelper from '../helpers/TimeHelper';

class Station extends Component {
    render() {
        return (
            <div>
                <h2>Sélection</h2>
                Station: { this.props.station.stationName }<br/>
                Ville: {this.props.station.cityName}<br/>
                Durée du voyage: { TimeHelper.hoursToTimeString(this.props.station.travelTime) }<br/>
                Population: { this.props.station.cityPopulation.toLocaleString() }<br/>
            </div>
        )
    }
}

export default Station;