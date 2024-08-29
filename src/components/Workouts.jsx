import React from 'react';

export default function Workouts({ workouts, onSelect }) {
  return (
    <div className="text-sm text-gray-600 flex gap-2 justify-center">
      {Object.entries(workouts).map(([name, workout]) => (
        <div key={name} className="mb-2 p-2 rounded bg-gray-200 cursor-pointer grow" onClick={() => onSelect(name)}>
          <div className="font-bold">{name}</div>
          {Object.keys(workout).map((exercise) => (
            <div key={exercise} className="text-gray-500 text-xs">
              {exercise}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}