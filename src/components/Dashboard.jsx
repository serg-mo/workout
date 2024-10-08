import React from 'react';
import { formatDate, getLocalStorage } from '../lib';
import Sets from './Sets';

export default function Dashboard({ workout, exercise }) {
  if (!exercise) {
    return;
  }

  const { history } = getLocalStorage(); // most recent first
  const today = formatDate();

  // TODO: consider saving history in the dashboard format, ie exercise:date:set.
  // any workouts before today that contain this exercise
  const prev = Object.entries(history)
    .filter(([date, workout]) => date !== today && !!workout?.[exercise])
    .map(([date, workout]) => ({ date, sets: workout[exercise] }));

  // if (!!workout?.[exercise]) {
  // console.log(workout[exercise]);
  // }

  // NOTE: today must be separate or it will be one render behind
  return (
    <div className="my-4 flex-grow w-full text-lg text-gray-600 text-left whitespace-pre">
      {!!workout?.[exercise] && <Sets sets={workout[exercise]} />}
      {prev.length > 0 &&
        prev.map(({ date, sets }, index) => <Sets date={date} sets={sets} key={index} />)}
    </div>
  );
}
