import React from 'react';
import BeerList from '../shared/BeerList/BeerList';
import './Home.scss';
import SearchBar from './SearchBar/SearchBar';
import {getBeers, getBeersLoading, getHasMore} from '../redux/selectors';
import {connect} from 'react-redux';
import {fetchBeersPage} from '../redux/actions';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryParams: {
        beer_name: '',
        food: '',
        page: 1,
        per_page: 10
      }
    };

    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  componentDidMount() {
    this.props.loadBeersPage(this.state.queryParams);
  }

  onFilterChanged(fieldName, value) {
    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          [fieldName]: value,
          page: 1
        }
      },
      () => this.props.loadBeersPage(this.state.queryParams)
    );
  }

  onLoadMore() {
    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          page: this.state.queryParams.page + 1
        }
      },
      () => this.props.loadBeersPage(this.state.queryParams)
    );
  }

  render() {
    const {beers, beersLoading, hasMore} = this.props;

    return (
      <main className="home">
        <SearchBar onFilterChanged={this.onFilterChanged}/>
        <div className="home__content app-content">
          {beers.length > 0 && <BeerList beers={beers}/>}
          {beersLoading && <div>Loading</div>}
          {!beersLoading && hasMore && (
            <div className="home__content__load-more">
              <button onClick={this.onLoadMore}>Load more</button>
            </div>
          )}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const beers = getBeers(state);
  const beersLoading = getBeersLoading(state);
  const hasMore = getHasMore(state);
  return {
    beers,
    beersLoading,
    hasMore
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadBeersPage: query => dispatch(fetchBeersPage(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);