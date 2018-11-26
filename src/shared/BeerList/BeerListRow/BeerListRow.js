import React from 'react';
import './BeerListRow.scss'
import {withRouter} from 'react-router';

class BeerListRow extends React.Component {
  constructor(props) {
    super(props);

    this.goToDetails = this.goToDetails.bind(this);
  }


  goToDetails() {
    this.props.history.push(`/details/${this.props.beer.id}`);
  }

  render() {
    return (
      <div className='beer-list-row' onClick={this.goToDetails}>
        <div className='beer-list-row__name'>{this.props.beer.name}</div>
        <div className='beer-list-row__abv'>{this.props.beer.abv}%</div>
      </div>
    );
  }
}

export default withRouter(BeerListRow);