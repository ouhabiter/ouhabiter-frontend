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
}

export default MapHelper;