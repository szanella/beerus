import React from 'react';
import './BeerImage.scss';

const BeerImage = ({beer}) => (
  <div className='beer-image'>
    <img alt='Beer image' src={beer.image_url} />
  </div>
);

export default BeerImage;