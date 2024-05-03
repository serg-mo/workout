import React from "react";
import { eraseLocalStorage, getLocalStorage, setLocalStorage } from "./lib";

export default function Footer() {
  const onInit = () => {
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
    if (!window.confirm("Are you sure?")) {
      return;
    }
    // NOTE: copy to clipboard does not work on mobile
    // TODO: build a textarea and copy the content
    console.log(getLocalStorage());
  };

  return (
    <div className="w-full flex flex-row justify-center mt-3">
      <button
        className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
        onClick={onInit}
      >
        Init
      </button>

      <button
        className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
        onClick={onReset}
      >
        Reset
      </button>

      <button
        className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
        onClick={onReset}
      >
        Export
      </button>
    </div>
  );
}
