import React from 'react';

export default function Workouts({ workouts, onSelect }) {
  return (
    <div className="w-full text-gray-600 flex flex-col gap-2 items-center justify-center">
      {Object.entries(workouts).map(([name, workout]) => (
        <div
          key={name}
          className="p-2 rounded bg-gray-200 cursor-pointer w-3/4"
          onClick={() => onSelect(name)}
        >
          <div className="text-xl font-bold">{name}</div>
          {Object.entries(workout).map(([exercise, weight]) => (
            <div key={exercise} className="text-l text-gray-500 flex flex-row">
              <div className="w-3/4">{exercise}</div>
              <div className="w-1/4 text-right">{weight}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
