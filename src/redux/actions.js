import {RECEIVE_BEER_DETAILS, RECEIVE_BEERS_PAGE, REQUEST_BEER_DETAILS, REQUEST_BEERS_PAGE} from './actionTypes';
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
        response => response.data[0],
        error => console.error(error)
      )
      .then(json => dispatch(receiveBeerDetails(json)));
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