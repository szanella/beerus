import React from 'react';
import './Details.scss';
import {getBeers, getCurrentBeer, getNextBeer, getPreviousBeer} from '../redux/selectors';
import {connect} from 'react-redux';
import {fetchBeerDetails} from '../redux/actions';
import DetailsHeading from './DetailsHeading/DetailsHeading';

class Details extends React.Component {
  componentDidMount() {
    this.props.loadBeerDetails(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.loadBeerDetails(this.props.match.params.id);
    }
  }

  render() {
    return (
      <DetailsHeading beer={this.props.currentBeer}
                      previousBeer={this.props.previousBeer}
                      nextBeer={this.props.nextBeer} />
    );
  }
}

const mapPropsToState = state => {
  const currentBeer = getCurrentBeer(state);
  const previousBeer = getPreviousBeer(state);
  const nextBeer = getNextBeer(state);
  return {
    currentBeer,
    previousBeer,
    nextBeer
  };
};

const mapDispatchToState = (dispatch, ownProps) => ({
  loadBeerDetails: id => dispatch(fetchBeerDetails(id))
});

export default connect(mapPropsToState, mapDispatchToState)(Details);