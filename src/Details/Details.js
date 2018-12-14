import React from 'react';
import './Details.scss';
import {getCurrentBeer, getDetailsLoading, getNextBeer, getPreviousBeer} from '../redux/selectors';
import {connect} from 'react-redux';
import {fetchBeerDetails} from '../redux/actions';
import DetailsHeading from './DetailsHeading/DetailsHeading';
import BeerImage from '../shared/BeerImage/BeerImage';

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
    let descriptionContent;

    if (detailsLoading) {
      descriptionContent = <div>Loading</div>;
    } else {
      descriptionContent = currentBeer && (
        <>
          <h2>Description</h2>
          <p>{currentBeer.description}</p>
        </>
      );
    }
    return (
      <div className='details'>
        <DetailsHeading beer={currentBeer}
                        previousBeer={previousBeer}
                        nextBeer={nextBeer}/>
        <div className='details__content'>
          <div className='details__content__top'>
            <div className='details__content__top__description'>
              {descriptionContent}
            </div>
            <BeerImage beer={currentBeer}/>
          </div>
            <div className='details__content__banner'>
              {!detailsLoading && currentBeer && (
                <>
                  <span>{`ABV: ${currentBeer.abv}%`}</span>
                  <span>{`SRM: ${currentBeer.srm}`}</span>
                  <span>{`EBC: ${currentBeer.ebc}`}</span>
                  <span>{`IBU: ${currentBeer.ibu}`}</span>
                  <span>{`PH: ${currentBeer.ph}`}</span>
                </>
              )}
            </div>
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