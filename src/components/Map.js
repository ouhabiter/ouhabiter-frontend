import React, { Component } from 'react';
import MapboxMap from 'react-mapbox-wrapper';

class Map extends Component {
    render() {
        return (
            <div style={{ height: "100vh", width: "100%"}}>
                <MapboxMap
                    accessToken="pk.eyJ1IjoibWVpbGxldXJzYWdlbnRzIiwiYSI6ImNqMWV5YnRpMDAwMHkyeXRnd3JkdXRiaDEifQ.emcFsn3Ox6WcKmOHhbTOPQ"
                    zoom="5"
                    coordinates={{ lat: 48.8565848333607, lng: 2.34298812806494 }}
                />
            </div>
        )
    }
}

export default Map;
