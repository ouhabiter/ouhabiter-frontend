import { travelTimeMarks, populationMarks } from './SliderHelper';

export function setSearch(search) {
  let searchParams = new URLSearchParams(window.location.search);
  for (const searchParam in search) {
    if (!search[searchParam]) {
      searchParams.delete(searchParam);
    } else {
      searchParams.set(searchParam, search[searchParam]);
    }
  }
  if (searchParams.length > 0) {
    window.history.pushState('', '', `?${searchParams.toString()}`);
  }
}

export function setDestination(destination) {
  setSearch({destination: destination});
}

export function getDestination() {
  let searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('destination');
}

export function getSearch() {
  let search = {
    minTravelTime: travelTimeMarks[0].scaledValue,
    maxTravelTime: travelTimeMarks[travelTimeMarks.length-1].scaledValue,
    minPopulation: populationMarks[0].scaledValue,
    maxPopulation: populationMarks[populationMarks.length-1].scaledValue,
    fromCityInseeCode: process.env.REACT_APP_PARIS_INSEE_CODE,
  };
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => {
    if (value !== undefined) {
      search[key] = value;
    }
  });
  return search;
}
