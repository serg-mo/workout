import React from 'react';

// TODO: this would be a good place to explore workout calendar by exerice
export default function Workouts({ workouts, onSelect }) {
  return (
    <div className="w-full text-gray-600 flex flex-col gap-2 items-center justify-center">
      {Object.entries(workouts).map(([name, workout]) => (
        <div
          key={name}
          className="p-2 rounded bg-gray-200 cursor-pointer w-full"
          onClick={() => onSelect(name)}
        >
          <div className="text-xl text-gray-500 font-bold">{name}</div>
          {Object.keys(workout).map((exercise) => (
            <div key={exercise}>{exercise}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
