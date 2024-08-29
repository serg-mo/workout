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
    <div className="p-4">
      <form onSubmit={handleSubmit} className="w-full text-center flex flex-col gap-4">
        <textarea
          name="workouts"
          placeholder={placeholder}
          cols="30"
          rows="10"
          className="block m-auto font-mono text-center"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
