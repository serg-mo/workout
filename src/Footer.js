import React, { useState, useRef } from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "./lib";

export default function Footer() {
  const [exportString, setExportString] = useState("");
  const textareaRef = useRef(null);

  const onImport = () => {
    const payload = JSON.parse(prompt("JSON")); // NOTE: must be in double quotes
    if (Object.keys(payload).length) {
      setLocalStorage(payload);
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
    <>
      <div className="w-full flex flex-row justify-center mt-3">
        <button
          className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
          onClick={onImport}
        >
          Import
        </button>

        <button
          className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
          onClick={onReset}
        >
          Reset
        </button>

        <button
          className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
          onClick={onExport}
        >
          Export
        </button>
      </div>

      <textarea
        value={exportString}
        className="w-full text-xs mt-5 text-wrap focus:outline-none"
        rows={3}
        readOnly
        ref={textareaRef}
      />
    </>
  );
}
