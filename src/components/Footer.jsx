import React, { useEffect, useState } from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "../lib";

export default function Footer() {
  const [mailto, setMailto] = useState("");

  useEffect(() => {
    const size = 1 * 3; // this many workouts/dates

    const workouts = getLocalStorage(); // date -> workout
    const dates = Object.keys(workouts).sort(
      (a, b) => new Date(b) - new Date(a),
    );
    const recent = dates.slice(0, size).reduce((acc, date) => {
      acc[date] = workouts[date];
      return acc;
    }, {});

    const json = encodeURIComponent(JSON.stringify(recent, null, 0)); // replacer, spaces
    setMailto(`mailto:?subject=Workout&body=${json}`);
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
