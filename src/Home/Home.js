import React from 'react';
import * as axios from 'axios';
import BeerList from '../shared/BeerList/BeerList';
import './Home.scss';
import {DebounceInput} from 'react-debounce-input';

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
              <DebounceInput
                debounceTimeout={250}
                placeholder='Filtra per nome'
                onChange={event => this.onFilterChanged('beer_name', event.target.value)}/>
            </div>
            <div className="home__search-filters__content__filter home__search-filters__content__filter--food">
              <DebounceInput
                debounceTimeout={250}
                placeholder='Filtra per abbinamento'
                onChange={event => this.onFilterChanged('food', event.target.value)}/>
            </div>
            <div className="home__search-filters__content__filter home__search-filters__content__filter--abv-gt">
              <DebounceInput
                debounceTimeout={250}
                placeholder='Da'
                type='number'
                onChange={event => this.onFilterChanged('abv_gt', event.target.value)}/>
            </div>
            <div className="home__search-filters__content__filter home__search-filters__content__filter--abv-lt">
              <DebounceInput
                debounceTimeout={250}
                placeholder='A'
                type='number'
                onChange={event => this.onFilterChanged('abv_lt', event.target.value)}/>
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