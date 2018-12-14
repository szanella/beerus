import React from 'react';
import './Details.scss';
import {getCurrentBeer, getDetailsLoading, getNextBeer, getPreviousBeer} from '../redux/selectors';
import {connect} from 'react-redux';
import {fetchBeerDetails} from '../redux/actions';
import DetailsHeading from './DetailsHeading/DetailsHeading';
import BeerImage from './BeerImage/BeerImage';

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
    const {currentBeer, previousBeer, nextBeer, detailsLoading} = this.props;
    let content;
    if (detailsLoading) {
      content = <div>Loading</div>;
    } else {
      content = currentBeer && (
        <>
          <div className='details__content__description'>
            <h2>Description</h2>
            <p>{currentBeer.description}</p>
          </div>
          <BeerImage beer={currentBeer} />
        </>
      );
    }
    return (
      <div className='details'>
        <DetailsHeading beer={currentBeer}
                        previousBeer={previousBeer}
                        nextBeer={nextBeer}/>
        <div className='details__content'>
          {content}
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => {
  const currentBeer = getCurrentBeer(state);
  const previousBeer = getPreviousBeer(state);
  const nextBeer = getNextBeer(state);
  const detailsLoading = getDetailsLoading(state);
  return {
    currentBeer,
    previousBeer,
    nextBeer,
    detailsLoading
  };
};

const mapDispatchToState = (dispatch, ownProps) => ({
  loadBeerDetails: id => dispatch(fetchBeerDetails(id))
});

export default connect(mapPropsToState, mapDispatchToState)(Details);