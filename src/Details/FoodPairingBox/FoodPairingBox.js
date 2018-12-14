import React from 'react';
import './FoodPairingBox.scss';

const FoodPairingBox = ({foodPairing}) => (
  <div className='food-pairing-box'>
    <span>{foodPairing}</span>
  </div>
);

export default FoodPairingBox;