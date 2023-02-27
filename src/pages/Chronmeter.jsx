import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

function Chronmeter() {
  const [seconds, setSeconds] = useState(0);
  const [state, setState] = useState("stoped");
  const [timeLimit, setTimeLimit] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (state === "start") {
      intervalRef.current = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (seconds >= timeLimit && timeLimit > 0) {
          setState("stoped");
          setSeconds(0);
          setTimeLimit("");
          toast.success("Time has ended ⌛");
        }
      }, 1000);
    } else if (state === "restart") {
      clearInterval(intervalRef.current);
      setSeconds(0);
      setTimeLimit("");
      setState("stoped");
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [state, timeLimit, seconds]);

  const secondsFormat = `${String(Math.floor((seconds / 3600) % 24)).padStart(
    2,
    "0"
  )}:${String(Math.floor((seconds / 60) % 60)).padStart(2, "0")}:${String(
    Math.floor(seconds % 60)
  ).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center justify-center w-2/5">
      <h2 className="text-white text-6xl font-bold mb-4">{secondsFormat}</h2>
      <label
        className="text-white block text-gray-700 font-bold mt-8 mb-2"
        htmlFor="start-time"
      >
        Set Time Limit ⌛ (in seconds):
      </label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        value={timeLimit}
        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
      />
      <div className="flex flex-col justify-around w-full mt-8 sm:flex-row">
        <button
          className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded sm:mb-0"
          onClick={() => setState("start")}
        >
          Start
        </button>
        <button
          className="mb-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded sm:mb-0"
          onClick={() => setState("stoped")}
        >
          Stop
        </button>
        <button
          className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded sm:mb-0"
          onClick={() => setState("restart")}
        >
          Restart
        </button>
      </div>
      <div className="mt-10 mb-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            How to use it.
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          You can set a specific time limit in the input above, or you can just
          click the button 'start' and stop it whatever time you want.
        </p>
        <a
          target="_blank"
          rel="noonponer"
          href="https://github.com/Saul19-L98/timer_iot_task_2"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Chronmeter;
