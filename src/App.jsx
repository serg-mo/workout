import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Form from './components/Form';
import Setup from './components/Setup';
import Workouts from './components/Workouts';
import { formatDate, formatHistory, formatSet, getLocalStorage, setLocalStorage } from './lib';
// TODO: if I refresh the page, I lose the workout and have to manually get back to that exercise
export default function App() {
  const [workoutName, setWorkoutName] = useState('');
  const [workout, setWorkout] = useState(null);

  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState(''); // must exist outside of form

  const { workouts, history } = getLocalStorage();

  useEffect(() => {
    const today = formatDate();

    if (workout === null && history?.[today]) {
      // load today's saved workout after page refresh, if available
      setWorkout(history[today]);
    } else {
      // if the current workout has changed, but it's not empty
      console.log('Persisting workout', workout);

      // const serializedWorkout = Object.fromEntries(
      //   Object.entries(workout).map(([exercise, sets]) => [exercise, sets.join(',')])
      // );

      // NOTE: one workout per day
      setLocalStorage({
        workouts,
        history: formatHistory({ ...history, [today]: workout }),
      });
    }
  }, [workout]);

  useEffect(() => {
    if (!workoutName) {
      return;
    }

    setExercises(workouts[workoutName]); // exercise => weight
    setExercise(Object.keys(workouts[workoutName])[0]); // first exercise in a workout
  }, [workoutName]);

  const handleSave = (exercise, weight, reps) => {
    setWorkout((prev) => ({
      ...prev,
      [exercise]: [...(prev?.[exercise] ?? []), formatSet({ weight, reps })],
    }));
  };

  const undoLast = () => {
    if (!exercise) return;

    // TODO: this fails when the exercise is selected but there are no sets

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

  if (Object.keys(workouts).length === 0) {
    return <Setup />;
  }

  // TODO: all of these form props can go into a context
  return (
    <div className="w-full h-dvh flex flex-col p-2">
      {workoutName ? (
        <>
          <Form
            workout={workout}
            exercises={exercises}
            exercise={exercise}
            setExercise={setExercise}
            handleSave={handleSave}
            undoLast={undoLast}
          />
          <Dashboard workout={workout} exercise={exercise} />
        </>
      ) : (
        <Workouts workouts={workouts} onSelect={setWorkoutName} />
      )}
      <Footer />
    </div>
  );
}
