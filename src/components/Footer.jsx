import React, { useEffect, useState } from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "../lib";
import { WORKOUTS } from "../sergey";

export default function Footer() {
  const [mailto, setMailto] = useState("");

  useEffect(() => {
    const workouts = getLocalStorage(4 * 3); // one month is 4 weeks at 3 workouts/week

    // TODO: consider using a hash of an exercise name instead of the full name (to save space)
    const setReducer = (acc, [exercise, sets]) => {
      acc[exercise] = sets.map(({ weight, reps }) => `${weight}x${reps}`);
      return acc;
    };

    const workoutReducer = (acc, [date, workout]) => {
      acc[date] = Object.entries(workout).reduce(setReducer, {});
      return acc;
    };

    // TODO: add WORKOUTS here
    const HISTORY = Object.entries(workouts).reduce(workoutReducer, {});
    const json = JSON.stringify({ WORKOUTS, HISTORY }, null, 0); // replacer, spaces

    // TODO: get as much history as possible, not hardcoded size
    console.log(`Export length ${json.length} vs 2083 max`);

    // NOTE: Chrome only accepts links of 2083 characters or less
    setMailto(`mailto:?subject=Workout&body=${encodeURIComponent(json)}`);
  }, []);

  const onImport = () => {
    try {
      const payload = JSON.parse(prompt("JSON")); // NOTE: must use double quotes
      if (payload && Object.keys(payload).length) {
        setLocalStorage(payload);
        alert("Import successful");
      }
    } catch (err) {
      alert("Import failed");
      console.error(err);
    }
  };

  const onReset = () => window.confirm("Are you sure?") && eraseLocalStorage();

  return (
    <footer className="mt-auto">
      <div className="flex flex-row justify-between">
        <a onClick={onImport}>Import</a>
        <a onClick={onReset}>Reset</a>
        <a href={mailto}>Export</a>
      </div>
    </footer>
  );
}
