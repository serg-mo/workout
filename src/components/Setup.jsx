import React from 'react';
import { setLocalStorage } from '../lib';

export default function Setup() {
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
    <form onSubmit={handleSubmit} className="w-full text-center flex flex-col gap-4">
      <textarea
        name="workouts"
        placeholder={placeholder}
        cols="30"
        rows="10"
        className="m-auto font-mono text-center focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 text-white font-bold p-2 rounded"
      >
        Setup
      </button>
    </form>
  );
}
