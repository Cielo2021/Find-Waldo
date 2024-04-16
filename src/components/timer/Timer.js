import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

const Timer = ({ gameStarted, waldoFound, setTimeTaken }) => {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !waldoFound) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (waldoFound && intervalRef.current) {
      clearInterval(intervalRef.current);  // Ensure timer stops when Waldo is found
      setTimeTaken(timer);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);  // Clean up interval
      }
    };
  }, [gameStarted, waldoFound, timer]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`timer ${gameStarted && !waldoFound ? "red" : ""}`}>
      {!gameStarted ? "Start Game" : formatTime(timer)}
    </div>
  );
};

export default Timer;
