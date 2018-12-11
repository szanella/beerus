export const getBeersState = store => store.beers;

export const getBeerIds = store =>
  getBeersState(store) ? getBeersState(store).allIds : [];

export const getBeerById = (store, id) =>
  getBeersState(store) ? getBeersState(store).byIds[id] : {};

export const getBeers = store =>
  getBeerIds(store).map(id => getBeerById(store, id));

export const getBeersLoading = store =>
  getBeersState(store) ? getBeersState(store).loading : null;