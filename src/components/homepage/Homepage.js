import React, { useState, useEffect, useRef } from "react";
import mapPhoto from "../../assets/map.jpg";
import LeaderboardPopup from "../../components/leaderboard-popup/LeaderboardPopup";
import "./Homepage.css";

const Homepage = () => {
  const [waldoFound, setWaldoFound] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [ratioX, setRatioX] = useState(1);
  const [ratioY, setRatioY] = useState(1);
  const imageRef = useRef(null);

  // Timer to track the duration of the game
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeTaken(prevTime => prevTime + 1);
      }, 1000);
    } else if (!timerActive && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  // useEffect hook to handle image load and calculate ratios
  useEffect(() => {
    function handleImageLoad() {
      const img = imageRef.current;
      const rect = img.getBoundingClientRect();
      const actualWidth = 3493; // Actual width of the image
      const actualHeight = 5000; // Actual height of the image
      setRatioX(actualWidth / rect.width);
      setRatioY(actualHeight / rect.height);
    }

    const img = imageRef.current;
    if (img && img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
    }

    return () => {
      img.removeEventListener("load", handleImageLoad);
    };
  }, []);

  const checkClickedCoords = (x, y) => {
    const waldoCoordinates = {
      x: 250 * ratioX,
      y: 734.5 * ratioY,
    };

    const tolerance = 30;
    const withinRange = Math.abs(x - waldoCoordinates.x) < tolerance && Math.abs(y - waldoCoordinates.y) < tolerance;
    return withinRange;
  };

  const handleWaldoFound = (event) => {
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left; // Correct x coordinate relative to the image
    const y = event.clientY - rect.top; // Correct y coordinate relative to the image

    const foundWaldo = checkClickedCoords(x, y);
    if (foundWaldo) {
      setWaldoFound(true);
      setTimerActive(false); // Stop the timer
      alert("Yay, you found me!");
    } else {
      alert("Oops, that's not Waldo!");
    }
  };

  // Start the timer when the component mounts
  useEffect(() => {
    setTimerActive(true);
  }, []);

  return (
    <div className="homepage-container">
      <div className="map-container" onClick={handleWaldoFound}>
        <img
          ref={imageRef}
          className="map-photo"
          src={mapPhoto}
          alt="Find Waldo Map"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      {waldoFound && <LeaderboardPopup userTime={timeTaken} waldoFound={waldoFound} />}
    </div>
  );
};

export default Homepage;
