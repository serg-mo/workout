import yaml from 'js-yaml';
import React, { useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

const placeholder = [
  'MONDAY:',
  '  Dumbbell Flat Press: 20',
  '  Dumbbell Fly: 10',
  '  Dumbbell Pullover: 60',
  '  Kettlebell Squat: 16',
  '  Kettlebell Lunges: 16',
  'TUESDAY:',
  '  Dumbbell Incline Press: 20',
  '  Dumbbell Press: 20',
  '  Dumbbell Lateral Raise: 10',
  '  Dumbbell Curl: 20',
  '  Dumbbell Extension: 20',
  'WEDNESDAY:',
  '  Kettlebell Swing: 16',
  '  Kettlebell Good Morning: 20',
  '  Kettlebell Deadlift: 16',
  '  Dumbbell Bent-Over Row: 20',
  '  Dumbbell Front Raise: 10',
].join('\n');

export default function Setup() {
  const { workouts } = getLocalStorage();
  const [value, setValue] = useState(
    Object.keys(workouts).length ? yaml.dump(workouts) : placeholder
  );

  const MIN_WORKOUTS = 2;
  const MIN_EXERCISES = 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    const workouts = yaml.load(e.target.workouts.value);
    // TODO: assert that the workout is of the right shape e.g., weekday > exercise > weight

    const isValidWorkouts =
      workouts &&
      Object.keys(workouts).length >= MIN_WORKOUTS &&
      Object.keys(workouts).every((name) => isNaN(Number(name)));

    const isValidExercises =
      workouts &&
      Object.values(workouts).every(
        (exercises) =>
          Object.keys(exercises).length >= MIN_EXERCISES &&
          Object.keys(exercises).every((name) => isNaN(Number(name)))
      );

    if (isValidWorkouts && isValidExercises) {
      setLocalStorage({ workouts, history: {} });
      window.location.reload();
    } else {
      console.log(`${MIN_WORKOUTS} min workouts, ${MIN_EXERCISES} min exercises each`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
    </form>
  );
}
