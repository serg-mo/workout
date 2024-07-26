import React, { useEffect, useState } from "react";
import { arrayRange, getTodaysWorkout, WORKOUTS } from "../lib";

export default function Form({ exercise, setExercise, handleSave, undoLast }) {
  const [workout, setWorkout] = useState(getTodaysWorkout());
  const [exercises, setExercises] = useState([]);

  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [weightOptions, setWeightOptions] = useState([]);

  const repsOptions = arrayRange(3, 20, 1);

  useEffect(() => {
    setExercises(WORKOUTS[workout]); // exercise name => [weight options]
    setExercise(Object.keys(WORKOUTS[workout])[0]); // first exercise in a workout
  }, [workout]);

  useEffect(() => {
    if (!exercise) return;

    setWeightOptions(exercises[exercise]);

    // TODO: pre-select most recent set
    setWeight(0);
    setReps(0);
  }, [exercise]);

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between text-3xl text-center">
      <select
        value={workout}
        onChange={(e) => setWorkout(e.target.value)}
        className="appearance-none w-full p-3 leading-tight border rounded focus:outline-none"
      >
        <option value="" disabled>
          Workout
        </option>
        {Object.keys(WORKOUTS).map((name) => (
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
          disabled={!exercise || !weight || !reps}
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
