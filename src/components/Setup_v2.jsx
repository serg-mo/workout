import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { getLocalStorage } from '../lib';

const placeholderWorkouts = {
  MONDAY: {
    'Dumbbell Flat Press': 20,
    'Dumbbell Fly': 10,
    'Dumbbell Pullover': 60,
    'Kettlebell Goblet Squat': 16,
    'Kettlebell Lunges': 16,
  },
  WEDNESDAY: {
    'Dumbbell Incline Press': 20,
    'Kettlebell Overhead Press': 20,
    'Dumbbell Curl': 20,
    'Dumbbell Extension': 20,
    'Dumbbell Lateral Raise': 10,
  },
  FRIDAY: {
    'Kettlebell Swing': 16,
    'Kettlebell Good Morning': 20,
    'Dumbbell Bent-Over Row': 20,
    'Dumbbell Reverse Fly': 10,
    'Dumbbell Front Raise': 10,
  },
};

export default function Setup() {
  const { workouts: existingWorkouts, history } = getLocalStorage();

  const [inProgressWorkouts, setInProgressWorkouts] = useState(
    existingWorkouts ?? placeholderWorkouts
  );
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [editingWorkout, setEditingWorkout] = useState(null);

  const changeWeight = (workout, exercise, weight) => {
    setInProgressWorkouts((prev) => ({
      ...prev,
      [workout]: { ...prev[workout], [exercise]: weight },
    }));
  };

  const addExercise = (workoutName) => {
    setInProgressWorkouts((prev) => ({
      ...prev,
      [workoutName]: { ...prev[workoutName], 'New Exercise': 0 },
    }));
  };

  const removeExercise = (workout, exercise) => {
    setInProgressWorkouts((prev) => {
      const { [exercise]: _, ...rest } = prev[workout];
      return { ...prev, [workout]: rest };
    });
  };

  const addWorkout = () => {
    if (!newWorkoutName.trim()) return;

    const workout = newWorkoutName.toUpperCase();
    setInProgressWorkouts((prev) => ({
      [workout]: { 'new exercise': 10 }, // must go first
      ...prev,
    }));
    setNewWorkoutName('');
  };

  const removeWorkout = (workoutName) => {
    setInProgressWorkouts(({ [workoutName]: _, ...rest }) => rest);
  };

  const renameWorkout = (oldName, newName) => {
    setEditingWorkout(null);

    if (oldName === newName || !newName.trim()) return;

    setInProgressWorkouts((prev) => {
      const { [oldName]: workout, ...rest } = prev;
      return { [newName.toUpperCase()]: workout, ...rest }; // must go first
    });
  };

  // TODO: only write when the
  // useEffect(() => {
  //   if (isValidWorkouts(inProgressWorkouts)) {
  //     console.log("isValidWorkouts writing to local storage")
  //     setLocalStorage({ workouts: inProgressWorkouts, history }); // overwrite workouts, preserve history
  //   }
  // }, [inProgressWorkouts])

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newWorkoutName}
          onChange={(e) => setNewWorkoutName(e.target.value)}
          placeholder="New Workout"
          className="flex-1 bg-white border rounded px-3 py-1.5 text-sm"
        />
        <button onClick={addWorkout}>Add</button>
      </div>

      {Object.entries(inProgressWorkouts).map(([workoutName, exercises]) => (
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
            <FaWindowClose onClick={() => removeWorkout(workoutName)} />
          </div>

          {Object.entries(exercises).map(([exercise, weight]) => (
            <div key={exercise} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={exercise}
                readOnly
                className="flex-1 bg-white border rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                value={weight}
                onChange={(e) => changeWeight(workoutName, exercise, Number(e.target.value))}
                className="w-16 text-center bg-white border rounded px-2 py-1 text-sm"
              />
              <FaWindowClose onClick={() => removeExercise(workoutName, exercise)} />
            </div>
          ))}
          <button onClick={() => addExercise(workoutName)}>+ Add</button>
        </div>
      ))}
    </div>
  );
}
