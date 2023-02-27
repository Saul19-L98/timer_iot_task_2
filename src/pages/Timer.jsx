import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

function Timer() {
  const [timeLimit, setTimeLimit] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const [timerId, setTimerId] = useState(undefined);

  const timerElement = useRef();
  const time = useRef();
  const timeLeft = useRef();
  const endTime = useRef();

  useEffect(() => {
    time.current = timeLimit;
    if (time.current !== undefined) {
      displayTimeLeft(time.current);
    }
    timeLeft.current = 0;
    endTime.current = 0;
  }, [timeLimit]);

  function displayTimeLeft(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const display = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timerElement.current.textContent = display;
    if (time === 0 && timeLimit !== 0 && !timerId) {
      toast.success("Time has ended ⏲");
    }
  }

  function startTimer(seconds) {
    if (!seconds.current) {
      toast.error("Time input is required 😯");
      return;
    }
    if (timeLimit !== 0) toast.success("Timer has Started ⌛");
    clearInterval(timerId);
    //The Date.now() static method returns the number of milliseconds elapsed since the epoch.
    endTime.current = Date.now() + seconds.current * 1000;
    displayTimeLeft(seconds.current);
    setTimerId(
      //This 'setInterval' is not part of a useState.
      setInterval(() => {
        timeLeft.current = Math.round((endTime.current - Date.now()) / 1000);
        if (timeLeft.current < 0) {
          clearInterval(timerId);
          time.current = 0;
          setIsPaused(false);
          return;
        }
        displayTimeLeft(timeLeft.current);
      }, 1000)
    );
    setIsPaused(true);
  }

  function pauseTimer() {
    clearInterval(timerId);
    setIsPaused(false);
  }

  function restartTimer() {
    if (!timerId) return;
    clearInterval(timerId);
    displayTimeLeft(time.current);
  }

  function resetTimer() {
    clearInterval(timerId);
    time.current = undefined;
    timeLeft.current = undefined;
    endTime.current = undefined;
    displayTimeLeft(0);
    setTimeLimit(0);
    setIsPaused(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTimeLimit(+userInput);
    setUserInput("");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        ref={timerElement}
        className="text-white text-6xl font-bold mb-4"
        id="timer"
      >
        00:00:00
      </div>
      <div className="flex space-x-4">
        {!isPaused && (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            id="control"
            onClick={() => {
              console.log(timeLeft.current);
              !timeLeft.current ? startTimer(time) : startTimer(timeLeft);
            }}
          >
            Start
          </button>
        )}
        {isPaused && (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            id="control"
            onClick={() => pauseTimer()}
          >
            Pause
          </button>
        )}
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          id="restart"
          onClick={restartTimer}
        >
          Restart
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          id="reset"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <form className="my-4" onSubmit={handleSubmit}>
        <label
          className="text-white block text-gray-700 font-bold mb-2"
          htmlFor="start-time"
        >
          Start Time (in seconds):
        </label>
        <div className="flex space-x-4">
          <input
            onChange={(e) => setUserInput(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="start-time"
            type="number"
            min="0"
            max="86400"
            value={userInput}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            id="submit"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Timer;
