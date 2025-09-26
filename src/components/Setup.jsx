import yaml from 'js-yaml';
import React, { useState } from 'react';
import {
  MIN_EXERCISES,
  MIN_WORKOUTS,
  getLocalStorage,
  isValidWorkouts,
  setLocalStorage,
} from '../lib';

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

export default function Setup({ back }) {
  const { workouts, history } = getLocalStorage();
  const [value, setValue] = useState(
    Object.keys(workouts).length ? yaml.dump(workouts) : placeholder
  );

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
