import moment from 'moment';
import React from 'react';

export default function Sets({ date, sets }) {
  // NOTE: a set is weight + reps, e.g., 135x10
  const format = 'MMM D'
  const title = date ? moment(date).format(format) : 'Today';

  return (
    <div className="my-2 flex flex-row">
      <div className="inline-block flex-grow max-w-24 mr-1">{title}</div>
      {sets.split(',').map((set, index) => (
        <div className="inline-block w-20 mx-1 text-center rounded bg-gray-300" key={index}>
          {set}
        </div>
      ))}
    </div>
  );
}
