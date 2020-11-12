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
                'circle-color': [
                    'step',
                    ['get', 'travelTime'],
                    '#0a7f26',
                    1,
                    '#3c9809',
                    2,
                    '#acb207',
                    4,
                    '#cb5804',
                    6,
                    '#e50029'
                ]
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
                'line-color': '#000',
                'line-width': 4
            }
        });
        map.addSource('station', {
            'type': 'geojson',
            'data': {
                'type': 'Feature'
            }
        });
        map.addLayer({
            'id': 'station',
            'type': 'symbol',
            'source': 'station',
            'layout': {
                'icon-image': 'rail',
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
            features.push(MapHelper.stationToFeature(station))
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
        let feature = features[0];
        this.props.onStationClick(feature.properties);
        this.map.getSource('itinerary').setData(JSON.parse(feature.properties.itinerary));
        this.map.getSource('station').setData(feature);
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "100%"}}>
                <MapboxMap
                    accessToken="pk.eyJ1IjoibWVpbGxldXJzYWdlbnRzIiwiYSI6ImNqMWV5YnRpMDAwMHkyeXRnd3JkdXRiaDEifQ.emcFsn3Ox6WcKmOHhbTOPQ"
                    zoom="5"
                    style="mapbox://styles/meilleursagents/ckh97k06n0lw019n0kig2wiop"
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