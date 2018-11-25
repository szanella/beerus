import React from 'react';
import './BeerListRow.scss'

class BeerListRow extends React.Component {
  render() {
    return (
      <div className='beer-list-row'>
        <div className='beer-list-row__name'>{this.props.beer.name}</div>
        <div className='beer-list-row__abv'>{this.props.beer.abv}%</div>
      </div>
    );
  }
}

export default BeerListRow;