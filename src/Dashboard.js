import React from "react";
import Workout from "./Workout";
import { LOCAL_STORAGE_KEY } from "./lib";

export default function Dashboard({ currentWorkout }) {
  // NOTE: previous workout is only relevant for the same day of the week
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const last = new Date(new Date().getTime() - 7 * (24 * 60 * 60 * 1000))
    .toISOString()
    .slice(0, 10); // YYYY-MM-DD

  // TODO: I should probably memoize this
  const workouts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  const previousWorkout = workouts[last] ?? false;

  // TODO: bold the current exercise
  return (
    <div className="my-4">
      <Workout workout={currentWorkout} title={`Today ${today}`} />
      <Workout workout={previousWorkout} title={`Last (${last})`} />
    </div>
  );
}
