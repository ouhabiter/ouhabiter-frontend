import React, { Component } from 'react';
import MapboxMap from 'react-mapbox-wrapper';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.handleStationClick = this.handleStationClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props){
            this.updateStations();
        }
    }

    onMapLoad(map) {
        map.addSource('stations', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        });
        map.addLayer({
            'id': 'stations',
            'type': 'symbol',
            'source': 'stations',
            'layout': {
                'icon-image': 'blue-dot',
                // use ignore-placement instead of allow-overlap which makes symbols blink on search update
                'icon-ignore-placement': true,
            }
        });
        this.map = map;
        this.updateStations();
        this.forceUpdate();
    }

    updateStations() {
        if (!this.props.stations) {
            return;
        }
        let features = [];
        this.props.stations.forEach(station => {
            features.push({
                "type": "Feature",
                "id": station.stationId,
                "geometry": {
                    "type": "Point",
                    "coordinates": [station.lng, station.lat]
                },
                "properties": {
                    "cityName": station.cityName,
                    "stationName": station.stationName,
                    "cityPopulation": station.cityPopulation,
                    "travelTime": station.travelTime,
                }
            })
        });
        this.map.getSource('stations').setData({
            'type': 'FeatureCollection',
            'features': features
        })
    }

    handleStationClick(event) {
        let features = this.map.queryRenderedFeatures(event.point, {layers: ['stations']});
        if (features.length === 0) {
            return;
        }
        this.props.onStationClick(features[0].properties);
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "100%"}}>
                <MapboxMap
                    accessToken="pk.eyJ1IjoibWVpbGxldXJzYWdlbnRzIiwiYSI6ImNqMWV5YnRpMDAwMHkyeXRnd3JkdXRiaDEifQ.emcFsn3Ox6WcKmOHhbTOPQ"
                    zoom="5"
                    style="mapbox://styles/meilleursagents/cjfm7js7u0o552snxqa6g7vxr"
                    coordinates={{ lat: 48.8565848333607, lng: 2.34298812806494 }}
                    onLoad={this.onMapLoad}
                    onClick={this.handleStationClick}
                >
                </MapboxMap>
            </div>
        )
    }
}

export default Map;