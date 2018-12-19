import React from 'react';
import './DetailsHeading.scss';
import {NavLink} from 'react-router-dom';

const DetailsHeading = ({beer, previousBeer, nextBeer, onStarClick}) => (
  <header className='details-heading'>
    <div className='details-heading__content app-content'>
      <div className='details-heading__content__beer-info'>
        <h1><i className="material-icons" onClick={onStarClick}>{beer.favourite ? 'star' : 'star_border'}</i>{beer.name}</h1>
        <p>{beer.tagline}</p>
      </div>
    </div>
    {previousBeer && (
      <NavLink to={`/details/${previousBeer.id}`} className='details-heading__beer-nav details-heading__beer-nav--prev'>
        <i className="material-icons">chevron_left</i>
        <span>{previousBeer.name}</span>
      </NavLink>
    )}
    {nextBeer && (
      <NavLink to={`/details/${nextBeer.id}`} className='details-heading__beer-nav details-heading__beer-nav--next'>
        <span>{nextBeer.name}</span>
        <i className="material-icons">chevron_right</i>
      </NavLink>
    )}
  </header>
);

export default DetailsHeading;