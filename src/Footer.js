import React, { useState, useRef, useEffect } from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "./lib";

export default function Footer() {
  const [mailto, setMailto] = useState("");

  const getMostRecentWorkouts = (N) => {
    const workouts = getLocalStorage(); // date -> workout

    const dates = Object.keys(workouts).sort(
      (a, b) => new Date(b) - new Date(a) // descending
    );

    return dates.slice(0, N).reduce((acc, date) => {
      acc[date] = workouts[date];
      return acc;
    }, {});
  };

  useEffect(() => {
    // NOTE: navigator.clipboard.writeText does not work on Chrome for iOS
    const workouts = getMostRecentWorkouts(10);
    const json = encodeURIComponent(JSON.stringify(workouts, null, 2)); // replacer, spaces
    setMailto(`mailto:?subject=Workouts&body=${json}`);
  }, []);

  const onImport = () => {
    // NOTE: json must use double quotes
    try {
      const payload = JSON.parse(prompt("JSON"));
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
    <footer className="w-full text-xs">
      <div className="flex flex-row justify-between">
        <a onClick={onImport}>Import</a>
        <a onClick={onReset}>Reset</a>
        <a href={mailto}>Export</a>
      </div>
    </footer>
  );
}
