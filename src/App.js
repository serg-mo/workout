import React, { useState, useEffect } from "react";
import { getTodaysWorkout } from "./lib";
import Form from "./Form";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import { persistWorkout, initWorkout } from "./lib";

// TODO: reloading the page should pre-select the most recent exercise, weight, and reps
// TODO: Two workouts show up at the same day?
// TODO: replace dips and pullups with cable exercises
// TODO: changing the exercise should affect the weight and reps
// TODO: disable undo if there is no exercise or it has no existing sets
// TODO: undo is a click behind
export default function App() {
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const [workoutName, workoutExercises] = getTodaysWorkout(todayIndex);

  const [workout, setWorkout] = useState(null);
  const [exercise, setExercise] = useState(""); // must exist outside of form

  useEffect(() => {
    if (workout === null) {
      initWorkout(setWorkout);
    } else {
      // if the current workout has changed, but it's not empty
      persistWorkout(workout);
    }
  }, [workout]);

  const handleSave = (exercise, weight, reps) => {
    // console.log({ exercise, weight, reps });
    setWorkout((prev) => ({
      ...prev,
      [exercise]: [...(prev[exercise] ?? []), { weight, reps }],
    }));
  };

  const undoLast = () => {
    if (!exercise) return;
    setWorkout((prev) => {
      const sets = [...(prev[exercise] ?? [])];
      sets.pop(); // remove the most recent set

      if (sets.length === 0) {
        const { [exercise]: _, ...rest } = prev;
        return rest; // all except the empty exercise
      }

      return { ...prev, [exercise]: sets };
    });
  };

  return (
    <div className="w-full h-screen flex flex-col p-2">
      <h1 className="font-bold mb-4 text-3xl text-center">{workoutName}</h1>
      <Form
        exercises={workoutExercises}
        exercise={exercise}
        setExercise={setExercise}
        handleSave={handleSave}
        undoLast={undoLast}
      />
      <Dashboard workout={workout} exercise={exercise} />
      <Footer />
    </div>
  );
}
