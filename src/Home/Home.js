import React from 'react';
import * as axios from 'axios';
import BeerList from '../shared/BeerList/BeerList';
import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      loading: false,
      queryString: {
        page: 1,
        perPage: 10
      }
    };
  }

  componentDidMount() {
    this.getBeers();
  }

  getBeers() {
    this.setState({
      loading: true
    });
    axios.get(`https://api.punkapi.com/v2/beers?page=${this.state.queryString.page}&per_page=${this.state.queryString.perPage}`)
      .then(res => {
        const beers = res.data;

        this.setState({
          beers,
          loading: false
        });
      });
  }


  render() {
    return (
      <div className="home">
        { this.state.loading ? <div>Loading</div> : <BeerList beers={this.state.beers} /> }
      </div>
  );
  }
}

export default Home;