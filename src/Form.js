import React, { useState, useEffect } from "react";
import { arrayRange } from "./lib";

export default function Form({
  exercises,
  exerciseState,
  handleSave,
  undoLast,
}) {
  const [exercise, setExercise] = exerciseState;
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const kettlebellWeights = [
    4.4, 8.8, 13.2, 17.6, 22, 26.4, 30.8, 35.2, 39.6, 44, 48.4, 52.8,
  ];
  const barbellWeights = arrayRange(5, 225, 5);
  const weightOptions = [...kettlebellWeights, ...barbellWeights].sort(
    (a, b) => a - b // ascending
  );
  const repsOptions = arrayRange(3, 20, 1);

  useEffect(() => {
    if (!exercise) return;
    setWeight("");
    setReps("");
  }, [exercise]);

  return (
    <div className="flex flex-row flex-wrap justify-between text-3xl text-center">
      <select
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        className="appearance-none w-full my-2 p-3 leading-tight border rounded focus:outline-none"
      >
        <option value="" disabled>
          Exercise
        </option>
        {exercises.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="grow appearance-none mr-1 p-3 border rounded focus:outline-none"
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
        className="grow appearance-none ml-1 p-3 border rounded focus:outline-none"
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

      <div className="flex flex-row w-full mt-2 space-x-2">
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
        >
          Undo
        </button>
      </div>
    </div>
  );
}
