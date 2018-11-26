import React from 'react';
import BeerListRow from './BeerListRow/BeerListRow';

const BeerList = props => <>{props.beers.map(beer => <BeerListRow key={beer.id} beer={beer}/>)}</>;

export default BeerList;