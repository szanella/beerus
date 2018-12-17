import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home/Home';
import Header from './core/Header/Header';
import Details from './Details/Details';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/details/:id' component={Details} />
          <Route path='/random' render={() => <Details random />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
