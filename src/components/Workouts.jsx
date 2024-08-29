import React from 'react';

export default function Workouts({ workouts, onSelect }) {
  return (
    <div className="text-gray-600 flex flex-col gap-2 items-center justify-center">
      {Object.entries(workouts).map(([name, workout]) => (
        <div
          key={name}
          className="p-2 rounded bg-gray-200 cursor-pointer w-1/2"
          onClick={() => onSelect(name)}
        >
          <div className="font-bold">{name}</div>
          {Object.keys(workout).map((exercise) => (
            <div key={exercise} className="text-gray-500">
              {exercise}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
