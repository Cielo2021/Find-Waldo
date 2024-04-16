import React, { useState, useEffect } from 'react';
import './Navbar.css';
import waldoImage from '../../assets/waldo.png';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
  const [userTime, setUserTime] = useState(0); // State to store user's time

  useEffect(() => {
    let timerId;
    if (gameStarted) {
      timerId = setInterval(() => {
        setUserTime((prevTime) => prevTime + 1);
      }, 250); // Update time every 250 milliseconds (4 times faster than before)
    }

    return () => clearInterval(timerId);
  }, [gameStarted]); // Start/stop timer based on gameStarted

  const startGame = () => {
    setGameStarted(true);
  };

  

  return (
    <nav className="navbar">
      <h1 className="title">Find Me <img className="waldo-image" src={waldoImage} alt="Waldo" /> </h1>
      <div className="bottom-section">
        <div className="start-game-container">
          {!gameStarted && <button onClick={startGame}>Start Game</button>} {/* Display Start Game button if game is not started */}
          {gameStarted && <p>Time: {userTime}</p>} {/* Display Timer component if game is started */}
        </div>
        <p>Created by HVBuilds</p>
        <a href="https://github.com/Cielo2021">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

