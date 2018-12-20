import React from 'react';
import './Favourites.scss';
import {getBeers, getBeersLoading} from '../redux/selectors';
import {fetchFavouriteBeers} from '../redux/actions';
import connect from 'react-redux/es/connect/connect';
import BeerList from '../shared/BeerList/BeerList';
import BeerListLoading from '../shared/BeerListLoading/BeerListLoading';

class Favourites extends React.Component {
  componentDidMount() {
    this.props.loadFavouriteBeers();
  }

  render() {
    let content;
    if (this.props.beersLoading) {
      content = <BeerListLoading />
    } else {
      content = <BeerList beers={this.props.beers}/>;
    }
    return (
      <main className="favourites">
        <div className="favourites__content app-content">
          {content}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const beers = getBeers(state);
  const beersLoading = getBeersLoading(state);
  return {
    beers,
    beersLoading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFavouriteBeers: () => dispatch(fetchFavouriteBeers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);