import axios from 'axios';
import algoliasearch from 'algoliasearch';

class StationService {
  constructor() {
    const client = algoliasearch('JQA10Z2OZN', 'ed6d425150c2377e707cd08de17236b7');
    this.index = client.initIndex('stations');
    this.stations = [];
    this.formerStations = {};
    this.inseeCode = null;
  }

  async updateStations(inseeCode) {
    // save all stations to avoid calls
    var promise = null;
    if (inseeCode === this.inseeCode) {
      promise = new Promise((resolve) => {resolve()});
      return promise;
    }
    if (inseeCode in this.formerStations) {
      this.stations = this.formerStations[inseeCode];
      this.inseeCode = inseeCode;
      promise = new Promise((resolve) => {resolve()});
      return promise;
    }
    this.formerStations[this.inseeCode] = this.stations;
    this.inseeCode = inseeCode;
    let hits = [];
    return this.index.browseObjects({
      query: '', // Empty query will match all records
      filters: `fromCityInseeCode=${inseeCode}`,
      batch: batch => {
        hits = hits.concat(batch);
      }
    }).then(() => this.stations = hits);
  }

  async search(search) {
    return this.updateStations(search.fromCityInseeCode).then(() => {
      let result = []
      this.stations.forEach(station => {
        if (
          search &&
          (
            (search.minPopulation && search.minPopulation > station.cityPopulation) ||
            (search.maxPopulation && search.maxPopulation < station.cityPopulation) ||
            (search.minTravelTime && search.minTravelTime > station.travelTime) ||
            (search.maxTravelTime && search.maxTravelTime < station.travelTime) ||
            (search.hasFiber && !station.hasFiber) ||
            (search.noFiber && station.hasFiber) ||
            (search.hasMountains && !station.hasMountains) ||
            (search.noMountains && station.hasMountains) ||
            (search.hasLake && !station.hasLake) ||
            (search.hasCoastline && !station.hasCoastline) ||
            (search.noCoastline && station.hasCoastline) ||
            (search.hasCountryside && !station.hasCountryside) ||
            (search.noCountryside && station.hasCountryside) ||
            (search.hasPark && !station.hasPark)
          )
        ) {
          return;
        }
        result.push(station)
      })
      return result;
    });
  }

  getStationById(stationId) {
    if (!stationId) {
      return null;
    }
    let result = this.stations.find(station => station.stationId === stationId);
    return result;
  }

  getStationBySlug(stationSlug) {
    if (!stationSlug) {
      return null;
    }
    let result = this.stations.find(station => station.stationName.replace(' ', '-').toLowerCase() === stationSlug);
    return result;
  }

  getSlugFromId(stationId) {
    if (!stationId) {
      return null;
    }
    let station = this.stations.find(station => station.stationId === stationId);
    if (!station) {
      return null;
    }
    let result = station.stationName.replace(' ', '-').toLowerCase();
    return result;
  }

  getItinerary(originInseeCode, destinationStationId) {
    return axios({
      url: 'https://api.sncf.com/v1/coverage/sncf/journeys',
      params: {
        from: originInseeCode,
        to: `stop_area:OCE:SA:${destinationStationId}`
      },
      auth: {
        username: 'eec588d2-c133-419f-83de-8fc595fb6a4f'
      }
    }).then((response) => {
      if (!response.data.journeys) {
        return null;
      }
      let itinerary = {
        'type': 'LineString',
        'coordinates': []
      };
      response.data.journeys[0]['sections'].forEach((section) => {
        if (!section.geojson) {
          return;
        }
        itinerary.coordinates.push(...section.geojson.coordinates);
      });
      return itinerary;
    });
  }
}

let stationService = new StationService(); // singleton to get stations once
export default stationService;
