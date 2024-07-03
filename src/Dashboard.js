import React from "react";
import Workout from "./Workout";
import { formatDate, formatSets, getLocalStorage } from "./lib";

export default function Dashboard({ workout, exercise }) {
  const workouts = getLocalStorage();
  const today = formatDate();

  const prev = Object.entries(workouts)
    .filter(([date, workout]) => date !== today && !!workout[exercise])
    .map(([date, workout]) => ({ date, sets: workout[exercise] }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent first

  return (
    <div className="my-4 flex-grow text-gray-600 text-left whitespace-pre">
      <Workout workout={workout} title="Today" />
      <div className="">
        {prev
          .map(({ date, sets }) => `${date.substring(5)} : ${formatSets(sets)}`)
          .join("\n")}
      </div>
    </div>
  );
}
