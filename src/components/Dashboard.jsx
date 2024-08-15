import React from "react";
import { formatDate, getLocalStorage } from "../lib";
import Sets from "./Sets";

export default function Dashboard({ workout, exercise }) {
  if (!exercise) {
    return;
  }

  const { history } = getLocalStorage(); // most recent first
  const today = formatDate();

  // any workouts before today that contain this exercise
  const prev = Object.entries(history)
    .filter(([date, workout]) => date !== today && !!workout[exercise])
    .map(([date, workout]) => ({ date, sets: workout[exercise] }));

  return (
    <div className="my-4 flex-grow text-lg text-gray-600 text-left whitespace-pre">
      {workout?.[exercise] && <Sets sets={workout[exercise]} />}
      {prev.length &&
        prev.map(({ date, sets }, index) => (
          <Sets date={date} sets={sets} key={index} />
        ))}
    </div>
  );
}
