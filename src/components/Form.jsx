import React, { useEffect, useState } from "react";
import { arrayRange, getLocalStorage } from "../lib";

const WEEKDAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export default function Form({ exercise, setExercise, handleSave, undoLast }) {
  const { workouts, history } = getLocalStorage(); // most recent first

  // TODO: refactor this
  function getTodaysWorkoutName() {
    const todayIndex = new Date().getDay(); // 0 = Sunday .. 6 = Saturday

    for (let delta = 0; delta < 7; delta++) {
      const prevIndex = (7 + todayIndex - delta) % 7;
      const day = WEEKDAYS[prevIndex];

      const workout = Object.keys(workouts).find((key) => key.startsWith(day));
      if (workout) {
        return workout;
      }
    }

    return ""; // select below does not like null as a value
  }

  const [workout, setWorkout] = useState(getTodaysWorkoutName());
  const [exercises, setExercises] = useState([]);

  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [weightOptions, setWeightOptions] = useState([]);
  const [repsOptions, setRepsOptions] = useState([]);

  useEffect(() => {
    if (!workout) {
      return;
    }

    setExercises(workouts[workout]); // exercise name => [weight options]
    setExercise(Object.keys(workouts[workout])[0]); // first exercise in a workout
  }, [workout]);

  useEffect(() => {
    if (!exercise) return;

    const prev = Object.entries(history).find(
      ([date, workout]) => !!workout[exercise],
    );

    if (prev) {
      const sets = prev[1][exercise];
      // TODO: change this based on the current set
      const firstSet = sets[0];

      setWeightOptions(exercises[exercise]);
      setRepsOptions(arrayRange(3, 20, 1));

      // manual weight options work just fine

      setWeight(firstSet.weight);
      setReps(firstSet.reps);
    } else {
      setWeightOptions(exercises[exercise]);
      setRepsOptions(arrayRange(3, 20, 1));

      setWeight(0);
      setReps(0);
    }
  }, [exercise]);

  // TODO: make another version where this is at least 15 total reps
  // compare "exercises" here against "workout" in App
  // const isFinished = () => {
  //   if (!workout) {
  //     return false;
  //   }

  //   console.log(workout)
  //   const minSets = 3;

  //   // workout tracks my logged progress vs exercise options
  //   // return Object.values(workout).every(sets => Array.isArray(sets) && sets.length >= minSets);
  // }

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
