import {
  RECEIVE_BEER_DETAILS,
  RECEIVE_BEERS_PAGE, RECEIVE_FAVOURITE_BEERS,
  REQUEST_BEER_DETAILS,
  REQUEST_BEERS_PAGE,
  REQUEST_FAVOURITE_BEERS, TOGGLE_FAVOURITE_BEER
} from '../actionTypes';

const initialState = {
  allIds: [],
  byIds: {},
  beersLoading: false,
  hasMore: true,

  currentBeer: {},
  previousBeer: null,
  nextBeer: null,
  detailsLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_BEERS_PAGE: {
      const {query} = action;
      const resetBeers = query.page === 1;
      return {
        ...state,
        allIds: resetBeers ? [] : state.allIds,
        byIds: resetBeers ? {} : state.byIds,
        beersLoading: true
      };
    }
    case RECEIVE_BEERS_PAGE:
    case RECEIVE_FAVOURITE_BEERS: {
      const {beers, query} = action;
      let byIds = state.byIds;
      beers.forEach(beer => byIds[beer.id] = beer);
      return {
        ...state,
        allIds: [...state.allIds, ...beers.map(beer => beer.id)],
        byIds: byIds,
        beersLoading: false,
        hasMore: query && beers.length > 0 && beers.length === query.per_page
      };
    }
    case REQUEST_BEER_DETAILS: {
      const beerId = action.id === 'random' ? action.id : +action.id;
      const beers = action.id === 'random' ? [] : state.allIds.map(id => state.byIds[id]);
      const beerIndex = beers.findIndex(aBeer => aBeer.id === beerId);
      const previousBeer = beerIndex !== -1 && beerIndex > 0 ? beers[beerIndex - 1] : null;
      const nextBeer = beerIndex !== -1 && beerIndex < beers.length - 1 ? beers[beerIndex + 1] : null;

      return {
        ...state,
        currentBeer: {},
        previousBeer,
        nextBeer,
        detailsLoading: true
      };
    }
    case RECEIVE_BEER_DETAILS: {
      const {beer} = action;

      return {
        ...state,
        currentBeer: beer,
        detailsLoading: false
      };
    }
    case REQUEST_FAVOURITE_BEERS: {
      return {
        ...state,
        allIds: [],
        byIds: {},
        beersLoading: true
      };
    }
    case TOGGLE_FAVOURITE_BEER: {
      return {
        ...state,
        currentBeer: {
          ...state.currentBeer,
          favourite: !state.currentBeer.favourite
        }
      };
    }
    default: {
      return state;
    }
  }
}