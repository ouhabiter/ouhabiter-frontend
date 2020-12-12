class MapHelper {
    static stationToFeature(station) {
        return {
            "type": "Feature",
            "id": station.stationId,
            "geometry": {
                "type": "Point",
                "coordinates": [station.lng, station.lat]
            },
            "properties": {
                "id": station.stationId,
                "travelTime": station.travelTime,
            }
        }
    }

    static buildColorScale(min, max) {
        let start = parseFloat(min);
        let step = (parseFloat(max) - start) / 5;
        let colorScale = [
            '#0A5502',
            start + step,
            '#13be00',
            start + step * 2,
            '#dfff00',
            start + step * 3,
            '#ffa51f',
            start + step * 4,
            '#c80000'
        ]
        return colorScale;
    }
}

export default MapHelper;
