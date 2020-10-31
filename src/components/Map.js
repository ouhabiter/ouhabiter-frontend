import React, { Component } from 'react';
import MapboxMap, {Marker} from 'react-mapbox-wrapper';
import StationService from '../services/StationService.js';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.handleStationClick = this.handleStationClick.bind(this);
    }

    onMapLoad(map) {
        this.map = map;
        this.forceUpdate();
    }

    handleStationClick(station) {
        this.props.onStationClick(station);
    }

    render() {
        let markers = [];
        if (this.map) {
            let stationService = new StationService();
            let stations = stationService.getStations();
            stations.forEach(element => {
                markers.push(
                    <Marker
                        coordinates={{ lat: element.lat, lng: element.lng }}
                        key={ element.id }
                        city={ element.city }
                        map={this.map}
                    >
                        <span
                            style={{ fontSize: '30px' }}
                            onClick={() => {
                                this.handleStationClick(element)
                            }} 
                        >
                            🏠
                        </span>
                    </Marker>
                );
            });
        }   

        return (
            <div style={{ height: "100vh", width: "50%"}}>
                <MapboxMap
                    accessToken="pk.eyJ1IjoibWVpbGxldXJzYWdlbnRzIiwiYSI6ImNqMWV5YnRpMDAwMHkyeXRnd3JkdXRiaDEifQ.emcFsn3Ox6WcKmOHhbTOPQ"
                    zoom="5"
                    coordinates={{ lat: 48.8565848333607, lng: 2.34298812806494 }}
                    onLoad={this.onMapLoad}
                >
                    {markers}
                </MapboxMap>
            </div>
        )
    }
}

export default Map;