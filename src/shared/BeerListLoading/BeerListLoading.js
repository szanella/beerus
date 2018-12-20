import React from 'react';
import './BeerListLoading.scss';

class BeerListLoading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: Math.floor(Math.random() * (225 - 125 + 1)) + 125
    };
  }

  render() {
    return (
      <div className="beer-list-loading">
        <div style={{width: `${this.state.width}px`}} />
      </div>
    );
  }
};

export default BeerListLoading;