import yaml from 'js-yaml';

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
    // NOTE: Chrome breaks after ~2k chars, but 4 weeks of workouts fits
    const payload = getLocalStorage(4 * 3);
    const body = yaml.dump(payload);

    // preserve spaces and newlines for mail body
    const formattedBody = body
      .replace(/ /g, '%20')
      .replace(/\n/g, '%0A');

    const mailtoLink = `mailto:?subject=Workout&body=${formattedBody}`;
    window.location.href = mailtoLink;
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
