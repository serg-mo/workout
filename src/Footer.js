import React, { useState } from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "./lib";

export default function Footer() {
  const [exportString, setExportString] = useState("");

  const onImport = () => {
    const payload = JSON.parse(prompt("JSON")); // NOTE: must be in double quotes

    if (Object.keys(payload).length) {
      if (!window.confirm("Are you sure?")) {
        return;
      }

      return setLocalStorage(payload);
    }
  };
  const onReset = () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    return eraseLocalStorage();
  };
  const onExport = () => {
    // NOTE: copy to clipboard does not work on mobile
    setExportString(JSON.stringify(getLocalStorage()));
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
      {exportString && (
        <textarea
          value={exportString}
          className="w-full text-xs mt-5 p-0 text-wrap"
          rows={5}
          onChange={() => {}}
        />
      )}
    </>
  );
}
