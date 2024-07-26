import React from "react";

export default function Sets({ title, sets }) {
  return (
    <div className="my-2">
      <div className="inline-block w-16 mr-1">{title}</div>
      {sets.map(({ weight, reps }, index) => (
        <div
          className="inline-block w-16 mx-1 text-center rounded bg-gray-300"
          key={index}
        >
          {weight}x{reps}
        </div>
      ))}
    </div>
  );
}
