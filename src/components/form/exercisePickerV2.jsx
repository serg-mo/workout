import React, { useEffect, useState } from 'react';

export default function ExercisePickerV2({ workout, exercises, exercise: currentExercise, setExercise }) {
  const [exerciseOptions, setExerciseOptions] = useState([]);

  useEffect(() => {
    if (!exercises) {
      return;
    }

    // append a star per set for every exercise today
    setExerciseOptions(
      Object.keys(exercises).map((ex) => {
        const sets = workout?.[ex] ? workout[ex].split(',') : [];
        // const setCount = sets.length > 0 ? '*'.repeat(sets.length) : '';
        const setCount = sets.length > 0 ? ["I", "II", "III", "IV"][sets.length - 1] : '';
        return { ex, setCount };
      })
    );
  }, [workout, exercises]);

  return (
    <div className="w-full flex flex-col gap-2 border border-gray-300 rounded-lg overflow-hidden">
      {exerciseOptions.map(({ ex, setCount }) => (
        <div
          key={ex}
          onClick={() => setExercise(ex)}
          className={`flex flex-row justify-between items-center px-2 py-3 ${currentExercise === ex ? 'bg-gray-300' : 'bg-white'}`}
        >
          <div>{ex}</div>
          <div>{setCount}</div>
        </div>
      ))}
    </div>
  );
}
