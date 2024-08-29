import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

export default function Footer() {
  const [mailto, setMailto] = useState('');
  const [version, setVersion] = useState('dev');

  useEffect(() => {
    // TODO: consider using a hash of an exercise name instead of the full name (to save space)
    const payload = getLocalStorage(4 * 3); // one month is 4 weeks at 3 workouts/week
    const json = JSON.stringify(payload, null, 0); // replacer, spaces

    // TODO: get as much history as possible, not hardcoded size
    console.log(`Export length ${json.length} vs 2083 max`);

    // NOTE: Chrome only accepts links of 2083 characters or less
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
    <footer className="mt-auto text-sm">
      <div className="flex flex-row justify-between">
        <a onClick={onImport}>import</a>
        <span>{version}</span>
        <a href={mailto}>export</a>
      </div>
    </footer>
  );
}
