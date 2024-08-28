import React, { useEffect, useState } from 'react';
import { arrayRange, formatDate, getLocalStorage, parseSet } from '../lib';

const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export default function Form({ workout, exercise, setExercise, handleSave, undoLast }) {
  const { workouts, history } = getLocalStorage(); // most recent first

  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);

  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [weightOptions, setWeightOptions] = useState([]);
  const [repsOptions, setRepsOptions] = useState([]);

  const getPreviousWorkoutSet = (i) => {
    const today = formatDate();
    const [, prev] =
      Object.entries(history).find(([date, workout]) => date !== today && !!workout[exercise]) ||
      [];

    if (prev?.[exercise]?.[i]) {
      return parseSet(prev[exercise][i]);
    }

    return { weight: 0, reps: 0 };
  };

  // TODO: this could be on its own page, i.e., commit to a workout first
  useEffect(() => {
    if (!workoutName) {
      return;
    }

    setExercises(workouts[workoutName]); // exercise => [weight options]
    setExercise(Object.keys(workouts[workoutName])[0]); // first exercise in a workout
  }, [workoutName]);

  useEffect(() => {
    if (!exercise) return;

    setWeightOptions(exercises[exercise]);
    setRepsOptions(arrayRange(3, 20, 1));

    // initialize weight/reps from the first set of the last workout that contains this exercise
    const { weight: prevWeight, reps: prevReps } = getPreviousWorkoutSet(0);
    if (exercises[exercise].includes(prevWeight)) {
      setWeight(prevWeight);
      setReps(prevReps);
    }
  }, [exercise]);

  // when we add a new set, workout changes, and we update the weight/reps for the next set
  useEffect(() => {
    // look ahead one set
    const currentSetIndex = !!workout?.[exercise] ? workout[exercise].length : 0;

    const { weight: prevWeight, reps: prevReps } = getPreviousWorkoutSet(currentSetIndex);

    if (weightOptions.includes(prevWeight)) {
      setWeight(prevWeight);
      setReps(prevReps);
    }
  }, [workout]);

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between text-3xl text-center">
      <select
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        className="appearance-none w-full p-3 leading-tight border rounded focus:outline-none"
      >
        <option value="" disabled>
          Workout
        </option>
        {Object.keys(workouts).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

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
