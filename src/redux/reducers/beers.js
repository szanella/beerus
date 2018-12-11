import {RECEIVE_BEERS_PAGE, REQUEST_BEERS_PAGE} from '../actionTypes';

const initialState = {
  allIds: [],
  byIds: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_BEERS_PAGE: {
      const {query} = action;
      const resetBeers = query.page === 1;
      return {
        ...state,
        allIds: resetBeers ? [] : state.allIds,
        byIds: resetBeers ? [] : state.byIds,
        loading: true
      };
    }
    case RECEIVE_BEERS_PAGE: {
      const {beers} = action;
      let byIds = state.byIds;
      beers.forEach(beer => byIds[beer.id] = beer);
      return {
        ...state,
        allIds: [...state.allIds, ...beers.map(beer => beer.id)],
        byIds: byIds,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}