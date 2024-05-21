import React from "react";

// workout is exercise => sets
export default function Workout({ title, workout }) {
  if (!workout || !Object.keys(workout).length) {
    return;
  }

  const formatSets = (sets) =>
    sets.map(({ weight, reps }) => `${weight}x${reps}`).join(", ");

  const formatWorkout = ([exercise, sets]) =>
    `${exercise}: ${formatSets(sets)}`;

  return (
    <div className="my-2 py-2 text-gray-600 text-sm text-left">
      {title && <h2>{title}</h2>}
      <div className="whitespace-pre">
        {Object.entries(workout).map(formatWorkout).join("\n")}
      </div>
    </div>
  );
}
