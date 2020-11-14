import { Box, Grid, Paper, Tooltip } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import React, { Component } from 'react';
import MapboxMap from 'react-mapbox-wrapper';
import MapHelper from '../helpers/MapHelper';
import TimeHelper from '../helpers/TimeHelper';
import CityService from '../services/CityService';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.handleStationClick = this.handleStationClick.bind(this);
        this.state = {
            colorScale: null
        }
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
                        [8, 8],
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
                'line-width': 3
            }
        });
        map.addSource('city-outline', {
            'type': 'geojson',
            'data': {
                'type': 'Polygon',
                'coordinates': []
            }
        });
        map.addLayer({
            'id': 'city-outline',
            'type': 'line',
            'source': 'city-outline',
            'paint': {
                'line-color': '#000000',
                'line-width': 1,
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
        let colorScale = MapHelper.getColorScale(this.props.minTravelTime, this.props.maxTravelTime);
        let paintProperty = [
            'step',
            ['get', 'travelTime'],
            ...colorScale
        ];
        this.map.setPaintProperty('stations', 'circle-color', paintProperty);
        this.setState({
            colorScale: colorScale,
        });
    }

    handleStationClick(event) {
        let features = this.map.queryRenderedFeatures(event.point, {layers: ['stations']});
        if (features.length === 0) {
            return;
        }
        let feature = features[0];
        this.props.onStationClick(feature.properties);
        this.map.getSource('itinerary').setData(JSON.parse(feature.properties.itinerary));
        CityService.getCityOutline(feature.properties.cityInseeCode).then((cityOutline) => {
            if (cityOutline) {
                this.map.getSource('city-outline').setData(cityOutline);
            } else {
                this.map.getSource('city-outline').setData({'type': 'Polygon', 'coordinates': []});
            }
        });
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <MapboxMap
                    accessToken="pk.eyJ1IjoibWVpbGxldXJzYWdlbnRzIiwiYSI6ImNqMWV5YnRpMDAwMHkyeXRnd3JkdXRiaDEifQ.emcFsn3Ox6WcKmOHhbTOPQ"
                    zoom="5"
                    mapboxStyle="mapbox://styles/meilleursagents/ckhf5i46501mv1apg8er3v1b1"
                    coordinates={{ lat: 46.227638, lng: -0.8930568 }}
                    onLoad={this.onMapLoad}
                    onClick={this.handleStationClick}
                >
                </MapboxMap>
                { this.state.colorScale &&
                    <Box component={Paper} style={{ position: "absolute", zIndex: 2, top: 24, left: "30%", backgroundColor: "white", display: "flex" }}>
                        <Box style={{ display: "flex", alignItems: "center", margin: 8 }}>
                            <TimerIcon />
                            <div style={{ marginLeft: 8, marginRight: 8 }}>{"- de " + TimeHelper.hoursToTimeString(this.state.colorScale[1])}</div>
                            <Tooltip title={"moins de " + TimeHelper.hoursToTimeString(this.state.colorScale[1])}>
                                <div style={{ "background-color": this.state.colorScale[0], height: 8, width: 24 }}></div>
                            </Tooltip>
                            <Tooltip title={"de " + TimeHelper.hoursToTimeString(this.state.colorScale[1]) + " à " + TimeHelper.hoursToTimeString(this.state.colorScale[3])}>
                            <div style={{ "background-color": this.state.colorScale[2], height: 8, width: 24 }}></div>
                            </Tooltip>
                            <Tooltip title={"de " + TimeHelper.hoursToTimeString(this.state.colorScale[3]) + " à " + TimeHelper.hoursToTimeString(this.state.colorScale[5])}>
                            <div style={{ "background-color": this.state.colorScale[4], height: 8, width: 24 }}></div>
                            </Tooltip>
                            <Tooltip title={"de " + TimeHelper.hoursToTimeString(this.state.colorScale[5]) + " à " + TimeHelper.hoursToTimeString(this.state.colorScale[7])}>
                            <div style={{ "background-color": this.state.colorScale[6], height: 8, width: 24 }}></div>
                            </Tooltip>
                            <Tooltip title={"plus de " + TimeHelper.hoursToTimeString(this.state.colorScale[7])}>
                            <div style={{ "background-color": this.state.colorScale[8], height: 8, width: 24 }}></div>
                            </Tooltip>
                            <div style={{ marginLeft: 8 }}>{"+ de " + TimeHelper.hoursToTimeString(this.state.colorScale[7])}</div>
                        </Box>
                    </Box>
                }
            </div>
        )
    }
}

export default Map;