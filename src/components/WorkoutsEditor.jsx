import React, { useState } from "react";

const initialData = {
  MONDAY: {
    "Dumbbell Flat Press": 20,
    "Dumbbell Fly": 10,
    "Dumbbell Pullover": 60,
    "Kettlebell Goblet Squat": 16,
    "Kettlebell Lunges": 16,
  },
  WEDNESDAY: {
    "Dumbbell Incline Press": 20,
    "Kettlebell Overhead Press": 20,
    "Dumbbell Curl": 20,
    "Dumbbell Extension": 20,
    "Dumbbell Lateral Raise": 10,
  },
  FRIDAY: {
    "Kettlebell Swing": 16,
    "Kettlebell Good Morning": 20,
    "Dumbbell Bent-Over Row": 20,
    "Dumbbell Reverse Fly": 10,
    "Dumbbell Front Raise": 10,
  },
};

export default function WorkoutEditor() {
  const [workout, setWorkout] = useState(initialData);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [editingWorkout, setEditingWorkout] = useState(null);

  const handleWeightChange = (workoutName, exercise, weight) => {
    setWorkout((prev) => ({
      ...prev,
      [workoutName]: { ...prev[workoutName], [exercise]: weight },
    }));
  };

  const addExercise = (workoutName) => {
    setWorkout((prev) => ({
      ...prev,
      [workoutName]: { ...prev[workoutName], "New Exercise": 0 },
    }));
  };

  const removeExercise = (workoutName, exercise) => {
    const updatedWorkout = { ...workout[workoutName] };
    delete updatedWorkout[exercise];
    setWorkout((prev) => ({ ...prev, [workoutName]: updatedWorkout }));
  };

  const addWorkout = () => {
    if (!newWorkoutName.trim()) return;
    const formattedName = newWorkoutName.toUpperCase();
    setWorkout((prev) => ({
      ...prev,
      [formattedName]: {}
    }));
    setNewWorkoutName("");
  };

  const removeWorkout = (workoutName) => {
    setWorkout((prev) => {
      const newWorkout = { ...prev };
      delete newWorkout[workoutName];
      return newWorkout;
    });
  };

  const renameWorkout = (oldName, newName) => {
    if (!newName.trim()) return;
    const formattedName = newName.toUpperCase();
    setWorkout((prev) => {
      const newWorkout = { ...prev };
      newWorkout[formattedName] = newWorkout[oldName];
      delete newWorkout[oldName];
      return newWorkout;
    });
    setEditingWorkout(null);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newWorkoutName}
          onChange={(e) => setNewWorkoutName(e.target.value)}
          placeholder="New workout name"
          className="flex-1 bg-white border rounded px-3 py-1.5 text-sm"
        />
        <button
          onClick={addWorkout}
          className="px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Add Workout
        </button>
      </div>

      {Object.entries(workout).map(([workoutName, exercises]) => (
        <div key={workoutName} className="mb-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-start gap-2">
            {editingWorkout === workoutName ? (
              <input
                type="text"
                defaultValue={workoutName}
                onBlur={(e) => renameWorkout(workoutName, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    renameWorkout(workoutName, e.target.value);
                  }
                }}
                className="text-lg font-semibold bg-white border rounded px-2 py-1"
                autoFocus
              />
            ) : (
              <h2
                className="text-lg font-semibold cursor-pointer hover:text-gray-600"
                onClick={() => setEditingWorkout(workoutName)}
              >
                {workoutName}
              </h2>
            )}
            <button
              onClick={() => removeWorkout(workoutName)}
              className="px-2.5 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
            >
              ✕
            </button>
          </div>

          {Object.entries(exercises).map(([exercise, weight]) => (
            <div key={exercise} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={exercise}
                readOnly
                className="flex-1 bg-white border rounded px-3 py-1.5 text-sm"
              />
              <input
                type="number"
                value={weight}
                onChange={(e) =>
                  handleWeightChange(workoutName, exercise, Number(e.target.value))
                }
                className="w-16 text-center bg-white border rounded px-3 py-1.5 text-sm"
              />
              <button
                onClick={() => removeExercise(workoutName, exercise)}
                className="px-2.5 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => addExercise(workoutName)}
            className="mt-2 w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-gray-500 hover:bg-gray-50"
          >
            + Add Exercise
          </button>
        </div>
      ))}
    </div>
  );
}
