import React, { useEffect, useRef, useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { milliseconds, seconds, minutes, hours } = prevTime;

          milliseconds += 1;

          if (milliseconds === 100) {
            milliseconds = 0;
            seconds += 1;
          }

          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }

          if (minutes === 100) {
            minutes = 0;
            hours += 1;
          }

          return { milliseconds, seconds, minutes, hours };
        });
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const startHandler = () => setRunning(true);
  const stopHandler = () => setRunning(false);
  const resetHandler = () => {
    setRunning(false);
    setTime({
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <div className="p-5">
        <span className="tracking-wider text-4xl">
          {String(time.hours).padStart(2, "0")}:
          {String(time.minutes).padStart(2, "0")}:
          {String(time.seconds).padStart(2, "0")}:
          {String(time.milliseconds).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-center flex-wrap space-x-2">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          onClick={startHandler}
        >
          Start
        </button>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          onClick={stopHandler}
        >
          Stop
        </button>
        <button
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          onClick={resetHandler}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
