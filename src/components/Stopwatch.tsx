import React, { useRef, useState, useEffect } from "react";
import "./../styles/Stopwatch.css";
import { formatTime } from "../utils/commonFunctions";

const Stopwatch: React.FC = () => {
  // State to keep track of the current time in milliseconds
  const [time, setTime] = useState<number>(0);

  // State to determine whether the stopwatch is running
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // State to store the final elapsed time when the stopwatch is stopped
  const [finalTime, setFinalTime] = useState<number | null>(null);

  // Ref to store the starting time (in milliseconds) when the stopwatch starts/resumes
  const startTimeRef = useRef<number>(0);

  // Ref to store the requestAnimationFrame ID to control the animation loop
  const requestRef = useRef<number | null>(null);


  //  updateTimer function to update the timer by calculating the elapsed time.
  //  This function is called repeatedly using requestAnimationFrame.
  const updateTimer = () => {
    setTime(Date.now() - startTimeRef.current);
    requestRef.current = requestAnimationFrame(updateTimer);
  };

  const handleStartPause = () => {
    setFinalTime(null); // Clear any previous elapsed time
    if (isRunning) {
      // Pause the timer
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    } else {
      // Start/Resume the timer
      startTimeRef.current = Date.now() - time; // Adjust start time to continue from where it left off
      requestRef.current = requestAnimationFrame(updateTimer); // Start the animation loop
    }
    setIsRunning(!isRunning); // Toggle the isRunning state
  };

  const handleStop = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current); // Stop the animation loop
    }
    setFinalTime(time); // Store the final elapsed time
    setIsRunning(false);
    setTime(0); // Reset the timer to 00:00:00
  };

  const handleReset = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    setIsRunning(false);
    setTime(0);
    setFinalTime(null); // Clear any previous elapsed time
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);


  return (
    <div className="stopwatch">
      <h1 className="heading">Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      {finalTime !== null && (
        <div className="final-time">Final Time: {formatTime(finalTime)}</div>
      )}
      <div className="buttons">
        <button className="button" onClick={handleStartPause}>{isRunning ? "Pause" : "Start"}</button>
        <button disabled={!isRunning} className={!isRunning ? 'disabled' : 'button'} onClick={handleStop}>Stop</button>
        <button className="button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;