import React from 'react';
import BeerListRow from './BeerListRow/BeerListRow';
import BeerCount from './BeerCount/BeerCount';

const BeerList = props => (
  <>
    <BeerCount beers={props.beers}/>
    {props.beers.map(beer => <BeerListRow key={beer.id} beer={beer}/>)}
  </>
  );

export default BeerList;