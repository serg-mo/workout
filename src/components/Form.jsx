import React, { useEffect, useState } from 'react';
import { arrayRange, getPreviousWorkoutSet, makeWeightOptions } from '../lib';
import ExercisePickerV2 from './form/exercisePickerV2';

export default function Form({ workout, exercises, exercise, setExercise, handleSave, undoLast }) {
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [weight, setWeight] = useState(undefined);
  const [reps, setReps] = useState(0);
  const [weightOptions, setWeightOptions] = useState([]);
  const [repsOptions, setRepsOptions] = useState([]);

  useEffect(() => {
    if (!exercise) return;

    const options = makeWeightOptions(exercises[exercise], exercise);
    setWeight(exercises[exercise]); // default to setup weight

    setWeightOptions(options);
    setRepsOptions(arrayRange(3, 20, 1));

    // initialize weight/reps from the first set of the last workout that contains this exercise
    const { weight: prevWeight, reps: prevReps } = getPreviousWorkoutSet(exercise, 0);
    if (options.includes(prevWeight)) {
      setWeight(prevWeight);
      setReps(prevReps);
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

  useEffect(() => {
    if (!exercises) {
      return;
    }

    // append a star per set for every exercise today
    setExerciseOptions(
      Object.keys(exercises).map((value) => {
        const sets = workout?.[value] ? workout[value].split(',') : [];
        const stars = sets.length > 0 ? ` ${'·'.repeat(sets.length)}` : '';
        return { value, label: `${value}${stars}` };
      })
    );
  }, [workout, exercises]);

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between text-2xl text-center">
      <ExercisePickerV2 {...{ exercise, setExercise, exerciseOptions }} />

      <select
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="grow appearance-none p-3 border rounded focus:outline-none"
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
        className="grow appearance-none p-3 border rounded focus:outline-none"
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
