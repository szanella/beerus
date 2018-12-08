import React from 'react';

class DetailsHeading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='details-heading'>
        <h1>{this.props}</h1>
      </div>
    );
  }
}