import React from 'react';
import * as axios from 'axios';
import BeerList from '../shared/BeerList/BeerList';
import './Home.scss';
import {DebounceInput} from 'react-debounce-input';
import SearchFilter from '../shared/SearchFilter/SearchFilter';
import SearchBar from './SearchBar/SearchBar';
import BeerCount from '../shared/BeerList/BeerCount/BeerCount';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      loading: false,
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
    this.getBeers();
  }

  getBeers() {
    this.setState({
      loading: true
    });
    const params = this.composeQuery();
    axios.get(`https://api.punkapi.com/v2/beers`, {params})
      .then(res => {
        const beers = res.data;

        this.setState({
          beers,
          loading: false
        });
      });
  }

  onFilterChanged(fieldName, value) {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [fieldName]: value
      }
    });
    console.log(this.state);
    this.getBeers();
  }

  composeQuery() {
    const params = {};
    for (let key in this.state.queryParams) {
      if (this.state.queryParams.hasOwnProperty(key) && this.state.queryParams[key]) {
        params[key] = this.state.queryParams[key];
      }
    }
    return params;
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <div>Loading</div>
    } else {
      content = <>
        <BeerCount beers={this.state.beers}/>
        <BeerList beers={this.state.beers}/>
      </>;
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

export default Home;