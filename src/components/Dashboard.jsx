import React from 'react';
import { formatDate, getLocalStorage } from '../lib';
import Sets from './Sets';

// TODO: consider saving history in the dashboard format, ie exercise:date:set.
export default function Dashboard({ workout, exercise }) {
  const { history } = getLocalStorage(); // most recent first
  const today = formatDate();

  // NOTE: workouts before today that contain this exercise, limit to N most recent
  const prev = Object.entries(history)
    .filter(([date, workout]) => date !== today && !!workout?.[exercise])
    .map(([date, workout]) => ({ date, sets: workout[exercise] }))
    .slice(0, 3);

  // NOTE: today must be separate or it will be one render behind
  return (
    <div className="my-4 flex-grow w-full text-lg text-gray-600 text-left whitespace-pre">
      {!!workout?.[exercise] && <Sets sets={workout[exercise]} />}
      {prev.length > 0 &&
        prev.map(({ date, sets }, index) => <Sets date={date} sets={sets} key={index} />)}
    </div>
  );
}
