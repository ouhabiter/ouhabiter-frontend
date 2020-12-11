class HistoryHelper {
  static setDestination(destination) {
    let searchParams = new URLSearchParams(window.location.search);
    if (!destination) {
      searchParams.delete('destination');
    } else {
      searchParams.set('destination', destination);
    }
    window.history.pushState('', '', `?${searchParams.toString()}`);
  }

  static setOrigin(origin) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set('origin', origin);
    window.history.pushState('', '', `?${searchParams.toString()}`);
  }
}

export default HistoryHelper;
