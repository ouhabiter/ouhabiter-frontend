import React, { Component } from 'react';
import MapboxMap from 'react-mapbox-wrapper';
import MapHelper from '../helpers/MapHelper';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.handleStationClick = this.handleStationClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props){
            this.updateStations();
            this.updateColorScale();
        }
    }

    onMapLoad(map) {
        // layer order is important, current station must be last to be above all the other layers
        map.addSource('stations', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        });
        map.addLayer({
            'id': 'stations',
            'type': 'circle',
            'source': 'stations',
            'paint': {
                'circle-stroke-width': 1,
                'circle-stroke-color': '#000',
                'circle-radius': {
                    'base': 3,
                    'stops': [
                        [8, 4],
                        [10, 10],
                        [22, 180]
                    ]
                },
            }
        });
        map.addSource('itinerary', {
            'type': 'geojson',
            'data': {
                'type': 'LineString',
                'coordinates': []
            }
        });
        map.addLayer({
            'id': 'itinerary',
            'type': 'line',
            'source': 'itinerary',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#33302E',
                'line-width': 4
            }
        });
        this.map = map;
        this.updateStations();
        this.updateColorScale();
        this.forceUpdate();
    }

    updateStations() {
        if (!this.props.stations) {
            return;
        }
        let features = [];
        this.props.stations.forEach(station => {
            features.push(MapHelper.stationToFeature(station))
        });
        this.map.getSource('stations').setData({
            'type': 'FeatureCollection',
            'features': features
        })
    }

    updateColorScale() {
        let start = this.props.minTravelTime ? this.props.minTravelTime : 0;
        let step = this.props.maxTravelTime ? (this.props.maxTravelTime - start) / 5 : 1.5;
        let paintProperty = [
            'step',
            ['get', 'travelTime'],
            '#10a908',
            start + step,
            '#ddd700',
            start + step * 3,
            '#FEA234',
            start + step * 5,
            '#e93c09',
            start + step * 7,
            '#f9093a'
        ]
        this.map.setPaintProperty('stations', 'circle-color', paintProperty);
    }

    handleStationClick(event) {
        let features = this.map.queryRenderedFeatures(event.point, {layers: ['stations']});
        if (features.length === 0) {
            return;
        }
        let feature = features[0];
        this.props.onStationClick(feature.properties);
        this.map.getSource('itinerary').setData(JSON.parse(feature.properties.itinerary));
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "100%"}}>
                <MapboxMap
                    accessToken="pk.eyJ1IjoibWVpbGxldXJzYWdlbnRzIiwiYSI6ImNqMWV5YnRpMDAwMHkyeXRnd3JkdXRiaDEifQ.emcFsn3Ox6WcKmOHhbTOPQ"
                    zoom="5"
                    mapboxStyle="mapbox://styles/meilleursagents/ckhf5i46501mv1apg8er3v1b1"
                    coordinates={{ lat: 46.227638, lng: 2.213749 }}
                    onLoad={this.onMapLoad}
                    onClick={this.handleStationClick}
                >
                </MapboxMap>
            </div>
        )
    }
}

export default Map;