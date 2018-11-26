import React from 'react';
import * as axios from 'axios';
import BeerList from '../shared/BeerList/BeerList';
import './Home.scss';
import {DebounceInput} from 'react-debounce-input';
import SearchFilter from '../shared/SearchFilter/SearchFilter';

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
    return (
      <div className="home">
        <div className="home__search-filters">
          <div className="home__search-filters__content">
            <div className="home__search-filters__content__filter home__search-filters__content__filter--home">
              <SearchFilter name='beer_name'
                            placeholder='Filtra per nome'
                            onFilterChanged={this.onFilterChanged} />
            </div>
            <div className="home__search-filters__content__filter home__search-filters__content__filter--food">
              <SearchFilter name='food'
                            placeholder='Filtra per abbinamento'
                            onFilterChanged={this.onFilterChanged} />
            </div>
            <div className="home__search-filters__content__filter home__search-filters__content__filter--abv-gt">
              <SearchFilter name='abv_gt'
                            number
                            placeholder='Da'
                            onFilterChanged={this.onFilterChanged} />
            </div>
            <div className="home__search-filters__content__filter home__search-filters__content__filter--abv-lt">
              <SearchFilter name='abv_lt'
                            number
                            placeholder='A'
                            onFilterChanged={this.onFilterChanged} />
            </div>
          </div>
        </div>
        <div className="home__content">
          {this.state.loading ? <div>Loading</div> : <BeerList beers={this.state.beers}/>}
        </div>
      </div>
    );
  }
}

export default Home;