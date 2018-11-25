import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home/Home';
import Header from './core/Header/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path='/' component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
