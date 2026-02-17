import yaml from 'js-yaml';
import React, { useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

const MIN_WORKOUTS = 2;
const MIN_EXERCISES = 3;

function isValidWorkouts(workouts) {
  // expected shape example: weekday > exercise > weight
  const isValidWorkouts =
    workouts &&
    Object.keys(workouts).length >= MIN_WORKOUTS &&
    Object.keys(workouts).every((name) => isNaN(Number(name)));

  const isValidExercises =
    workouts &&
    Object.values(workouts).every(
      (exercises) =>
        Object.keys(exercises).length >= MIN_EXERCISES &&
        Object.values(exercises).every((weight) => !isNaN(Number(weight)))
    );

  return isValidWorkouts && isValidExercises;
}

const placeholder = {
  MONDAY: {
    'Kettlebell Squat': 16,
    'Dumbbell Flat Press': 20,
    'Dumbbell Pullover': 60,
    'Dumbbell Fly': 10,
  },
  WEDNESDAY: {
    'Kettlebell Overhead Press': 16,
    'Dumbbell Incline Press': 20,
    'Dumbbell Curl': 20,
    'Dumbbell Extension': 20,
  },
  FRIDAY: {
    'Kettlebell Swing': 16,
    'Kettlebell Good Morning': 20,
    'Kettlebell Deadlift': 16,
    'Kettlebell Row': 16,
  },
};

function getUpdatedWorkouts() {
  const { workouts, history } = getLocalStorage();
  // TODO: for every exercise, find the weight of the first set and update it from workouts/placeholder
  return yaml.dump(Object.keys(workouts).length ? workouts : placeholder);
}

export default function Setup({ back }) {
  const { history } = getLocalStorage();
  const [value, setValue] = useState(getUpdatedWorkouts());

  const onSubmit = (e) => {
    e.preventDefault();
    const workouts = yaml.load(e.target.workouts.value);
    if (isValidWorkouts(workouts)) {
      setLocalStorage({ workouts, history }); // overwrite workouts, preserve history
      window.location.reload();
    } else {
      alert(`
        Minimum ${MIN_WORKOUTS} workouts, ${MIN_EXERCISES} exercises each
        Shape Example: weekday > exercise > weight
      `);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="font-bold text-center">Setup</div>
      <textarea
        name="workouts"
        cols="40"
        rows="20"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="grow m-auto border border-gray-500 font-mono text-sm text-left focus:outline-none"
      />
      <button type="submit">Save</button>
      <button onClick={back}>Back</button>
    </form>
  );
}
