import SearchFilter from '../../shared/SearchFilter/SearchFilter';
import React from 'react';
import './SearchBar.scss';

const SearchBar = props => (
  <div className="search-bar">
    <div className="search-bar__content">
      <div className="search-bar__content__filter search-bar__content__filter--home">
        <SearchFilter name='beer_name'
                      placeholder='Filtra per nome'
                      onFilterChanged={props.onFilterChanged} />
      </div>
      <div className="search-bar__content__filter search-bar__content__filter--food">
        <SearchFilter name='food'
                      placeholder='Filtra per abbinamento'
                      onFilterChanged={props.onFilterChanged} />
      </div>
      <div className="search-bar__content__filter search-bar__content__filter--abv-gt">
        <SearchFilter name='abv_gt'
                      number
                      placeholder='Da'
                      onFilterChanged={props.onFilterChanged} />
      </div>
      <div className="search-bar__content__filter search-bar__content__filter--abv-lt">
        <SearchFilter name='abv_lt'
                      number
                      placeholder='A'
                      onFilterChanged={props.onFilterChanged} />
      </div>
    </div>
  </div>
);

export default SearchBar;