import React from 'react';
import BeerList from '../shared/BeerList/BeerList';
import './Home.scss';
import SearchBar from './SearchBar/SearchBar';
import {getBeers, getBeersLoading} from '../redux/selectors';
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
  }

  componentDidMount() {
    this.props.loadBeersPage(this.state.queryParams);
  }

  onFilterChanged(fieldName, value) {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [fieldName]: value,
        page: 1
      }
    });
    this.props.loadBeersPage(this.state.queryParams);
  }

  render() {
    let content;
    if (this.props.beersLoading) {
      content = <div>Loading</div>
    } else {
      content = <BeerList beers={this.props.beers}/>;
    }
    
    return (
      <div className="home">
        <SearchBar onFilterChanged={this.onFilterChanged}/>
        <div className="home__content">
          {content}
        </div>
      </div>
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
  loadBeersPage: query => dispatch(fetchBeersPage(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);