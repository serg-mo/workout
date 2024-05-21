import React from "react";
import Workout from "./Workout";
import { LOCAL_STORAGE_KEY } from "./lib";

export default function Dashboard({ currentWorkout, currentExercise }) {
  // NOTE: previous workout is only relevant for the same day of the week
  const week = 7 * (24 * 60 * 60 * 1000); // milliseconds
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const last = new Date(new Date().getTime() - week).toISOString().slice(0, 10); // YYYY-MM-DD

  const workouts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  const previousWorkout = workouts[last] ?? false;

  return (
    <div className="my-4 flex-grow border">
      <div className="text-xl font-bold my-2">{currentExercise}</div>
      <Workout workout={currentWorkout} title={`Today ${today}`} />
      <Workout workout={previousWorkout} title={`Last (${last})`} />
    </div>
  );
}
