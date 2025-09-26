
import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

export default function Footer({ onSetup }) {
  const [version, setVersion] = useState('dev');

  useEffect(() => {
    // NOTE: github action writes to this file and no-cache is important
    fetch('version.txt', { cache: 'no-cache' }).then((response) => {
      if (response.ok) {
        response.text().then(setVersion);
      }
    });

  }, []);

  const onImport = () => {
    try {
      const payload = JSON.parse(prompt('JSON'));
      if (payload && Object.keys(payload).length) {
        setLocalStorage(payload);
        alert('Success');
      }
    } catch (err) {
      alert('Fail');
      console.error(err);
    }
  };

  const onExport = (e) => {
    e.preventDefault();
    // NOTE: Chrome breaks after ~2k chars, but 4 weeks of workouts fits
    // NOTE: spaces don't work on iPhone, so yaml is not an option
    const body = JSON.stringify(getLocalStorage(4 * 3));
    const subject = `Workout ${new Date().toISOString().split('T')[0]}`

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="w-full text-sm">
      <div className="flex flex-row justify-between">
        <a onClick={onSetup}>setup</a>
        <a onClick={onImport}>import</a>
        <a onClick={onExport}>export</a>
        <span>v:{version}</span>
      </div>
    </footer>
  );
}
