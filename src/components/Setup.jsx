import yaml from 'js-yaml';
import React, { useState } from 'react';
import { buttonStyle, getLocalStorage, setLocalStorage } from '../lib';

export default function Setup() {
  const { workouts } = getLocalStorage();
  const [value, setValue] = useState(Object.keys(workouts).length ? yaml.dump(workouts) : '');

  const MIN_WORKOUTS = 2;
  const MIN_EXERCISES = 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    const workouts = yaml.load(e.target.workouts.value);
    // TODO: assert that the workout is of the right shape e.g., weekday > exercise > weight

    const isValidWorkouts =
      Object.keys(workouts).length >= MIN_WORKOUTS &&
      Object.keys(workouts).every((name) => isNaN(Number(name)));
    const isValidExercises = Object.values(workouts).every(
      (exercises) =>
        Object.keys(exercises).length >= MIN_EXERCISES &&
        Object.keys(exercises).every((name) => isNaN(Number(name)))
    );

    if (isValidWorkouts && isValidExercises) {
      setLocalStorage({ workouts, history: {} });
      window.location.reload();
    } else {
      console.log(
        `Workouts must be a map, ${MIN_WORKOUTS} min workouts, ${MIN_EXERCISES} min exercises each`
      );
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
      <button type="submit" className={buttonStyle}>
        Save
      </button>
    </form>
  );
}
