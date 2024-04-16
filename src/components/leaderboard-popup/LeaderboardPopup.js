import React, { useState, useEffect, useCallback } from "react";
import "./LeaderboardPopup.css";
import ConnectToDatabase from "../../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const LeaderboardPopup = ({ userTime, waldoFound }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(true);
  const firestore = ConnectToDatabase();

  const fetchLeaderboardData = useCallback(async () => {
    setLoading(true);
    const leaderboardRef = collection(firestore, "leaderboard");
    const snapshot = await getDocs(leaderboardRef);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })).sort((a, b) => a.time - b.time);

    setLeaderboardData(data);
    setLoading(false);
  }, [firestore]);

  useEffect(() => {
    if (waldoFound) {
      fetchLeaderboardData();
    }
  }, [waldoFound, fetchLeaderboardData]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!playerName.trim()) return;
    const leaderboardRef = collection(firestore, "leaderboard");
    await addDoc(leaderboardRef, { username: playerName, time: userTime });
    fetchLeaderboardData();
    setPlayerName("");  // Clear the input field after submission
  };

  if (!waldoFound) {
    console.log("Waldo not found - Leaderboard not rendered");
    return null;
  }
  console.log("Rendering LeaderboardPopup");  // Confirm it gets this far when expected
  
  // Calculate minutes and seconds from userTime
  const minutes = Math.floor(userTime / 60);
  const seconds = userTime % 60;

  return (
    <div className="leaderboard-popup open">
      <h2>You Found Waldo In...</h2>
      <p>Your time: {minutes} minutes {seconds} seconds</p>
      <h3>Leaderboard:</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.username}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardPopup;
