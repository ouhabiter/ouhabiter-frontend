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
                "cityName": station.cityName,
                "stationName": station.stationName,
                "cityPopulation": station.cityPopulation,
                "travelTime": station.travelTime,
                "itinerary": station.itinerary,
                "cityInseeCode": station.cityInseeCode,
                "hasFiber": station.hasFiber,
                "hasMountains": station.hasMountains,
                "hasCoastline": station.hasCoastline,
                "hasPark": station.hasPark,
            }
        }
    }

    static getColorScale(min, max) {
        let start = min ? min : 0;
        let step = max ? (max - start) / 8 : 1.5;
        let colorScale = [
            '#0A5502',
            start + step,
            '#13be00',
            start + step * 3,
            '#dfff00',
            start + step * 5,
            '#ffa51f',
            start + step * 7,
            '#c80000'
        ]
        return colorScale;
    }
}

export default MapHelper;