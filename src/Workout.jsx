import React from "react";

// workout is exercises => reps[]
export default function Workout({ title, workout }) {
  if (!Object.keys(workout).length) {
    return;
  }

  const formatSets = (sets) =>
    sets.map(({ weight, reps }) => `${weight}x${reps}`).join(", ");

  return (
    <div className="my-2 py-2 text-gray-600 text-sm text-left">
      {title && <h2>{title}</h2>}
      <div className="whitespace-pre">
        {Object.entries(workout)
          .map(([exercise, sets]) => `${exercise}: ${formatSets(sets)}`)
          .join("\n")}
      </div>
    </div>
  );
}
