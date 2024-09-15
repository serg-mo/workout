import React from 'react';
import { buttonStyle, getLocalStorage, setLocalStorage } from '../lib';

const placeholder = [
  'MONDAY',
  'Bench Press   135',
  'Squats        225',
  'Deadlifts     315',
  '',
  'WEDNESDAY',
  'Pushups       25.5',
  'Dips          45.6',
  'Pullups       10.7',
].join('\n');

// TODO: load existing workouts, if available
export default function Setup() {
  const { workouts } = getLocalStorage();

  const serializeWorkouts = (json) => {
    let result = '';

    Object.keys(json).forEach((workoutName) => {
      result += `${workoutName.toUpperCase()}\n`;

      Object.entries(json[workoutName]).forEach(([exercise, weight]) => {
        result += `${exercise.padEnd(20)}  ${weight}\n`; // 2 spaces min
      });

      result += '\n';
    });

    return result.trim();
  };

  const parseWorkouts = (text) => {
    const lines = text.trim().split('\n');
    const result = {};
    let name = '';

    lines.forEach((line) => {
      line = line.trim();

      if (line.length) {
        // if there are no numbers in the line, it's a name
        if (!/\d/.test(line)) {
          name = line;
          result[name] = {};
        } else {
          // 2+ space-delimited exercise name and weight
          const [exercise, weight] = line.split(/\s{2,}/).map((s) => s.trim());
          result[name][exercise] = parseFloat(weight); // kettlebells have decimals
        }
      }
    });

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalStorage({ workouts: parseWorkouts(e.target.workouts.value), history: {} });
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        name="workouts"
        placeholder={placeholder}
        cols="28"
        rows="20"
        className="grow m-auto font-mono text-sm text-left focus:outline-none"
      >
        {serializeWorkouts(workouts)}
      </textarea>
      <button type="submit" className={buttonStyle}>
        Save
      </button>
    </form>
  );
}
