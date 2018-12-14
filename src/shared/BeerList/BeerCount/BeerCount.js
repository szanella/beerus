import React from 'react';
import './BeerCount.scss';

const BeerCount = props => (
  <p className='beer-count'>
    { props.beers.length === 0 && 'No beer' }
    { props.beers.length === 1 && 'One beer' }
    { props.beers.length > 1 && `${props.beers.length} beers` }
  </p>
);

export default BeerCount;