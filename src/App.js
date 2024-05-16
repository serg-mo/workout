import React, { useState, useEffect } from "react";
import { getWorkout } from "./lib";
import Form from "./Form";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import { persistWorkout, initWorkout } from "./lib";

// TODO: visualize timestamp, weight, and reps as a chart (scatter?)
// TODO: look at timestamps to figure out the time between sets
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
    <div className="w-full text-3xl text-center p-2">
      <h1 className="font-bold mb-4">{workoutName}</h1>
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
