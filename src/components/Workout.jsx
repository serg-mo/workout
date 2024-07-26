import React from "react";
import { formatWorkout } from "../lib";

// workout is multiples exercises => sets
export default function Workout({ title, workout }) {
  if (!workout || !Object.keys(workout).length) {
    return;
  }

  return (
    <div className="my-2 py-2">
      {title && <h2>{title}</h2>}
      <div className="whitespace-pre">
        {Object.entries(workout).map(formatWorkout).join("\n")}
      </div>
    </div>
  );
}
