import React, { useEffect, useState } from 'react';
import { arrayRange, getPreviousWorkoutSet, makeWeightOptions } from '../lib';
import ExercisePickerV2 from './form/exercisePickerV2';

export default function Form({ workout, exercises, exercise, setExercise, handleSave, undoLast }) {
  const [weight, setWeight] = useState(undefined);
  const [reps, setReps] = useState(0);
  const [weightOptions, setWeightOptions] = useState([]);
  const repsOptions = arrayRange(3, 20, 1); // 3-20 reps

  useEffect(() => {
    if (!exercise) return;

    const options = makeWeightOptions(exercise);
    setWeightOptions(options);

    // initialize weight/reps from the first set of the last workout that contains this exercise
    const { weight: prevWeight, reps: prevReps } = getPreviousWorkoutSet(exercise, 0);
    if (options.includes(prevWeight)) {
      setWeight(prevWeight);
      setReps(prevReps);
    } else {
      setWeight(exercises[exercise]); // default weight from setup
    }
  }, [exercise]);

  // when we add a new set, workout changes, and we update the weight/reps for the next set
  useEffect(() => {
    // look ahead one set
    const sets = workout?.[exercise] ? workout[exercise].split(',') : [];
    const { weight: prevWeight, reps: prevReps } = getPreviousWorkoutSet(exercise, sets.length);

    if (weightOptions.includes(prevWeight)) {
      setWeight(prevWeight);
      setReps(prevReps);
    }
  }, [workout]);

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between text-2xl text-center">
      <ExercisePickerV2 {...{ workout, exercises, exercise, setExercise }} />

      <select
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="grow appearance-none p-3 border border-gray-300 text-center rounded focus:outline-none"
      >
        <option value={undefined} disabled>
          Weight
        </option>
        {weightOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className="grow appearance-none p-3 border border-gray-300 text-center rounded focus:outline-none"
      >
        <option value={0} disabled>
          Reps
        </option>
        {repsOptions.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <div className="flex flex-row w-full space-x-2">
        <button
          className="grow"
          onClick={() => handleSave(exercise, weight, reps)}
          disabled={!exercise || !reps}
        >
          Save
        </button>

        <button onClick={undoLast} disabled={!exercise}>
          Undo
        </button>
      </div>
    </div>
  );
}
