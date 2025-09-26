import yaml from 'js-yaml';

import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

export default function Footer() {
  const [version, setVersion] = useState('dev');
  const [showExport, setShowExport] = useState(false);
  const [mailto, setMailto] = useState('');

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
      const payload = yaml.load(prompt('YAML'));
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
    // NOTE: Chrome breaks after ~2k chars, but 1 month of workouts fits
    const payload = getLocalStorage(4 * 3);
    const body = yaml.dump(payload);

    setMailto(`mailto:?subject=Workout&body=${encodeURIComponent(body)}`);
    setShowExport(!showExport);
  };

  return (
    <footer className="w-full text-sm">
      <div className="flex flex-row justify-between">
        <a onClick={onImport}>import</a>
        <span>{version}</span>
        <a onClick={onExport}>export</a>
      </div>
      {showExport && (
        <a href={mailto}>email</a>
      )}
    </footer>
  );
}
