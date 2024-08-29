import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Form from './components/Form';
import { formatDate, formatHistory, formatSet, getLocalStorage, setLocalStorage } from './lib';

export default function App() {
  const [workout, setWorkout] = useState(null);
  const [exercise, setExercise] = useState(''); // must exist outside of form

  useEffect(() => {
    const today = formatDate();
    const { workouts, history } = getLocalStorage();
    if (workout === null) {
      // load today's saved workout after page refresh, if available
      if (history?.[today]) {
        setWorkout(history[today]);
      }
    } else {
      // if the current workout has changed, but it's not empty
      //console.log("Persisting workout", workout);

      // NOTE: one workout per day
      setLocalStorage({
        workouts,
        history: formatHistory({ ...history, [today]: workout }),
      });
    }
  }, [workout]);

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

  // TODO: all of these form props can go into a context
  return (
    <div className="w-full h-dvh flex flex-col p-2">
      <Form
        workout={workout}
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
