import React, { Component } from 'react';
import MapboxMap from 'react-mapbox-wrapper';
import StationService from '../services/StationService.js';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.handleStationClick = this.handleStationClick.bind(this);
        this.origin = [2.34298812806494,48.8565848333607];
        this.routeData = {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': []
            }
        }
    }

    onMapLoad(map) {
        // route
        map.addSource('route', {
            'type': 'geojson',
            'data': this.routeData
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'paint': {
                'line-color': 'yellow',
                'line-opacity': 0.75,
                'line-width': 5
            }
        });

        // stations
        let stationService = new StationService();
        let stations = stationService.getStations();
        let stationsFeatures = []
        stations.forEach(element => {
            stationsFeatures.push({
                "type": "Feature",
                "id": element.id,
                "geometry": {
                    "type": "Point",
                    "coordinates": [element.lng, element.lat]
                },
                "properties": {
                    "city": element.city,
                    "population": element.population,
                    "travel_time": element.travel_time,
                }
            })
        });

        map.addSource('stations', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': stationsFeatures
            }
        });
        map.addLayer({
            'id': 'stations',
            'type': 'symbol',
            'source': 'stations',
            'layout': {
                'icon-image': 'blue-dot',
                'icon-allow-overlap': true,
            }
        });
        this.map = map;
        this.forceUpdate();
    }

    handleStationClick(event) {
        let features = this.map.queryRenderedFeatures(event.point, {layers: ['stations']});
        if (features.length === 0) {
            return;
        }
        this.props.onStationClick(features[0].properties);
        this.routeData['geometry']['coordinates'] = [
            this.origin,
            [event.lngLat.lng, event.lngLat.lat]
        ]
        this.map.getSource('route').setData(this.routeData);
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "50%"}}>
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