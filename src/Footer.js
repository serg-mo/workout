import React, { useState, useRef } from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "./lib";

export default function Footer() {
  const [exportString, setExportString] = useState("");
  const textareaRef = useRef(null);

  const onImport = () => {
    // NOTE: must use double quotes
    try {
      const payload = JSON.parse(prompt("JSON"));
      if (payload && Object.keys(payload).length) {
        setLocalStorage(payload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onReset = () => window.confirm("Are you sure?") && eraseLocalStorage();

  // NOTE: navigator.clipboard.writeText does not work on Chrome for iOS
  const onExport = () => {
    setExportString(JSON.stringify(getLocalStorage()));
    setTimeout(() => {
      textareaRef.current.select();
      document.execCommand("copy");
    }, 0);
  };

  return (
    <footer>
      <div className="w-full flex flex-row justify-center mt-3 font-bold text-sm">
        <a className="m-auto" onClick={onImport}>
          Import
        </a>

        <a className="m-auto" onClick={onReset}>
          Reset
        </a>

        <a className="m-auto" onClick={onExport}>
          Export
        </a>
      </div>

      <textarea
        value={exportString}
        className="w-full text-xs mt-5 text-wrap focus:outline-none"
        rows={3}
        readOnly
        ref={textareaRef}
      />
    </footer>
  );
}
