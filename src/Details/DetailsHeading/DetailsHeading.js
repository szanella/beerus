import React from 'react';
import './DetailsHeading.scss';
import {NavLink} from 'react-router-dom';

const DetailsHeading = ({beer, previousBeer, nextBeer}) => (
  <div className='details-heading'>
    {previousBeer && (
      <NavLink to={`/details/${previousBeer.id}`} className='details-heading__beer-nav details-heading__beer-nav--prev'>
        <i className="material-icons">chevron_left</i>
        <span>{previousBeer.name}</span>
      </NavLink>
    )}
    {beer && (
      <div className='details-heading__content'>
        <h1>{beer.name}</h1>
      </div>
    )}
    {nextBeer && (
      <NavLink to={`/details/${nextBeer.id}`} className='details-heading__beer-nav details-heading__beer-nav--next'>
        <span>{nextBeer.name}</span>
        <i className="material-icons">chevron_right</i>
      </NavLink>
    )}
  </div>
);

export default DetailsHeading;