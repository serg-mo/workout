import React, { useEffect, useState } from "react";
import { arrayRange, formatDate, getLocalStorage, parseSet } from "../lib";

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

  const [workout, setWorkout] = useState("");
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

    // manual weight options and hardcoded rep options work just fine
    setWeightOptions(exercises[exercise]);
    setRepsOptions(arrayRange(3, 20, 1));

    // last workout that containes this exercise
    // TODO: make sure date is not today
    const today = formatDate();
    const historyEntries = Object.entries(history); // [date, workout]

    // NOTE: find is not guaranteed to find anything and decomposition requires an array
    const [, curr] = historyEntries.find(([date]) => date == today) || [];
    const [, prev] = historyEntries.find(([date, workout]) => date != today && !!workout[exercise]) || [];

    // TODO: still having trouble reading the current workout, consider doing context instead
    const setIndex = !!curr?.[exercise]
      ? Math.max(curr[exercise].length - 1, 0)
      : 0; // 0 or 1 set point to the same
    console.log(`setIndex`, setIndex);
    console.log(`Current`, curr?.[exercise]);
    console.log(`Previous`, prev?.[exercise]);

    if (prev) {
      const activeSet = parseSet(prev[exercise][setIndex]); // 1 because it's
      setWeight(activeSet.weight);
      setReps(activeSet.reps);
    } else {
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
