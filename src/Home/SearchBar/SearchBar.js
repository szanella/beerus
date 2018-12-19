import SearchFilter from '../../shared/SearchFilter/SearchFilter';
import React from 'react';
import './SearchBar.scss';

const SearchBar = props => (
  <header className="search-bar">
    <div className="search-bar__content app-content">
      <div className='search-bar__content__desktop-abv'>
        <div className='search-bar__content__desktop-abv__filler' />
        <label className='search-bar__content__desktop-abv__label'>Alcohol by volume (from-to)</label>
      </div>
      <div className="search-bar__content__filters">
        <div className="search-bar__content__filters__filter search-bar__content__filters__filter--name">
          <SearchFilter name='beer_name'
                        placeholder='Filter by name'
                        onFilterChanged={props.onFilterChanged} />
        </div>
        <div className="search-bar__content__filters__filter search-bar__content__filters__filter--food">
          <SearchFilter name='food'
                        placeholder='Filter by food pairing'
                        onFilterChanged={props.onFilterChanged} />
        </div>
        <label className='search-bar__content__filters__mobile-abv'>Alcohol by volume (from-to)</label>
        <div className="search-bar__content__filters__filter search-bar__content__filters__filter--abv-gt">
          <SearchFilter name='abv_gt'
                        number
                        placeholder='From'
                        onFilterChanged={props.onFilterChanged} />
        </div>
        <div className="search-bar__content__filters__filter search-bar__content__filters__filter--abv-lt">
          <SearchFilter name='abv_lt'
                        number
                        placeholder='To'
                        onFilterChanged={props.onFilterChanged} />
        </div>
      </div>
    </div>
  </header>
);

export default SearchBar;