import React from 'react';

const DetailsHeading = props => (
  <div className='details-heading'>
    <h1>{props.beer && props.beer.id}</h1>
  </div>
);

export default DetailsHeading;