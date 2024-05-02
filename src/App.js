import React, { useState, useEffect } from "react";
import { getWorkout } from "./lib";
import Form from "./Form";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import { persistWorkout, LOCAL_STORAGE_KEY } from "./lib";

// TODO: add a button + confirm for erasing local storage
// TODO: preserve existing workouts, append only
// const today = (new Date()).toISOString().slice(0, 10); // YYYY-MM-DD

// TODO: visualize timestamp, weight, and reps
// TODO: redo the state schema, key it off the exercise
// TODO: maybe I can do like three last workouts per exercise
// TODO: I can get a precise timestamp of when the set is done, figure out the time between sets
export default function App() {
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const [workoutName, workoutExercises] = getWorkout(todayIndex);
  const [currentWorkout, setCurrentWorkout] = useState({});

  useEffect(() => {
    if (!Object.keys(currentWorkout).length) {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const workouts =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const workout = workouts[today] ?? false;

      if (workout) {
        console.log("Initializing current workout from local storage");
        setCurrentWorkout(workout);
      }
    } else {
      // if the current workout has changed, but it's not empty
      persistWorkout(currentWorkout);
    }
  }, [currentWorkout]);

  const handleSave = (exercise, weight, reps) => {
    // console.log({ exercise, weight, reps });
    setCurrentWorkout((prev) => ({
      ...prev,
      [exercise]: [
        ...(prev[exercise] ?? []),
        { weight, reps, timestamp: new Date().toISOString() }, // exercise -> reps[]
      ],
    }));
  };

  // TODO: pass the current exercise to dashboard, so it can highlight the right exercise
  return (
    <div className="w-full text-3xl text-center p-2">
      <h1 className="font-bold mb-4">{workoutName}</h1>
      <Form exercises={workoutExercises} handleSave={handleSave} />
      <Dashboard currentWorkout={currentWorkout} />
      <Footer />
    </div>
  );
}
