import React from 'react';
import './Header.scss';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import * as axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.goToRandom = this.goToRandom.bind(this);
  }


  goToRandom() {
    axios.get('https://api.punkapi.com/v2/beers/random')
      .then(res => this.props.history.push(`/details/${res.body.id}`));
  }

  render() {
    return (
      <div className='header'>
        <div className='header__content app-content'>
          <div>
            {
              this.props.location.pathname === '/' ?
                <h1>Brewdog</h1> :
                <NavLink exact to="/">All beers</NavLink>
            }
          </div>

          <NavLink to="/random">A random beer</NavLink>
          <NavLink to="/favourites">Favourites</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);