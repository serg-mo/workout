import React from "react";
import { formatDate, getLocalStorage } from "../lib";
import Sets from "./Sets";

export default function Dashboard({ workout, exercise }) {
  if (!exercise) {
    return;
  }

  const workouts = getLocalStorage();
  const today = formatDate();

  const prev = Object.entries(workouts)
    .filter(([date, workout]) => date !== today && !!workout[exercise])
    .map(([date, workout]) => ({ date, sets: workout[exercise] }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent first

  // TODO: change the sets shape
  return (
    <div className="my-4 flex-grow text-lg text-gray-600 text-left whitespace-pre">
      {workout?.[exercise] && <Sets title="Today" sets={workout[exercise]} />}
      {prev.length &&
        prev.map(({ date, sets }, index) => (
          <Sets title={date.substring(5)} sets={sets} key={index} />
        ))}
    </div>
  );
}
