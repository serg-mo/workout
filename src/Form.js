import React, { useState, useEffect } from "react";
import { arrayRange } from "./lib";

export default function Form({ exercises, exerciseState, handleSave }) {
  const [exercise, setExercise] = exerciseState;
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const kettlebellWeights = [4.4, 8.8, 13.2, 17.6, 22, 26.4, 30.8];
  const barbellWeights = arrayRange(5, 225, 5);
  const weightOptions = [...kettlebellWeights, ...barbellWeights].sort((a, b) => a - b);
  const repsOptions = arrayRange(3, 20, 1);

  // TODO: changing the exercise should affect the weight and reps
  useEffect(() => {
    if (!exercise) return;
    setWeight(0);
    setReps(0);
  }, [exercise]);

  return (
    <div className="flex flex-row flex-wrap justify-between">
      <select
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        className="appearance-none w-full my-2 p-3 leading-tight border rounded border-transparent focus:outline-none"
      >
        <option value="" disabled>
          Exercise
        </option>
        {exercises.map((exercise) => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <select
        value={weight}
        onChange={(e) => setWeight(parseFloat(e.target.value))}
        className="grow appearance-none mr-1 p-3 border rounded border-transparent focus:outline-none"
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
        onChange={(e) => setReps(parseFloat(e.target.value))}
        className="grow appearance-none ml-1 p-3 border rounded border-transparent focus:outline-none"
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

      <button
        className="mt-2 w-full bg-blue-500 disabled:bg-gray-500 text-white font-bold p-2 rounded"
        onDoubleClick={() => handleSave(exercise, weight, reps)}
        disabled={!exercise || !weight || !reps}
      >
        Save
      </button>
    </div>
  );
}