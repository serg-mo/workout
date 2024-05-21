import React, { useState, useEffect } from "react";
import { getWorkout } from "./lib";
import Form from "./Form";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import { persistWorkout, initWorkout } from "./lib";

// TODO: visualize timestamp, weight, and reps as a chart (scatter?)
// TODO: look at timestamps to figure out the time between sets
// TODO: reloading the page should pre-select the most recent exercise, weight, and reps
// TODO: Two workouts show up at the same day?
// TODO: replace dips and pullups with cable exercises
// TODO: chart all sets of the current exercise
// TODO: changing the exercise should affect the weight and reps
// TODO: disable undo if there is no currentExercise or it has no existing sets

export default function App() {
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const [workoutName, workoutExercises] = getWorkout(todayIndex);

  const [currentWorkout, setCurrentWorkout] = useState({});
  const [currentExercise, setExercise] = useState("");

  useEffect(() => {
    if (!Object.keys(currentWorkout).length) {
      initWorkout(setCurrentWorkout);
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

  const undoLast = () => {
    if (!currentExercise) return;
    setCurrentWorkout((prev) => {
      const sets = [...(prev[currentExercise] ?? [])];
      sets.pop(); // remove the most recent set
      return { ...prev, [currentExercise]: sets };
    });
  };

  return (
    <div className="w-full h-screen flex flex-col p-2">
      <h1 className="font-bold mb-4 text-3xl text-center">{workoutName}</h1>
      <Form
        exercises={workoutExercises}
        exerciseState={[currentExercise, setExercise]}
        handleSave={handleSave}
        undoLast={undoLast}
      />
      <Dashboard
        currentWorkout={currentWorkout}
        currentExercise={currentExercise}
      />
      <Footer />
    </div>
  );
}
