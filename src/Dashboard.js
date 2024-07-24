import React from "react";
import { formatDate, getLocalStorage } from "./lib";

export default function Dashboard({ workout, exercise }) {
  if (!workout) {
    return;
  }

  if (!exercise) {
    return;
  }

  const workouts = getLocalStorage();
  const today = formatDate();

  const prev = Object.entries(workouts)
    .filter(([date, workout]) => date !== today && !!workout[exercise])
    .map(([date, workout]) => ({ date, sets: workout[exercise] }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent first

  // console.log([workout, exercise.length])
  // return;

  // TODO: change the sets shape
  // TODO: rafactor today and prev chips containers to be reusable
  return (
    <div className="my-4 flex-grow text-gray-600 text-left whitespace-pre">
      {Object.keys(workout).length && exercise.length && workout[exercise] && (
        <div className="my-1">
          <div className="inline-block w-16 mr-1">Today</div>
          {workout[exercise].map(({ weight, reps }, index) => (
            <div
              className="inline-block w-16 mx-1 text-center rounded bg-gray-300"
              key={index}
            >
              {weight}x{reps}
            </div>
          ))}
        </div>
      )}

      {prev.map(({ date, sets }) => (
        <div className="my-1">
          <div className="inline-block w-16 mr-1">{date.substring(5)}</div>
          {sets.map(({ weight, reps }, index) => (
            <div
              className="inline-block w-16 mx-1 text-center rounded bg-gray-300"
              key={index}
            >
              {weight}x{reps}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
