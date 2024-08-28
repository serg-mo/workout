import moment from 'moment';
import React from 'react';

export default function Sets({ date, sets }) {
  // NOTE: a set is weight + reps, e.g., 135x10
  const title = date ? moment(date).format('MMM D') : 'Today';

  return (
    <div className="my-2">
      <div className="inline-block w-16 mr-1">{title}</div>
      {sets.map((set, index) => (
        <div className="inline-block w-16 mx-1 text-center rounded bg-gray-300" key={index}>
          {set}
        </div>
      ))}
    </div>
  );
}
