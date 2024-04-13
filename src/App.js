import React, { useState } from "react";

const WORKOUTS = {
  "MONDAY (LEGS)": [
    "Squat (17)",
    "Cossack squats",
    "Leg extensions (Hold 10 sec)",
    "Tricep cable",
  ],
  "WEDNESDAY (FRONT)": ["Bench Press", "Overhead Press", "Dips", "Cable rows"],
  "FRIDAY (BACK)": ["Deadlift", "Pull-ups", "Kettlebell swings", "Bicep curls"],
};

function getWorkout(todayIndex) {
  const WEEKDAYS = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  for (let delta = 0; delta < 7; delta++) {
    const prevIndex = (7 + todayIndex - delta) % 7;
    const day = WEEKDAYS[prevIndex];

    const entry = Object.entries(WORKOUTS).find(([key]) => key.startsWith(day));
    if (entry) {
      return entry;
    }
  }

  return null;
}

function arrayRange(min, max, step) {
  let array = [];
  for (let i = min; i <= max; i += step) {
    array.push(i);
  }
  return array;
}

export default function App() {
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const [workoutName, workoutExercises] = getWorkout(todayIndex);

  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const weightOptions = arrayRange(5, 200, 5);
  const repsOptions = arrayRange(3, 15, 1);

  const handleExerciseChange = (e) => setExercise(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleRepsChange = (e) => setReps(e.target.value);

  const handleRecord = () => {
    console.log(`recording ${exercise} ${weight} x ${reps}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-4">
      <h1 className="text-2xl font-bold mb-4 text-center">{workoutName}</h1>
      <div className="mb-4">
        <select
          value={exercise}
          onChange={handleExerciseChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Exercise</option>
          {workoutExercises.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRecord}
      >
        Record
      </button>
    </div>
  );
}
