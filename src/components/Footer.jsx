import yaml from 'js-yaml';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib';

export default function Footer() {
  const [version, setVersion] = useState('dev');
  const [showQR, setShowQR] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // TODO: this can also be binary
  const payload = JSON.stringify(getLocalStorage(4 * 3));

  useEffect(() => {
    // NOTE: github action writes to this file
    fetch('version.txt').then((response) => {
      if (response.ok) {
        response.text().then(setVersion);
      }
    });

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    setShowQR(!showQR);
  };

  return (
    <footer className="w-full text-sm">
      <div className="flex flex-row justify-between">
        <a onClick={onImport}>import</a>
        <span>{version}</span>
        <a onClick={onExport}>export</a>
      </div>
      {showQR && (
        <div className="fixed inset-0 bg-white flex items-center justify-center">
          <QRCodeSVG value={payload} size={viewportWidth} className="p-4 rounded-lg" />
        </div>
      )}
    </footer>
  );
}
