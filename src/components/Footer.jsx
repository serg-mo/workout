import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

export default function Footer() {
  const [mailto, setMailto] = useState('');
  const [version, setVersion] = useState('dev');

  useEffect(() => {
    // NOTE: Chrome breaks after ~2k chars, but 1 month of workouts fits
    const payload = getLocalStorage(4 * 3);
    const json = JSON.stringify(payload, null, 0); // replacer, spaces

    setMailto(`mailto:?subject=Workout&body=${encodeURIComponent(json)}`);
  }, []);

  useEffect(() => {
    // NOTE: github action writes to this file
    fetch('version.txt').then((response) => {
      if (response.ok) {
        response.text().then(setVersion);
      }
    });
  }, []);

  const onImport = () => {
    try {
      const input = prompt('JSON').replace(/[\n|\r]/g, ' ');
      const payload = JSON.parse(input); // NOTE: must use double quotes
      if (payload && Object.keys(payload).length) {
        setLocalStorage(payload);
        alert('Success');
      }
    } catch (err) {
      alert('Fail');
      console.error(err);
    }
  };

  return (
    <footer className="w-full text-sm">
      <div className="flex flex-row justify-between">
        <a onClick={onImport}>import</a>
        <span>{version}</span>
        <a href={mailto}>export</a>
      </div>
    </footer>
  );
}
