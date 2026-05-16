import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage, PUBLIC_BASE_URL } from '../lib';
import QRCode from 'react-qr-code';

export default function Footer({ onSetup }) {
  const [version, setVersion] = useState('dev');
  const [showQR, setShowQR] = useState(false);
  const [exportUrl, setExportUrl] = useState(null);

  useEffect(() => {
    // NOTE: github action writes to this file and no-cache is important
    fetch('version.txt', { cache: 'no-cache' }).then((response) => {
      if (response.ok) {
        response.text().then(setVersion);
      }
    });
  }, []);

  useEffect(() => {
    if (exportUrl) {
      setShowQR(true)
    }
  }, [exportUrl]);

  const onExport = (e) => {
    e.preventDefault();
    const { workouts, history } = getLocalStorage(4 * 3); // most recent first

    // most recent, smallest weight per exercise 
    const minimums = Object.entries(history)
      .reduce((acc, [_date, exercises]) => {
        for (const [exercise, sets] of Object.entries(exercises)) {
          if (acc[exercise]) continue; // first one stays

          // smallest weight in all sets, set = weight x reps
          acc[exercise] = Math.min(
            ...sets.split(',').map((set) => parseFloat(set.split('x')[0]))
          );
        }

        return acc;
      }, {});
    console.log("new minimums", minimums)

    // same shape, new initial weights
    const updatedWorkouts = Object.fromEntries(
      Object.entries(workouts).map(([workoutName, exercises]) => [
        workoutName,
        Object.fromEntries(
          Object.entries(exercises).map(([exercise, weight]) => [
            exercise,
            minimums[exercise] ?? weight,
          ])
        ),
      ])
    );

    const PUBLIC_BASE_URL = "https://serg-mo.github.io/workout/"
    // const PUBLIC_BASE_URL = "http://localhost:8080/"
    const url = `${PUBLIC_BASE_URL}?workouts=${encodeURIComponent(JSON.stringify(updatedWorkouts, null, 0))}`
    console.log(url)
    
    setExportUrl(url);
  };

  return (
    <footer className="w-full text-sm">
      <div className="flex flex-row justify-between">
        <a className="cursor-pointer rounded px-2 hover:bg-gray-200" onClick={onSetup}>
          setup
        </a>
        <a className="cursor-pointer rounded px-2 hover:bg-gray-200" onClick={onExport}>
          export
        </a>
        <a
          className="cursor-pointer rounded px-2 hover:bg-gray-200"
          href="https://github.com/serg-mo/workout/commits/main/"
          target="_blank"
        >
          v:{version}
        </a>
      </div>
      {showQR && (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div
            onClick={() => setShowQR(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div className="p-6 bg-white rounded-2xl shadow-2xl">
              <QRCode
                value={exportUrl}
                size={256}
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
