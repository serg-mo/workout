import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Form from "./components/Form";
import { initWorkout, persistWorkout } from "./lib";

// TODO: reloading the page should pre-select the most recent exercise, weight, and reps
// TODO: changing the exercise should affect the weight and reps
// TODO: disable undo if there is no exercise or it has no existing sets
// TODO: undo is a click behind
export default function App() {
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
    setWorkout((prev) => ({
      ...prev,
      [exercise]: [...(prev?.[exercise] ?? []), { weight, reps }],
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
    <div className="w-full h-dvh flex flex-col p-2">
      <Form
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
