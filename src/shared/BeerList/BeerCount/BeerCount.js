import React from 'react';
import './BeerCount.scss';

const BeerCount = props => (
  <p className='beer-count'>
    { props.beers.length === 0 && 'Nessuna birra' }
    { props.beers.length === 1 && 'Una birra' }
    { props.beers.length > 1 && `${props.beers.length} birre` }
  </p>
);

export default BeerCount;