import React from "react";
import Workout from "./Workout";
import { formatDate, getLocalStorage } from "./lib";
import Chart from "./Chart";

export default function Dashboard({ workout, exercise }) {
  // NOTE: previous workout is only relevant for the same day of the week
  const workouts = getLocalStorage();
  return (
    <div className="my-4 flex-grow">
      <Chart workouts={workouts} exercise={exercise} />
      <Workout workout={workout} title="Today" />
    </div>
  );
}
