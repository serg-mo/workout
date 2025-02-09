import yaml from 'js-yaml';
import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

export default function Footer() {
  const [mailto, setMailto] = useState('');
  const [version, setVersion] = useState('dev');

  useEffect(() => {
    // NOTE: Chrome breaks after ~2k chars, but 1 month of workouts fits
    const payload = getLocalStorage(4 * 3);
    const body = yaml.dump(payload);

    setMailto(`mailto:?subject=Workout&body=${encodeURIComponent(body)}`);
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
