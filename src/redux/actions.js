import {
  RECEIVE_BEER_DETAILS,
  RECEIVE_BEERS_PAGE, RECEIVE_FAVOURITE_BEERS,
  REQUEST_BEER_DETAILS,
  REQUEST_BEERS_PAGE,
  REQUEST_FAVOURITE_BEERS, TOGGLE_FAVOURITE_BEER
} from './actionTypes';
import * as axios from 'axios';

export const requestBeersPage = query => ({
  type: REQUEST_BEERS_PAGE,
  query
});

export const receiveBeersPage = beers => ({
  type: RECEIVE_BEERS_PAGE,
  beers
});

export const fetchBeersPage = query => {
  return dispatch => {
    dispatch(requestBeersPage(query));

    const params = composeQuery(query);
    return axios.get(`https://api.punkapi.com/v2/beers`, {params})
      .then(
        response => response.data,
        error => console.error(error)
      )
      .then(json => dispatch(receiveBeersPage(json)));
  };
};

export const requestBeerDetails = id => ({
  type: REQUEST_BEER_DETAILS,
  id
});

export const receiveBeerDetails = beer => ({
  type: RECEIVE_BEER_DETAILS,
  beer
});

export const fetchBeerDetails = id => {
  return dispatch => {
    dispatch(requestBeerDetails(id));

    return axios.get(`https://api.punkapi.com/v2/beers/${id}`)
      .then(
        response => {
          const beer = response.data[0];
          return {
            ...beer,
            favourite: (JSON.parse(localStorage.getItem('favouriteBeerIds')) || []).includes(beer.id)
          };
        },
        error => console.error(error)
      )
      .then(json => dispatch(receiveBeerDetails(json)));
  }
};

export const requestFavouriteBeers = () => ({
  type: REQUEST_FAVOURITE_BEERS
});

export const receiveFavouriteBeers = beers => ({
  type: RECEIVE_FAVOURITE_BEERS,
  beers
});

export const fetchFavouriteBeers = () => {
  return dispatch => {
    dispatch(requestFavouriteBeers());

    const beerIds = JSON.parse(localStorage.getItem('favouriteBeerIds')).join('|');
    return axios.get(`https://api.punkapi.com/v2/beers?ids=${beerIds}`)
      .then(
        response => response.data,
        error => console.error(error)
      )
      .then(json => dispatch(receiveFavouriteBeers(json)));
  }
};

export const toggleFavouriteBeer = id => ({
  type: TOGGLE_FAVOURITE_BEER,
  id
});

export const toggleLocalFavouriteBeer = id => {
  return dispatch => {
    const favouriteBeerIds = JSON.parse(localStorage.getItem('favouriteBeerIds')) || [];
    if (favouriteBeerIds.includes(id)) {
      localStorage.setItem('favouriteBeerIds', JSON.stringify(favouriteBeerIds.filter(beerId => beerId !== id)));
    } else {
      localStorage.setItem('favouriteBeerIds', JSON.stringify([...favouriteBeerIds, id]));
    }

    dispatch(toggleFavouriteBeer(id));
  }
};

function composeQuery(query) {
  const params = {};
  for (let key in query) {
    if (query.hasOwnProperty(key) && query[key]) {
      params[key] = query[key];
    }
  }
  return params;
}