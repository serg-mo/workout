import React, { useEffect, useState } from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "../lib";

export default function Footer() {
  const [mailto, setMailto] = useState("");

  useEffect(() => {
    const workouts = getLocalStorage(4 * 3); // one month is 4 weeks at 3 workouts/week

    const setReducer = (acc, [exercise, sets]) => {
      acc[exercise] = sets.map(({ weight, reps }) => `${weight}x${reps}`);
      return acc;
    };

    const workoutReducer = (acc, [date, exercises]) => {
      acc[date] = Object.entries(exercises).reduce(setReducer, {});
      return acc;
    };

    const data = Object.entries(workouts).reduce(workoutReducer, {});
    const json = JSON.stringify(data, null, 0); // replacer, spaces
    console.log(`JSON export length ${json.length} vs 2083 max`);

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
