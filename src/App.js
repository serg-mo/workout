import React, { useState, useEffect } from "react";
import { getWorkout, arrayRange } from "./lib";
import WorkoutRecord from "./WorkoutRecord";

// TODO: add a button + confirm for erasing local storage
// TODO: preserve existing workouts, append only
// const today = (new Date()).toISOString().slice(0, 10); // YYYY-MM-DD
const LOCAL_STORAGE_KEY = "workout";

export default function App() {
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const [workoutName, workoutExercises] = getWorkout(todayIndex);

  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const [currentWorkout, setCurrentWorkout] = useState({});
  const [previousWorkout, setPreviousWorkout] = useState({});

  const eraseLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const persistCurrentWorkout = () => {
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    const payload = { ...existing, [date]: currentWorkout }; // one workout per day
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  };

  // TODO: previous workout is only relevant for the same day of the week
  const loadPreviousWorkout = () => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const payload = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    setPreviousWorkout(payload); // TODO: set the date of the previous workout
  };

  useEffect(() => {
    loadPreviousWorkout();
  }, []);

  // TODO: this does not persist on the first call
  useEffect(() => {
    if (Object.keys(currentWorkout).length) {
      persistCurrentWorkout();
    }
  }, [currentWorkout]);

  const weightOptions = arrayRange(5, 225, 5);
  const repsOptions = arrayRange(3, 20, 1);

  const handleExerciseChange = (e) => setExercise(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleRepsChange = (e) => setReps(e.target.value);

  const handleSave = () => {
    // must be a new object to trigger a re-render
    setCurrentWorkout({
      ...currentWorkout,
      [exercise]: [...(currentWorkout[exercise] ?? []), `${weight}x${reps}`],
    });
  };

  return (
    <div className="max-w-md container p-4 space-y-4 text-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">{workoutName}</h1>
      <div className="w-full">
        <select
          value={exercise}
          onChange={handleExerciseChange}
          className="w-full p-2 leading-tight border rounded"
        >
          <option value="">Exercise</option>
          {workoutExercises.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between space-x-4">
        <select
          value={weight}
          onChange={handleWeightChange}
          className="w-1/2 p-2 border rounded"
        >
          <option value="">Weight</option>
          {weightOptions.map((value, index) => (
            <option key={index} value={value}>
              {value}lb
            </option>
          ))}
        </select>

        <select
          value={reps}
          onChange={handleRepsChange}
          className="w-1/2 p-2 border rounded"
        >
          <option value="">Reps</option>
          {repsOptions.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <button
        className="w-full bg-blue-500 disabled:bg-gray-500 text-white font-bold p-2 rounded"
        onClick={handleSave}
        disabled={!exercise || !weight || !reps}
      >
        Save
      </button>

      <button
        className="m-auto bg-blue-500 text-white rounded text-sm"
        onClick={() => window.confirm("Are you sure?") && eraseLocalStorage()}
      >
        Erase
      </button>

      <WorkoutRecord date="Today" workout={currentWorkout} />

      {Object.keys(previousWorkout).length > 0 &&
        Object.entries(previousWorkout).map(([date, workout], index) => (
          <WorkoutRecord date={date} workout={workout} key={index} />
        ))}
    </div>
  );
}
