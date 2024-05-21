import React from "react";
import Workout from "./Workout";
import { formatDate, getLocalStorage } from "./lib";
import Chart from "./Chart";

export default function Dashboard({ currentExercise }) {
  // NOTE: previous workout is only relevant for the same day of the week
  const today = formatDate();
  const last = formatDate("today - 7 days");

  const workouts = getLocalStorage();

  const currentWorkout = workouts[formatDate] ?? false;
  const previousWorkout = workouts[last] ?? false;
  console.log({ today: formatDate, last, currentWorkout, previousWorkout });

  return (
    <div className="my-4 flex-grow border">
      <Chart workouts={workouts} exercise={currentExercise} />
      {currentWorkout && (
        <Workout workout={currentWorkout} title={`Today ${today}`} />
      )}
      {previousWorkout && (
        <Workout workout={previousWorkout} title={`Last (${last})`} />
      )}
    </div>
  );
}
