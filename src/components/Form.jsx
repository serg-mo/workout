import React, { useEffect, useState } from 'react';
import { arrayRange, formatDate, getLocalStorage, makeWeightOptions, parseSet } from '../lib';

export default function Form({ workout, exercises, exercise, setExercise, handleSave, undoLast }) {
  const { workouts, history } = getLocalStorage(); // most recent first

  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [weightOptions, setWeightOptions] = useState([]);
  const [repsOptions, setRepsOptions] = useState([]);

  // TODO: move this to lib
  const getPreviousWorkoutSet = (setIndex) => {
    const today = formatDate();
    const [, prev] =
      Object.entries(history).find(([date, workout]) => date !== today && !!workout[exercise]) ||
      [];

    const sets = prev?.[exercise] ? prev[exercise].split(",") : [];
    // console.log({ sets, setIndex, value: sets?.[setIndex] })
    return parseSet(sets[setIndex]);
  };

  useEffect(() => {
    if (!exercise) return;

    const options = makeWeightOptions(exercises[exercise]);

    setWeightOptions(options);
    setRepsOptions(arrayRange(3, 20, 1));

    // initialize weight/reps from the first set of the last workout that contains this exercise
    const { weight: prevWeight, reps: prevReps } = getPreviousWorkoutSet(0);
    if (options.includes(prevWeight)) {
      setWeight(prevWeight);
      setReps(prevReps);
    }
  }, [exercise]);

  // when we add a new set, workout changes, and we update the weight/reps for the next set
  useEffect(() => {
    // look ahead one set
    const sets = workout?.[exercise] ? workout[exercise].split(",") : [];
    const { weight: prevWeight, reps: prevReps } = getPreviousWorkoutSet(sets.length);

    if (weightOptions.includes(prevWeight)) {
      setWeight(prevWeight);
      setReps(prevReps);
    }
  }, [workout]);

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between text-3xl text-center">
      <select
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        className="appearance-none w-full p-3 leading-tight border rounded focus:outline-none"
      >
        <option value="" disabled>
          Exercise
        </option>
        {Object.keys(exercises).map((exercise) => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <select
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="grow appearance-none p-3 border rounded focus:outline-none"
      >
        <option value={0} disabled>
          Weight
        </option>
        {weightOptions.map((value) => (
          <option key={value} value={value}>
            {value}lb
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
          className="grow bg-blue-500 disabled:bg-gray-500 text-white font-bold p-2 rounded"
          onClick={() => handleSave(exercise, weight, reps)}
          disabled={!exercise || !reps}
        >
          Save
        </button>

        <button
          className="bg-blue-500 disabled:bg-gray-500 text-white font-bold p-2 rounded"
          onClick={undoLast}
          disabled={!exercise}
        >
          Undo
        </button>
      </div>
    </div>
  );
}
