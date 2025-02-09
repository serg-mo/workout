import React from 'react';

export default function ExercisePickerV2({ exercise, setExercise, exerciseOptions }) {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg">
      {exerciseOptions.map(({ value, label }) => (
        <div
          key={value}
          onClick={() => setExercise(value)}
          className={`text-left p-3 border rounded-lg ${exercise === value ? 'bg-blue-400 text-white border-blue-400' : 'bg-white border-gray-300'}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
