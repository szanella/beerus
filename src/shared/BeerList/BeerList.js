import React from 'react';
import BeerListRow from './BeerListRow/BeerListRow';

class BeerList extends React.Component {
  render() {
    const beersList = this.props.beers.map(beer => <BeerListRow key={beer.id} beer={beer}/>);
    return <>{beersList}</>;
  }
}

export default BeerList;