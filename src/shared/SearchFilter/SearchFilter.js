import './SearchFilter.scss';
import React from 'react';
import {DebounceInput} from 'react-debounce-input';

const SearchFilter = props => (
  <DebounceInput
    className='search-filter'
    debounceTimeout={250}
    placeholder={props.placeholder}
    type={props.number ? 'number' : 'text' }
    onChange={event => props.onFilterChanged(props.name, event.target.value)}/>
);


export default SearchFilter;