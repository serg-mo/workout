import React, { useEffect, useState } from 'react';

export default function ExercisePickerV2({ workout, exercises, exercise, setExercise }) {
  const [exerciseOptions, setExerciseOptions] = useState([]);

  useEffect(() => {
    if (!exercises) {
      return;
    }

    // append a star per set for every exercise today
    setExerciseOptions(
      Object.keys(exercises).map((value) => {
        const sets = workout?.[value] ? workout[value].split(',') : [];
        const stars = sets.length > 0 ? '*'.repeat(sets.length) : '';
        return { value, stars };
      })
    );
  }, [workout, exercises]);

  return (
    <div className="w-full flex flex-col gap-2 border border-gray-300 rounded-lg overflow-hidden">
      {exerciseOptions.map(({ value, stars }) => (
        <div
          key={value}
          onClick={() => setExercise(value)}
          className={`flex flex-row justify-between items-center px-2 py-3 ${exercise === value ? 'bg-gray-300' : 'bg-white'}`}
        >
          <div>{value}</div>
          <div>{stars}</div>
        </div>
      ))}
    </div>
  );
}
