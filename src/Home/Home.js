import React from 'react';
import * as axios from 'axios';
import BeerList from '../shared/BeerList/BeerList';
import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getBeers();
  }

  getBeers() {
    axios.get('https://api.punkapi.com/v2/beers')
      .then(res => {
        const beers = res.data;

        this.setState({beers});
      });
  }


  render() {
    return (
      <div className="home">
        <BeerList beers={this.state.beers} />
      </div>
  );
  }
}

export default Home;