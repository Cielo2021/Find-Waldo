// FindWaldo.js
import React, { useState } from 'react';
import mapPhoto from '../../assets/map.jpg';
import './FindWaldo.css';

const FindWaldo = () => {
  const [waldoFound, setWaldoFound] = useState(false);

  const handleWaldoFound = () => {
    setWaldoFound(true);
  };

  return (
    <div className="find-waldo-container">
      <div className="clickable-image" onClick={handleWaldoFound}>
        <img className="map-photo" src={mapPhoto} alt="Find Waldo Map" />
      </div>
      {waldoFound ? (
        <div className="waldo-found-message">
          <h2>Congratulations! You found Waldo!</h2>
          {/* Other content */}
        </div>
      ) : (
        <p className="instruction-message">Click on Waldo to find him!</p>
      )}
    </div>
  );
};

export default FindWaldo;
