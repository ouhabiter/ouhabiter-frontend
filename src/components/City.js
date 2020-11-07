import React, { Component } from 'react';
import TimeService from '../services/TimeService';
import CityService from '../services/CityService';

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityImage: ''
        }
    }

    componentDidMount() {
        this.updateCityImage();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.station.city !== this.props.station.city) {
            this.setState({
                cityImage: ''
            })
            this.updateCityImage();
        }
    }

    updateCityImage() {
        CityService.getImages(this.props.station.city)
            .then(mainImageUrl => {
                this.setState({
                    cityImage: mainImageUrl
                });
            })
    }

    render() {
        return (
            <div>
                <h1>{ this.props.station.city }</h1>
                <img src={ this.state.cityImage } /><br/>
                Travel time: { TimeService.hoursToTimeString(this.props.station.travel_time) }<br/>
                Population: { this.props.station.population.toLocaleString() }
            </div>
        )
    }
}

export default City;