export const getBeersState = store => store.beers;

export const getBeerIds = store =>
  getBeersState(store) ? getBeersState(store).allIds : [];

export const getBeerById = (store, id) =>
  getBeersState(store) ? getBeersState(store).byIds[id] : {};

export const getBeers = store =>
  getBeerIds(store).map(id => getBeerById(store, id));

export const getBeersLoading = store =>
  getBeersState(store) ? getBeersState(store).beersLoading : null;

export const getDetailsLoading = store =>
  getBeersState(store) ? getBeersState(store).detailsLoading : null;

export const getCurrentBeer = store =>
  getBeersState(store) ? getBeersState(store).currentBeer : null;

export const getPreviousBeer = store =>
  getBeersState(store) ? getBeersState(store).previousBeer : null;

export const getNextBeer = store =>
  getBeersState(store) ? getBeersState(store).nextBeer : null;