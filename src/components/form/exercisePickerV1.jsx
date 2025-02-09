import React from 'react';

export default function ExercisePickerV1({ exercise, setExercise, exerciseOptions }) {
  return (
    <select
      value={exercise}
      onChange={(e) => setExercise(e.target.value)}
      className="appearance-none w-full p-3 leading-tight border rounded focus:outline-none"
    >
      <option value="" disabled>
        Exercise
      </option>
      {exerciseOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
